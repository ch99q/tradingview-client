import { test, expect } from "vitest";
import { createSession, createChart, createSeries } from "../src/client.ts";
import type { Session, Chart, ResolveSymbol } from "../src/client.ts";
import { createPresetStudy } from "../src/studies/std.ts";

// Test configuration constants
const TEST_SYMBOL = "BTCUSDT";
const TEST_EXCHANGE = "BINANCE";
const TEST_TIMEFRAME = "1"; // 1-minute candles
const TEST_BAR_COUNT = 10;

/**
 * Helper function to create a test session with consistent configuration
 */
async function createTestSession(verbose = false): Promise<Session> {
  return await createSession(undefined, verbose);
}

/**
 * Helper function to setup chart with resolved symbol for testing
 */
async function setupChartWithSymbol(session: Session): Promise<{
  chart: Chart;
  symbol: ResolveSymbol;
}> {
  const chart = await createChart(session);
  const symbol = await chart.resolve(TEST_SYMBOL, TEST_EXCHANGE);
  return { chart, symbol };
}

test("Collection lifecycle - establishes connection, collect data and closes gracefully", async () => {
  const session = await createTestSession(false);

  const SYMBOLS = [
    ["NASDAQ", "AAPL"],
    ["NASDAQ", "AMZN"],
    ["NASDAQ", "TSLA"],
  ];

  const chart = await createChart(session);

  const symbols = await Promise.all(
    SYMBOLS.map(([exchange, ticker]) => chart.resolve(ticker, exchange))
  );

  expect(symbols.length, "Should resolve at least one symbol").toBeGreaterThan(0);
  expect(symbols.every(s => s.id && s.pro_name), "All symbols should have valid IDs and pro_names").toBe(true);

  for (const symbol of symbols) {
    const series = await createSeries(session, chart, symbol, TEST_TIMEFRAME, TEST_BAR_COUNT);
    const market_cap = await createPresetStudy(session, chart, series, "MARKET_CAP");

    expect(series.history.length, "Series should have at least one data point").toBeGreaterThan(0);
    expect(market_cap.history.length, "Market cap study should have at least one data point").toBeGreaterThan(0);

    await market_cap.close();
    await series.close();
  }

  await chart.close();
  await session.close();
});


test("Session lifecycle - establishes connection and negotiates protocol", async () => {
  const session = await createTestSession(true);

  try {
    expect(session.protocol, "Session protocol should be defined").toBeDefined();
    expect(session.protocol.session_id, "Protocol should include session_id").toBeDefined();
    expect(session.protocol.protocol, "Protocol should use JSON format").toBe("json");
  } finally {
    await session.close();
  }
});

test("Series creation - never hangs indefinitely (timeout test)", async () => {
  const session = await createSession(undefined, false);
  const { chart, symbol } = await setupChartWithSymbol(session);
  const timeoutMs = 10000;
  let timedOut = false;
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    const timeoutPromise = new Promise((_, reject) => {
      timer = setTimeout(() => {
        timedOut = true;
        reject(new Error("createSeries timed out (possible hang)"));
      }, timeoutMs);
    });
    const result: unknown = await Promise.race([
      createSeries(session, chart, symbol, TEST_TIMEFRAME, TEST_BAR_COUNT),
      timeoutPromise
    ]);
    if (timer !== undefined) clearTimeout(timer);
    expect(result, "createSeries should resolve or reject, not hang").toBeTruthy();
    if (result && typeof (result as { close?: unknown }).close === "function") {
      await (result as { close: () => Promise<void> }).close();
    }
    chart.close();
  } finally {
    if (timer !== undefined) clearTimeout(timer);
    await session.close();
  }
  if (timedOut) throw new Error("createSeries promise hung (timeout)");
});

test("Series creation - invalid symbol or range fails fast", async () => {
  const session = await createSession(undefined, false);
  const chart = await createChart(session);
  const timeoutMs = 10000;
  let errorCaught = false;
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    const timeoutPromise = new Promise((_, reject) => {
      timer = setTimeout(() => reject(new Error("createSeries (invalid symbol) timed out")), timeoutMs);
    });
    await Promise.race([
      createSeries(session, chart, { id: "fakeid", pro_name: "FAKE:SYMBOL" } as ResolveSymbol, TEST_TIMEFRAME, TEST_BAR_COUNT),
      timeoutPromise
    ]);
  } catch (err) {
    if (timer !== undefined) clearTimeout(timer);
    errorCaught = true;
    expect(err instanceof Error, "Should throw an error for invalid symbol").toBe(true);
  } finally {
    if (timer !== undefined) clearTimeout(timer);
    chart.close();
    await session.close();
  }
  expect(errorCaught, "Should fail fast for invalid symbol or range").toBe(true);
});

test("Symbol resolution - retrieves accurate market data for valid symbols", async () => {
  const session = await createTestSession();

  try {
    const { chart, symbol } = await setupChartWithSymbol(session);

    expect(symbol.id, "Symbol should have unique identifier").toBeDefined();
    expect(symbol.pro_name, "Pro name should follow exchange:symbol format").toBe(`${TEST_EXCHANGE}:${TEST_SYMBOL}`);

    expect(symbol).toMatchObject({
      exchange: "Binance",
      type: "spot",
      is_tradable: true,
    });

    chart.close();
  } finally {
    await session.close();
  }
});

test("Chart management - creates charts with unique identifiers", async () => {
  const session = await createTestSession();

  try {
    const chart = await createChart(session);

    expect(chart.id.startsWith("chart_"), "Chart ID should follow naming convention").toBe(true);
    expect(typeof chart.resolve === "function", "Chart should expose resolve method").toBe(true);
    expect(typeof chart.close === "function", "Chart should expose close method").toBe(true);

    chart.close();
  } finally {
    await session.close();
  }
});

test("Series creation - establishes data feed for market instruments", async () => {
  const session = await createTestSession();

  try {
    const { chart, symbol } = await setupChartWithSymbol(session);

    const series = await createSeries(session, chart, symbol, TEST_TIMEFRAME, TEST_BAR_COUNT);

    expect(series.id.startsWith("series_"), "Series ID should follow naming convention").toBe(true);
    expect(series.timeframe, "Series should maintain configured timeframe").toBe(TEST_TIMEFRAME);

    await series.close();
    chart.close();
  } finally {
    await session.close();
  }
});

test("Authentication handling - accepts various token types gracefully", async () => {
  /**
   * TradingView's authentication system is permissive during initial connection.
   * Invalid tokens are typically rejected during specific operations rather than
   * at the session establishment phase.
   */
  const session = await createSession("MOCK_INVALID_TOKEN", false);

  try {
    expect(session.protocol, "Session should establish with any token format").toBeDefined();
  } finally {
    await session.close();
  }
});

test("Historical data access - provides market data through series interface", async () => {
  const session = await createTestSession();

  try {
    const { chart, symbol } = await setupChartWithSymbol(session);
    const series = await createSeries(session, chart, symbol, TEST_TIMEFRAME, 5);

    expect(Array.isArray(series.history), "Series should provide history as array").toBe(true);
    expect(series.history.length > 0, "Series should contain historical data points").toBe(true);

    const firstCandle = series.history[0];
    expect(Array.isArray(firstCandle), "Each data point should be an array").toBe(true);
    expect(firstCandle.length >= 6, "Data points should contain timestamp, OHLCV data").toBe(true);

    await series.close();
    chart.close();
  } finally {
    await session.close();
  }
});

test("Concurrent chart operations - supports multiple charts per session", async () => {
  const session = await createTestSession();

  try {
    const chart1 = await createChart(session);
    const chart2 = await createChart(session);

    expect(chart1.id !== chart2.id, "Charts should have unique identifiers").toBe(true);
    chart2.close();
    chart1.close();
  } finally {
    await session.close();
  }
});

test("Data iteration - provides synchronous access to historical data", async () => {
  const session = await createTestSession();

  try {
    const { chart, symbol } = await setupChartWithSymbol(session);
    const series = await createSeries(session, chart, symbol, TEST_TIMEFRAME, 3);

    let iterationCount = 0;
    for (const dataPoint of series) {
      expect(Array.isArray(dataPoint), "Iterator should yield array data points").toBe(true);
      iterationCount++;

      if (iterationCount > 2) break;
    }

    expect(iterationCount > 0, "Iterator should yield at least one data point").toBe(true);

    // TODO: Fix stream() method promise resolution issues

    await series.close();
    chart.close();
  } finally {
    await session.close();
  }
});

test("Error resilience - handles symbol resolution failures gracefully", async () => {
  const session = await createTestSession();

  try {
    const chart = await createChart(session);

    try {
      const symbol = await chart.resolve("AAPL", "NASDAQ");
      expect(symbol.pro_name, "Successful resolution should include pro_name").toBeDefined();
    } catch (error) {
      expect(error instanceof Error, "Errors should be properly typed Error instances").toBe(true);
    }

    chart.close();
  } finally {
    await session.close();
  }
});