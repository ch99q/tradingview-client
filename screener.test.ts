import { assertEquals, assertGreater, assertGreaterOrEqual } from "jsr:@std/assert";
import { createScreener, SCREENER_FIELDS } from "./screener.ts";
import type { Filter } from "./screener.ts";

Deno.test("Create basic screener query", () => {
  const screener = createScreener()
    .select("name", "exchange", "market_cap_basic", "close")
    .where("market_cap_basic").gte(1000000000)
    .orderBy("market_cap_basic", "desc")
    .limit(10);

  const options = screener.getOptions();
  assertEquals(options.columns?.length, 4);
  assertEquals(options.range, [0, 10]);
  assertEquals(options.sort?.sortBy, "market_cap_basic");
  assertEquals(options.sort?.sortOrder, "desc");
});

Deno.test("Execute screener query", async () => {
  const screener = createScreener()
    .select("name", "exchange", "market_cap_basic", "close", "change")
    .where("market_cap_basic").gte(10000000000)
    .orderBy("market_cap_basic", "desc")
    .limit(5);

  const result = await screener.execute();
  assertGreater(result.totalCount, 0);
  assertGreaterOrEqual(result.data.length, 1);
});

Deno.test("Get screener results as objects", async () => {
  const screener = createScreener()
    .select("name", "exchange", "market_cap_basic", "close")
    .where("market_cap_basic").gte(50000000000)
    .orderBy("market_cap_basic", "desc")
    .limit(3);

  const results = await screener.get();
  assertGreaterOrEqual(results.length, 1);
  
  // Check that results have the expected structure
  const first = results[0];
  assertEquals(typeof first.symbol, "string");
  assertEquals(typeof first.name, "string");
  assertEquals(typeof first.exchange, "string");
  assertEquals(typeof first.market_cap_basic, "number");
  assertEquals(typeof first.close, "number");
});

Deno.test("Test field filter builders", () => {
  const screener = createScreener()
    .select("name", "exchange", "market_cap_basic", "RSI", "change")
    .where("market_cap_basic").gte(1000000000)
    .where("RSI").between(30, 70)
    .where("sector").eq("Technology Services")
    .orderBy("market_cap_basic", "desc")
    .limit(5);

  const options = screener.getOptions();
  assertEquals(options.filter?.length, 4); // is_primary + market_cap + RSI + sector
});

Deno.test("Test market filtering", () => {
  const screener = createScreener("america", "canada")
    .select("name", "exchange", "market_cap_basic")
    .where("market_cap_basic").gte(1000000000)
    .orderBy("market_cap_basic", "desc")
    .limit(5);

  const options = screener.getOptions();
  assertEquals(options.markets?.length, 2);
  assertEquals(options.markets?.[0], "america");
  assertEquals(options.markets?.[1], "canada");
});

Deno.test("Test price conversion", () => {
  const screener = createScreener()
    .select("name", "exchange", "close")
    .currency("eur")
    .where("market_cap_basic").gte(1000000000)
    .limit(3);

  const options = screener.getOptions();
  assertEquals(options.price_conversion?.to_currency, "eur");
});

Deno.test("Test pagination", () => {
  const screener = createScreener()
    .select("name", "exchange", "market_cap_basic")
    .where("market_cap_basic").gte(1000000000)
    .orderBy("market_cap_basic", "desc")
    .offset(10)
    .limit(5);

  const options = screener.getOptions();
  assertEquals(options.range, [10, 15]);
});

Deno.test("Test field constants", () => {
  assertEquals(SCREENER_FIELDS.name, "name");
  assertEquals(SCREENER_FIELDS.market_cap_basic, "market_cap_basic");
  assertEquals(SCREENER_FIELDS.RSI, "RSI");
  assertEquals(SCREENER_FIELDS["Perf.1D"], "Perf.1D");
});

Deno.test("Test technical indicators", async () => {
  const screener = createScreener()
    .select("name", "exchange", "RSI", "MACD.macd", "BB.upper", "BB.lower")
    .where("market_cap_basic").gte(1000000000)
    .where("RSI").between(30, 70)
    .orderBy("RSI", "desc")
    .limit(3);

  const results = await screener.get();
  assertGreaterOrEqual(results.length, 1);
  
  // Check that technical indicators are present
  const first = results[0];
  assertEquals(typeof first.RSI, "number");
});

Deno.test("Test performance fields", async () => {
  const screener = createScreener()
    .select("name", "exchange", "Perf.1D", "Perf.W", "Perf.1M", "Perf.YTD")
    .where("market_cap_basic").gte(10000000000)
    .orderBy("Perf.1D", "desc")
    .limit(3);

  const results = await screener.get();
  assertGreaterOrEqual(results.length, 1);
  
  // Check that performance fields are present
  const first = results[0];
  // Performance fields can be null or number
  const perfValue = first["Perf.1D"];
  if (perfValue !== null) {
    assertEquals(typeof perfValue, "number");
  }
});

Deno.test("Test new fluent API", () => {
  const screener = createScreener("america")
    .select("name", "exchange", "market_cap_basic", "sector")
    .where("market_cap_basic").gte(1000000000)
    .where("sector").eq("Technology Services")
    .currency("usd")
    .limit(10);

  const options = screener.getOptions();
  assertEquals(options.markets?.[0], "america");
  assertEquals(options.price_conversion?.to_currency, "usd");
  assertEquals(options.filter?.length, 3); // is_primary + market_cap + sector
});

Deno.test("Test market override method", () => {
  const screener = createScreener("america")
    .select("name", "exchange", "market_cap_basic")
    .where("market_cap_basic").gte(1000000000)
    .market("canada", "uk") // Override the initial "america" market
    .limit(5);

  const options = screener.getOptions();
  assertEquals(options.markets?.length, 2);
  assertEquals(options.markets?.[0], "canada");
  assertEquals(options.markets?.[1], "uk");
});

Deno.test("Test multiple sector selection using in() method", () => {
  const screener = createScreener()
    .select("name", "exchange", "market_cap_basic", "sector")
    .where("market_cap_basic").gte(1000000000)
    .where("sector").in(["Technology Services", "Finance", "Health Technology"])
    .where("is_primary").eq(true)
    .orderBy("market_cap_basic", "desc")
    .limit(10);

  const options = screener.getOptions();
  assertEquals(options.filter?.length, 4); // is_primary (default) + market_cap + sector + is_primary (explicit)
  
  // Check that the sector filter uses in_range operation
  const sectorFilter = options.filter?.find(f => 
    'left' in f && f.left === 'sector' && f.operation === 'in_range'
  ) as Filter | undefined;
  assertEquals(sectorFilter?.operation, "in_range");
  assertEquals(Array.isArray(sectorFilter?.right), true);
  assertEquals((sectorFilter?.right as string[]).length, 3);
});

Deno.test("Test multiple sector selection execution", async () => {
  const screener = createScreener()
    .select("name", "exchange", "market_cap_basic", "sector")
    .where("market_cap_basic").gte(50000000000)
    .where("sector").in(["Technology Services", "Finance"])
    .where("is_primary").eq(true)
    .orderBy("market_cap_basic", "desc")
    .limit(5);

  const results = await screener.get();
  assertGreaterOrEqual(results.length, 1);
  
  // Check that all results have sectors from our filter
  results.forEach(stock => {
    const sector = stock.sector as string;
    const isValidSector = sector === "Technology Services" || sector === "Finance";
    assertEquals(isValidSector, true, `Invalid sector: ${sector}`);
  });
});

Deno.test("Test sector exclusion using notIn() method", () => {
  const screener = createScreener()
    .select("name", "exchange", "market_cap_basic", "sector")
    .where("market_cap_basic").gte(1000000000)
    .where("sector").notIn(["Energy Minerals", "Utilities", "Government"])
    .where("is_primary").eq(true)
    .orderBy("market_cap_basic", "desc")
    .limit(10);

  const options = screener.getOptions();
  assertEquals(options.filter?.length, 4); // is_primary (default) + market_cap + sector + is_primary (explicit)
  
  // Check that the sector filter uses not_in_range operation
  const sectorFilter = options.filter?.find(f => 
    'left' in f && f.left === 'sector' && f.operation === 'not_in_range'
  ) as Filter | undefined;
  assertEquals(sectorFilter?.operation, "not_in_range");
  assertEquals(Array.isArray(sectorFilter?.right), true);
  assertEquals((sectorFilter?.right as string[]).length, 3);
});

Deno.test("Test sector exclusion execution", async () => {
  const screener = createScreener()
    .select("name", "exchange", "market_cap_basic", "sector")
    .where("market_cap_basic").gte(50000000000)
    .where("sector").notIn(["Energy Minerals", "Utilities"])
    .where("is_primary").eq(true)
    .orderBy("market_cap_basic", "desc")
    .limit(5);

  const results = await screener.get();
  assertGreaterOrEqual(results.length, 1);
  
  // Check that all results do NOT have excluded sectors
  results.forEach(stock => {
    const sector = stock.sector as string;
    const isExcludedSector = sector === "Energy Minerals" || sector === "Utilities";
    assertEquals(isExcludedSector, false, `Found excluded sector: ${sector}`);
  });
});