import { test, expect } from "vitest";
import { createScreener, SCREENER_FIELDS } from "../src/screener.ts";
import type { Filter } from "../src/screener.ts";

test("Create basic screener query", () => {
  const screener = createScreener()
    .select("name", "exchange", "market_cap_basic", "close")
    .where("market_cap_basic").gte(1000000000)
    .orderBy("market_cap_basic", "desc")
    .limit(10);

  const options = screener.getOptions();
  expect(options.columns?.length).toBe(4);
  expect(options.range).toEqual([0, 10]);
  expect(options.sort?.sortBy).toBe("market_cap_basic");
  expect(options.sort?.sortOrder).toBe("desc");
});

test("Execute screener query", async () => {
  const screener = createScreener()
    .select("name", "exchange", "market_cap_basic", "close", "change")
    .where("market_cap_basic").gte(10000000000)
    .orderBy("market_cap_basic", "desc")
    .limit(5);

  const result = await screener.execute();
  expect(result.totalCount).toBeGreaterThan(0);
  expect(result.data.length).toBeGreaterThanOrEqual(1);
});

test("Get screener results as objects", async () => {
  const screener = createScreener()
    .select("name", "exchange", "market_cap_basic", "close")
    .where("market_cap_basic").gte(50000000000)
    .orderBy("market_cap_basic", "desc")
    .limit(3);

  const results = await screener.get();
  expect(results.length).toBeGreaterThanOrEqual(1);
  
  // Check that results have the expected structure
  const first = results[0];
  expect(typeof first.symbol).toBe("string");
  expect(typeof first.name).toBe("string");
  expect(typeof first.exchange).toBe("string");
  expect(typeof first.market_cap_basic).toBe("number");
  expect(typeof first.close).toBe("number");
});

test("Test field filter builders", () => {
  const screener = createScreener()
    .select("name", "exchange", "market_cap_basic", "RSI", "change")
    .where("market_cap_basic").gte(1000000000)
    .where("RSI").between(30, 70)
    .where("sector").eq("Technology Services")
    .orderBy("market_cap_basic", "desc")
    .limit(5);

  const options = screener.getOptions();
  expect(options.filter?.length).toBe(4); // is_primary + market_cap + RSI + sector
});

test("Test market filtering", () => {
  const screener = createScreener("america", "canada")
    .select("name", "exchange", "market_cap_basic")
    .where("market_cap_basic").gte(1000000000)
    .orderBy("market_cap_basic", "desc")
    .limit(5);

  const options = screener.getOptions();
  expect(options.markets?.length).toBe(2);
  expect(options.markets?.[0]).toBe("america");
  expect(options.markets?.[1]).toBe("canada");
});

test("Test price conversion", () => {
  const screener = createScreener()
    .select("name", "exchange", "close")
    .currency("eur")
    .where("market_cap_basic").gte(1000000000)
    .limit(3);

  const options = screener.getOptions();
  expect(options.price_conversion?.to_currency).toBe("eur");
});

test("Test pagination", () => {
  const screener = createScreener()
    .select("name", "exchange", "market_cap_basic")
    .where("market_cap_basic").gte(1000000000)
    .orderBy("market_cap_basic", "desc")
    .offset(10)
    .limit(5);

  const options = screener.getOptions();
  expect(options.range).toEqual([10, 15]);
});

test("Test field constants", () => {
  expect(SCREENER_FIELDS.name).toBe("name");
  expect(SCREENER_FIELDS.market_cap_basic).toBe("market_cap_basic");
  expect(SCREENER_FIELDS.RSI).toBe("RSI");
  expect(SCREENER_FIELDS["Perf.1D"]).toBe("Perf.1D");
});

test("Test technical indicators", async () => {
  const screener = createScreener()
    .select("name", "exchange", "RSI", "MACD.macd", "BB.upper", "BB.lower")
    .where("market_cap_basic").gte(1000000000)
    .where("RSI").between(30, 70)
    .orderBy("RSI", "desc")
    .limit(3);

  const results = await screener.get();
  expect(results.length).toBeGreaterThanOrEqual(1);
  
  // Check that technical indicators are present
  const first = results[0];
  expect(typeof first.RSI).toBe("number");
});

test("Test performance fields", async () => {
  const screener = createScreener()
    .select("name", "exchange", "Perf.1D", "Perf.W", "Perf.1M", "Perf.YTD")
    .where("market_cap_basic").gte(10000000000)
    .orderBy("Perf.1D", "desc")
    .limit(3);

  const results = await screener.get();
  expect(results.length).toBeGreaterThanOrEqual(1);

  // Check that performance fields are present
  const first = results[0];
  // Performance fields can be null or number
  const perfValue = first["Perf.1D"];
  if (perfValue !== null) {
    expect(typeof perfValue).toBe("number");
  }
});

test("Test new fluent API", () => {
  const screener = createScreener("america")
    .select("name", "exchange", "market_cap_basic", "sector")
    .where("market_cap_basic").gte(1000000000)
    .where("sector").eq("Technology Services")
    .currency("usd")
    .limit(10);

  const options = screener.getOptions();
  expect(options.markets?.[0]).toBe("america");
  expect(options.price_conversion?.to_currency).toBe("usd");
  expect(options.filter?.length).toBe(3); // is_primary + market_cap + sector
});

test("Test market override method", () => {
  const screener = createScreener("america")
    .select("name", "exchange", "market_cap_basic")
    .where("market_cap_basic").gte(1000000000)
    .market("canada", "uk") // Override the initial "america" market
    .limit(5);

  const options = screener.getOptions();
  expect(options.markets?.length).toBe(2);
  expect(options.markets?.[0]).toBe("canada");
  expect(options.markets?.[1]).toBe("uk");
});

test("Test multiple sector selection using in() method", () => {
  const screener = createScreener()
    .select("name", "exchange", "market_cap_basic", "sector")
    .where("market_cap_basic").gte(1000000000)
    .where("sector").in(["Technology Services", "Finance", "Health Technology"])
    .where("is_primary").eq(true)
    .orderBy("market_cap_basic", "desc")
    .limit(10);

  const options = screener.getOptions();
  expect(options.filter?.length).toBe(4); // is_primary (default) + market_cap + sector + is_primary (explicit)

  // Check that the sector filter uses in_range operation
  const sectorFilter = options.filter?.find(f => 
    'left' in f && f.left === 'sector' && f.operation === 'in_range'
  ) as Filter | undefined;
  expect(sectorFilter?.operation).toBe("in_range");
  expect(Array.isArray(sectorFilter?.right)).toBe(true);
  expect((sectorFilter?.right as string[]).length).toBe(3);
});

test("Test multiple sector selection execution", async () => {
  const screener = createScreener()
    .select("name", "exchange", "market_cap_basic", "sector")
    .where("market_cap_basic").gte(50000000000)
    .where("sector").in(["Technology Services", "Finance"])
    .where("is_primary").eq(true)
    .orderBy("market_cap_basic", "desc")
    .limit(5);

  const results = await screener.get();
  expect(results.length).toBeGreaterThanOrEqual(1);
  
  // Check that all results have sectors from our filter
  results.forEach(stock => {
    const sector = stock.sector as string;
    const isValidSector = sector === "Technology Services" || sector === "Finance";
    expect(isValidSector).toBe(true);
  });
});

test("Test sector exclusion using notIn() method", () => {
  const screener = createScreener()
    .select("name", "exchange", "market_cap_basic", "sector")
    .where("market_cap_basic").gte(1000000000)
    .where("sector").notIn(["Energy Minerals", "Utilities", "Government"])
    .where("is_primary").eq(true)
    .orderBy("market_cap_basic", "desc")
    .limit(10);

  const options = screener.getOptions();
  expect(options.filter?.length).toBe(4); // is_primary (default) + market_cap + sector + is_primary (explicit)
  
  // Check that the sector filter uses not_in_range operation
  const sectorFilter = options.filter?.find(f => 
    'left' in f && f.left === 'sector' && f.operation === 'not_in_range'
  ) as Filter | undefined;
  expect(sectorFilter?.operation).toBe("not_in_range");
  expect(Array.isArray(sectorFilter?.right)).toBe(true);
  expect((sectorFilter?.right as string[]).length).toBe(3);
});

test("Test sector exclusion execution", async () => {
  const screener = createScreener()
    .select("name", "exchange", "market_cap_basic", "sector")
    .where("market_cap_basic").gte(50000000000)
    .where("sector").notIn(["Energy Minerals", "Utilities"])
    .where("is_primary").eq(true)
    .orderBy("market_cap_basic", "desc")
    .limit(5);

  const results = await screener.get();
  expect(results.length).toBeGreaterThanOrEqual(1);

  // Check that all results do NOT have excluded sectors
  results.forEach(stock => {
    const sector = stock.sector as string;
    const isExcludedSector = sector === "Energy Minerals" || sector === "Utilities";
    expect(isExcludedSector).toBe(false);
  });
});