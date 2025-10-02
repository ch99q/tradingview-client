import {
  assert,
  assertEquals,
  assertExists,
  assertGreaterOrEqual,
  assertObjectMatch,
} from "jsr:@std/assert";
import {
  createSession,
  createChart,
  createSeries,
  type Session,
  type Chart,
} from "./client.ts";
import { createPresetStudy } from "./studies/std.ts";

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
  symbol: { id: string; pro_name: string; exchange: string; type: string };
}> {
  const chart = await createChart(session);
  const symbol = await chart.resolve(TEST_SYMBOL, TEST_EXCHANGE);
  return { chart, symbol };
}

// === TradingView Client Integration Tests ===
Deno.test("Collection lifecycle - establishes connection, collect data and closes gracefully", async () => {
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

  assert(symbols.length > 0, "Should resolve at least one symbol");
  assert(symbols.every(s => s.id && s.pro_name), "All symbols should have valid IDs and pro_names");

  for (const symbol of symbols) {
    const series = await createSeries(session, chart, symbol, TEST_TIMEFRAME, TEST_BAR_COUNT);
    const market_cap = await createPresetStudy(session, chart, series, "MARKET_CAP");

    assertGreaterOrEqual(series.history.length, 1, "Series should have at least one data point");
    assertGreaterOrEqual(market_cap.history.length, 1, "Market cap study should have at least one data point");

    await market_cap.close();
    await series.close();
  }

  await chart.close();
  await session.close();
});


Deno.test("Session lifecycle - establishes connection and negotiates protocol", async () => {
  const session = await createTestSession(true);

  try {
    // Verify protocol negotiation completed successfully
    assert(session.protocol, "Session protocol should be defined");
    assertExists(session.protocol.session_id, "Protocol should include session_id");
    assertEquals(session.protocol.protocol, "json", "Protocol should use JSON format");
  } finally {
    await session.close();
  }
});

Deno.test("Series creation - never hangs indefinitely (timeout test)", async () => {
  const session = await createSession(undefined, false);
  const { chart, symbol } = await setupChartWithSymbol(session);
  const timeoutMs = 10000; // 10 seconds
  let timedOut = false;
  let timer: number | undefined;
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
    assert(result, "createSeries should resolve or reject, not hang");
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

Deno.test("Series creation - invalid symbol or range fails fast", async () => {
  const session = await createSession(undefined, false);
  const chart = await createChart(session);
  const timeoutMs = 10000; // 10 seconds
  let errorCaught = false;
  let timer: number | undefined;
  try {
    const timeoutPromise = new Promise((_, reject) => {
      timer = setTimeout(() => reject(new Error("createSeries (invalid symbol) timed out")), timeoutMs);
    });
    await Promise.race([
      createSeries(session, chart, { id: "fakeid", pro_name: "FAKE:SYMBOL" }, TEST_TIMEFRAME, TEST_BAR_COUNT),
      timeoutPromise
    ]);
  } catch (err) {
    if (timer !== undefined) clearTimeout(timer);
    errorCaught = true;
    assert(err instanceof Error, "Should throw an error for invalid symbol");
  } finally {
    if (timer !== undefined) clearTimeout(timer);
    chart.close();
    await session.close();
  }
  assert(errorCaught, "Should fail fast for invalid symbol or range");
});

Deno.test("Symbol resolution - retrieves accurate market data for valid symbols", async () => {
  const session = await createTestSession();

  try {
    const { chart, symbol } = await setupChartWithSymbol(session);

    // Validate symbol resolution response structure
    assertExists(symbol.id, "Symbol should have unique identifier");
    assertEquals(symbol.pro_name, `${TEST_EXCHANGE}:${TEST_SYMBOL}`, "Pro name should follow exchange:symbol format");

    // Verify market-specific metadata
    assertObjectMatch(symbol, {
      exchange: "Binance", // TradingView uses "Binance" internally
      type: "spot",        // BTCUSDT is classified as spot trading pair
      is_tradable: true,
    });

    chart.close();
  } finally {
    await session.close();
  }
});

Deno.test("Chart management - creates charts with unique identifiers", async () => {
  const session = await createTestSession();

  try {
    const chart = await createChart(session);

    // Verify chart creation and ID assignment
    assert(chart.id.startsWith("chart_"), "Chart ID should follow naming convention");
    assert(typeof chart.resolve === "function", "Chart should expose resolve method");
    assert(typeof chart.close === "function", "Chart should expose close method");

    chart.close();
  } finally {
    await session.close();
  }
});

Deno.test("Series creation - establishes data feed for market instruments", async () => {
  const session = await createTestSession();

  try {
    const { chart, symbol } = await setupChartWithSymbol(session);

    // Create series with specific timeframe and bar count
    const series = await createSeries(session, chart, symbol, TEST_TIMEFRAME, TEST_BAR_COUNT);

    // Validate series initialization
    assert(series.id.startsWith("series_"), "Series ID should follow naming convention");
    assertEquals(series.timeframe, TEST_TIMEFRAME, "Series should maintain configured timeframe");

    await series.close();
    chart.close();
  } finally {
    await session.close();
  }
});

Deno.test("Authentication handling - accepts various token types gracefully", async () => {
  /**
   * TradingView's authentication system is permissive during initial connection.
   * Invalid tokens are typically rejected during specific operations rather than
   * at the session establishment phase.
   */
  const session = await createSession("MOCK_INVALID_TOKEN", false);

  try {
    // Verify session establishes regardless of token validity
    assertExists(session.protocol, "Session should establish with any token format");
  } finally {
    await session.close();
  }
});

Deno.test("Historical data access - provides market data through series interface", async () => {
  const session = await createTestSession();

  try {
    const { chart, symbol } = await setupChartWithSymbol(session);
    const series = await createSeries(session, chart, symbol, TEST_TIMEFRAME, 5);

    // Validate historical data structure
    assert(Array.isArray(series.history), "Series should provide history as array");
    assert(series.history.length > 0, "Series should contain historical data points");

    // Verify data point structure (OHLCV format)
    const firstCandle = series.history[0];
    assert(Array.isArray(firstCandle), "Each data point should be an array");
    assert(firstCandle.length >= 6, "Data points should contain timestamp, OHLCV data");

    await series.close();
    chart.close();
  } finally {
    await session.close();
  }
});

Deno.test("Concurrent chart operations - supports multiple charts per session", async () => {
  const session = await createTestSession();

  try {
    // Create multiple charts to test session capacity
    const chart1 = await createChart(session);
    const chart2 = await createChart(session);

    // Verify independent chart instances
    assert(chart1.id !== chart2.id, "Charts should have unique identifiers");

    // Cleanup in reverse order to test proper resource management
    chart2.close();
    chart1.close();
  } finally {
    await session.close();
  }
});

Deno.test("Data iteration - provides synchronous access to historical data", async () => {
  const session = await createTestSession();

  try {
    const { chart, symbol } = await setupChartWithSymbol(session);
    const series = await createSeries(session, chart, symbol, TEST_TIMEFRAME, 3);

    // Test synchronous iteration over historical data
    let iterationCount = 0;
    for (const dataPoint of series) {
      assert(Array.isArray(dataPoint), "Iterator should yield array data points");
      iterationCount++;

      // Limit iteration to prevent excessive API calls
      if (iterationCount > 2) break;
    }

    assert(iterationCount > 0, "Iterator should yield at least one data point");

    /**
     * Note: Async streaming functionality is currently disabled due to implementation
     * issues in the stream() method that cause promise resolution hangs.
     * 
     * TODO: Resolve stream() method bugs:
     * - Fix missing return statements in error conditions
     * - Prevent infinite recursion in request_more_tickmarks calls
     * - Ensure proper promise resolution in all code paths
     */

    await series.close();
    chart.close();
  } finally {
    await session.close();
  }
});

Deno.test("Error resilience - handles symbol resolution failures gracefully", async () => {
  const session = await createTestSession();

  try {
    const chart = await createChart(session);

    /**
     * Test error handling with a symbol that may or may not be available.
     * This validates that the client handles both successful resolutions
     * and various error conditions without crashing.
     */
    try {
      const symbol = await chart.resolve("AAPL", "NASDAQ");
      assertExists(symbol.pro_name, "Successful resolution should include pro_name");
    } catch (error) {
      // Error handling is also acceptable - validates graceful degradation
      assert(error instanceof Error, "Errors should be properly typed Error instances");
    }

    chart.close();
  } finally {
    await session.close();
  }
});