# metricport-mcp

MCP server for **Google Search Console, Google Ads and AdSense**, usable from Claude, Cursor, Windsurf, VS Code, ChatGPT and any other MCP client.

This package is a thin local client. The server itself runs hosted at [metricport.io](https://metricport.io): it holds the Google OAuth connection, talks to the three Google APIs, and exposes 57 read-only analysis tools plus daily insights, alerts and reports. You never create a Google Cloud project, OAuth client or developer token yourself.

```bash
npx metricport-mcp
```

## Quick start

1. Create a free account at [metricport.io](https://metricport.io) and connect a Google account (Search Console on Free, Ads and AdSense on Pro).
2. Add the server to your client. Either sign in once in the browser, or create an API key at <https://metricport.io/app/keys>.

**Claude Desktop** (`claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "metricport": {
      "command": "npx",
      "args": ["-y", "metricport-mcp"],
      "env": { "METRICPORT_API_KEY": "mp_..." }
    }
  }
}
```

**Cursor** (`.cursor/mcp.json`), **Windsurf**, **VS Code** (`.vscode/mcp.json`): same shape.

**claude.ai, ChatGPT and other clients that support remote servers** need no package at all. Add a custom connector with the URL `https://metricport.io/api/mcp` and sign in.

## What you can ask

- "Which pages lost the most clicks this week, and what do they have in common?"
- "Show me striking-distance queries on positions 5 to 20 with real impressions."
- "Which search terms in my Google Ads account spend money without converting?"
- "Why did my AdSense earnings drop compared to last month?"
- "Where do I pay for keywords I already rank for organically?"

## Tools

| Tool | What it does |
|---|---|
| `gsc_search_analytics` | Search performance (clicks, impressions, CTR, position) grouped by dimensions with optional filters |
| `gsc_top_queries` | Top search queries by clicks over the last N days (default 28) |
| `gsc_top_pages` | Top pages by clicks over the last N days (default 28) |
| `gsc_page_queries` | All queries a single URL ranks for, with clicks, impressions, CTR and position |
| `gsc_quick_wins` | Queries ranking in striking distance (default positions 5-20) with real impressions, ranked by estimated extra clicks if pushed up ~3 positions |
| `gsc_ctr_opportunities` | Queries on page one whose CTR is far below the expected CTR for their position |
| `gsc_content_decay` | Pages that lost the most clicks versus the previous period (or the same period last year with compareTo=year) |
| `gsc_new_and_lost_queries` | Queries that appeared this period but not in the previous one, and queries that disappeared |
| `gsc_cannibalization` | Queries where two or more of your pages compete for the same keyword |
| `gsc_brand_split` | Splits queries into brand and non-brand using a regex (e.g |
| `gsc_query_clusters` | Groups queries by shared terms into topic clusters with total clicks, impressions and example queries |
| `gsc_question_queries` | Queries phrased as questions (how, what, why, wie, was, warum…) sorted by impressions |
| `gsc_zero_click_pages` | Pages that get impressions but no clicks |
| `gsc_daily_trend` | Daily clicks and impressions with a 7-day moving average, flagged drops or spikes (≥30% vs |
| `gsc_device_country_breakdown` | Clicks, impressions, CTR and position per device and per country, with the CTR gap between mobile and desktop |
| `gsc_search_appearance` | Performance by search appearance (rich results, video, AMP…) plus Discover and Google News traffic for the same period |
| `gsc_inspect_url` | Google index status for one URL: verdict, coverage state, last crawl, canonical, mobile usability, rich results |
| `gsc_index_check` | Inspects up to 10 URLs and returns a compact table: indexed or not, coverage state, last crawl, Google-selected canonical vs |
| `gsc_sitemaps` | Submitted sitemaps with status, errors, warnings and URL counts |
| `gsc_weekly_report` | One call for a client-ready weekly summary: totals vs |
| `ads_list_accounts` | Connected Google Ads customer accounts including manager (MCC) accounts and their direct child accounts |
| `ads_query` | Run a Google Ads Query Language (GAQL) SELECT against a customer account |
| `ads_campaign_performance` | Campaigns with cost, clicks, impressions, CTR, conversions, cost per conversion, ROAS and status for a date range (default last 30 days) |
| `ads_search_terms` | Actual search terms that triggered ads, with cost, clicks, impressions and conversions |
| `ads_wasted_spend` | Search terms that cost money or clicks but never converted in the period (default 30 days), aggregated across campaigns, with negative keyword suggestions (phrase for recurring words, exact for one-offs) |
| `ads_keyword_performance` | Keywords with match type, status, quality score, cost, clicks, conversions, CPA and impression share |
| `ads_quality_score_audit` | Impression-weighted quality score, distribution 1-10, and the keywords at or below a threshold with their weakest component (expected CTR, ad relevance, landing page experience) and the money spent on them |
| `ads_impression_share` | Search impression share per campaign with the share lost to budget and lost to rank, plus top-of-page and absolute-top rates |
| `ads_budget_pacing` | Month-to-date spend per campaign versus the expected spend from its daily budget, with month-end projection |
| `ads_ad_performance` | Responsive search ads with ad strength, final URL, headlines count, CTR, cost, conversions |
| `ads_geo_performance` | Cost, clicks, conversions and CPA by country (or by region/city with level) |
| `ads_device_performance` | Cost, clicks, CTR, conversions and CPA per device (mobile, desktop, tablet) for the account or one campaign |
| `ads_dayparting` | Cost, clicks, conversions and CPA by hour of day and by day of week |
| `ads_landing_pages` | Landing pages with cost, clicks, conversions, CPA and mobile-friendly click rate |
| `ads_recommendations` | Google's own optimization recommendations for the account (keywords, budgets, ad suggestions, bidding), with the estimated impact where available |
| `ads_change_history` | Who changed what in the account in the last N days (max 30): resource type, operation, user, timestamp |
| `ads_conversion_actions` | Configured conversion actions with status, category, counting type, attribution model and the conversions each produced in the period |
| `ads_pmax_asset_groups` | Asset groups of Performance Max campaigns with ad strength, cost, conversions and value |
| `ads_daily_trend` | Daily cost, clicks, conversions and CPA for the account with flagged spend spikes or drops (≥30% vs |
| `ads_metadata` | Describes selectable fields of a Google Ads resource (e.g |
| `ads_account_audit` | One call that runs the key checks: campaign totals vs |
| `adsense_earnings` | Earnings summary: totals for the range (default last 30 days) plus a daily breakdown |
| `adsense_report` | Custom report with chosen dimensions and metrics for a date range (default last 30 days) |
| `adsense_top_pages` | Pages by estimated earnings with page views and RPM |
| `adsense_by_country` | Earnings, page views, RPM and CTR per country |
| `adsense_ad_unit_performance` | Ad units with earnings, impressions, RPM, CTR and viewability |
| `adsense_platform_split` | Earnings, page views, RPM and CTR by platform (desktop, high-end mobile, tablet) |
| `adsense_daily_trend` | Daily earnings, page views and RPM with flagged drops or spikes (≥30% vs |
| `adsense_sites` | Sites in the AdSense account with approval state |
| `adsense_alerts` | Policy and account alerts for the AdSense account |
| `adsense_payments` | Unpaid balance and payment history for the AdSense account |
| `adsense_ad_units` | Ad units per ad client in the AdSense account |
| `adsense_monthly_report` | One call: calendar month to date vs |
| `paid_vs_organic` | Matches Google Ads search terms against Search Console queries for the same period |
| `content_monetization` | Joins Search Console clicks per page with AdSense earnings per page URL |
| `landing_page_overview` | Joins Google Ads landing page spend and conversions with Search Console clicks for the same URLs |
| `list_properties` | Lists every connected Google account with its Search Console sites, Google Ads customer accounts and AdSense accounts |

All tools are read-only. MetricPort never changes anything in your Google accounts.

## Options

```
npx metricport-mcp                      sign in with your MetricPort account
npx metricport-mcp --key mp_xxx         use an API key
METRICPORT_API_KEY=mp_xxx npx metricport-mcp
METRICPORT_URL=...                      override the server URL (self-hosted or staging)
```

## Pricing and data

Free plan: 1 Google account, Search Console, 500 tool calls per month. Pro and Agency add Google Ads, AdSense, more accounts, daily insights, alerts and shareable reports. See <https://metricport.io/pricing>.

Hosted in Frankfurt (EU). Refresh tokens are encrypted at rest, raw API responses are cached in memory for five minutes and never written to disk. Privacy policy: <https://metricport.io/privacy>.

## License

MIT for this client package. The hosted service is governed by the [terms](https://metricport.io/terms).
