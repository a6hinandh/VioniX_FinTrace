# FinTrace AI

[![CI](https://github.com/a6hinandh/VioniX_FinTrace/actions/workflows/ci.yml/badge.svg)](https://github.com/a6hinandh/VioniX_FinTrace/actions/workflows/ci.yml)
[![License: CC BY-NC 4.0](https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgrey.svg)](LICENSE)
![React](https://img.shields.io/badge/React-19-2f6feb)
![TypeScript](https://img.shields.io/badge/TypeScript-5-2f6feb)
![Vite](https://img.shields.io/badge/Vite-8-2f6feb)

Intelligent financial crime detection prototype focused on AML workflows, graph-driven risk analysis, and analyst decision support.


> **Project status: concept prototype, not production-ready.** FinTrace AI is a frontend-only proof of concept. There is no server side — no real backend, database, authentication, or detection engine. All transactions, alerts, risk scores, and graphs are generated from deterministic mock fixtures in `src/mocks/fixtures`. Treat every number and workflow in this repo as an illustration of the product idea, not a working AML system.

## Overview

FinTrace AI demonstrates how institutions can move from rule-only alerting to explainable, graph-informed investigations.

Core ideas in this repo:
- Real-time mock transaction feed and suspicious alert generation
- Graph-style entity relationship exploration
- Explainable risk factor breakdowns
- Case management and audit trail workflows
- Evidence report generation for compliance-style operations
- Intelligence Lab for scenario injection and model governance simulation

This project is a frontend prototype with deterministic mock fixtures and no production backend integration.

## Product Concept

Financial crime teams often struggle with high false-positive rates, fragmented tooling, and poor explainability. FinTrace AI is structured as a single analyst cockpit where detection, triage, investigation, and reporting happen in one flow.

The platform models suspicious behavior around four common scenarios:
- Layering
- Round-tripping
- Smurfing (structuring)
- Dormant account activation

## Feature Map

### Dashboard
- Live counters (transactions, alerts, investigations)
- Interactive transaction network visualization
- Investigation detail panel with risk rationale
- Threat Pulse injection for controlled anomaly simulation

### Alerts
- Triage queue with risk/status filters and search
- Assignment workflow and bulk state changes
- Status lifecycle: new, reviewing, escalated, dismissed, resolved

### Investigations
- Case summaries with assignee and SLA context
- Expandable case timelines and actions
- Audit trail entries and evidence package trigger

### Reports
- Mock evidence packages and export actions
- Report state handling (generating/ready/exported)

### Intelligence Lab
- Scenario Composer for mock pattern bursts
- Governance score signals (signal quality, triage velocity, readiness)
- Champion/challenger style model registry simulation

### Settings/Profile
- Feature toggles and simulation controls
- Analyst profile and productivity-style summary metrics

## Architecture (High Level)

Presentation pages use shared state and deterministic fixtures:

1. Presentation Layer: route-level pages and reusable UI components
2. State Layer: centralized Zustand store for alerts, cases, reports, feed state
3. Data Layer: fixtures and typed domain models
4. Simulation Layer: realtime feed hook plus scenario injection actions

## Tech Stack

- React 19
- TypeScript 5
- Vite 8
- Tailwind CSS 4
- Zustand
- React Router 7
- Lucide React
- React Hot Toast
- Framer Motion

## Design System

FinTrace AI ships a token-driven Sapphire theme with full dark/light support (`src/index.css`). Every surface, accent, and semantic risk color (risk/warning/safe/info) is defined as a CSS custom property, so components stay consistent without hardcoded hex values. Toggle themes from the navbar or header — the choice persists in `localStorage`.

## Repository Structure

```text
src/
	app/                  # App providers, theming, and routing
	assets/               # Lottie animations and static media
	components/           # Layout and UI primitives (Button, Badge, Input, graphs)
	hooks/                # Realtime feed and keyboard utilities
	lib/                  # Shared animation/motion variants
	mocks/fixtures/       # Deterministic AML scenario data
	pages/                # Landing, dashboard, alerts, investigations, reports, settings, profile, intelligence
	services/             # Mock API client and telemetry helpers
	state/                # Zustand store and state actions
	types/                # Domain and API TypeScript types
	utils/                # Formatting, date, and risk helpers
docs/                   # Architecture and demo references
```

## Getting Started

### Prerequisites
- Node.js 20+
- npm 9+

### Install

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

### Build Production Bundle

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## NPM Scripts

- `npm run dev`: start local development server
- `npm run build`: type-check and build production assets
- `npm run preview`: preview production bundle
- `npm run lint`: run ESLint checks
- `npm run typecheck`: run TypeScript checks without emitting files
- `npm run format`: format source styles/code

## Notes for Contributors

- Keep mock data deterministic so demo behavior remains repeatable.
- Preserve domain typing consistency between `src/types/domain.ts` and fixtures.
- When adding UI features, maintain theme token usage from `src/index.css`.
- Use `npm run build` before committing to ensure type/build integrity.

## Security and Compliance Disclaimer

This repository is a demo prototype. It does not include production-grade controls such as:
- Live AML/KYC provider integration
- Real sanctions or PEP screening integrations
- Hardened auth/RBAC
- Regulator submission APIs
- Full audit immutability and encryption posture

Do not use as-is for production compliance workloads.

## License

This project is licensed under the Creative Commons Attribution-NonCommercial 4.0 International Public License (CC BY-NC 4.0).

- License file: `LICENSE`
- Official license link: https://creativecommons.org/licenses/by-nc/4.0/

Copyright (c) 2026 a6hinandh
