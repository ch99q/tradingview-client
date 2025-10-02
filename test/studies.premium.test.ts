import { test, expect, describe } from "vitest";
import { createSession, createChart, createSeries } from "../src/client.ts";
import type { Session, Chart, Series, Study } from "../src/client.ts";

import {
  accdStudy,
  aroonStudy,
  atrStudy,
  bollingerBandsStudy,
  awesomeOscillatorStudy,
  heikinAshiStudy,
  cciStudy,
  cmfStudy,
  choppinessIndexStudy,
  chaikinOscillatorStudy,
  crsiStudy,
  rangeBarsStudy,
  bollingerBandsRStudy,
  bollingerBandsWidthStudy,
  bookerIntradayPivotsStudy,
  bookerKnoxvilleDivergenceStudy,
  bookerMissedPivotsStudy,
  bookerReversalStudy,
  correlationCoefficientStudy,
  dmStudy,
  donchianChannelsStudy,
  detrendedPriceOscillatorStudy,
  doubleEmaStudy,
  efiStudy,
  envelopeStudy,
  easeOfMovementStudy,
  fisherTransformStudy,
  historicalVolatilityStudy,
  ichimokuCloudStudy,
  keltnerChannelsStudy,
  kstStudy,
  linearRegressionStudy,
  macdStudy,
  vwmaStudy,
  wmaStudy,
  mfStudy,
  momentumStudy,
  mtpcStudy,
  moonPhasesStudy,
  ohlcStudy,
  overlayStudy,
  psarStudy,
  priceOscillatorStudy,
  priceVolumeTrendStudy,
  smiErgodicIndicatorStudy,
  smiErgodicOscillatorStudy,
  stochasticStudy,
  tripleEmaStudy,
  trixStudy,
  ultimateOscillatorStudy,
  volatilityStopStudy,
  vwapStudy,
  vwapAutoAnchoredStudy,
  volumeProfileAnchoredStudy,
  vigorIndexStudy,
  volatilityIndexStudy,
  williamRStudy,
  williamsAlligatorStudy,
  williamsFractalStudy,
  chandeMoStudy,
  hullMaStudy,
  studyAdrStudy
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

describe("Premium Studies Tests", () => {
  test("Multiple studies on same chart", async () => {
    const session = await createTestSession();
    try {
      const { chart, symbol, series } = await setupTestEnvironment(session);
      
      // Create multiple studies to test premium limits
      const study1 = await accdStudy(session, chart, series);
      testStudyStructureWithHistory(study1, series);
      
      const study2 = await aroonStudy(session, chart, series);
      testStudyStructureWithHistory(study2, series);
      
      const study3 = await atrStudy(session, chart, series);
      testStudyStructureWithHistory(study3, series);
      
      // Verify all studies have different IDs
      expect(study1.id).not.toBe(study2.id);
      expect(study2.id).not.toBe(study3.id);
      expect(study1.id).not.toBe(study3.id);
      
      await study3.close();
      await study2.close();
      await cleanupTestEnvironment(series, chart, session, study1);
    } catch (error) {
      await session.close();
      throw error;
    }
  });


  test("Multiple studies with different parameters", async () => {
    const session = await createTestSession();
    try {
      const { chart, symbol, series } = await setupTestEnvironment(session);
      
      // Create studies with various parameter types
      const bb = await bollingerBandsStudy(session, chart, series, 10, "hl2", 1.5);
      const cci = await cciStudy(session, chart, series, 21, "close");
      const chop = await choppinessIndexStudy(session, chart, series, 7);
      const cmf = await cmfStudy(session, chart, series, 14);
      
      // Test all studies
      testStudyStructureWithHistory(bb, series);
      testStudyStructureWithHistory(cci, series);
      testStudyStructureWithHistory(chop, series);
      testStudyStructureWithHistory(cmf, series);
      
      // Verify unique IDs
      const ids = [bb.id, cci.id, chop.id, cmf.id];
      const uniqueIds = [...new Set(ids)];
      expect(uniqueIds.length).toBe(4); // All IDs should be unique
      
      // Clean up
      await cmf.close();
      await chop.close();
      await cci.close();
      await cleanupTestEnvironment(series, chart, session, bb);
    } catch (error) {
      await session.close();
      throw error;
    }
  });

  test("Single Accumulation/Distribution study", async () => {
    const session = await createTestSession();
    try {
      const { chart, symbol, series } = await setupTestEnvironment(session);
      const study = await accdStudy(session, chart, series);
      testStudyStructureWithHistory(study, series);
      await cleanupTestEnvironment(series, chart, session, study);
    } catch (error) {
      await session.close();
      throw error;
    }
  });

  test("Single Aroon study with custom parameters", async () => {
    const session = await createTestSession();
    try {
      const { chart, symbol, series } = await setupTestEnvironment(session);
      const study = await aroonStudy(session, chart, series, 21);
      testStudyStructureWithHistory(study, series);
      await cleanupTestEnvironment(series, chart, session, study);
    } catch (error) {
      await session.close();
      throw error;
    }
  });

  test("Bollinger Bands study", async () => {
    const session = await createTestSession();
    try {
      const { chart, symbol, series } = await setupTestEnvironment(session);
      const study = await bollingerBandsStudy(session, chart, series, 20, "close", 2.0);
      testStudyStructureWithHistory(study, series);
      await cleanupTestEnvironment(series, chart, session, study);
    } catch (error) {
      await session.close();
      throw error;
    }
  });

  test("Awesome Oscillator study", async () => {
    const session = await createTestSession();
    try {
      const { chart, symbol, series } = await setupTestEnvironment(session);
      const study = await awesomeOscillatorStudy(session, chart, series);
      testStudyStructureWithHistory(study, series);
      await cleanupTestEnvironment(series, chart, session, study);
    } catch (error) {
      await session.close();
      throw error;
    }
  });

  test("Choppiness Index study", async () => {
    const session = await createTestSession();
    try {
      const { chart, symbol, series } = await setupTestEnvironment(session);
      const study = await choppinessIndexStudy(session, chart, series, 14);
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

  test("ATR study with custom parameters", async () => {
    const session = await createTestSession();
    try {
      const { chart, symbol, series } = await setupTestEnvironment(session);
      const study = await atrStudy(session, chart, series, 21, "SMA");
      testStudyStructureWithHistory(study, series);
      await cleanupTestEnvironment(series, chart, session, study);
    } catch (error) {
      await session.close();
      throw error;
    }
  });

  test("Heikin Ashi study", async () => {
    const session = await createTestSession();
    try {
      const { chart, symbol, series } = await setupTestEnvironment(session);
      const study = await heikinAshiStudy(session, chart, series);
      testStudyStructureWithHistory(study, series);
      await cleanupTestEnvironment(series, chart, session, study);
    } catch (error) {
      await session.close();
      throw error;
    }
  });

  test("Chaikin Oscillator study", async () => {
    const session = await createTestSession();
    try {
      const { chart, symbol, series } = await setupTestEnvironment(session);
      const study = await chaikinOscillatorStudy(session, chart, series, 5, 15);
      testStudyStructureWithHistory(study, series);
      await cleanupTestEnvironment(series, chart, session, study);
    } catch (error) {
      await session.close();
      throw error;
    }
  });

  test("CRSI study", async () => {
    const session = await createTestSession();
    try {
      const { chart, symbol, series } = await setupTestEnvironment(session);
      const study = await crsiStudy(session, chart, series, 5, 3, 150);
      testStudyStructureWithHistory(study, series);
      await cleanupTestEnvironment(series, chart, session, study);
    } catch (error) {
      await session.close();
      throw error;
    }
  });

  test("Range Bars study", async () => {
    const session = await createTestSession();
    try {
      const { chart, symbol, series } = await setupTestEnvironment(session);
      const study = await rangeBarsStudy(session, chart, series, 15, true);
      testStudyStructureWithHistory(study, series);
      await cleanupTestEnvironment(series, chart, session, study);
    } catch (error) {
      await session.close();
      throw error;
    }
  });

  test("Bollinger Bands %B study", async () => {
    const session = await createTestSession();
    try {
      const { chart, symbol, series } = await setupTestEnvironment(session);
      const study = await bollingerBandsRStudy(session, chart, series, 25, "hl2", 2.5);
      testStudyStructureWithHistory(study, series);
      await cleanupTestEnvironment(series, chart, session, study);
    } catch (error) {
      await session.close();
      throw error;
    }
  });

  test("Bollinger Bands Width study", async () => {
    const session = await createTestSession();
    try {
      const { chart, symbol, series } = await setupTestEnvironment(session);
      const study = await bollingerBandsWidthStudy(session, chart, series, 15, "hlc3", 1.8);
      testStudyStructureWithHistory(study, series);
      await cleanupTestEnvironment(series, chart, session, study);
    } catch (error) {
      await session.close();
      throw error;
    }
  });

  test("Directional Movement study", async () => {
    const session = await createTestSession();
    try {
      const { chart, symbol, series } = await setupTestEnvironment(session);
      const study = await dmStudy(session, chart, series, 21, 21);
      testStudyStructureWithHistory(study, series);
      await cleanupTestEnvironment(series, chart, session, study);
    } catch (error) {
      await session.close();
      throw error;
    }
  });

  test("Donchian Channels study", async () => {
    const session = await createTestSession();
    try {
      const { chart, symbol, series } = await setupTestEnvironment(session);
      const study = await donchianChannelsStudy(session, chart, series, 25);
      testStudyStructureWithHistory(study, series);
      await cleanupTestEnvironment(series, chart, session, study);
    } catch (error) {
      await session.close();
      throw error;
    }
  });

  test("Detrended Price Oscillator study", async () => {
    const session = await createTestSession();
    try {
      const { chart, symbol, series } = await setupTestEnvironment(session);
      const study = await detrendedPriceOscillatorStudy(session, chart, series, 14, true);
      testStudyStructureWithHistory(study, series);
      await cleanupTestEnvironment(series, chart, session, study);
    } catch (error) {
      await session.close();
      throw error;
    }
  });

  test("Double EMA study", async () => {
    const session = await createTestSession();
    try {
      const { chart, symbol, series } = await setupTestEnvironment(session);
      const study = await doubleEmaStudy(session, chart, series, 12);
      testStudyStructureWithHistory(study, series);
      await cleanupTestEnvironment(series, chart, session, study);
    } catch (error) {
      await session.close();
      throw error;
    }
  });

  test("Elder Force Index study", async () => {
    const session = await createTestSession();
    try {
      const { chart, symbol, series } = await setupTestEnvironment(session);
      const study = await efiStudy(session, chart, series, 21);
      testStudyStructureWithHistory(study, series);
      await cleanupTestEnvironment(series, chart, session, study);
    } catch (error) {
      await session.close();
      throw error;
    }
  });

  test("Envelope study", async () => {
    const session = await createTestSession();
    try {
      const { chart, symbol, series } = await setupTestEnvironment(session);
      const study = await envelopeStudy(session, chart, series, 25, 15.0, "hl2", true);
      testStudyStructureWithHistory(study, series);
      await cleanupTestEnvironment(series, chart, session, study);
    } catch (error) {
      await session.close();
      throw error;
    }
  });

  test("Ease of Movement study", async () => {
    const session = await createTestSession();
    try {
      const { chart, symbol, series } = await setupTestEnvironment(session);
      const study = await easeOfMovementStudy(session, chart, series, 21, 100000);
      testStudyStructureWithHistory(study, series);
      await cleanupTestEnvironment(series, chart, session, study);
    } catch (error) {
      await session.close();
      throw error;
    }
  });

  test("Fisher Transform study", async () => {
    const session = await createTestSession();
    try {
      const { chart, symbol, series } = await setupTestEnvironment(session);
      const study = await fisherTransformStudy(session, chart, series, 14);
      testStudyStructureWithHistory(study, series);
      await cleanupTestEnvironment(series, chart, session, study);
    } catch (error) {
      await session.close();
      throw error;
    }
  });

  test("Historical Volatility study", async () => {
    const session = await createTestSession();
    try {
      const { chart, symbol, series } = await setupTestEnvironment(session);
      const study = await historicalVolatilityStudy(session, chart, series, 20);
      testStudyStructureWithHistory(study, series);
      await cleanupTestEnvironment(series, chart, session, study);
    } catch (error) {
      await session.close();
      throw error;
    }
  });

  test("Ichimoku Cloud study", async () => {
    const session = await createTestSession();
    try {
      const { chart, symbol, series } = await setupTestEnvironment(session);
      const study = await ichimokuCloudStudy(session, chart, series, 12, 30, 60, 30);
      testStudyStructureWithHistory(study, series);
      await cleanupTestEnvironment(series, chart, session, study);
    } catch (error) {
      await session.close();
      throw error;
    }
  });

  test("Keltner Channels study", async () => {
    const session = await createTestSession();
    try {
      const { chart, symbol, series } = await setupTestEnvironment(session);
      const study = await keltnerChannelsStudy(session, chart, series, 25, 1.5, "hl2", false, "average true range");
      testStudyStructureWithHistory(study, series);
      await cleanupTestEnvironment(series, chart, session, study);
    } catch (error) {
      await session.close();
      throw error;
    }
  });

  test("Know Sure Thing study", async () => {
    const session = await createTestSession();
    try {
      const { chart, symbol, series } = await setupTestEnvironment(session);
      const study = await kstStudy(session, chart, series, 12, 18, 25, 35, 12, 12, 12, 18, 12);
      testStudyStructureWithHistory(study, series);
      await cleanupTestEnvironment(series, chart, session, study);
    } catch (error) {
      await session.close();
      throw error;
    }
  });

  test("Linear Regression study", async () => {
    const session = await createTestSession();
    try {
      const { chart, symbol, series } = await setupTestEnvironment(session);
      const study = await linearRegressionStudy(session, chart, series, 2.5, -2.5, true, true, 150, "hl2");
      testStudyStructure(study, series); // May not have data without specific time range setup
      await cleanupTestEnvironment(series, chart, session, study);
    } catch (error) {
      await session.close();
      throw error;
    }
  });

  test("MACD study", async () => {
    const session = await createTestSession();
    try {
      const { chart, symbol, series } = await setupTestEnvironment(session);
      const study = await macdStudy(session, chart, series, 15, 30, "hl2", 12, true, true);
      testStudyStructureWithHistory(study, series);
      await cleanupTestEnvironment(series, chart, session, study);
    } catch (error) {
      await session.close();
      throw error;
    }
  });

  test("VWMA study", async () => {
    const session = await createTestSession();
    try {
      const { chart, symbol, series } = await setupTestEnvironment(session);
      const study = await vwmaStudy(session, chart, series, 30, "low");
      testStudyStructureWithHistory(study, series);
      await cleanupTestEnvironment(series, chart, session, study);
    } catch (error) {
      await session.close();
      throw error;
    }
  });

  test("WMA study", async () => {
    const session = await createTestSession();
    try {
      const { chart, symbol, series } = await setupTestEnvironment(session);
      const study = await wmaStudy(session, chart, series, 25, "ohlc4");
      testStudyStructureWithHistory(study, series);
      await cleanupTestEnvironment(series, chart, session, study);
    } catch (error) {
      await session.close();
      throw error;
    }
  });

  test("Money Flow study", async () => {
    const session = await createTestSession();
    try {
      const { chart, symbol, series } = await setupTestEnvironment(session);
      const study = await mfStudy(session, chart, series, 21);
      testStudyStructureWithHistory(study, series);
      await cleanupTestEnvironment(series, chart, session, study);
    } catch (error) {
      await session.close();
      throw error;
    }
  });

  test("Momentum study", async () => {
    const session = await createTestSession();
    try {
      const { chart, symbol, series } = await setupTestEnvironment(session);
      const study = await momentumStudy(session, chart, series, 14, "hlc3");
      testStudyStructureWithHistory(study, series);
      await cleanupTestEnvironment(series, chart, session, study);
    } catch (error) {
      await session.close();
      throw error;
    }
  });

  test("Multi-Timeframe Price calculation study", async () => {
    const session = await createTestSession();
    try {
      const { chart, symbol, series } = await setupTestEnvironment(session);
      const study = await mtpcStudy(session, chart, series, "1D", "High-Low");
      testStudyStructure(study, series); // Timeframe dependent, may have empty history
      await cleanupTestEnvironment(series, chart, session, study);
    } catch (error) {
      await session.close();
      throw error;
    }
  });

  test("Moon Phases study", async () => {
    const session = await createTestSession();
    try {
      const { chart, symbol, series } = await setupTestEnvironment(session);
      const study = await moonPhasesStudy(session, chart, series);
      testStudyStructure(study, series); // Astronomical events, may have empty history
      await cleanupTestEnvironment(series, chart, session, study);
    } catch (error) {
      await session.close();
      throw error;
    }
  });

  test("OHLC study", async () => {
    const session = await createTestSession();
    try {
      const { chart, symbol, series } = await setupTestEnvironment(session);
      const study = await ohlcStudy(session, chart, series, -2, true);
      testStudyStructureWithHistory(study, series);
      await cleanupTestEnvironment(series, chart, session, study);
    } catch (error) {
      await session.close();
      throw error;
    }
  });

  test("Parabolic SAR study", async () => {
    const session = await createTestSession();
    try {
      const { chart, symbol, series } = await setupTestEnvironment(session);
      const study = await psarStudy(session, chart, series, 0.03, 0.03, 0.25);
      testStudyStructureWithHistory(study, series);
      await cleanupTestEnvironment(series, chart, session, study);
    } catch (error) {
      await session.close();
      throw error;
    }
  });

  test("Price Oscillator study", async () => {
    const session = await createTestSession();
    try {
      const { chart, symbol, series } = await setupTestEnvironment(session);
      const study = await priceOscillatorStudy(session, chart, series, 15, 25, "hl2", true);
      testStudyStructureWithHistory(study, series);
      await cleanupTestEnvironment(series, chart, session, study);
    } catch (error) {
      await session.close();
      throw error;
    }
  });

  test("Price Volume Trend study", async () => {
    const session = await createTestSession();
    try {
      const { chart, symbol, series } = await setupTestEnvironment(session);
      const study = await priceVolumeTrendStudy(session, chart, series);
      testStudyStructureWithHistory(study, series);
      await cleanupTestEnvironment(series, chart, session, study);
    } catch (error) {
      await session.close();
      throw error;
    }
  });

  test("SMI Ergodic Indicator study", async () => {
    const session = await createTestSession();
    try {
      const { chart, symbol, series } = await setupTestEnvironment(session);
      const study = await smiErgodicIndicatorStudy(session, chart, series, 25, 8, 8);
      testStudyStructureWithHistory(study, series);
      await cleanupTestEnvironment(series, chart, session, study);
    } catch (error) {
      await session.close();
      throw error;
    }
  });

  test("SMI Ergodic Oscillator study", async () => {
    const session = await createTestSession();
    try {
      const { chart, symbol, series } = await setupTestEnvironment(session);
      const study = await smiErgodicOscillatorStudy(session, chart, series, 18, 6, 6);
      testStudyStructureWithHistory(study, series);
      await cleanupTestEnvironment(series, chart, session, study);
    } catch (error) {
      await session.close();
      throw error;
    }
  });

  test("Stochastic study", async () => {
    const session = await createTestSession();
    try {
      const { chart, symbol, series } = await setupTestEnvironment(session);
      const study = await stochasticStudy(session, chart, series, 21, 5, 5);
      testStudyStructureWithHistory(study, series);
      await cleanupTestEnvironment(series, chart, session, study);
    } catch (error) {
      await session.close();
      throw error;
    }
  });

  test("Triple EMA study", async () => {
    const session = await createTestSession();
    try {
      const { chart, symbol, series } = await setupTestEnvironment(session);
      const study = await tripleEmaStudy(session, chart, series, 15);
      testStudyStructureWithHistory(study, series);
      await cleanupTestEnvironment(series, chart, session, study);
    } catch (error) {
      await session.close();
      throw error;
    }
  });

  test("TRIX study", async () => {
    const session = await createTestSession();
    try {
      const { chart, symbol, series } = await setupTestEnvironment(session);
      const study = await trixStudy(session, chart, series, 25);
      testStudyStructureWithHistory(study, series);
      await cleanupTestEnvironment(series, chart, session, study);
    } catch (error) {
      await session.close();
      throw error;
    }
  });

  test("Ultimate Oscillator study", async () => {
    const session = await createTestSession();
    try {
      const { chart, symbol, series } = await setupTestEnvironment(session);
      const study = await ultimateOscillatorStudy(session, chart, series, 10, 21, 35);
      testStudyStructureWithHistory(study, series);
      await cleanupTestEnvironment(series, chart, session, study);
    } catch (error) {
      await session.close();
      throw error;
    }
  });

  test("Volatility Stop study", async () => {
    const session = await createTestSession();
    try {
      const { chart, symbol, series } = await setupTestEnvironment(session);
      const study = await volatilityStopStudy(session, chart, series, 25, "hl2", 2.5);
      testStudyStructureWithHistory(study, series);
      await cleanupTestEnvironment(series, chart, session, study);
    } catch (error) {
      await session.close();
      throw error;
    }
  });

  test("VWAP study", async () => {
    const session = await createTestSession();
    try {
      const { chart, symbol, series } = await setupTestEnvironment(session);
      const study = await vwapStudy(session, chart, series, "Week", "ohlc4");
      testStudyStructureWithHistory(study, series);
      await cleanupTestEnvironment(series, chart, session, study);
    } catch (error) {
      await session.close();
      throw error;
    }
  });

  test("VWAP Auto Anchored study", async () => {
    const session = await createTestSession();
    try {
      const { chart, symbol, series } = await setupTestEnvironment(session);
      const study = await vwapAutoAnchoredStudy(session, chart, series, "Day", "ohlc4", 21, "Percentile Ranks", false, 1.5, true, 2.5, false, 3.5);
      testStudyStructureWithHistory(study, series);
      await cleanupTestEnvironment(series, chart, session, study);
    } catch (error) {
      await session.close();
      throw error;
    }
  });

  test("Vigor Index study", async () => {
    const session = await createTestSession();
    try {
      const { chart, symbol, series } = await setupTestEnvironment(session);
      const study = await vigorIndexStudy(session, chart, series, 15);
      testStudyStructureWithHistory(study, series);
      await cleanupTestEnvironment(series, chart, session, study);
    } catch (error) {
      await session.close();
      throw error;
    }
  });

  test("Volatility Index study", async () => {
    const session = await createTestSession();
    try {
      const { chart, symbol, series } = await setupTestEnvironment(session);
      const study = await volatilityIndexStudy(session, chart, series, 12);
      testStudyStructureWithHistory(study, series);
      await cleanupTestEnvironment(series, chart, session, study);
    } catch (error) {
      await session.close();
      throw error;
    }
  });

  test("Williams %R study", async () => {
    const session = await createTestSession();
    try {
      const { chart, symbol, series } = await setupTestEnvironment(session);
      const study = await williamRStudy(session, chart, series, 21, "hlc3");
      testStudyStructureWithHistory(study, series);
      await cleanupTestEnvironment(series, chart, session, study);
    } catch (error) {
      await session.close();
      throw error;
    }
  });

  test("Williams Alligator study", async () => {
    const session = await createTestSession();
    try {
      const { chart, symbol, series } = await setupTestEnvironment(session);
      const study = await williamsAlligatorStudy(session, chart, series, 15, 10, 7);
      testStudyStructureWithHistory(study, series);
      await cleanupTestEnvironment(series, chart, session, study);
    } catch (error) {
      await session.close();
      throw error;
    }
  });

  test("Williams Fractal study", async () => {
    const session = await createTestSession();
    try {
      const { chart, symbol, series } = await setupTestEnvironment(session);
      const study = await williamsFractalStudy(session, chart, series);
      testStudyStructure(study, series); // Pattern dependent, may have empty history
      await cleanupTestEnvironment(series, chart, session, study);
    } catch (error) {
      await session.close();
      throw error;
    }
  });

  test("Chande Momentum Oscillator study", async () => {
    const session = await createTestSession();
    try {
      const { chart, symbol, series } = await setupTestEnvironment(session);
      const study = await chandeMoStudy(session, chart, series, 14, "hl2");
      testStudyStructureWithHistory(study, series);
      await cleanupTestEnvironment(series, chart, session, study);
    } catch (error) {
      await session.close();
      throw error;
    }
  });

  test("Hull Moving Average study", async () => {
    const session = await createTestSession();
    try {
      const { chart, symbol, series } = await setupTestEnvironment(session);
      const study = await hullMaStudy(session, chart, series, 16, "ohlc4");
      testStudyStructureWithHistory(study, series);
      await cleanupTestEnvironment(series, chart, session, study);
    } catch (error) {
      await session.close();
      throw error;
    }
  });

  test("Average Day Range study", async () => {
    const session = await createTestSession();
    try {
      const { chart, symbol, series } = await setupTestEnvironment(session);
      const study = await studyAdrStudy(session, chart, series, 14);
      testStudyStructureWithHistory(study, series);
      await cleanupTestEnvironment(series, chart, session, study);
    } catch (error) {
      await session.close();
      throw error;
    }
  });

  test("Booker Intraday Pivots study", async () => {
    const session = await createTestSession();
    try {
      const { chart, symbol, series } = await setupTestEnvironment(session);
      const study = await bookerIntradayPivotsStudy(session, chart, series, 5, 60, 240, 480);
      testStudyStructure(study, series); // Intraday patterns, may have empty history
      await cleanupTestEnvironment(series, chart, session, study);
    } catch (error) {
      await session.close();
      throw error;
    }
  });

  test("Booker Knoxville Divergence study", async () => {
    const session = await createTestSession();
    try {
      const { chart, symbol, series } = await setupTestEnvironment(session);
      const study = await bookerKnoxvilleDivergenceStudy(session, chart, series, 150, 21, 20);
      testStudyStructure(study, series); // Divergence patterns, may have empty history
      await cleanupTestEnvironment(series, chart, session, study);
    } catch (error) {
      await session.close();
      throw error;
    }
  });

  test("Booker Missed Pivots study", async () => {
    const session = await createTestSession();
    try {
      const { chart, symbol, series } = await setupTestEnvironment(session);
      const study = await bookerMissedPivotsStudy(session, chart, series, 180, false);
      testStudyStructure(study, series); // Pivot patterns, may have empty history
      await cleanupTestEnvironment(series, chart, session, study);
    } catch (error) {
      await session.close();
      throw error;
    }
  });

  test("Booker Reversal study", async () => {
    const session = await createTestSession();
    try {
      const { chart, symbol, series } = await setupTestEnvironment(session);
      const study = await bookerReversalStudy(session, chart, series, 12, 26, 70, 10, 70.0, 30.0);
      testStudyStructure(study, series); // Reversal patterns, may have empty history
      await cleanupTestEnvironment(series, chart, session, study);
    } catch (error) {
      await session.close();
      throw error;
    }
  });

  

  test("Correlation Coefficient study", async () => {
    const session = await createTestSession();
    try {
      const { chart, symbol, series } = await setupTestEnvironment(session);
      const study = await correlationCoefficientStudy(session, chart, series, "", "close", 20);
      testStudyStructureWithHistory(study, series);
      await cleanupTestEnvironment(series, chart, session, study);
    } catch (error) {
      await session.close();
      throw error;
    }
  });

  test("Overlay study", async () => {
    const session = await createTestSession();
    try {
      const { chart, symbol, series } = await setupTestEnvironment(session);
      const study = await overlayStudy(session, chart, series, "");
      testStudyStructureWithHistory(study, series);
      await cleanupTestEnvironment(series, chart, session, study);
    } catch (error) {
      await session.close();
      throw error;
    }
  });

  test("Volume Profile Anchored study", async () => {
    const session = await createTestSession();
    try {
      const { chart, symbol, series } = await setupTestEnvironment(session);
      const study = await volumeProfileAnchoredStudy(session, chart, series, "Number Of Rows", 24, "Up/Down", 0, 70);
      testStudyStructure(study, series); // Volume profile may need specific setup
      await cleanupTestEnvironment(series, chart, session, study);
    } catch (error) {
      await session.close();
      throw error;
    }
  });


});
