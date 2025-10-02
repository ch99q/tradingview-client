import { createStudy, Session, Chart, Series } from "../client.ts";

/**
 * Accumulation/Distribution
 */
export const accdStudy = (session: Session, chart: Chart, series: Series) => {
  return createStudy(session, chart, series, {
    id: "ACCD@tv-basicstudies-251",
    parameters: []
  });
}

/**
 * Aroon
 * 
 * @param length - The period for the Aroon calculation. Defaults to 14.
 */
export const aroonStudy = (session: Session, chart: Chart, series: Series, length: number = 14) => {
  return createStudy(session, chart, series, {
    id: "AROON@tv-basicstudies-251",
    parameters: [
      { type: "integer", value: length } // Length
    ]
  });
}

/**
 * Average True Range
 * 
 * @param length - The period for the ATR calculation. Defaults to 14.
 * @param smoothing - The smoothing method. Defaults to "RMA".
 */
export const atrStudy = (session: Session, chart: Chart, series: Series, length: number = 14, smoothing: string = "RMA") => {
  return createStudy(session, chart, series, {
    id: "ATR@tv-basicstudies-251",
    parameters: [
      { type: "integer", value: length }, // Length
      { type: "text", value: smoothing } // Smoothing
    ]
  });
}

/**
 * Anchored VWAP
 * 
 * @param startTime - The start time for the anchor. Defaults to 0.
 * @param bandsCalculationMode - The bands calculation mode. Defaults to "Standard Deviation".
 * @param band1Enabled - Whether to enable band 1. Defaults to true.
 * @param bandsMultiplier1 - The multiplier for band 1. Defaults to 1.0.
 * @param band2Enabled - Whether to enable band 2. Defaults to false.
 * @param bandsMultiplier2 - The multiplier for band 2. Defaults to 2.0.
 * @param band3Enabled - Whether to enable band 3. Defaults to false.
 * @param bandsMultiplier3 - The multiplier for band 3. Defaults to 3.0.
 * @param source - The source data for the study. Defaults to "hlc3".
 */
export const anchoredVwapStudy = (session: Session, chart: Chart, series: Series, startTime: number = 0, bandsCalculationMode: string = "Standard Deviation", band1Enabled: boolean = true, bandsMultiplier1: number = 1.0, band2Enabled: boolean = false, bandsMultiplier2: number = 2.0, band3Enabled: boolean = false, bandsMultiplier3: number = 3.0, source: string = "hlc3") => {
  return createStudy(session, chart, series, {
    id: "AnchoredVWAP@tv-basicstudies-251",
    parameters: [
      { type: "time", value: startTime }, // Start time
      { type: "text", value: bandsCalculationMode }, // Bands Calculation Mode
      { type: "bool", value: band1Enabled }, // Band 1 enabled
      { type: "float", value: bandsMultiplier1 }, // Bands Multiplier #1
      { type: "bool", value: band2Enabled }, // Band 2 enabled
      { type: "float", value: bandsMultiplier2 }, // Bands Multiplier #2
      { type: "bool", value: band3Enabled }, // Band 3 enabled
      { type: "float", value: bandsMultiplier3 }, // Bands Multiplier #3
      { type: "source", value: source } // Source
    ]
  });
}

/**
 * Awesome Oscillator
 */
export const awesomeOscillatorStudy = (session: Session, chart: Chart, series: Series) => {
  return createStudy(session, chart, series, {
    id: "AwesomeOscillator@tv-basicstudies-251",
    parameters: []
  });
}

/**
 * Bollinger Bands
 * 
 * @param length - The period for the moving average. Defaults to 20.
 * @param source - The source data for the study. Defaults to "close".
 * @param stdDev - The standard deviation multiplier. Defaults to 2.0.
 */
export const bollingerBandsStudy = (session: Session, chart: Chart, series: Series, length: number = 20, source: string = "close", stdDev: number = 2.0) => {
  return createStudy(session, chart, series, {
    id: "BB@tv-basicstudies-251",
    parameters: [
      { type: "integer", value: length }, // Length
      { type: "source", value: source }, // Source
      { type: "float", value: stdDev } // StdDev
    ]
  });
}

/**
 * Heikin Ashi
 */
export const heikinAshiStudy = (session: Session, chart: Chart, series: Series) => {
  return createStudy(session, chart, series, {
    id: "BarSetHeikenAshi@tv-basicstudies-251",
    parameters: []
  });
}

/**
 * Range Bars
 * 
 * @param range - The range for the bars. Defaults to 10.
 * @param phantomBars - Whether to show phantom bars. Defaults to false.
 */
export const rangeBarsStudy = (session: Session, chart: Chart, series: Series, range: number = 10, phantomBars: boolean = false) => {
  return createStudy(session, chart, series, {
    id: "BarSetRange@tv-basicstudies-251",
    parameters: [
      { type: "integer", value: range }, // Range
      { type: "bool", value: phantomBars } // Phantom Bars
    ]
  });
}

/**
 * Spread
 * 
 * @param tickers - The tickers for the spread. Defaults to "".
 * @param expr - The expression for the spread. Defaults to "".
 * @param tz - The timezone. Defaults to "UTC".
 * @param session - The session. Defaults to "0000-0000".
 * @param calcVolumeRule - The volume calculation rule. Defaults to "sum".
 * @param volexpr - The volume expression. Defaults to "".
 */
export const spreadStudy = (session: Session, chart: Chart, series: Series, tickers: string = "", expr: string = "", tz: string = "UTC", sessionTime: string = "0000-0000", calcVolumeRule: string = "sum", volexpr: string = "") => {
  return createStudy(session, chart, series, {
    id: "BarSetSpread@tv-basicstudies-251",
    parameters: [
      { type: "text", value: tickers }, // Tickers
      { type: "text", value: expr }, // Expr
      { type: "text", value: tz }, // Tz
      { type: "text", value: sessionTime }, // Session
      { type: "text", value: calcVolumeRule }, // CalcVolumeRule
      { type: "text", value: volexpr } // Volexpr
    ]
  });
}

/**
 * Bollinger Bands %B
 * 
 * @param length - The period for the moving average. Defaults to 20.
 * @param source - The source data for the study. Defaults to "close".
 * @param stdDev - The standard deviation multiplier. Defaults to 2.0.
 */
export const bollingerBandsRStudy = (session: Session, chart: Chart, series: Series, length: number = 20, source: string = "close", stdDev: number = 2.0) => {
  return createStudy(session, chart, series, {
    id: "BollingerBandsR@tv-basicstudies-251",
    parameters: [
      { type: "integer", value: length }, // Length
      { type: "source", value: source }, // Source
      { type: "float", value: stdDev } // StdDev
    ]
  });
}

/**
 * Bollinger Bands Width
 * 
 * @param length - The period for the moving average. Defaults to 20.
 * @param source - The source data for the study. Defaults to "close".
 * @param stdDev - The standard deviation multiplier. Defaults to 2.0.
 */
export const bollingerBandsWidthStudy = (session: Session, chart: Chart, series: Series, length: number = 20, source: string = "close", stdDev: number = 2.0) => {
  return createStudy(session, chart, series, {
    id: "BollingerBandsWidth@tv-basicstudies-251",
    parameters: [
      { type: "integer", value: length }, // Length
      { type: "source", value: source }, // Source
      { type: "float", value: stdDev } // StdDev
    ]
  });
}

/**
 * Booker Intraday Pivots
 * 
 * @param lookBack - The look back period. Defaults to 5.
 * @param periodOne - The first period. Defaults to 60.
 * @param periodTwo - The second period. Defaults to 240.
 * @param periodThree - The third period. Defaults to 480.
 */
export const bookerIntradayPivotsStudy = (session: Session, chart: Chart, series: Series, lookBack: number = 5, periodOne: number = 60, periodTwo: number = 240, periodThree: number = 480) => {
  return createStudy(session, chart, series, {
    id: "BookerIntradayPivots@tv-basicstudies-251",
    parameters: [
      { type: "integer", value: lookBack }, // Look Back
      { type: "integer", value: periodOne }, // Period One
      { type: "integer", value: periodTwo }, // Period Two
      { type: "integer", value: periodThree } // Period Three
    ]
  });
}

/**
 * Booker Knoxville Divergence
 * 
 * @param barsBack - The number of bars back. Defaults to 150.
 * @param rsiPeriod - The RSI period. Defaults to 21.
 * @param momentumPeriod - The momentum period. Defaults to 20.
 */
export const bookerKnoxvilleDivergenceStudy = (session: Session, chart: Chart, series: Series, barsBack: number = 150, rsiPeriod: number = 21, momentumPeriod: number = 20) => {
  return createStudy(session, chart, series, {
    id: "BookerKnoxvilleDivergence@tv-basicstudies-251",
    parameters: [
      { type: "integer", value: barsBack }, // Bars Back
      { type: "integer", value: rsiPeriod }, // RSI Period
      { type: "integer", value: momentumPeriod } // Momentum Period
    ]
  });
}

/**
 * Booker Missed Pivots
 * 
 * @param daysBack - The number of days back. Defaults to 180.
 * @param showTouchedPivots - Whether to show touched pivots. Defaults to false.
 */
export const bookerMissedPivotsStudy = (session: Session, chart: Chart, series: Series, daysBack: number = 180, showTouchedPivots: boolean = false) => {
  return createStudy(session, chart, series, {
    id: "BookerMissedPivots@tv-basicstudies-251",
    parameters: [
      { type: "integer", value: daysBack }, // Days Back
      { type: "bool", value: showTouchedPivots } // Show Touched Pivots
    ]
  });
}

/**
 * Booker Reversal
 * 
 * @param fastMaPeriod - The fast MA period. Defaults to 12.
 * @param slowMaPeriod - The slow MA period. Defaults to 26.
 * @param kPeriod - The K period. Defaults to 70.
 * @param slowing - The slowing factor. Defaults to 10.
 * @param stochasticUpper - The stochastic upper level. Defaults to 70.0.
 * @param stochasticLower - The stochastic lower level. Defaults to 30.0.
 */
export const bookerReversalStudy = (session: Session, chart: Chart, series: Series, fastMaPeriod: number = 12, slowMaPeriod: number = 26, kPeriod: number = 70, slowing: number = 10, stochasticUpper: number = 70.0, stochasticLower: number = 30.0) => {
  return createStudy(session, chart, series, {
    id: "BookerReversal@tv-basicstudies-251",
    parameters: [
      { type: "integer", value: fastMaPeriod }, // Fast MA Period
      { type: "integer", value: slowMaPeriod }, // Slow MA Period
      { type: "integer", value: kPeriod }, // KPeriod
      { type: "integer", value: slowing }, // Slowing
      { type: "float", value: stochasticUpper }, // Stochastic Upper
      { type: "float", value: stochasticLower } // Stochastic Lower
    ]
  });
}

/**
 * Commodity Channel Index
 * 
 * @param length - The period for the CCI calculation. Defaults to 20.
 * @param source - The source data for the study. Defaults to "close".
 */
export const cciStudy = (session: Session, chart: Chart, series: Series, length: number = 20, source: string = "close") => {
  return createStudy(session, chart, series, {
    id: "CCI@tv-basicstudies-251",
    parameters: [
      { type: "integer", value: length }, // Length
      { type: "source", value: source } // Source
    ]
  });
}

/**
 * Chaikin Money Flow
 * 
 * @param length - The period for the CMF calculation. Defaults to 20.
 */
export const cmfStudy = (session: Session, chart: Chart, series: Series, length: number = 20) => {
  return createStudy(session, chart, series, {
    id: "CMF@tv-basicstudies-251",
    parameters: [
      { type: "integer", value: length } // Length
    ]
  });
}

/**
 * Connors RSI
 * 
 * @param rsiLength - The RSI length. Defaults to 3.
 * @param upDownLength - The up/down length. Defaults to 2.
 * @param rocLength - The ROC length. Defaults to 100.
 */
export const crsiStudy = (session: Session, chart: Chart, series: Series, rsiLength: number = 3, upDownLength: number = 2, rocLength: number = 100) => {
  return createStudy(session, chart, series, {
    id: "CRSI@tv-basicstudies-251",
    parameters: [
      { type: "integer", value: rsiLength }, // RSI Length
      { type: "integer", value: upDownLength }, // UpDown Length
      { type: "integer", value: rocLength } // ROC Length
    ]
  });
}

/**
 * Chaikin Oscillator
 * 
 * @param fastLength - The fast length. Defaults to 3.
 * @param slowLength - The slow length. Defaults to 10.
 */
export const chaikinOscillatorStudy = (session: Session, chart: Chart, series: Series, fastLength: number = 3, slowLength: number = 10) => {
  return createStudy(session, chart, series, {
    id: "ChaikinOscillator@tv-basicstudies-251",
    parameters: [
      { type: "integer", value: fastLength }, // Fast length
      { type: "integer", value: slowLength } // Slow length
    ]
  });
}

/**
 * Choppiness Index
 * 
 * @param length - The period for the calculation. Defaults to 14.
 */
export const choppinessIndexStudy = (session: Session, chart: Chart, series: Series, length: number = 14) => {
  return createStudy(session, chart, series, {
    id: "ChoppinessIndex@tv-basicstudies-251",
    parameters: [
      { type: "integer", value: length } // Length
    ]
  });
}

/**
 * Compare
 * 
 * @param symbol - The symbol to compare. Defaults to "".
 * @param source - The source data for the study. Defaults to "close".
 * @param offset - The offset. Defaults to 0.
 */
export const compareStudy = (session: Session, chart: Chart, series: Series, symbol: string = "", source: string = "close", offset: number = 0) => {
  return createStudy(session, chart, series, {
    id: "Compare@tv-basicstudies-251",
    parameters: [
      { type: "symbol", value: symbol }, // Symbol
      { type: "text", value: source }, // Source
      { type: "integer", value: offset } // Offset
    ]
  });
}

/**
 * Correlation Coefficient
 * 
 * @param symbol - The symbol to correlate with. Defaults to "GOOG".
 * @param source - The source data for the study. Defaults to "close".
 * @param length - The period for the calculation. Defaults to 20.
 */
export const correlationCoefficientStudy = (session: Session, chart: Chart, series: Series, symbol: string = "GOOG", source: string = "close", length: number = 20) => {
  return createStudy(session, chart, series, {
    id: "CorrelationCoefficient@tv-basicstudies-251",
    parameters: [
      { type: "symbol", value: symbol }, // Symbol
      { type: "text", value: source }, // Source
      { type: "integer", value: length } // Length
    ]
  });
}

/**
 * Currency Converter
 * 
 * @param symbol - The symbol to convert to. Defaults to "".
 * @param rate - The conversion rate. Defaults to "".
 * @param useRtRate - Whether to use real-time rate. Defaults to false.
 * @param coeff - The coefficient. Defaults to 1.0.
 */
export const currencyConverterStudy = (session: Session, chart: Chart, series: Series, symbol: string = "", rate: string = "", useRtRate: boolean = false, coeff: number = 1.0) => {
  return createStudy(session, chart, series, {
    id: "CurrencyConverter@tv-basicstudies-251",
    parameters: [
      { type: "symbol", value: symbol }, // Symbol
      { type: "text", value: rate }, // Rate
      { type: "bool", value: useRtRate }, // UseRTRate
      { type: "float", value: coeff } // Coeff
    ]
  });
}

/**
 * Directional Movement Index
 * 
 * @param adxSmoothing - The ADX smoothing period. Defaults to 14.
 * @param diLength - The DI length. Defaults to 14.
 */
export const dmStudy = (session: Session, chart: Chart, series: Series, adxSmoothing: number = 14, diLength: number = 14) => {
  return createStudy(session, chart, series, {
    id: "DM@tv-basicstudies-251",
    parameters: [
      { type: "integer", value: adxSmoothing }, // ADX smoothing
      { type: "integer", value: diLength } // DI Length
    ]
  });
}

/**
 * Donchian Channels
 * 
 * @param length - The period for the calculation. Defaults to 20.
 */
export const donchianChannelsStudy = (session: Session, chart: Chart, series: Series, length: number = 20) => {
  return createStudy(session, chart, series, {
    id: "DONCH@tv-basicstudies-251",
    parameters: [
      { type: "integer", value: length } // Length
    ]
  });
}

/**
 * Detrended Price Oscillator
 * 
 * @param period - The period for the calculation. Defaults to 21.
 * @param centered - Whether to center the oscillator. Defaults to false.
 */
export const detrendedPriceOscillatorStudy = (session: Session, chart: Chart, series: Series, period: number = 21, centered: boolean = false) => {
  return createStudy(session, chart, series, {
    id: "DetrendedPriceOscillator@tv-basicstudies-251",
    parameters: [
      { type: "integer", value: period }, // Period
      { type: "bool", value: centered } // Centered
    ]
  });
}

/**
 * Dividends
 */
export const dividendsStudy = (session: Session, chart: Chart, series: Series) => {
  return createStudy(session, chart, series, {
    id: "Dividends@tv-basicstudies-251",
    parameters: []
  });
}

/**
 * Double Exponential Moving Average
 * 
 * @param length - The period for the calculation. Defaults to 9.
 */
export const doubleEmaStudy = (session: Session, chart: Chart, series: Series, length: number = 9) => {
  return createStudy(session, chart, series, {
    id: "DoubleEMA@tv-basicstudies-251",
    parameters: [
      { type: "integer", value: length } // Length
    ]
  });
}

/**
 * Elder's Force Index
 * 
 * @param length - The period for the calculation. Defaults to 13.
 */
export const efiStudy = (session: Session, chart: Chart, series: Series, length: number = 13) => {
  return createStudy(session, chart, series, {
    id: "EFI@tv-basicstudies-251",
    parameters: [
      { type: "integer", value: length } // Length
    ]
  });
}

/**
 * Envelope
 * 
 * @param length - The period for the moving average. Defaults to 20.
 * @param percent - The envelope percentage. Defaults to 10.0.
 * @param source - The source data for the study. Defaults to "close".
 * @param exponential - Whether to use exponential smoothing. Defaults to false.
 */
export const envelopeStudy = (session: Session, chart: Chart, series: Series, length: number = 20, percent: number = 10.0, source: string = "close", exponential: boolean = false) => {
  return createStudy(session, chart, series, {
    id: "ENV@tv-basicstudies-251",
    parameters: [
      { type: "integer", value: length }, // Length
      { type: "float", value: percent }, // Percent
      { type: "source", value: source }, // Source
      { type: "bool", value: exponential } // Exponential
    ]
  });
}

/**
 * Earnings
 */
export const earningsStudy = (session: Session, chart: Chart, series: Series) => {
  return createStudy(session, chart, series, {
    id: "Earnings@tv-basicstudies-251",
    parameters: []
  });
}

/**
 * Ease of Movement
 * 
 * @param length - The period for the calculation. Defaults to 14.
 * @param divisor - The divisor for the calculation. Defaults to 10000.
 */
export const easeOfMovementStudy = (session: Session, chart: Chart, series: Series, length: number = 14, divisor: number = 10000) => {
  return createStudy(session, chart, series, {
    id: "EaseOfMovement@tv-basicstudies-251",
    parameters: [
      { type: "integer", value: length }, // Length
      { type: "integer", value: divisor } // Divisor
    ]
  });
}

/**
 * Fisher Transform
 * 
 * @param length - The period for the calculation. Defaults to 9.
 */
export const fisherTransformStudy = (session: Session, chart: Chart, series: Series, length: number = 9) => {
  return createStudy(session, chart, series, {
    id: "FisherTransform@tv-basicstudies-251",
    parameters: [
      { type: "integer", value: length } // Length
    ]
  });
}

/**
 * Historical Volatility
 * 
 * @param length - The period for the calculation. Defaults to 10.
 */
export const historicalVolatilityStudy = (session: Session, chart: Chart, series: Series, length: number = 10) => {
  return createStudy(session, chart, series, {
    id: "HV@tv-basicstudies-251",
    parameters: [
      { type: "integer", value: length } // Length
    ]
  });
}

/**
 * Ichimoku Cloud
 * 
 * @param conversionLinePeriods - The conversion line periods. Defaults to 9.
 * @param baseLinePeriods - The base line periods. Defaults to 26.
 * @param laggingSpan2Periods - The lagging span 2 periods. Defaults to 52.
 * @param displacement - The displacement. Defaults to 26.
 */
export const ichimokuCloudStudy = (session: Session, chart: Chart, series: Series, conversionLinePeriods: number = 9, baseLinePeriods: number = 26, laggingSpan2Periods: number = 52, displacement: number = 26) => {
  return createStudy(session, chart, series, {
    id: "IchimokuCloud@tv-basicstudies-251",
    parameters: [
      { type: "integer", value: conversionLinePeriods }, // Conversion Line Periods
      { type: "integer", value: baseLinePeriods }, // Base Line Periods
      { type: "integer", value: laggingSpan2Periods }, // Lagging Span 2 Periods
      { type: "integer", value: displacement } // Displacement
    ]
  });
}

/**
 * Keltner Channels
 * 
 * @param length - The period for the calculation. Defaults to 20.
 * @param multiplier - The multiplier for the channels. Defaults to 1.0.
 * @param source - The source data for the study. Defaults to "close".
 * @param exponential - Whether to use exponential smoothing. Defaults to true.
 * @param bandsStyle - The bands style. Defaults to "true range".
 */
export const keltnerChannelsStudy = (session: Session, chart: Chart, series: Series, length: number = 20, multiplier: number = 1.0, source: string = "close", exponential: boolean = true, bandsStyle: string = "true range") => {
  return createStudy(session, chart, series, {
    id: "KLTNR@tv-basicstudies-251",
    parameters: [
      { type: "integer", value: length }, // Length
      { type: "float", value: multiplier }, // Multiplier
      { type: "source", value: source }, // Source
      { type: "bool", value: exponential }, // Exponential
      { type: "text", value: bandsStyle } // Bands style
    ]
  });
}

/**
 * Know Sure Thing
 * 
 * @param rocLen1 - The first ROC length. Defaults to 10.
 * @param rocLen2 - The second ROC length. Defaults to 15.
 * @param rocLen3 - The third ROC length. Defaults to 20.
 * @param rocLen4 - The fourth ROC length. Defaults to 30.
 * @param smaLen1 - The first SMA length. Defaults to 10.
 * @param smaLen2 - The second SMA length. Defaults to 10.
 * @param smaLen3 - The third SMA length. Defaults to 10.
 * @param smaLen4 - The fourth SMA length. Defaults to 15.
 * @param sigLen - The signal length. Defaults to 9.
 */
export const kstStudy = (session: Session, chart: Chart, series: Series, rocLen1: number = 10, rocLen2: number = 15, rocLen3: number = 20, rocLen4: number = 30, smaLen1: number = 10, smaLen2: number = 10, smaLen3: number = 10, smaLen4: number = 15, sigLen: number = 9) => {
  return createStudy(session, chart, series, {
    id: "KST@tv-basicstudies-251",
    parameters: [
      { type: "integer", value: rocLen1 }, // ROCLen1
      { type: "integer", value: rocLen2 }, // ROCLen2
      { type: "integer", value: rocLen3 }, // ROCLen3
      { type: "integer", value: rocLen4 }, // ROCLen4
      { type: "integer", value: smaLen1 }, // SMALen1
      { type: "integer", value: smaLen2 }, // SMALen2
      { type: "integer", value: smaLen3 }, // SMALen3
      { type: "integer", value: smaLen4 }, // SMALen4
      { type: "integer", value: sigLen } // SigLen
    ]
  });
}

/**
 * Linear Regression
 * 
 * @param upperDeviation - The upper deviation. Defaults to 2.0.
 * @param lowerDeviation - The lower deviation. Defaults to -2.0.
 * @param useUpperDeviation - Whether to use upper deviation. Defaults to true.
 * @param useLowerDeviation - Whether to use lower deviation. Defaults to true.
 * @param count - The count. Defaults to 100.
 * @param source - The source data for the study. Defaults to "close".
 */
export const linearRegressionStudy = (session: Session, chart: Chart, series: Series, upperDeviation: number = 2.0, lowerDeviation: number = -2.0, useUpperDeviation: boolean = true, useLowerDeviation: boolean = true, count: number = 100, source: string = "close") => {
  return createStudy(session, chart, series, {
    id: "LinearRegression@tv-basicstudies-251",
    parameters: [
      { type: "float", value: upperDeviation }, // Upper Deviation
      { type: "float", value: lowerDeviation }, // Lower Deviation
      { type: "bool", value: useUpperDeviation }, // Use Upper Deviation
      { type: "bool", value: useLowerDeviation }, // Use Lower Deviation
      { type: "integer", value: count }, // Count
      { type: "source", value: source } // Source
    ]
  });
}

/**
 * Long Short Position
 * 
 * @param startTime - The start time. Defaults to 0.
 * @param endTime - The end time. Defaults to 0.
 * @param entryPrice - The entry price. Defaults to 0.0.
 * @param targetPrice - The target price. Defaults to 0.0.
 * @param stopPrice - The stop price. Defaults to 0.0.
 * @param baseCurrency - The base currency. Defaults to "NONE".
 */
export const longShortPositionStudy = (session: Session, chart: Chart, series: Series, startTime: number = 0, endTime: number = 0, entryPrice: number = 0.0, targetPrice: number = 0.0, stopPrice: number = 0.0, baseCurrency: string = "NONE") => {
  return createStudy(session, chart, series, {
    id: "LongShortPosition@tv-basicstudies-251",
    parameters: [
      { type: "time", value: startTime }, // Start_time
      { type: "time", value: endTime }, // End_time
      { type: "float", value: entryPrice }, // Entry_price
      { type: "float", value: targetPrice }, // Target_price
      { type: "float", value: stopPrice }, // Stop_price
      { type: "text", value: baseCurrency } // Base Currency
    ]
  });
}

/**
 * MACD
 * 
 * @param fastLength - The fast length. Defaults to 12.
 * @param slowLength - The slow length. Defaults to 26.
 * @param source - The source data for the study. Defaults to "close".
 * @param signalSmoothing - The signal smoothing. Defaults to 9.
 * @param simpleMaOscillator - Whether to use simple MA for oscillator. Defaults to false.
 * @param simpleMaSignal - Whether to use simple MA for signal line. Defaults to false.
 */
export const macdStudy = (session: Session, chart: Chart, series: Series, fastLength: number = 12, slowLength: number = 26, source: string = "close", signalSmoothing: number = 9, simpleMaOscillator: boolean = false, simpleMaSignal: boolean = false) => {
  return createStudy(session, chart, series, {
    id: "MACD@tv-basicstudies-251",
    parameters: [
      { type: "integer", value: fastLength }, // Fast length
      { type: "integer", value: slowLength }, // Slow length
      { type: "source", value: source }, // Source
      { type: "integer", value: signalSmoothing }, // Signal smoothing
      { type: "bool", value: simpleMaOscillator }, // Simple ma(oscillator)
      { type: "bool", value: simpleMaSignal } // Simple ma(signal line)
    ]
  });
}

/**
 * Exponential Moving Average
 * 
 * @param length - The period for the calculation. Defaults to 9.
 * @param source - The source data for the study. Defaults to "close".
 */
export const emaStudy = (session: Session, chart: Chart, series: Series, length: number = 9, source: string = "close") => {
  return createStudy(session, chart, series, {
    id: "MAExp@tv-basicstudies-251",
    parameters: [
      { type: "integer", value: length }, // Length
      { type: "source", value: source } // Source
    ]
  });
}

/**
 * Simple Moving Average
 * 
 * @param length - The period for the calculation. Defaults to 9.
 * @param source - The source data for the study. Defaults to "close".
 */
export const smaStudy = (session: Session, chart: Chart, series: Series, length: number = 9, source: string = "close") => {
  return createStudy(session, chart, series, {
    id: "MASimple@tv-basicstudies-251",
    parameters: [
      { type: "integer", value: length }, // Length
      { type: "source", value: source } // Source
    ]
  });
}

/**
 * Volume Weighted Moving Average
 * 
 * @param length - The period for the calculation. Defaults to 20.
 * @param source - The source data for the study. Defaults to "close".
 */
export const vwmaStudy = (session: Session, chart: Chart, series: Series, length: number = 20, source: string = "close") => {
  return createStudy(session, chart, series, {
    id: "MAVolumeWeighted@tv-basicstudies-251",
    parameters: [
      { type: "integer", value: length }, // Length
      { type: "source", value: source } // Source
    ]
  });
}

/**
 * Weighted Moving Average
 * 
 * @param length - The period for the calculation. Defaults to 9.
 * @param source - The source data for the study. Defaults to "close".
 */
export const wmaStudy = (session: Session, chart: Chart, series: Series, length: number = 9, source: string = "close") => {
  return createStudy(session, chart, series, {
    id: "MAWeighted@tv-basicstudies-251",
    parameters: [
      { type: "integer", value: length }, // Length
      { type: "source", value: source } // Source
    ]
  });
}

/**
 * Money Flow Index
 * 
 * @param length - The period for the calculation. Defaults to 14.
 */
export const mfStudy = (session: Session, chart: Chart, series: Series, length: number = 14) => {
  return createStudy(session, chart, series, {
    id: "MF@tv-basicstudies-251",
    parameters: [
      { type: "integer", value: length } // Length
    ]
  });
}

/**
 * Momentum
 * 
 * @param length - The period for the calculation. Defaults to 10.
 * @param source - The source data for the study. Defaults to "close".
 */
export const momentumStudy = (session: Session, chart: Chart, series: Series, length: number = 10, source: string = "close") => {
  return createStudy(session, chart, series, {
    id: "MOM@tv-basicstudies-251",
    parameters: [
      { type: "integer", value: length }, // Length
      { type: "source", value: source } // Source
    ]
  });
}

/**
 * Multi-Time Period Charts
 * 
 * @param timeframe - The timeframe. Defaults to "Auto".
 * @param calculation - The calculation method. Defaults to "True Range".
 */
export const mtpcStudy = (session: Session, chart: Chart, series: Series, timeframe: string = "Auto", calculation: string = "True Range") => {
  return createStudy(session, chart, series, {
    id: "MTPC@tv-basicstudies-251",
    parameters: [
      { type: "text", value: timeframe }, // Time frame
      { type: "text", value: calculation } // Calculation
    ]
  });
}

/**
 * Moon Phases
 */
export const moonPhasesStudy = (session: Session, chart: Chart, series: Series) => {
  return createStudy(session, chart, series, {
    id: "MoonPhases@tv-basicstudies-251",
    parameters: []
  });
}

/**
 * On Balance Volume
 */
export const obvStudy = (session: Session, chart: Chart, series: Series) => {
  return createStudy(session, chart, series, {
    id: "OBV@tv-basicstudies-251",
    parameters: []
  });
}

/**
 * OHLC Values
 * 
 * @param mult - The multiplier. Defaults to -1.
 * @param useIntraday - Whether to use intraday data. Defaults to false.
 */
export const ohlcStudy = (session: Session, chart: Chart, series: Series, mult: number = -1, useIntraday: boolean = false) => {
  return createStudy(session, chart, series, {
    id: "OHLCV@tv-basicstudies-251",
    parameters: [
      { type: "integer", value: mult }, // Mult
      { type: "bool", value: useIntraday } // UseIntraday
    ]
  });
}

/**
 * Overlay
 * 
 * @param symbol - The symbol to overlay. Defaults to "GOOG".
 */
export const overlayStudy = (session: Session, chart: Chart, series: Series, symbol: string = "GOOG") => {
  return createStudy(session, chart, series, {
    id: "Overlay@tv-basicstudies-251",
    parameters: [
      { type: "symbol", value: symbol } // Symbol
    ]
  });
}

/**
 * Parabolic SAR
 * 
 * @param start - The start value. Defaults to 0.02.
 * @param increment - The increment value. Defaults to 0.02.
 * @param maximum - The maximum value. Defaults to 0.2.
 */
export const psarStudy = (session: Session, chart: Chart, series: Series, start: number = 0.02, increment: number = 0.02, maximum: number = 0.2) => {
  return createStudy(session, chart, series, {
    id: "PSAR@tv-basicstudies-251",
    parameters: [
      { type: "float", value: start }, // Start
      { type: "float", value: increment }, // Increment
      { type: "float", value: maximum } // Max value
    ]
  });
}

/**
 * Pivot Points High Low
 * 
 * @param lengthHigh - The length for high pivots. Defaults to 10.
 * @param lengthLow - The length for low pivots. Defaults to 10.
 */
export const pivotPointsHighLowStudy = (session: Session, chart: Chart, series: Series, lengthHigh: number = 10, lengthLow: number = 10) => {
  return createStudy(session, chart, series, {
    id: "PivotPointsHighLow@tv-basicstudies-251",
    parameters: [
      { type: "integer", value: lengthHigh }, // Length high
      { type: "integer", value: lengthLow } // Length low
    ]
  });
}

/**
 * Pivot Points Standard
 * 
 * @param type - The type of pivot points. Defaults to "Traditional".
 * @param showHistoricalPivots - Whether to show historical pivots. Defaults to true.
 * @param pivotsTimeframe - The pivots timeframe. Defaults to "Auto".
 * @param numberOfPivotsBack - The number of pivots back. Defaults to 15.
 */
export const pivotPointsStandardStudy = (session: Session, chart: Chart, series: Series, type: string = "Traditional", showHistoricalPivots: boolean = true, pivotsTimeframe: string = "Auto", numberOfPivotsBack: number = 15) => {
  return createStudy(session, chart, series, {
    id: "PivotPointsStandard@tv-basicstudies-251",
    parameters: [
      { type: "text", value: type }, // Type
      { type: "bool", value: showHistoricalPivots }, // Show historical pivots
      { type: "text", value: pivotsTimeframe }, // Pivots Timeframe
      { type: "integer", value: numberOfPivotsBack } // Number of Pivots Back
    ]
  });
}

/**
 * Price Oscillator
 * 
 * @param shortLength - The short length. Defaults to 10.
 * @param longLength - The long length. Defaults to 21.
 * @param source - The source data for the study. Defaults to "close".
 * @param exponential - Whether to use exponential smoothing. Defaults to false.
 */
export const priceOscillatorStudy = (session: Session, chart: Chart, series: Series, shortLength: number = 10, longLength: number = 21, source: string = "close", exponential: boolean = false) => {
  return createStudy(session, chart, series, {
    id: "PriceOsc@tv-basicstudies-251",
    parameters: [
      { type: "integer", value: shortLength }, // Short length
      { type: "integer", value: longLength }, // Long length
      { type: "source", value: source }, // Source
      { type: "bool", value: exponential } // Exponential
    ]
  });
}

/**
 * Price Volume Trend
 */
export const priceVolumeTrendStudy = (session: Session, chart: Chart, series: Series) => {
  return createStudy(session, chart, series, {
    id: "PriceVolumeTrend@tv-basicstudies-251",
    parameters: []
  });
}

/**
 * Rate of Change
 * 
 * @param length - The period for the calculation. Defaults to 9.
 * @param source - The source data for the study. Defaults to "close".
 */
export const rocStudy = (session: Session, chart: Chart, series: Series, length: number = 9, source: string = "close") => {
  return createStudy(session, chart, series, {
    id: "ROC@tv-basicstudies-251",
    parameters: [
      { type: "integer", value: length }, // Length
      { type: "source", value: source } // Source
    ]
  });
}

/**
 * Relative Strength Index
 * 
 * @param length - The period for the calculation. Defaults to 14.
 * @param source - The source data for the study. Defaults to "close".
 */
export const rsiStudy = (session: Session, chart: Chart, series: Series, length: number = 14, source: string = "close") => {
  return createStudy(session, chart, series, {
    id: "RSI@tv-basicstudies-251",
    parameters: [
      { type: "integer", value: length }, // Length
      { type: "source", value: source } // Source
    ]
  });
}

/**
 * Regression Trend
 * 
 * @param upperDeviation - The upper deviation. Defaults to 2.0.
 * @param lowerDeviation - The lower deviation. Defaults to -2.0.
 * @param useUpperDeviation - Whether to use upper deviation. Defaults to true.
 * @param useLowerDeviation - Whether to use lower deviation. Defaults to true.
 * @param firstBarTime - The first bar time. Defaults to 0.
 * @param lastBarTime - The last bar time. Defaults to 0.
 * @param source - The source data for the study. Defaults to "close".
 */
export const regressionTrendStudy = (session: Session, chart: Chart, series: Series, upperDeviation: number = 2.0, lowerDeviation: number = -2.0, useUpperDeviation: boolean = true, useLowerDeviation: boolean = true, firstBarTime: number = 0, lastBarTime: number = 0, source: string = "close") => {
  return createStudy(session, chart, series, {
    id: "RegressionTrend@tv-basicstudies-251",
    parameters: [
      { type: "float", value: upperDeviation }, // Upper Deviation
      { type: "float", value: lowerDeviation }, // Lower Deviation
      { type: "bool", value: useUpperDeviation }, // Use Upper Deviation
      { type: "bool", value: useLowerDeviation }, // Use Lower Deviation
      { type: "time", value: firstBarTime }, // First bar time
      { type: "time", value: lastBarTime }, // Last bar time
      { type: "source", value: source } // Source
    ]
  });
}

/**
 * SMI Ergodic Indicator
 * 
 * @param longPeriod - The long period. Defaults to 20.
 * @param shortPeriod - The short period. Defaults to 5.
 * @param signalLinePeriod - The signal line period. Defaults to 5.
 */
export const smiErgodicIndicatorStudy = (session: Session, chart: Chart, series: Series, longPeriod: number = 20, shortPeriod: number = 5, signalLinePeriod: number = 5) => {
  return createStudy(session, chart, series, {
    id: "SMIErgodicIndicator@tv-basicstudies-251",
    parameters: [
      { type: "integer", value: longPeriod }, // Long period
      { type: "integer", value: shortPeriod }, // Short period
      { type: "integer", value: signalLinePeriod } // Signal line period
    ]
  });
}

/**
 * SMI Ergodic Oscillator
 * 
 * @param longPeriod - The long period. Defaults to 20.
 * @param shortPeriod - The short period. Defaults to 5.
 * @param signalLinePeriod - The signal line period. Defaults to 5.
 */
export const smiErgodicOscillatorStudy = (session: Session, chart: Chart, series: Series, longPeriod: number = 20, shortPeriod: number = 5, signalLinePeriod: number = 5) => {
  return createStudy(session, chart, series, {
    id: "SMIErgodicOscillator@tv-basicstudies-251",
    parameters: [
      { type: "integer", value: longPeriod }, // Long period
      { type: "integer", value: shortPeriod }, // Short period
      { type: "integer", value: signalLinePeriod } // Signal line period
    ]
  });
}

/**
 * Seasonals
 * 
 * @param config - The configuration. Defaults to "".
 */
export const seasonalsStudy = (session: Session, chart: Chart, series: Series, config: string = "") => {
  return createStudy(session, chart, series, {
    id: "Seasonals@tv-basicstudies-251",
    parameters: [
      { type: "text", value: config } // Config
    ]
  });
}

/**
 * Sessions
 */
export const sessionsStudy = (session: Session, chart: Chart, series: Series) => {
  return createStudy(session, chart, series, {
    id: "Sessions@tv-basicstudies-251",
    parameters: []
  });
}

/**
 * Splits
 */
export const splitsStudy = (session: Session, chart: Chart, series: Series) => {
  return createStudy(session, chart, series, {
    id: "Splits@tv-basicstudies-251",
    parameters: []
  });
}

/**
 * Stochastic
 * 
 * @param k - The K period. Defaults to 14.
 * @param d - The D period. Defaults to 3.
 * @param smooth - The smoothing period. Defaults to 3.
 */
export const stochasticStudy = (session: Session, chart: Chart, series: Series, k: number = 14, d: number = 3, smooth: number = 3) => {
  return createStudy(session, chart, series, {
    id: "Stochastic@tv-basicstudies-251",
    parameters: [
      { type: "integer", value: k }, // K
      { type: "integer", value: d }, // D
      { type: "integer", value: smooth } // Smooth
    ]
  });
}

/**
 * Stochastic RSI
 * 
 * @param k - The K period. Defaults to 3.
 * @param d - The D period. Defaults to 3.
 * @param rsiLength - The RSI length. Defaults to 14.
 * @param stochasticLength - The stochastic length. Defaults to 14.
 * @param rsiSource - The RSI source. Defaults to "close".
 */
export const stochasticRsiStudy = (session: Session, chart: Chart, series: Series, k: number = 3, d: number = 3, rsiLength: number = 14, stochasticLength: number = 14, rsiSource: string = "close") => {
  return createStudy(session, chart, series, {
    id: "StochasticRSI@tv-basicstudies-251",
    parameters: [
      { type: "integer", value: k }, // K
      { type: "integer", value: d }, // D
      { type: "integer", value: rsiLength }, // RSI Length
      { type: "integer", value: stochasticLength }, // Stochastic Length
      { type: "source", value: rsiSource } // RSI Source
    ]
  });
}

/**
 * Triple Exponential Moving Average
 * 
 * @param length - The period for the calculation. Defaults to 9.
 */
export const tripleEmaStudy = (session: Session, chart: Chart, series: Series, length: number = 9) => {
  return createStudy(session, chart, series, {
    id: "TripleEMA@tv-basicstudies-251",
    parameters: [
      { type: "integer", value: length } // Length
    ]
  });
}

/**
 * TRIX
 * 
 * @param length - The period for the calculation. Defaults to 18.
 */
export const trixStudy = (session: Session, chart: Chart, series: Series, length: number = 18) => {
  return createStudy(session, chart, series, {
    id: "Trix@tv-basicstudies-251",
    parameters: [
      { type: "integer", value: length } // Length
    ]
  });
}

/**
 * Ultimate Oscillator
 * 
 * @param length1 - The first length. Defaults to 7.
 * @param length2 - The second length. Defaults to 14.
 * @param length3 - The third length. Defaults to 28.
 */
export const ultimateOscillatorStudy = (session: Session, chart: Chart, series: Series, length1: number = 7, length2: number = 14, length3: number = 28) => {
  return createStudy(session, chart, series, {
    id: "UltimateOsc@tv-basicstudies-251",
    parameters: [
      { type: "integer", value: length1 }, // Length1
      { type: "integer", value: length2 }, // Length2
      { type: "integer", value: length3 } // Length3
    ]
  });
}

/**
 * Volatility Stop
 * 
 * @param length - The period for the calculation. Defaults to 20.
 * @param source - The source data for the study. Defaults to "close".
 * @param multiplier - The multiplier. Defaults to 2.0.
 */
export const volatilityStopStudy = (session: Session, chart: Chart, series: Series, length: number = 20, source: string = "close", multiplier: number = 2.0) => {
  return createStudy(session, chart, series, {
    id: "VSTOP@tv-basicstudies-251",
    parameters: [
      { type: "integer", value: length }, // Length
      { type: "source", value: source }, // Source
      { type: "float", value: multiplier } // Multiplier
    ]
  });
}

/**
 * VWAP
 * 
 * @param anchorPeriod - The anchor period. Defaults to "Session".
 * @param source - The source data for the study. Defaults to "hlc3".
 */
export const vwapStudy = (session: Session, chart: Chart, series: Series, anchorPeriod: string = "Session", source: string = "hlc3") => {
  return createStudy(session, chart, series, {
    id: "VWAP@tv-basicstudies-251",
    parameters: [
      { type: "text", value: anchorPeriod }, // Anchor Period
      { type: "source", value: source } // Source
    ]
  });
}

/**
 * VWAP Auto Anchored
 * 
 * @param anchorPeriod - The anchor period. Defaults to "Auto".
 * @param source - The source data for the study. Defaults to "hlc3".
 * @param length - The length. Defaults to 14.
 * @param bandsCalculationMode - The bands calculation mode. Defaults to "Standard Deviation".
 * @param band1Enabled - Whether to enable band 1. Defaults to true.
 * @param bandsMultiplier1 - The multiplier for band 1. Defaults to 1.0.
 * @param band2Enabled - Whether to enable band 2. Defaults to false.
 * @param bandsMultiplier2 - The multiplier for band 2. Defaults to 2.0.
 * @param band3Enabled - Whether to enable band 3. Defaults to false.
 * @param bandsMultiplier3 - The multiplier for band 3. Defaults to 3.0.
 */
export const vwapAutoAnchoredStudy = (session: Session, chart: Chart, series: Series, anchorPeriod: string = "Auto", source: string = "hlc3", length: number = 14, bandsCalculationMode: string = "Standard Deviation", band1Enabled: boolean = true, bandsMultiplier1: number = 1.0, band2Enabled: boolean = false, bandsMultiplier2: number = 2.0, band3Enabled: boolean = false, bandsMultiplier3: number = 3.0) => {
  return createStudy(session, chart, series, {
    id: "VWAPAA@tv-basicstudies-251",
    parameters: [
      { type: "text", value: anchorPeriod }, // Anchor Period
      { type: "source", value: source }, // Source
      { type: "integer", value: length }, // Length
      { type: "text", value: bandsCalculationMode }, // Bands Calculation Mode
      { type: "bool", value: band1Enabled }, // Band 1 enabled
      { type: "float", value: bandsMultiplier1 }, // Bands Multiplier #1
      { type: "bool", value: band2Enabled }, // Band 2 enabled
      { type: "float", value: bandsMultiplier2 }, // Bands Multiplier #2
      { type: "bool", value: band3Enabled }, // Band 3 enabled
      { type: "float", value: bandsMultiplier3 } // Bands Multiplier #3
    ]
  });
}

/**
 * Volume Profile Anchored
 * 
 * @param rowsLayout - The rows layout. Defaults to "Number Of Rows".
 * @param rowSize - The row size. Defaults to 24.
 * @param volume - The volume type. Defaults to "Up/Down".
 * @param firstBarTime - The first bar time. Defaults to 0.
 * @param valueAreaVolume - The value area volume. Defaults to 70.
 */
export const volumeProfileAnchoredStudy = (session: Session, chart: Chart, series: Series, rowsLayout: string = "Number Of Rows", rowSize: number = 24, volume: string = "Up/Down", firstBarTime: number = 0, valueAreaVolume: number = 70) => {
  return createStudy(session, chart, series, {
    id: "VbPAnchored@tv-basicstudies-251",
    parameters: [
      { type: "text", value: rowsLayout }, // Rows Layout
      { type: "integer", value: rowSize }, // Row Size
      { type: "text", value: volume }, // Volume
      { type: "time", value: firstBarTime }, // First Bar Time
      { type: "integer", value: valueAreaVolume } // Value Area Volume
    ]
  });
}

/**
 * Volume Profile Fixed Range
 * 
 * @param mapRightBoundary - Whether to map right boundary. Defaults to false.
 * @param rowsLayout - The rows layout. Defaults to "Number Of Rows".
 * @param rowSize - The row size. Defaults to 24.
 * @param volume - The volume type. Defaults to "Up/Down".
 * @param firstBarTime - The first bar time. Defaults to 0.
 * @param lastBarTime - The last bar time. Defaults to 0.
 * @param valueAreaVolume - The value area volume. Defaults to 70.
 * @param subscribeRealtime - Whether to subscribe to realtime. Defaults to true.
 * @param extendToRight - Whether to extend to right. Defaults to false.
 */
export const volumeProfileFixedRangeStudy = (session: Session, chart: Chart, series: Series, mapRightBoundary: boolean = false, rowsLayout: string = "Number Of Rows", rowSize: number = 24, volume: string = "Up/Down", firstBarTime: number = 0, lastBarTime: number = 0, valueAreaVolume: number = 70, subscribeRealtime: boolean = true, extendToRight: boolean = false) => {
  return createStudy(session, chart, series, {
    id: "VbPFixed@tv-basicstudies-251",
    parameters: [
      { type: "bool", value: mapRightBoundary }, // mapRightBoundary
      { type: "text", value: rowsLayout }, // Rows Layout
      { type: "integer", value: rowSize }, // Row Size
      { type: "text", value: volume }, // Volume
      { type: "time", value: firstBarTime }, // First Bar Time
      { type: "time", value: lastBarTime }, // Last Bar Time
      { type: "integer", value: valueAreaVolume }, // Value Area Volume
      { type: "bool", value: subscribeRealtime }, // SubscribeRealtime
      { type: "bool", value: extendToRight } // Extend Right
    ]
  });
}

/**
 * Vigor Index
 * 
 * @param length - The period for the calculation. Defaults to 10.
 */
export const vigorIndexStudy = (session: Session, chart: Chart, series: Series, length: number = 10) => {
  return createStudy(session, chart, series, {
    id: "VigorIndex@tv-basicstudies-251",
    parameters: [
      { type: "integer", value: length } // Length
    ]
  });
}

/**
 * Volatility Index
 * 
 * @param length - The period for the calculation. Defaults to 10.
 */
export const volatilityIndexStudy = (session: Session, chart: Chart, series: Series, length: number = 10) => {
  return createStudy(session, chart, series, {
    id: "VolatilityIndex@tv-basicstudies-251",
    parameters: [
      { type: "integer", value: length } // Length
    ]
  });
}

/**
 * Volume
 * 
 * @param maLength - The length of the moving average for the volume. Defaults to 20.
 * @param colorBasedOnPreviousClose - Whether to color based on previous close. Defaults to false.
 */
export const volumeStudy = (session: Session, chart: Chart, series: Series, maLength: number = 20, colorBasedOnPreviousClose: boolean = false) => {
  return createStudy(session, chart, series, {
    id: "Volume@tv-basicstudies-251",
    parameters: [
      { type: "integer", value: maLength }, // MA Length
      { type: "bool", value: colorBasedOnPreviousClose } // Color based on previous close
    ]
  });
}

/**
 * Williams %R
 * 
 * @param length - The period for the calculation. Defaults to 14.
 * @param source - The source data for the study. Defaults to "close".
 */
export const williamRStudy = (session: Session, chart: Chart, series: Series, length: number = 14, source: string = "close") => {
  return createStudy(session, chart, series, {
    id: "WilliamR@tv-basicstudies-251",
    parameters: [
      { type: "integer", value: length }, // Length
      { type: "source", value: source } // Source
    ]
  });
}

/**
 * Williams Alligator
 * 
 * @param jawLength - The jaw length. Defaults to 13.
 * @param teethLength - The teeth length. Defaults to 8.
 * @param lipsLength - The lips length. Defaults to 5.
 */
export const williamsAlligatorStudy = (session: Session, chart: Chart, series: Series, jawLength: number = 13, teethLength: number = 8, lipsLength: number = 5) => {
  return createStudy(session, chart, series, {
    id: "WilliamsAlligator@tv-basicstudies-251",
    parameters: [
      { type: "integer", value: jawLength }, // Jaw Length
      { type: "integer", value: teethLength }, // Teeth Length
      { type: "integer", value: lipsLength } // Lips Length
    ]
  });
}

/**
 * Williams Fractal
 */
export const williamsFractalStudy = (session: Session, chart: Chart, series: Series) => {
  return createStudy(session, chart, series, {
    id: "WilliamsFractal@tv-basicstudies-251",
    parameters: []
  });
}

/**
 * Zig Zag
 * 
 * @param deviation - The deviation percentage. Defaults to 5.0.
 * @param depth - The depth. Defaults to 10.
 * @param extendToLastBar - Whether to extend to the last bar. Defaults to false.
 */
export const zigZagStudy = (session: Session, chart: Chart, series: Series, deviation: number = 5.0, depth: number = 10, extendToLastBar: boolean = false) => {
  return createStudy(session, chart, series, {
    id: "ZigZag@tv-basicstudies-251",
    parameters: [
      { type: "float", value: deviation }, // Deviation (%)
      { type: "integer", value: depth }, // Depth
      { type: "bool", value: extendToLastBar } // Extend to last bar
    ]
  });
}

/**
 * Chande Momentum Oscillator
 * 
 * @param length - The period for the calculation. Defaults to 9.
 * @param source - The source data for the study. Defaults to "close".
 */
export const chandeMoStudy = (session: Session, chart: Chart, series: Series, length: number = 9, source: string = "close") => {
  return createStudy(session, chart, series, {
    id: "chandeMO@tv-basicstudies-251",
    parameters: [
      { type: "integer", value: length }, // Length
      { type: "source", value: source } // Price
    ]
  });
}

/**
 * Hull Moving Average
 * 
 * @param length - The period for the calculation. Defaults to 9.
 * @param source - The source data for the study. Defaults to "close".
 */
export const hullMaStudy = (session: Session, chart: Chart, series: Series, length: number = 9, source: string = "close") => {
  return createStudy(session, chart, series, {
    id: "hullMA@tv-basicstudies-251",
    parameters: [
      { type: "integer", value: length }, // Length
      { type: "source", value: source } // Price
    ]
  });
}

/**
 * Average Day Range
 * 
 * @param length - The period for the calculation. Defaults to 9.
 */
export const studyAdrStudy = (session: Session, chart: Chart, series: Series, length: number = 9) => {
  return createStudy(session, chart, series, {
    id: "studyADR@tv-basicstudies-251",
    parameters: [
      { type: "integer", value: length } // Length
    ]
  });
}