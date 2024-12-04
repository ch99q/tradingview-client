import { assertEquals, assertGreaterOrEqual } from "jsr:@std/assert";
import { connect, createChart } from "./mod.ts";
const session = await connect();

Deno.test("Create session", () => {
  assertEquals(session.protocol.protocol, "json");
});

const chart = createChart(session, 'cs_9XADHVZYL8WV');
const AAPL = await chart.resolveSymbol('AAPL', 'NASDAQ');
Deno.test("Resolve symbol", () => {
  assertEquals(AAPL.data.pro_name, "NASDAQ:AAPL");
});

const series = chart.createSeries("1M", AAPL, 100);
const records: Array<unknown> = await new Promise((resolve) => {
  series.once((data) => resolve(data));
});
Deno.test("Create series", () => {
  assertEquals(records.length, 100);
});

const study = series.createStudy("Dividends@tv-basicstudies-245");
const dividends: Array<unknown> = await new Promise((resolve) => {
  study.once((data) => resolve(data));
});

Deno.test("Create dividends study", () => {
  assertGreaterOrEqual(dividends.length, 20);
});

const script = series.createScript(
  Deno.readTextFileSync("scripts/drawdown.246.ft")
);
const drawdown: Array<unknown> = await new Promise((resolve) => {
  script.once((data) => resolve(data));
});
Deno.test("Create drawdown script", () => {
  assertEquals(drawdown.length, 200);
});

session.close();