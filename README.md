# CivicEase AI

Prototype for Engage 6.0 (Better Communities, Better Governance). Helps people understand government notices, prepare applications, and try a demo complaint workflow.

## Features
- **Document Explainer**: summary, dates, eligibility, documents and next steps, shown beside the original notice. Each item is marked *In the notice* (with the supporting quote) or *Interpretation, verify*. Missing information is reported as "not stated", never invented. Optional source title and link are displayed as user-supplied, not verified.
- **Application Checklist**: three illustrative templates with saved progress and per-checklist reset. No item is linked to an official source.
- **Complaint Tracker**: demo complaints in `localStorage`, simulated statuses labeled DEMO, sample data and reset. Nothing is sent to any authority.
- **Insights Dashboard**: totals and category/locality breakdowns computed from the complaints in this browser (demo data only).

## Prerequisites
Node.js 18+ and npm.

## Commands
```bash
npm install
npm run dev       # http://localhost:5173 (offline fallback only)
npm run build
npm run preview
```
To test the live AI function locally, run `npx vercel dev` instead of `npm run dev`.

## AI endpoint and fallback
`api/explain.js` is a Vercel serverless function that calls the Anthropic API. Credentials stay on the server.

| Variable | Where | Purpose |
|----------|-------|---------|
| `ANTHROPIC_API_KEY` | server only | Required for live AI |
| `ANTHROPIC_MODEL` | server only | Optional, defaults to `claude-sonnet-5-5` |
| `VITE_AI_ENDPOINT` | client | Optional endpoint URL override (not a secret) |

The server validates input (text only, max 8000 characters), applies a 25 s timeout and a basic per-instance rate limit, does not log notice text, and marks any item whose quote or numbers are not found in the notice as an interpretation. If the endpoint is missing, slow, rate limited or returns bad output, the app shows a visible message and uses the rule-based fallback, which only selects sentences from the notice and is not AI. Hindi output requires live AI.

## Deploy
- **Vercel**: import the repo, add `ANTHROPIC_API_KEY` in Environment Variables, deploy. `vercel.json` keeps `/api` out of the SPA rewrite.
- **Netlify**: build `npm run build`, publish `dist`. The included function targets Vercel, so Netlify runs in fallback mode unless you port it.

## Demo flow
Load the sample notice, explain it, compare against the original, tick checklist items, create a streetlight complaint, advance its status, open Insights.

## Limitations
Complaint and checklist data are demonstrations. No real government integration exists. Verify every requirement with the issuing department.
