#!/usr/bin/env -S deno run --unstable-net --env-file --allow-net --allow-env

import { createSession, createQuote } from "./client.ts";

const session = await createSession(undefined, false);

const quote = await createQuote(session, "META", "NASDAQ");

console.table(quote.reports.filter(t => t.type === 'quarterly').map(report => ({
  date: report.date,
  eps: report.earnings_per_share_basic,
  revenue: report.total_revenue,
  income: report.net_income,
  profit: report.gross_profit,
  margin: report.gross_margin,
  operating_income: report.oper_income,
  market_cap: +(report.market_cap_basic / 1_000_000_000).toFixed(2), // Convert to billions
  shares_outstanding: +(report.total_shares_outstanding / 1_000_000_000).toFixed(2), // Convert to billions
})));
