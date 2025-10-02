import { test, expect, describe } from "vitest";
import { createSession, createChart, createSeries } from "../src/client.ts";
import type { Session, Chart, Series, Study } from "../src/client.ts";

import {
  cciStudy,
  cmfStudy,
  anchoredVwapStudy,
  dividendsStudy,
  earningsStudy,
  emaStudy,
  smaStudy,
  obvStudy,
  pivotPointsHighLowStudy,
  pivotPointsStandardStudy,
  rocStudy,
  rsiStudy,
  sessionsStudy,
  splitsStudy,
  stochasticRsiStudy,
  volumeStudy,
  zigZagStudy
} from "../src/studies/basic.ts";

import { createPresetStudy } from "../src/studies/std.ts";

const TEST_SYMBOL = "AAPL";
const TEST_EXCHANGE = "NASDAQ";
const TEST_TIMEFRAME = "1";
const TEST_BAR_COUNT = 50;

// Get TradingView token from environment
const TV_TOKEN = process.env.TV_TOKEN;

async function createTestSession(): Promise<Session> {
  return await createSession(TV_TOKEN, false);
}

async function setupTestEnvironment(session: Session) {
  const chart = await createChart(session);
  const symbol = await chart.resolve(TEST_SYMBOL, TEST_EXCHANGE);
  const series = await createSeries(session, chart, symbol, TEST_TIMEFRAME, TEST_BAR_COUNT);
  return { chart, symbol, series };
}

async function cleanupTestEnvironment(series: Series, chart: Chart, session: Session, study?: Study) {
  if (study) {
    await study.close();
  }
  await series.close();
  chart.close();
  await session.close();
}

function testStudyStructure(study: Study, series: Series) {
  expect(study).toBeDefined();
  expect(study.id).toMatch(/^study_/);
  expect(study.series).toBe(series);
  expect(Array.isArray(study.history)).toBe(true);
  expect(typeof study.modify).toBe("function");
  expect(typeof study.close).toBe("function");
}

function testStudyStructureWithHistory(study: Study, series: Series) {
  testStudyStructure(study, series);
  expect(study.history.length).toBeGreaterThan(0);
}

describe("Basic Studies Tests", () => {
  test("CCI study", async () => {
    const session = await createTestSession();
    try {
      const { chart, symbol, series } = await setupTestEnvironment(session);
      const study = await cciStudy(session, chart, series, 14, "hlc3");
      testStudyStructureWithHistory(study, series);
      await cleanupTestEnvironment(series, chart, session, study);
    } catch (error) {
      await session.close();
      throw error;
    }
  });

  test("Chaikin Money Flow study", async () => {
    const session = await createTestSession();
    try {
      const { chart, symbol, series } = await setupTestEnvironment(session);
      const study = await cmfStudy(session, chart, series, 20);
      testStudyStructureWithHistory(study, series);
      await cleanupTestEnvironment(series, chart, session, study);
    } catch (error) {
      await session.close();
      throw error;
    }
  });

  test("Market Cap preset study", async () => {
    const session = await createTestSession();
    try {
      const { chart, symbol, series } = await setupTestEnvironment(session);
      const study = await createPresetStudy(session, chart, series, "MARKET_CAP");
      testStudyStructureWithHistory(study, series);
      await cleanupTestEnvironment(series, chart, session, study);
    } catch (error) {
      await session.close();
      throw error;
    }
  });

  test("Anchored VWAP study", async () => {
    const session = await createTestSession();
    try {
      const { chart, symbol, series } = await setupTestEnvironment(session);
      const study = await anchoredVwapStudy(session, chart, series);
      testStudyStructureWithHistory(study, series);
      await cleanupTestEnvironment(series, chart, session, study);
    } catch (error) {
      await session.close();
      throw error;
    }
  });

  test("Dividends study", async () => {
    const session = await createTestSession();
    try {
      const { chart, symbol, series } = await setupTestEnvironment(session);
      const study = await dividendsStudy(session, chart, series);
      testStudyStructure(study, series); // Event-based, may have empty history
      await cleanupTestEnvironment(series, chart, session, study);
    } catch (error) {
      await session.close();
      throw error;
    }
  });

  test("Earnings study", async () => {
    const session = await createTestSession();
    try {
      const { chart, symbol, series } = await setupTestEnvironment(session);
      const study = await earningsStudy(session, chart, series);
      testStudyStructure(study, series); // Event-based, may have empty history
      await cleanupTestEnvironment(series, chart, session, study);
    } catch (error) {
      await session.close();
      throw error;
    }
  });

  test("EMA study", async () => {
    const session = await createTestSession();
    try {
      const { chart, symbol, series } = await setupTestEnvironment(session);
      const study = await emaStudy(session, chart, series, 21, "hlc3");
      testStudyStructureWithHistory(study, series);
      await cleanupTestEnvironment(series, chart, session, study);
    } catch (error) {
      await session.close();
      throw error;
    }
  });

  test("SMA study", async () => {
    const session = await createTestSession();
    try {
      const { chart, symbol, series } = await setupTestEnvironment(session);
      const study = await smaStudy(session, chart, series, 50, "high");
      testStudyStructureWithHistory(study, series);
      await cleanupTestEnvironment(series, chart, session, study);
    } catch (error) {
      await session.close();
      throw error;
    }
  });

  test("On Balance Volume study", async () => {
    const session = await createTestSession();
    try {
      const { chart, symbol, series } = await setupTestEnvironment(session);
      const study = await obvStudy(session, chart, series);
      testStudyStructureWithHistory(study, series);
      await cleanupTestEnvironment(series, chart, session, study);
    } catch (error) {
      await session.close();
      throw error;
    }
  });

  test("Pivot Points High Low study", async () => {
    const session = await createTestSession();
    try {
      const { chart, symbol, series } = await setupTestEnvironment(session);
      const study = await pivotPointsHighLowStudy(session, chart, series, 15, 15);
      testStudyStructure(study, series); // Pattern dependent, may have empty history
      await cleanupTestEnvironment(series, chart, session, study);
    } catch (error) {
      await session.close();
      throw error;
    }
  });

  test("Pivot Points Standard study", async () => {
    const session = await createTestSession();
    try {
      const { chart, symbol, series } = await setupTestEnvironment(session);
      const study = await pivotPointsStandardStudy(session, chart, series, "Fibonacci", false, "1W", 10);
      testStudyStructure(study, series); // Timeframe dependent, may have empty history
      await cleanupTestEnvironment(series, chart, session, study);
    } catch (error) {
      await session.close();
      throw error;
    }
  });

  test("Rate of Change study", async () => {
    const session = await createTestSession();
    try {
      const { chart, symbol, series } = await setupTestEnvironment(session);
      const study = await rocStudy(session, chart, series, 15, "hlc3");
      testStudyStructureWithHistory(study, series);
      await cleanupTestEnvironment(series, chart, session, study);
    } catch (error) {
      await session.close();
      throw error;
    }
  });

  test("RSI study", async () => {
    const session = await createTestSession();
    try {
      const { chart, symbol, series } = await setupTestEnvironment(session);
      const study = await rsiStudy(session, chart, series, 21, "hl2");
      testStudyStructureWithHistory(study, series);
      await cleanupTestEnvironment(series, chart, session, study);
    } catch (error) {
      await session.close();
      throw error;
    }
  });

  test("Sessions study", async () => {
    const session = await createTestSession();
    try {
      const { chart, symbol, series } = await setupTestEnvironment(session);
      const study = await sessionsStudy(session, chart, series);
      testStudyStructure(study, series); // Session dependent, may have empty history
      await cleanupTestEnvironment(series, chart, session, study);
    } catch (error) {
      await session.close();
      throw error;
    }
  });

  test("Splits study", async () => {
    const session = await createTestSession();
    try {
      const { chart, symbol, series } = await setupTestEnvironment(session);
      const study = await splitsStudy(session, chart, series);
      testStudyStructure(study, series); // Event-based, may have empty history
      await cleanupTestEnvironment(series, chart, session, study);
    } catch (error) {
      await session.close();
      throw error;
    }
  });

  test("Stochastic RSI study", async () => {
    const session = await createTestSession();
    try {
      const { chart, symbol, series } = await setupTestEnvironment(session);
      const study = await stochasticRsiStudy(session, chart, series, 5, 5, 21, 21, "hlc3");
      testStudyStructureWithHistory(study, series);
      await cleanupTestEnvironment(series, chart, session, study);
    } catch (error) {
      await session.close();
      throw error;
    }
  });

  test("Volume study", async () => {
    const session = await createTestSession();
    try {
      const { chart, symbol, series } = await setupTestEnvironment(session);
      const study = await volumeStudy(session, chart, series, 25, true);
      testStudyStructureWithHistory(study, series);
      await cleanupTestEnvironment(series, chart, session, study);
    } catch (error) {
      await session.close();
      throw error;
    }
  });

  test("ZigZag study", async () => {
    const session = await createTestSession();
    try {
      const { chart, symbol, series } = await setupTestEnvironment(session);
      const study = await zigZagStudy(session, chart, series, 8.0, 15, true);
      testStudyStructure(study, series); // Deviation dependent, may have empty history
      await cleanupTestEnvironment(series, chart, session, study);
    } catch (error) {
      await session.close();
      throw error;
    }
  });
});