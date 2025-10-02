import { test, expect, describe } from "vitest";
import { createSession, createQuote } from "../src/client.ts";
import type { Session, Quote } from "../src/client.ts";

const TEST_SYMBOL = "AAPL";
const TEST_EXCHANGE = "NASDAQ";

// Get TradingView token from environment
const TV_TOKEN = process.env.TV_TOKEN;

async function createTestSession(): Promise<Session> {
  return await createSession(TV_TOKEN, false);
}

async function cleanupTestEnvironment(quote: Quote, session: Session) {
  await session.close();
}

describe("Quote Tests", () => {
  test("Quote retrieval for AAPL", async () => {
    const session = await createTestSession();
    try {
      const quote = await createQuote(session, TEST_SYMBOL, TEST_EXCHANGE);
      
      // Test quote structure
      expect(quote).toBeDefined();
      expect(quote.id).toMatch(/^quote_/);
      expect(quote.symbol).toBe(TEST_SYMBOL);
      expect(quote.exchange).toBe(TEST_EXCHANGE);
      expect(Array.isArray(quote.reports)).toBe(true);
      expect(quote.reports.length).toBeGreaterThan(0);
      
      // Test that we have both annual and quarterly reports
      const annualReports = quote.reports.filter(r => r.type === "annual");
      const quarterlyReports = quote.reports.filter(r => r.type === "quarterly");
      
      expect(annualReports.length).toBeGreaterThan(0);
      expect(quarterlyReports.length).toBeGreaterThan(0);
      
      // Test report structure
      const firstReport = quote.reports[0];
      expect(firstReport).toHaveProperty('date');
      expect(firstReport).toHaveProperty('type');
      expect(firstReport).toHaveProperty('symbol');
      expect(['annual', 'quarterly']).toContain(firstReport.type);
      expect(firstReport.symbol).toBe(TEST_SYMBOL);
      
      // Test that dates are in proper format (YYYY-MM-DD for annual, timestamp for quarterly)
      expect(firstReport.date).toBeDefined();
      if (firstReport.type === "annual") {
        expect(firstReport.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      }
      
      await cleanupTestEnvironment(quote, session);
    } catch (error) {
      await session.close();
      throw error;
    }
  });

  test("Quote retrieval for different symbol", async () => {
    const session = await createTestSession();
    try {
      const quote = await createQuote(session, "MSFT", "NASDAQ");
      
      expect(quote).toBeDefined();
      expect(quote.symbol).toBe("MSFT");
      expect(quote.exchange).toBe("NASDAQ");
      expect(quote.reports.length).toBeGreaterThan(0);
      
      await cleanupTestEnvironment(quote, session);
    } catch (error) {
      await session.close();
      throw error;
    }
  });

  test("Quote error handling for invalid symbol", async () => {
    const session = await createTestSession();
    try {
      await expect(
        createQuote(session, "INVALID_SYMBOL_123", "NASDAQ")
      ).rejects.toThrow();
      
      await session.close();
    } catch (error) {
      await session.close();
      throw error;
    }
  });

  test("Quote financial data validation", async () => {
    const session = await createTestSession();
    try {
      const quote = await createQuote(session, TEST_SYMBOL, TEST_EXCHANGE);
      
      // Check that we have expected financial fields
      const firstReport = quote.reports[0];
      
      // These are some common financial fields that should exist
      const expectedFields = [
        'total_revenue',
        'net_income', 
        'total_assets',
        'total_equity'
      ];
      
      // At least some of these fields should exist in the report
      const hasExpectedFields = expectedFields.some(field => 
        firstReport.hasOwnProperty(field)
      );
      
      expect(hasExpectedFields).toBe(true);
      
      await cleanupTestEnvironment(quote, session);
    } catch (error) {
      await session.close();
      throw error;
    }
  });
});