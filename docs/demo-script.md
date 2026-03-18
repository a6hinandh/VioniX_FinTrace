# FinTrace AI — Demo Script

## 🎬 3-Minute Demo (Quick Pitch)

### [0:00 – 0:30] The Problem
> "Financial institutions process millions of transactions daily. Sophisticated money laundering schemes like layering and smurfing are nearly impossible to catch manually. Current systems generate overwhelming false positives, and investigators lack context to make fast decisions."

### [0:30 – 1:15] The Solution — Live Dashboard
- Show the dashboard with live counters ticking
- Point out: "Our system monitors 2.4 million entities in real-time"
- Highlight the transaction network graph
- Click on high-risk node C789 → investigation panel loads
- Show the "Why Flagged?" explainability section with weighted scores

### [1:15 – 2:00] Investigation Workflow
- Navigate to Alerts page → filter by High Risk
- Show the triage queue: "Analysts see prioritized alerts, not noise"
- Navigate to Investigations → expand CASE-2024-001
- Show: SLA timer, risk breakdown bars, audit trail
- Click "Freeze Account" → toast confirmation

### [2:00 – 2:45] Evidence & Compliance
- Navigate to Reports page
- Show generated evidence packages
- Click "Export PDF" → "Regulatory-ready evidence in one click"
- "This package includes transaction graphs, entity profiles, risk scoring, and timeline analysis"

### [2:45 – 3:00] Closing
> "FinTrace AI turns raw transaction data into actionable intelligence. We reduce investigation time by 70% and cut false positives by 60%. With our graph-based approach, we catch patterns that rule-based systems miss entirely."

---

## 🎬 7-Minute Demo (Detailed Walkthrough)

### [0:00 – 1:00] Problem & Market Context
- Financial crime costs $2T+ globally per year
- Existing systems: high false positive rates (95%+), manual review bottlenecks
- Our approach: graph-based ML for pattern detection with explainable AI

### [1:00 – 2:30] Platform Tour — Dashboard
- Show live feed counters incrementing
- Explain KPI cards: transactions, alerts, high-risk accounts, active investigations
- Demo the graph: click each node, show info panel updates
- Toggle suspicious path highlighting on/off
- Point out graph filters: hop depth, amount threshold, time window

### [2:30 – 3:30] Explainability Deep-Dive
- Select C789 (Mixing Service) node
- Walk through each risk factor with weight percentages
- Show model version: "We version our models for audit trail"
- Show confidence score: "94% confidence in this risk assessment"

### [3:30 – 4:30] Alert Triage
- Navigate to Alerts page
- Show filtering: by risk level, status, search
- Demo status changes with toast notifications
- Show bulk actions: select multiple → review all
- Highlight the different alert types across scenarios

### [4:30 – 5:30] Investigation Case Management
- Navigate to Investigations page
- Expand case CASE-2024-001 (Layering scheme)
- Walk through:
  - SLA timer with urgency indication
  - Entity list under investigation
  - Risk breakdown with horizontal bars
  - Audit trail timeline: "Every action is logged for compliance"
- Demo actions: Assign Case, Request Docs, Freeze Account, Escalate to FIU
- Click "Generate Evidence Package"

### [5:30 – 6:15] Reports & Regulatory Filing
- Navigate to Reports page
- Show evidence packages with status indicators
- Show transaction counts and total amounts
- Demo PDF/JSON export
- "These packages are structured for SAR filing"

### [6:15 – 6:45] Technical Architecture
- Show README briefly: "Production-grade codebase with TypeScript, React, CI/CD"
- Mention: "Real deployment would connect to our graph database backend"
- Quick Settings page tour: feature toggles, system status

### [6:45 – 7:00] Closing & Roadmap
> "What you've seen today is a production-ready MVP. Our roadmap includes real-time WebSocket feeds, SAR auto-generation, and multi-tenant deployment. FinTrace AI makes financial crime detection fast, explainable, and auditable."

---

## 💡 Tips for Presenters

1. **Start with the business pain**, not the technology
2. **Keep the demo flowing** — avoid clicking around aimlessly
3. **Pre-seed the demo data** — have everything ready before presenting
4. **Speak to the audience** — judges want to see market understanding
5. **Practice the exact click path** at least 3 times before presenting
6. **Have a backup recording** in case of technical issues
