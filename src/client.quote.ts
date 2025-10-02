export interface Report {
  /** Type of financial reporting period, either quarterly or annual. */
  type: "quarterly" | "annual";
  /** End date of the financial reporting period for the values provided. */
  date: string;
  /** Outstanding short-term liabilities a company owes to suppliers or creditors for goods and services received. */
  accounts_payable: number;
  /** Accounts receivable after subtracting allowances for doubtful or uncollectible accounts. */
  accounts_receivables_net: number;
  /** Wages and salaries owed to employees for work performed but not yet paid. */
  accrued_payroll: number;
  /** Total cumulative depreciation charged on the company’s tangible assets since acquisition. */
  accum_deprec_total: number;
  /** Amount shareholders have paid above the par value of the company’s stock. */
  additional_paid_in_capital: number;
  /** Other non-operating income earned by the company, net of taxes. */
  after_tax_other_income: number;
  /** Gradual expense recognition of intangible assets (like patents or software) over time. */
  amortization: number;
  /** A ratio measuring how efficiently a company uses its assets to generate sales (Revenue ÷ Total Assets). */
  asset_turnover: number;
  /** The number of common shares currently outstanding, not including convertible securities. */
  basic_shares_outstanding: number;
  /** Tangible book value (excluding goodwill and other intangibles) per share. */
  book_tangible_per_share: number;
  /** The company's total equity minus intangible assets and liabilities, divided by the number of shares outstanding. */
  book_value_per_share: number;
  /** Capital expenditures divided by the number of outstanding shares; shows reinvestment intensity per share. */
  capex_per_share: number;
  /** Cash spent on acquiring or upgrading physical assets such as property, plant, or technology. */
  capital_expenditures: number;
  /** Cash used to purchase, upgrade, or maintain physical assets like property, buildings, or equipment. */
  capital_expenditures_fixed_assets: number;
  /** Spending on acquiring or upgrading other non-core or miscellaneous long-term assets not captured in standard capex categories. */
  capital_expenditures_other_assets: number;
  /** Capital expenditures that remained consistent or unchanged over the reporting period, typically indicating no net increase in asset investment. */
  capital_expenditures_unchanged: number;
  /** Future lease payments recognized as liabilities for capitalized leases. */
  capital_lease_obligations: number;
  /** Total expected payments under operating lease agreements that are treated as capital commitments under accounting standards. */
  capital_operating_lease_obligations: number;
  /** Net cash flow from financing activities such as issuing debt, repurchasing shares, and paying dividends. */
  cash_f_financing_activities: number;
  /** Net cash used in investing activities, including purchase or sale of long-term assets and investments. */
  cash_f_investing_activities: number;
  /** Net cash generated from core business operations, excluding financing and investing flows. */
  cash_f_operating_activities: number;
  /** Non-cash adjustments in the cash flow statement representing changes in deferred tax assets and liabilities. */
  cash_flow_deferred_taxes: number;
  /** Non-cash charges related to depreciation and amortization in the cash flow statement. */
  cash_flow_deprecation_n_amortization: number;
  /** Cash on hand and highly liquid short-term investments readily convertible to known cash amounts. */
  cash_n_equivalents: number;
  /** Combined value of cash, cash equivalents, and marketable securities with maturities less than one year. */
  cash_n_short_term_invest: number;
  /** Cash and cash equivalents divided by the number of outstanding shares, reflecting liquidity per share. */
  cash_per_share: number;
  /** Increase or decrease in accounts payable from the previous period. */
  change_in_accounts_payable: number;
  /** Change in money owed by customers between two reporting periods. */
  change_in_accounts_receivable: number;
  /** Period-over-period change in expenses that have been incurred but not yet paid. */
  change_in_accrued_expenses: number;
  /** Difference in inventory value between two balance sheet dates. */
  change_in_inventories: number;
  /** Variation in miscellaneous non-current or current assets not categorized elsewhere. */
  change_in_other_assets: number;
  /** Period-over-period difference in taxes owed but not yet paid to tax authorities. */
  change_in_taxes_payable: number;
  /** Net change in current assets minus current liabilities, used to assess liquidity impact. */
  changes_in_working_capital: number;
  /** Total cash paid out to common shareholders in the form of dividends during the period. */
  common_dividends_cash_flow: number;
  /** Total value of equity attributable to common shareholders, excluding preferred equity. */
  common_equity_total: number;
  /** Nominal or face value of common stock issued, based on the company's charter. */
  common_stock_par: number;
  /** Total direct costs attributable to goods produced or services rendered during the period. */
  cost_of_goods: number;
  /** COGS excluding non-cash depreciation and amortization components, representing pure production costs. */
  cost_of_goods_excl_dep_amort: number;
  /** Portion of long-term debt and capital lease obligations due within one year. */
  current_port_debt_capital_leases: number;
  /** Liquidity ratio comparing current assets to current liabilities; indicates short-term solvency. */
  current_ratio: number;
  /** Ratio indicating the portion of assets financed through total debt; calculated as Total Debt / Total Assets. */
  debt_to_asset: number;
  /** Leverage ratio showing proportion of debt to shareholder equity; higher values indicate greater financial risk. */
  debt_to_equity: number;
  /** Expenditures paid in advance that are amortized over future periods, such as bond issuance costs. */
  deferred_charges: number;
  /** Unearned revenue or income received in advance for goods or services to be delivered within a year. */
  deferred_income_current: number;
  /** Income received in advance for future services or products, recognized as a long-term liability. */
  deferred_income_non_current: number;
  /** Future tax benefits arising from deductible temporary differences or carryforwards. */
  deferred_tax_assests: number;
  /** Future tax obligations arising from temporary differences between accounting and tax treatments of income. */
  deferred_tax_liabilities: number;
  /** Combined depreciation and amortization expense included in the income statement. */
  dep_amort_exp_income_s: number;
  /** Expense from allocating the cost of tangible natural resources (like minerals) over their usage. */
  depreciation_depletion: number;
  /** Net income adjusted for the potential dilution from convertible securities like options or warrants. */
  diluted_net_income: number;
  /** Weighted average number of shares outstanding assuming conversion of all dilutive instruments. */
  diluted_shares_outstanding: number;
  /** Adjustment to earnings or share count to account for potential dilution from securities like options or warrants. */
  dilution_adjustment: number;
  /** Results from business units that have been divested or shut down and are no longer part of ongoing operations. */
  discontinued_operations: number;
  /** Proportion of earnings paid out as dividends to shareholders, usually expressed as a percentage. */
  dividend_payout_ratio: number;
  /** Dividends per share paid to holders of the company’s primary class of common stock. */
  dps_common_stock_prim_issue: number;
  /** Earnings divided by the weighted average number of common shares outstanding during the period. */
  earnings_per_share_basic: number;
  /** Earnings per share calculated assuming all convertible instruments are exercised. */
  earnings_per_share_diluted: number;
  /** Earnings before interest and taxes — an indicator of a company’s profitability from core operations. */
  ebit: number;
  /** Earnings before interest and tax divided by diluted or basic shares outstanding. */
  ebit_per_share: number;
  /** Earnings before interest, taxes, depreciation, and amortization — a proxy for operating cash flow. */
  ebitda: number;
  /** EBITDA as a percentage of revenue, showing operating cash profitability. */
  ebitda_margin: number;
  /** EBITDA divided by the number of shares outstanding, providing a per-share view of operational cash flow. */
  ebitda_per_share: number;
  /** Total value of a business including debt and excluding cash; often used in M&A valuation. */
  enterprise_value: number;
  /** Valuation multiple comparing enterprise value to EBITDA; used for comparing company valuations. */
  enterprise_value_ebitda: number;
  /** Share of profits or losses from equity-method investments, such as affiliates or joint ventures. */
  equity_in_earnings: number;
  /** The time span covered by the report, typically quarterly, semiannual, or annual. */
  fiscal_period: number;
  /** The calendar date marking the end of the fiscal period being reported. */
  fiscal_period_end: number;
  /** Operating cash flow minus capital expenditures; represents cash available to debt and equity holders. */
  free_cash_flow: number;
  /** Free cash flow divided by the number of shares outstanding. */
  free_cash_flow_per_share: number;
  /** Cash-based performance metric used in real estate or REITs, similar to operating income plus non-cash adjustments. */
  funds_f_operations: number;
  /** Intangible asset representing the premium paid over fair value during acquisitions. */
  goodwill: number;
  /** Gross profit as a percentage of total revenue; shows core profitability before overhead. */
  gross_margin: number;
  /** Revenue minus cost of goods sold, representing the core profitability of products or services. */
  gross_profit: number;
  /** Total tax expense recognized for the reporting period. */
  income_tax: number;
  /** Balance sheet liability for taxes that have been incurred but not yet paid. */
  income_tax_payable: number;
  /** Net value of intangible assets after amortization, such as patents and trademarks. */
  intangibles_net: number;
  /** Interest costs added to the cost basis of long-term assets rather than expensed immediately. */
  interest_capitalized: number;
  /** Total interest cost incurred on both short-term and long-term borrowing. */
  interest_expense_on_debt: number;
  /** Ratio of cost of goods sold to average inventory; reflects inventory efficiency. */
  invent_turnover: number;
  /** Inventory of completed products ready for sale or shipment. */
  inventory_finished_goods: number;
  /** Payments made in advance for inventory that is not yet delivered or completed. */
  inventory_progress_payments: number;
  /** Cost of basic materials and supplies held for production use. */
  inventory_raw_materials: number;
  /** Inventory for goods that are in production but not yet completed. */
  inventory_work_in_progress: number;
  /** Investments in entities not fully consolidated, usually due to minority ownership. */
  investments_in_unconcsolidate: number;
  /** Net cash received from issuing debt after repayments and issuance costs. */
  issuance_of_debt_net: number;
  /** Funds raised by issuing debt with maturities longer than one year, such as bonds or loans. */
  issuance_of_long_term_debt: number;
  /** Capital obtained from miscellaneous debt instruments not categorized as long- or short-term. */
  issuance_of_other_debt: number;
  /** Proceeds from issuing debt with maturities under one year, like commercial paper. */
  issuance_of_short_term_debt: number;
  /** Net funds raised through issuing equity, after accounting for buybacks or issuance costs. */
  issuance_of_stock_net: number;
  /** Debt obligations that are due beyond one year, such as bonds or long-term loans. */
  long_term_debt: number;
  /** Long-term borrowing that excludes capital lease obligations; often bonds or secured loans. */
  long_term_debt_excl_capital_lease: number;
  /** Ratio showing the proportion of a company’s assets that are financed through long-term debt. */
  long_term_debt_to_assets: number;
  /** Ratio comparing long-term debt to shareholder equity; shows reliance on debt for financing. */
  long_term_debt_to_equity: number;
  /** Investments not expected to be liquidated within a year, like stocks, bonds, or subsidiaries. */
  long_term_investments: number;
  /** Notes receivable not due within a year; typically from loans or deferred payment agreements. */
  long_term_note_receivable: number;
  /** Miscellaneous non-current assets not classified elsewhere, such as long-term receivables. */
  long_term_other_assets_total: number;
  /** Total market value of a company's outstanding shares based on basic shares outstanding. */
  market_cap_basic: number;
  /** Portion of subsidiary equity not owned by the parent company, shown as a liability or separate equity line. */
  minority_interest: number;
  /** Share of earnings attributable to minority shareholders of subsidiaries not fully owned. */
  minority_interest_exp: number;
  /** Net current asset value per share ratio; indicates financial health relative to stock price. */
  ncavps_ratio: number;
  /** Total debt minus cash and cash equivalents; a measure of financial leverage. */
  net_debt: number;
  /** Company’s total profit after all expenses, taxes, and costs. */
  net_income: number;
  /** Net income before accounting for discontinued operations; reflects ongoing business profitability. */
  net_income_bef_disc_oper: number;
  /** Top-line net income before adjustments in cash flow reconciliation. */
  net_income_starting_line: number;
  /** Final profit margin after all expenses, taxes, and interest are deducted. */
  net_margin: number;
  /** Adjustments in cash flow statements reflecting non-cash expenses like depreciation or stock compensation. */
  non_cash_items: number;
  /** Income earned from activities not part of the company's core operations. */
  non_oper_income: number;
  /** Interest expense related to non-operating financing activities. */
  non_oper_interest_exp: number;
  /** Interest earned from investments or deposits not related to main operations. */
  non_oper_interest_income: number;
  /** Operating income from core business activities before interest and taxes. */
  oper_income: number;
  /** Cash from operations divided by the number of outstanding shares. */
  operating_cash_flow_per_share: number;
  /** Costs incurred in the normal course of business, excluding COGS and financing costs. */
  operating_expenses: number;
  /** Future obligations under operating lease agreements reported as liabilities. */
  operating_lease_liabilities: number;
  /** Operating income as a percentage of revenue; shows operational efficiency. */
  operating_margin: number;
  /** Other components of equity attributable to common shareholders not categorized elsewhere. */
  other_common_equity: number;
  /** Sum of miscellaneous current assets not explicitly classified elsewhere. */
  other_current_assets_total: number;
  /** All short-term liabilities that don’t fall under standard categories. */
  other_current_liabilities: number;
  /** Sum of miscellaneous items affecting financing cash flow. */
  other_financing_cash_flow_items_total: number;
  /** Sources of cash related to financing activities outside common debt or equity issuance. */
  other_financing_cash_flow_sources: number;
  /** Outflows of cash for financing not categorized under major debt or dividend payments. */
  other_financing_cash_flow_uses: number;
  /** Miscellaneous income not derived from core business operations. */
  other_income: number;
  /** Net book value of other intangible assets after amortization and impairment. */
  other_intangibles_net: number;
  /** Sum of miscellaneous cash flows related to investing activities not specifically categorized. */
  other_investing_cash_flow_items_total: number;
  /** Additional sources of cash inflows from investing activities outside of typical asset sales. */
  other_investing_cash_flow_sources: number;
  /** Cash outflows for investing activities not captured by core categories like acquisitions or capex. */
  other_investing_cash_flow_uses: number;
  /** Investments that don’t fall under long-term or marketable securities, such as partnerships or non-consolidated ventures. */
  other_investments: number;
  /** Catch-all for liabilities not individually classified elsewhere on the balance sheet. */
  other_liabilities_total: number;
  /** Sum of miscellaneous operating expenses not classified under standard cost categories. */
  other_oper_expense_total: number;
  /** Proceeds received from equity transactions not classified under standard share issuance categories. */
  other_proceeds_from_stock_sales: number;
  /** Receivables from non-core sources such as employee advances or tax refunds. */
  other_receivables: number;
  /** Capital contributed by shareholders above the par value of the stock. */
  paid_in_capital: number;
  /** Total gross value of all property, plant, and equipment before depreciation. */
  ppe_total_gross: number;
  /** Total net book value of property, plant, and equipment after accumulated depreciation. */
  ppe_total_net: number;
  /** Income before tax expressed as a percentage of revenue. */
  pre_tax_margin: number;
  /** Dividends committed or paid to holders of preferred shares. */
  preferred_dividends: number;
  /** Cash paid to preferred shareholders during the reporting period. */
  preferred_dividends_cash_flow: number;
  /** Book value of preferred shares issued and outstanding. */
  preferred_stock_carrying_value: number;
  /** Payments made in advance for services or goods to be received in the future. */
  prepaid_expenses: number;
  /** Share of earnings from affiliated companies or joint ventures, recorded before tax. */
  pretax_equity_in_earnings: number;
  /** Earnings before income taxes are deducted. */
  pretax_income: number;
  /** Market price per share divided by book value per share; indicates valuation relative to net assets. */
  price_book: number;
  /** Market price per share divided by cash flow per share; a valuation multiple. */
  price_cash_flow: number;
  /** Price-to-earnings ratio; share price divided by earnings per share. */
  price_earnings: number;
  /** Price-to-sales ratio; market cap divided by total revenue, showing valuation relative to sales. */
  price_sales: number;
  /** Cash inflows from exercised employee stock options. */
  proceeds_from_stock_options: number;
  /** Funds set aside to cover potential future losses or liabilities (e.g., legal or credit risks). */
  provision_f_risks: number;
  /** Cash used to acquire a business, including assets and goodwill. */
  purchase_of_business: number;
  /** Expenditures for acquiring new investment instruments or positions. */
  purchase_of_investments: number;
  /** Cash used to buy back company’s own stock from the market. */
  purchase_of_stock: number;
  /** Net effect of acquisitions and divestitures of businesses during the period. */
  purchase_sale_business: number;
  /** Net cash used in buying and selling investments over the period. */
  purchase_sale_investments: number;
  /** Liquidity ratio measuring the ability to meet short-term obligations using quick assets (excludes inventory). */
  quick_ratio: number;
  /** Repayments made on debt obligations with maturities longer than one year. */
  reduction_of_long_term_debt: number;
  /** Expenses related to the development of new products, services, or processes. */
  research_and_dev: number;
  /** Cumulative net earnings not paid out as dividends but retained for reinvestment. */
  retained_earnings: number;
  /** Net income divided by total assets; measures how efficiently assets are used to generate profit. */
  return_on_assets: number;
  /** Net income divided by shareholders’ equity; measures how efficiently equity capital is used. */
  return_on_equity: number;
  /** Profitability measure evaluating how well capital is being used to generate returns. */
  return_on_invested_capital: number;
  /** Total revenue divided by the number of shares outstanding. */
  revenue_per_share: number;
  /** Cash received from issuing new shares of stock to investors. */
  sale_of_stock: number;
  /** Proceeds from the sale or divestiture of business units or subsidiaries. */
  sales_of_business: number;
  /** Proceeds from the sale of investments such as securities or other financial assets. */
  sales_of_investments: number;
  /** Miscellaneous general and administrative costs not categorized under major headings. */
  sell_gen_admin_exp_other: number;
  /** Total of all selling, general, and administrative (SG&A) expenses. */
  sell_gen_admin_exp_total: number;
  /** Debt obligations due within one year, including loans and credit lines. */
  short_term_debt: number;
  /** Short-term borrowings excluding current portion of long-term debt. */
  short_term_debt_excl_current_port: number;
  /** Highly liquid investments expected to be converted to cash within a year. */
  short_term_invest: number;
  /** Residual interest in the assets of the company after deducting liabilities; total shareholder equity. */
  shrhldrs_equity: number;
  /** Cash inflows from issuing new long-term debt instruments. */
  supplying_of_long_term_debt: number;
  /** Unique stock ticker symbol used to identify the company in financial markets. */
  symbol: number;
  /** Sum of all assets owned by the company, both current and non-current. */
  total_assets: number;
  /** Total cash distributed to shareholders as dividends during the reporting period. */
  total_cash_dividends_paid: number;
  /** All assets expected to be used, sold, or converted into cash within one year. */
  total_current_assets: number;
  /** All liabilities due within one year, such as accounts payable and short-term debt. */
  total_current_liabilities: number;
  /** Sum of short-term and long-term debt obligations owed by the company. */
  total_debt: number;
  /** Total debt divided by number of outstanding shares; a measure of leverage per share. */
  total_debt_per_share: number;
  /** Total shareholders’ equity representing ownership in the company after liabilities are deducted. */
  total_equity: number;
  /** Unusual or infrequent gains/losses reported outside of core operations. */
  total_extra_items: number;
  /** Aggregate value of all inventory types, including raw materials, WIP, and finished goods. */
  total_inventory: number;
  /** Sum of all short-term and long-term financial obligations. */
  total_liabilities: number;
  /** Total of all liabilities and shareholder equity; must equal total assets. */
  total_liabilities_shrhldrs_equity: number;
  /** All long-term assets not expected to be converted to cash within one year. */
  total_non_current_assets: number;
  /** All financial obligations not due within one year. */
  total_non_current_liabilities: number;
  /** All income not related to core business operations, such as investment returns. */
  total_non_oper_income: number;
  /** Total costs incurred from normal business operations excluding interest and tax. */
  total_oper_expense: number;
  /** Receivables due from customers, net of allowances for doubtful accounts. */
  total_receivables_net: number;
  /** Total income generated from sales of goods or services before expenses. */
  total_revenue: number;
  /** Total number of shares issued by the company and held by shareholders. */
  total_shares_outstanding: number;
  /** Value of common stock that has been repurchased and held by the company. */
  treasury_stock_common: number;
  /** Non-recurring items such as gains or losses from asset sales, legal settlements, or restructuring. */
  unusual_expense_inc: number;
  /** Working capital (current assets minus current liabilities) divided by total shares outstanding. */
  working_capital_per_share: number;
}

export interface AnnualReport extends Report {
  type: "annual";
  /** Total value of unpaid invoices and bills owed to the company before deducting allowances for doubtful accounts. */
  accounts_receivables_gross: number;
  /** Expenses that have been incurred but not yet paid, such as wages, interest, or utilities. */
  accrued_expenses: number;
  /** Total depreciation taken on buildings owned by the company over their useful life. */
  accum_deprec_buildings: number;
  /** Cumulative depreciation or amortization of computer software assets. */
  accum_deprec_comp_soft: number;
  /** Accumulated depreciation of construction-related assets such as equipment or facilities. */
  accum_deprec_construction: number;
  /** Land is typically not depreciated; if present, reflects land improvements subject to depreciation. */
  accum_deprec_land: number;
  /** Cumulative depreciation on property obtained through lease agreements. */
  accum_deprec_leased_prop: number;
  /** Total accumulated amortization of leased right-of-use assets under lease obligations. */
  accum_deprec_leases: number;
  /** Depreciation applied to manufacturing or industrial equipment and machinery. */
  accum_deprec_machinery: number;
  /** Catch-all for depreciation on all other fixed assets not specified elsewhere. */
  accum_deprec_other: number;
  /** Accumulated amortization of intangible assets not separately listed, such as licenses or non-compete agreements. */
  accum_deprec_other_intang: number;
  /** Total depreciation charged on transportation-related equipment (e.g., trucks, fleet vehicles). */
  accum_deprec_trans_equip: number;
  /** Expense from spreading out deferred charges over time, like bond issuance costs or prepaid legal fees. */
  amortization_of_deferred_charges: number;
  /** The periodic write-down of intangible assets over their useful life, such as licenses or patents. */
  amortization_of_intangibles: number;
  /** Expense recorded to allocate the cost of tangible assets over their useful life. */
  depreciation: number;
  /** Declared dividends owed to shareholders that have not yet been paid. */
  dividends_payable: number;
  /** Dividend per share divided by share price; shows return from dividends alone. */
  dividends_yield: number;
  /** Estimated amount of receivables not expected to be collected; a component of bad debt expense. */
  doubtful_accounts: number;
  /** Number of shares available for public trading, excluding insider holdings and restricted stock. */
  float_shares_outstanding: number;
  /** Expense for writing down goodwill, often due to regulatory or GAAP requirements. */
  goodwill_amortization: number;
  /** Original value of goodwill recorded at acquisition before impairment or amortization adjustments. */
  goodwill_gross: number;
  /** Write-downs in asset value due to declines in fair market value or expected recoverability. */
  impairments: number;
  /** Tax reductions granted for specific activities or investments, reducing overall tax liability. */
  income_tax_credits: number;
  /** Amount of tax payable for the current period based on taxable income reported. */
  income_tax_current: number;
  /** Current income taxes owed to domestic tax authorities based on domestic operations. */
  income_tax_current_domestic: number;
  /** Current income tax expense owed to foreign governments. */
  income_tax_current_foreign: number;
  /** Taxes that are accrued but will be paid or recovered in future periods. */
  income_tax_deferred: number;
  /** Deferred taxes associated with domestic (home country) operations. */
  income_tax_deferred_domestic: number;
  /** Deferred taxes arising from operations outside the company’s home country. */
  income_tax_deferred_foreign: number;
  /** Estimated cost or loss associated with legal disputes or settlements. */
  legal_claim_expense: number;
  /** Short-term debt obligations backed by promissory notes, due within one year. */
  notes_payable_short_term_debt: number;
  /** Total number of employees employed by the company at the end of the reporting period. */
  number_of_employees: number;
  /** Total count of registered shareholders owning shares in the company. */
  number_of_shareholders: number;
  /** Unusual, infrequent, or one-off expenses not part of normal operations. */
  other_exceptional_charges: number;
  /** Gross value of intangible assets not separately categorized, like domain names or trade secrets. */
  other_intangibles_gross: number;
  /** Debt obligations due within one year that don’t fall into traditional notes or credit lines. */
  other_short_term_debt: number;
  /** Gross value of buildings owned before deducting accumulated depreciation. */
  ppe_gross_buildings: number;
  /** Gross value of computer software categorized under property, plant, and equipment. */
  ppe_gross_comp_soft: number;
  /** Total gross value of construction-related assets before depreciation. */
  ppe_gross_construction: number;
  /** Original cost of land owned by the company, not subject to depreciation. */
  ppe_gross_land: number;
  /** Total value of leased properties recognized as assets before amortization. */
  ppe_gross_leased_prop: number;
  /** Gross value of assets under lease agreements recorded under property, plant, and equipment. */
  ppe_gross_leases: number;
  /** Original cost of machinery used in operations, before depreciation. */
  ppe_gross_machinery: number;
  /** Gross value of other property, plant, and equipment not specified in standard categories. */
  ppe_gross_other: number;
  /** Gross value of transportation-related equipment before depreciation. */
  ppe_gross_trans_equip: number;
  /** One-time expenses related to organizational changes like layoffs or asset write-downs. */
  restructuring_charge: number;
  /** Change in value of assets or liabilities that hasn’t been realized through a sale or settlement. */
  unrealized_gain_loss: number;
}

export interface QuarterlyReport extends Report {
  type: "quarterly";
}