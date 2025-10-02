// deno-lint-ignore-file no-explicit-any
/**
 * TradingView Screener Client
 * A comprehensive TypeScript client for TradingView's screener API
 */

// Core types
export type FilterOperation =
  | "equal" | "not_equal"
  | "less" | "greater" | "eless" | "egreater"
  | "in_range" | "not_in_range"
  | "match" | "not_match"
  | "in_day_range" | "not_in_day_range"
  | "crosses" | "crosses_above" | "crosses_below"
  | "above" | "below";

export type SortOrder = "asc" | "desc";

export type Market = 
  | "america" | "argentina" | "australia" | "austria" | "bahrain" | "bangladesh"
  | "belgium" | "brazil" | "canada" | "chile" | "china" | "colombia" | "croatia"
  | "cyprus" | "czech" | "denmark" | "egypt" | "estonia" | "finland" | "france"
  | "germany" | "greece" | "hongkong" | "hungary" | "iceland" | "india" | "indonesia"
  | "ireland" | "israel" | "italy" | "japan" | "jordan" | "kenya" | "korea"
  | "kuwait" | "latvia" | "lebanon" | "lithuania" | "luxembourg" | "malaysia"
  | "mexico" | "morocco" | "netherlands" | "newzealand" | "norway" | "pakistan"
  | "peru" | "philippines" | "poland" | "portugal" | "qatar" | "romania" | "russia"
  | "saudiarabia" | "serbia" | "singapore" | "slovakia" | "slovenia" | "southafrica"
  | "spain" | "srilanka" | "sweden" | "switzerland" | "taiwan" | "thailand"
  | "turkey" | "uae" | "uk" | "ukraine" | "vietnam";

export type Currency = "usd" | "eur" | "gbp" | "jpy" | "cad" | "aud" | "chf" | "cny" | "inr" | "krw" | "brl" | "rub" | "try" | "zar";

// Comprehensive sector types based on TradingView sectors
export type Sector =
  | "Commercial Services"
  | "Communications"
  | "Consumer Durables"
  | "Consumer Non-Durables"
  | "Consumer Services"
  | "Distribution Services"
  | "Electronic Technology"
  | "Energy Minerals"
  | "Finance"
  | "Government"
  | "Health Services"
  | "Health Technology"
  | "Industrial Services"
  | "Miscellaneous"
  | "Non-Energy Minerals"
  | "Process Industries"
  | "Producer Manufacturing"
  | "Retail Trade"
  | "Technology Services"
  | "Transportation"
  | "Utilities"

// Comprehensive field names based on TradingView screener documentation
export type ScreenerFieldName =
  // Basic Information
  | "name" | "exchange" | "description" | "logoid" | "currency" | "sector" | "industry" | "country"
  | "type" | "typespecs" | "is_primary" | "subtype" | "update_mode"

  // Price & Market Data
  | "close" | "open" | "high" | "low" | "volume" | "premarket_change" | "premarket_change_abs"
  | "postmarket_change" | "postmarket_change_abs" | "change" | "change_abs" | "change_from_open"
  | "change_from_open_abs" | "bid" | "ask" | "spread" | "high_52_week" | "low_52_week"
  | "price_52_week_high" | "price_52_week_low" | "gap" | "average_volume_10d_calc"
  | "average_volume_30d_calc" | "average_volume_60d_calc" | "average_volume_90d_calc"
  | "relative_volume_10d_calc" | "VWAP" | "market_cap_basic" | "market_cap_calc"
  | "market_cap_diluted_calc" | "enterprise_value_calc" | "shares_outstanding_calc"
  | "shares_float_calc"

  // Financial Ratios & Metrics
  | "price_earnings_ttm" | "price_book_fq" | "price_sales_ttm" | "price_cash_fq"
  | "earnings_per_share_ttm" | "earnings_per_share_fq" | "earnings_per_share_forecast_fq"
  | "eps_basic_ttm" | "eps_diluted_ttm" | "revenue_ttm" | "total_revenue" | "net_income"
  | "gross_profit_fq" | "operating_income_fq" | "pretax_income_fq" | "income_per_employee_fq"
  | "revenue_per_employee_fq" | "debt_to_equity_fq" | "current_ratio_fq" | "quick_ratio_fq"
  | "cash_f_operating_activities_ttm" | "cash_f_investing_activities_ttm" | "cash_f_financing_activities_ttm"
  | "free_cash_flow_ttm" | "working_capital_fq" | "total_assets_fq" | "total_debt_fq"
  | "total_current_assets_fq" | "total_current_liabilities_fq" | "goodwill_fq"
  | "retained_earnings_fq" | "stockholders_equity_fq"

  // Dividends
  | "dividend_yield_recent" | "dividend_yield_indicated_annual_calc" | "dividends_paid_ttm"
  | "dividends_paid_fq" | "dividend_indicated_annual_calc" | "dividend_ex_date"
  | "dividend_payout_ratio_ttm"

  // Performance Metrics
  | "Perf.1D" | "Perf.W" | "Perf.1M" | "Perf.3M" | "Perf.6M" | "Perf.YTD" | "Perf.Y" | "Perf.5Y"
  | "Perf.10Y" | "Perf.All" | "price_performance_52_week"

  // Volatility
  | "Volatility.D" | "Volatility.W" | "Volatility.M" | "beta_1_year" | "beta_5_year"

  // Technical Indicators
  | "RSI" | "RSI[1]" | "Stoch.K" | "Stoch.D" | "Stoch.K[1]" | "Stoch.D[1]"
  | "CCI20" | "CCI20[1]" | "ADX" | "ADX+DI" | "ADX-DI" | "ADX+DI[1]" | "ADX-DI[1]"
  | "AO" | "AO[1]" | "AO[2]" | "Mom" | "Mom[1]" | "MACD.macd" | "MACD.signal"
  | "Rec.Stoch.RSI" | "Rec.WR" | "Rec.BBPower" | "Rec.UO" | "price_earnings_ttm"
  | "W.R" | "BBPower" | "UO" | "EMA10" | "EMA20" | "EMA30" | "EMA50" | "EMA100" | "EMA200"
  | "SMA10" | "SMA20" | "SMA30" | "SMA50" | "SMA100" | "SMA200"
  | "VWMA20" | "HullMA9" | "TEMA30" | "DEMA30"
  | "BB.lower" | "BB.upper" | "Ichimoku.BLine" | "Ichimoku.CLine"
  | "Pivot.M.Classic.S3" | "Pivot.M.Classic.S2" | "Pivot.M.Classic.S1" | "Pivot.M.Classic.Middle"
  | "Pivot.M.Classic.R1" | "Pivot.M.Classic.R2" | "Pivot.M.Classic.R3"
  | "Pivot.M.Fibonacci.S3" | "Pivot.M.Fibonacci.S2" | "Pivot.M.Fibonacci.S1" | "Pivot.M.Fibonacci.Middle"
  | "Pivot.M.Fibonacci.R1" | "Pivot.M.Fibonacci.R2" | "Pivot.M.Fibonacci.R3"
  | "Pivot.M.Camarilla.S3" | "Pivot.M.Camarilla.S2" | "Pivot.M.Camarilla.S1" | "Pivot.M.Camarilla.Middle"
  | "Pivot.M.Camarilla.R1" | "Pivot.M.Camarilla.R2" | "Pivot.M.Camarilla.R3"
  | "Pivot.M.Woodie.S3" | "Pivot.M.Woodie.S2" | "Pivot.M.Woodie.S1" | "Pivot.M.Woodie.Middle"
  | "Pivot.M.Woodie.R1" | "Pivot.M.Woodie.R2" | "Pivot.M.Woodie.R3"
  | "Pivot.M.Demark.S1" | "Pivot.M.Demark.Middle" | "Pivot.M.Demark.R1"

  // Recommendations & Ratings
  | "Rec.Stoch.RSI" | "Rec.WR" | "Rec.BBPower" | "Rec.UO" | "Rec.Ichimoku" | "Rec.HullMA9"
  | "Recommend.MA" | "Recommend.Other" | "Recommend.All"

  // Analyst Data
  | "earnings_release_date" | "earnings_release_next_date" | "target_price_average"
  | "target_price_median" | "target_price_high" | "target_price_low" | "analyst_rating"
  | "analyst_rating_strong_buy" | "analyst_rating_buy" | "analyst_rating_hold"
  | "analyst_rating_sell" | "analyst_rating_strong_sell"

  // Growth Rates
  | "revenue_growth_ttm_yoy" | "revenue_growth_fq_yoy" | "earnings_growth_ttm_yoy"
  | "earnings_growth_fq_yoy" | "sales_growth_fq_yoy" | "price_sales_growth_ttm_yoy"
  | "book_value_growth_fq_yoy" | "dividend_growth_5y" | "earnings_growth_3y" | "earnings_growth_5y"
  | "sales_growth_3y" | "sales_growth_5y"

  // Options Data
  | "option_put_call_ratio" | "option_implied_volatility_1w" | "option_implied_volatility_1m"
  | "total_shares_outstanding_fundamental" | "float_shares_outstanding"

  // ESG & Alternative Data
  | "environmental_score" | "social_score" | "governance_score" | "total_esg_score"
  | "controversies_score" | "esg_risk_score"

  // Commodity & Futures specific
  | "contract_expiration_date" | "days_to_expiration" | "first_notice_date"
  | "last_trading_date" | "contract_size" | "point_value"

  // Forex specific
  | "base_currency" | "quote_currency";

export interface Filter {
  left: ScreenerFieldName;
  operation: FilterOperation;
  right: any;
}

export interface LogicalFilter {
  operator: "and" | "or";
  operands: (Filter | LogicalFilter)[];
}

export interface Sort {
  sortBy: ScreenerFieldName;
  sortOrder: SortOrder;
}

export interface ScreenerOptions {
  columns?: ScreenerFieldName[];
  filter?: (Filter | LogicalFilter)[];
  ignore_unknown_fields?: boolean;
  options?: {
    lang?: string;
    active_symbols_only?: boolean;
    primary_listing?: boolean;
  };
  price_conversion?: {
    to_currency?: Currency;
  };
  range?: [number, number];
  sort?: Sort;
  symbols?: Record<string, any>;
  markets?: Market[];
  preset?: string;
}

export interface ScreenerResult {
  data: Array<{
    s: string;
    d: any[];
  }>;
  totalCount: number;
}

export interface ScreenerRow {
  symbol?: string;
  [key: string]: any;
}

// Comprehensive field definitions mapped to TradingView API field names
export const SCREENER_FIELDS: Record<ScreenerFieldName, string> = {
  // Basic Information
  name: "name",
  exchange: "exchange",
  description: "description",
  logoid: "logoid",
  currency: "currency",
  sector: "sector",
  industry: "industry",
  country: "country",
  type: "type",
  typespecs: "typespecs",
  is_primary: "is_primary",
  subtype: "subtype",
  update_mode: "update_mode",

  // Price & Market Data
  close: "close",
  open: "open",
  high: "high",
  low: "low",
  volume: "volume",
  premarket_change: "premarket_change",
  premarket_change_abs: "premarket_change_abs",
  postmarket_change: "postmarket_change",
  postmarket_change_abs: "postmarket_change_abs",
  change: "change",
  change_abs: "change_abs",
  change_from_open: "change_from_open",
  change_from_open_abs: "change_from_open_abs",
  bid: "bid",
  ask: "ask",
  spread: "spread",
  high_52_week: "high_52_week",
  low_52_week: "low_52_week",
  price_52_week_high: "price_52_week_high",
  price_52_week_low: "price_52_week_low",
  gap: "gap",
  average_volume_10d_calc: "average_volume_10d_calc",
  average_volume_30d_calc: "average_volume_30d_calc",
  average_volume_60d_calc: "average_volume_60d_calc",
  average_volume_90d_calc: "average_volume_90d_calc",
  relative_volume_10d_calc: "relative_volume_10d_calc",
  VWAP: "VWAP",
  market_cap_basic: "market_cap_basic",
  market_cap_calc: "market_cap_calc",
  market_cap_diluted_calc: "market_cap_diluted_calc",
  enterprise_value_calc: "enterprise_value_calc",
  shares_outstanding_calc: "shares_outstanding_calc",
  shares_float_calc: "shares_float_calc",

  // Financial Ratios & Metrics
  price_earnings_ttm: "price_earnings_ttm",
  price_book_fq: "price_book_fq",
  price_sales_ttm: "price_sales_ttm",
  price_cash_fq: "price_cash_fq",
  earnings_per_share_ttm: "earnings_per_share_ttm",
  earnings_per_share_fq: "earnings_per_share_fq",
  earnings_per_share_forecast_fq: "earnings_per_share_forecast_fq",
  eps_basic_ttm: "eps_basic_ttm",
  eps_diluted_ttm: "eps_diluted_ttm",
  revenue_ttm: "revenue_ttm",
  total_revenue: "total_revenue",
  net_income: "net_income",
  gross_profit_fq: "gross_profit_fq",
  operating_income_fq: "operating_income_fq",
  pretax_income_fq: "pretax_income_fq",
  income_per_employee_fq: "income_per_employee_fq",
  revenue_per_employee_fq: "revenue_per_employee_fq",
  debt_to_equity_fq: "debt_to_equity_fq",
  current_ratio_fq: "current_ratio_fq",
  quick_ratio_fq: "quick_ratio_fq",
  cash_f_operating_activities_ttm: "cash_f_operating_activities_ttm",
  cash_f_investing_activities_ttm: "cash_f_investing_activities_ttm",
  cash_f_financing_activities_ttm: "cash_f_financing_activities_ttm",
  free_cash_flow_ttm: "free_cash_flow_ttm",
  working_capital_fq: "working_capital_fq",
  total_assets_fq: "total_assets_fq",
  total_debt_fq: "total_debt_fq",
  total_current_assets_fq: "total_current_assets_fq",
  total_current_liabilities_fq: "total_current_liabilities_fq",
  goodwill_fq: "goodwill_fq",
  retained_earnings_fq: "retained_earnings_fq",
  stockholders_equity_fq: "stockholders_equity_fq",

  // Dividends
  dividend_yield_recent: "dividend_yield_recent",
  dividend_yield_indicated_annual_calc: "dividend_yield_indicated_annual_calc",
  dividends_paid_ttm: "dividends_paid_ttm",
  dividends_paid_fq: "dividends_paid_fq",
  dividend_indicated_annual_calc: "dividend_indicated_annual_calc",
  dividend_ex_date: "dividend_ex_date",
  dividend_payout_ratio_ttm: "dividend_payout_ratio_ttm",

  // Performance Metrics
  "Perf.1D": "Perf.1D",
  "Perf.W": "Perf.W",
  "Perf.1M": "Perf.1M",
  "Perf.3M": "Perf.3M",
  "Perf.6M": "Perf.6M",
  "Perf.YTD": "Perf.YTD",
  "Perf.Y": "Perf.Y",
  "Perf.5Y": "Perf.5Y",
  "Perf.10Y": "Perf.10Y",
  "Perf.All": "Perf.All",
  price_performance_52_week: "price_performance_52_week",

  // Volatility
  "Volatility.D": "Volatility.D",
  "Volatility.W": "Volatility.W",
  "Volatility.M": "Volatility.M",
  beta_1_year: "beta_1_year",
  beta_5_year: "beta_5_year",

  // Technical Indicators
  RSI: "RSI",
  "RSI[1]": "RSI[1]",
  "Stoch.K": "Stoch.K",
  "Stoch.D": "Stoch.D",
  "Stoch.K[1]": "Stoch.K[1]",
  "Stoch.D[1]": "Stoch.D[1]",
  CCI20: "CCI20",
  "CCI20[1]": "CCI20[1]",
  ADX: "ADX",
  "ADX+DI": "ADX+DI",
  "ADX-DI": "ADX-DI",
  "ADX+DI[1]": "ADX+DI[1]",
  "ADX-DI[1]": "ADX-DI[1]",
  AO: "AO",
  "AO[1]": "AO[1]",
  "AO[2]": "AO[2]",
  Mom: "Mom",
  "Mom[1]": "Mom[1]",
  "MACD.macd": "MACD.macd",
  "MACD.signal": "MACD.signal",
  "Rec.Stoch.RSI": "Rec.Stoch.RSI",
  "Rec.WR": "Rec.WR",
  "Rec.BBPower": "Rec.BBPower",
  "Rec.UO": "Rec.UO",
  "W.R": "W.R",
  BBPower: "BBPower",
  UO: "UO",
  EMA10: "EMA10",
  EMA20: "EMA20",
  EMA30: "EMA30",
  EMA50: "EMA50",
  EMA100: "EMA100",
  EMA200: "EMA200",
  SMA10: "SMA10",
  SMA20: "SMA20",
  SMA30: "SMA30",
  SMA50: "SMA50",
  SMA100: "SMA100",
  SMA200: "SMA200",
  VWMA20: "VWMA20",
  HullMA9: "HullMA9",
  TEMA30: "TEMA30",
  DEMA30: "DEMA30",
  "BB.lower": "BB.lower",
  "BB.upper": "BB.upper",
  "Ichimoku.BLine": "Ichimoku.BLine",
  "Ichimoku.CLine": "Ichimoku.CLine",
  "Pivot.M.Classic.S3": "Pivot.M.Classic.S3",
  "Pivot.M.Classic.S2": "Pivot.M.Classic.S2",
  "Pivot.M.Classic.S1": "Pivot.M.Classic.S1",
  "Pivot.M.Classic.Middle": "Pivot.M.Classic.Middle",
  "Pivot.M.Classic.R1": "Pivot.M.Classic.R1",
  "Pivot.M.Classic.R2": "Pivot.M.Classic.R2",
  "Pivot.M.Classic.R3": "Pivot.M.Classic.R3",
  "Pivot.M.Fibonacci.S3": "Pivot.M.Fibonacci.S3",
  "Pivot.M.Fibonacci.S2": "Pivot.M.Fibonacci.S2",
  "Pivot.M.Fibonacci.S1": "Pivot.M.Fibonacci.S1",
  "Pivot.M.Fibonacci.Middle": "Pivot.M.Fibonacci.Middle",
  "Pivot.M.Fibonacci.R1": "Pivot.M.Fibonacci.R1",
  "Pivot.M.Fibonacci.R2": "Pivot.M.Fibonacci.R2",
  "Pivot.M.Fibonacci.R3": "Pivot.M.Fibonacci.R3",
  "Pivot.M.Camarilla.S3": "Pivot.M.Camarilla.S3",
  "Pivot.M.Camarilla.S2": "Pivot.M.Camarilla.S2",
  "Pivot.M.Camarilla.S1": "Pivot.M.Camarilla.S1",
  "Pivot.M.Camarilla.Middle": "Pivot.M.Camarilla.Middle",
  "Pivot.M.Camarilla.R1": "Pivot.M.Camarilla.R1",
  "Pivot.M.Camarilla.R2": "Pivot.M.Camarilla.R2",
  "Pivot.M.Camarilla.R3": "Pivot.M.Camarilla.R3",
  "Pivot.M.Woodie.S3": "Pivot.M.Woodie.S3",
  "Pivot.M.Woodie.S2": "Pivot.M.Woodie.S2",
  "Pivot.M.Woodie.S1": "Pivot.M.Woodie.S1",
  "Pivot.M.Woodie.Middle": "Pivot.M.Woodie.Middle",
  "Pivot.M.Woodie.R1": "Pivot.M.Woodie.R1",
  "Pivot.M.Woodie.R2": "Pivot.M.Woodie.R2",
  "Pivot.M.Woodie.R3": "Pivot.M.Woodie.R3",
  "Pivot.M.Demark.S1": "Pivot.M.Demark.S1",
  "Pivot.M.Demark.Middle": "Pivot.M.Demark.Middle",
  "Pivot.M.Demark.R1": "Pivot.M.Demark.R1",

  // Recommendations & Ratings
  "Rec.Ichimoku": "Rec.Ichimoku",
  "Rec.HullMA9": "Rec.HullMA9",
  "Recommend.MA": "Recommend.MA",
  "Recommend.Other": "Recommend.Other",
  "Recommend.All": "Recommend.All",

  // Analyst Data
  earnings_release_date: "earnings_release_date",
  earnings_release_next_date: "earnings_release_next_date",
  target_price_average: "target_price_average",
  target_price_median: "target_price_median",
  target_price_high: "target_price_high",
  target_price_low: "target_price_low",
  analyst_rating: "analyst_rating",
  analyst_rating_strong_buy: "analyst_rating_strong_buy",
  analyst_rating_buy: "analyst_rating_buy",
  analyst_rating_hold: "analyst_rating_hold",
  analyst_rating_sell: "analyst_rating_sell",
  analyst_rating_strong_sell: "analyst_rating_strong_sell",

  // Growth Rates
  revenue_growth_ttm_yoy: "revenue_growth_ttm_yoy",
  revenue_growth_fq_yoy: "revenue_growth_fq_yoy",
  earnings_growth_ttm_yoy: "earnings_growth_ttm_yoy",
  earnings_growth_fq_yoy: "earnings_growth_fq_yoy",
  sales_growth_fq_yoy: "sales_growth_fq_yoy",
  price_sales_growth_ttm_yoy: "price_sales_growth_ttm_yoy",
  book_value_growth_fq_yoy: "book_value_growth_fq_yoy",
  dividend_growth_5y: "dividend_growth_5y",
  earnings_growth_3y: "earnings_growth_3y",
  earnings_growth_5y: "earnings_growth_5y",
  sales_growth_3y: "sales_growth_3y",
  sales_growth_5y: "sales_growth_5y",

  // Options Data
  option_put_call_ratio: "option_put_call_ratio",
  option_implied_volatility_1w: "option_implied_volatility_1w",
  option_implied_volatility_1m: "option_implied_volatility_1m",
  total_shares_outstanding_fundamental: "total_shares_outstanding_fundamental",
  float_shares_outstanding: "float_shares_outstanding",

  // ESG & Alternative Data
  environmental_score: "environmental_score",
  social_score: "social_score",
  governance_score: "governance_score",
  total_esg_score: "total_esg_score",
  controversies_score: "controversies_score",
  esg_risk_score: "esg_risk_score",

  // Commodity & Futures specific
  contract_expiration_date: "contract_expiration_date",
  days_to_expiration: "days_to_expiration",
  first_notice_date: "first_notice_date",
  last_trading_date: "last_trading_date",
  contract_size: "contract_size",
  point_value: "point_value",

  // Forex specific
  base_currency: "base_currency",
  quote_currency: "quote_currency",
} as const;

// Type mapping for field-specific value types
export type FieldValueType<T extends ScreenerFieldName> =
  T extends "sector" ? Sector :
  T extends "currency" ? Currency :
  T extends "country" ? string :
  T extends "exchange" ? string :
  T extends "industry" ? string :
  T extends "name" ? string :
  T extends "description" ? string :
  T extends "type" ? string :
  T extends "subtype" ? string :
  T extends "typespecs" ? string :
  T extends "base_currency" ? Currency :
  T extends "quote_currency" ? Currency :
  T extends "is_primary" ? boolean :
  // Performance fields
  T extends "Perf.1D" | "Perf.W" | "Perf.1M" | "Perf.3M" | "Perf.6M" | "Perf.YTD" | "Perf.Y" | "Perf.5Y" | "Perf.10Y" | "Perf.All" ? number :
  // Technical indicators
  T extends "RSI" | "RSI[1]" | "Stoch.K" | "Stoch.D" | "Stoch.K[1]" | "Stoch.D[1]" | "CCI20" | "CCI20[1]" | "ADX" | "ADX+DI" | "ADX-DI" | "ADX+DI[1]" | "ADX-DI[1]" | "AO" | "AO[1]" | "AO[2]" | "Mom" | "Mom[1]" | "MACD.macd" | "MACD.signal" | "W.R" | "BBPower" | "UO" ? number :
  // Moving averages
  T extends "EMA10" | "EMA20" | "EMA30" | "EMA50" | "EMA100" | "EMA200" | "SMA10" | "SMA20" | "SMA30" | "SMA50" | "SMA100" | "SMA200" | "VWMA20" | "HullMA9" | "TEMA30" | "DEMA30" ? number :
  // Bollinger Bands & Pivot Points
  T extends "BB.lower" | "BB.upper" | "Ichimoku.BLine" | "Ichimoku.CLine" ? number :
  // Volatility
  T extends "Volatility.D" | "Volatility.W" | "Volatility.M" | "beta_1_year" | "beta_5_year" ? number :
  // Financial ratios and metrics - numeric
  T extends "price_earnings_ttm" | "price_book_fq" | "price_sales_ttm" | "price_cash_fq" | "market_cap_basic" | "market_cap_calc" | "market_cap_diluted_calc" | "enterprise_value_calc" | "shares_outstanding_calc" | "shares_float_calc" | "revenue_ttm" | "total_revenue" | "net_income" | "earnings_per_share_ttm" | "earnings_per_share_fq" | "eps_basic_ttm" | "eps_diluted_ttm" | "dividend_yield_recent" | "dividend_yield_indicated_annual_calc" | "dividends_paid_ttm" | "dividends_paid_fq" | "dividend_indicated_annual_calc" | "dividend_payout_ratio_ttm" | "debt_to_equity_fq" | "current_ratio_fq" | "quick_ratio_fq" | "free_cash_flow_ttm" | "working_capital_fq" | "total_assets_fq" | "total_debt_fq" | "total_current_assets_fq" | "total_current_liabilities_fq" | "goodwill_fq" | "retained_earnings_fq" | "stockholders_equity_fq" ? number :
  // Price and volume fields
  T extends "close" | "open" | "high" | "low" | "volume" | "change" | "change_abs" | "bid" | "ask" | "spread" | "high_52_week" | "low_52_week" | "gap" | "VWAP" | "average_volume_10d_calc" | "average_volume_30d_calc" | "average_volume_60d_calc" | "average_volume_90d_calc" | "relative_volume_10d_calc" ? number :
  // Growth rates
  T extends "revenue_growth_ttm_yoy" | "revenue_growth_fq_yoy" | "earnings_growth_ttm_yoy" | "earnings_growth_fq_yoy" | "sales_growth_fq_yoy" | "price_sales_growth_ttm_yoy" | "book_value_growth_fq_yoy" | "dividend_growth_5y" | "earnings_growth_3y" | "earnings_growth_5y" | "sales_growth_3y" | "sales_growth_5y" ? number :
  // Analyst ratings
  T extends "target_price_average" | "target_price_median" | "target_price_high" | "target_price_low" | "analyst_rating" | "analyst_rating_strong_buy" | "analyst_rating_buy" | "analyst_rating_hold" | "analyst_rating_sell" | "analyst_rating_strong_sell" ? number :
  // Date fields
  T extends "dividend_ex_date" | "earnings_release_date" | "earnings_release_next_date" | "contract_expiration_date" | "first_notice_date" | "last_trading_date" ? string :
  // Default to any for unmapped fields
  any;

export class FieldFilter<T extends ScreenerFieldName> {
  constructor(
    private field: T,
    private query: ScreenerQuery
  ) { }

  eq(value: FieldValueType<T>): ScreenerQuery {
    return this.query.addFilter(this.field, "equal", value);
  }

  ne(value: FieldValueType<T>): ScreenerQuery {
    return this.query.addFilter(this.field, "not_equal", value);
  }

  gt(value: FieldValueType<T>): ScreenerQuery {
    return this.query.addFilter(this.field, "greater", value);
  }

  gte(value: FieldValueType<T>): ScreenerQuery {
    return this.query.addFilter(this.field, "egreater", value);
  }

  lt(value: FieldValueType<T>): ScreenerQuery {
    return this.query.addFilter(this.field, "less", value);
  }

  lte(value: FieldValueType<T>): ScreenerQuery {
    return this.query.addFilter(this.field, "eless", value);
  }

  between(min: FieldValueType<T>, max: FieldValueType<T>): ScreenerQuery {
    return this.query.addFilter(this.field, "in_range", [min, max]);
  }

  notBetween(min: FieldValueType<T>, max: FieldValueType<T>): ScreenerQuery {
    return this.query.addFilter(this.field, "not_in_range", [min, max]);
  }

  matches(pattern: string): ScreenerQuery {
    return this.query.addFilter(this.field, "match", pattern);
  }

  notMatches(pattern: string): ScreenerQuery {
    return this.query.addFilter(this.field, "not_match", pattern);
  }

  crosses(value: FieldValueType<T>): ScreenerQuery {
    return this.query.addFilter(this.field, "crosses", value);
  }

  crossesAbove(value: FieldValueType<T>): ScreenerQuery {
    return this.query.addFilter(this.field, "crosses_above", value);
  }

  crossesBelow(value: FieldValueType<T>): ScreenerQuery {
    return this.query.addFilter(this.field, "crosses_below", value);
  }

  above(value: FieldValueType<T>): ScreenerQuery {
    return this.query.addFilter(this.field, "above", value);
  }

  below(value: FieldValueType<T>): ScreenerQuery {
    return this.query.addFilter(this.field, "below", value);
  }

  /**
   * Filter for values that are in the provided array (uses in_range operation)
   * Perfect for selecting multiple sectors, currencies, or other categorical values
   */
  in(values: FieldValueType<T>[]): ScreenerQuery {
    return this.query.addFilter(this.field, "in_range", values);
  }

  /**
   * Filter for values that are NOT in the provided array (uses not_in_range operation)
   */
  notIn(values: FieldValueType<T>[]): ScreenerQuery {
    return this.query.addFilter(this.field, "not_in_range", values);
  }
}

// Simple filter builder for sub-queries
export class FilterBuilder {
  public filters: (Filter | LogicalFilter)[] = [];

  where(field: ScreenerFieldName, operation: FilterOperation, value: any): this {
    this.filters.push({ left: field, operation, right: value });
    return this;
  }
}

export class ScreenerQuery {
  private options: ScreenerOptions = {
    columns: [],
    filter: [],
    ignore_unknown_fields: false,
    options: { lang: "en" },
    range: [0, 50],
    symbols: {},
  };

  constructor(markets?: Market[]) {
    // Default to stocks only with primary listings
    this.addFilter("is_primary", "equal", true);

    if (markets && markets.length > 0) {
      this.options.markets = markets;
    }
  }

  addFilter(field: ScreenerFieldName, operation: FilterOperation, value: any): this {
    const filter: Filter = { left: field, operation, right: value };
    this.options.filter = [...(this.options.filter || []), filter];
    return this;
  }

  /**
   * Select specific columns/fields to return
   */
  select(...columns: ScreenerFieldName[]): this {
    this.options.columns = [...(this.options.columns || []), ...columns];
    return this;
  }

  /**
   * Start building a filter condition for a field
   */
  where<T extends ScreenerFieldName>(field: T): FieldFilter<T> {
    return new FieldFilter(field, this);
  }

  /**
   * Add an AND condition group
   */
  and(callback: (query: ScreenerQuery) => void): this {
    const subQuery = new ScreenerQuery();
    subQuery.options.filter = [];
    // Don't add the default is_primary filter for sub-queries
    subQuery.options.filter = [];
    callback(subQuery);

    if (subQuery.options.filter && subQuery.options.filter.length > 0) {
      const andFilter: LogicalFilter = {
        operator: "and",
        operands: subQuery.options.filter
      };
      this.options.filter = [...(this.options.filter || []), andFilter];
    }
    return this;
  }

  /**
   * Add an OR condition group
   */
  or(callback: (query: ScreenerQuery) => void): this {
    const subQuery = new ScreenerQuery();
    subQuery.options.filter = [];
    // Don't add the default is_primary filter for sub-queries
    subQuery.options.filter = [];
    callback(subQuery);

    if (subQuery.options.filter && subQuery.options.filter.length > 0) {
      const orFilter: LogicalFilter = {
        operator: "or",
        operands: subQuery.options.filter
      };
      this.options.filter = [...(this.options.filter || []), orFilter];
    }
    return this;
  }

  /**
   * Set sorting
   */
  orderBy(field: ScreenerFieldName, order: SortOrder = "desc"): this {
    this.options.sort = { sortBy: field, sortOrder: order };
    return this;
  }

  /**
   * Set pagination range
   */
  limit(count: number): this {
    const currentRange = this.options.range || [0, 50];
    this.options.range = [currentRange[0], currentRange[0] + count];
    return this;
  }

  /**
   * Set pagination offset
   */
  offset(start: number): this {
    const currentRange = this.options.range || [0, 50];
    const count = currentRange[1] - currentRange[0];
    this.options.range = [start, start + count];
    return this;
  }

  /**
   * Set or override the markets for the screener
   */
  market(...markets: Market[]): this {
    this.options.markets = markets.length > 0 ? markets : undefined;
    return this;
  }

  /**
   * Set price conversion currency
   */
  currency(currency: Currency): this {
    this.options.price_conversion = { to_currency: currency };
    return this;
  }

  /**
   * Set language for results
   */
  setLanguage(lang: string): this {
    this.options.options = { ...this.options.options, lang };
    return this;
  }

  /**
   * Only include active symbols
   */
  activeSymbolsOnly(active = true): this {
    this.options.options = { ...this.options.options, active_symbols_only: active };
    return this;
  }

  /**
   * Only include primary listings
   */
  primaryListingOnly(primary = true): this {
    this.options.options = { ...this.options.options, primary_listing: primary };
    return this;
  }

  /**
   * Get the current query options
   */
  getOptions(): ScreenerOptions {
    return { ...this.options };
  }

  /**
   * Execute the screener query
   */
  async execute(): Promise<ScreenerResult> {
    const response = await fetch("https://scanner.tradingview.com/global/scan", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Accept-Language": "en-GB,en;q=0.9",
        "Content-Type": "text/plain;charset=UTF-8",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0.1 Safari/605.1.15"
      },
      body: JSON.stringify(this.options),
      mode: "cors",
      credentials: "include",
      referrer: "https://www.tradingview.com/",
      referrerPolicy: "origin-when-cross-origin"
    });

    if (!response.ok) {
      throw new Error(`Screener API error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  }

  /**
   * Execute and get results as objects with column names as keys
   */
  async get(): Promise<ScreenerRow[]> {
    const result = await this.execute();
    const columns = this.options.columns || [];

    return result.data.map(item => {
      const obj: ScreenerRow = {
        symbol: item.s
      };
      columns.forEach((col, index) => {
        obj[col] = item.d[index];
      });
      return obj;
    });
  }
}

/**
 * Create a new screener query
 */
export function createScreener(...markets: Market[]): ScreenerQuery {
  return new ScreenerQuery(markets.length > 0 ? markets : undefined);
}

// Export the main client
export { ScreenerQuery as default };
