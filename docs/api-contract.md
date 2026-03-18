# FinTrace AI — API Contract

> Mock API endpoints for the FinTrace platform. Currently simulated in-app; designed for future backend integration.

## Base URL

```
VITE_API_BASE_URL=https://api.fintrace.ai/v1
```

---

## Endpoints

### GET /alerts

List all alerts with optional filtering.

**Query Parameters:**
| Parameter | Type | Description |
|---|---|---|
| `riskLevel` | `low \| medium \| high \| critical` | Filter by risk level |
| `status` | `new \| reviewing \| escalated \| dismissed \| resolved` | Filter by status |
| `type` | `string` | Filter by alert type |
| `dateFrom` | `ISO 8601` | Start date filter |
| `dateTo` | `ISO 8601` | End date filter |
| `page` | `number` | Page number (default: 1) |
| `pageSize` | `number` | Items per page (default: 20) |

**Response:** `PaginatedResponse<Alert>`

---

### GET /alerts/:id

Get alert details by ID.

**Response:** `ApiResponse<Alert>`

---

### PATCH /alerts/:id/status

Update alert status.

**Body:**
```json
{
  "status": "reviewing",
  "assignee": "jane.doe@fintrace.ai"
}
```

---

### GET /cases

List all investigation cases.

**Response:** `PaginatedResponse<InvestigationCase>`

---

### POST /cases/:id/action

Perform an action on a case.

**Body:**
```json
{
  "action": "freeze",
  "actor": "jane.doe@fintrace.ai",
  "details": "Account frozen pending review"
}
```

**Actions:** `assign | escalate | freeze | request_docs | close`

---

### POST /reports/generate

Generate an evidence package for a case.

**Body:**
```json
{
  "caseId": "CASE-2024-001",
  "format": "pdf",
  "includeTransactions": true,
  "includeGraph": true
}
```

**Response:** `ApiResponse<EvidencePackage>`

---

### GET /reports

List generated evidence packages.

**Response:** `PaginatedResponse<EvidencePackage>`

---

### GET /system/status

Get current system health status.

**Response:**
```json
{
  "data": {
    "health": "healthy",
    "uptime": "99.97%",
    "lastIngestion": "2024-01-15T14:30:00Z",
    "throughput": 1247,
    "entityCount": 14234
  },
  "success": true,
  "timestamp": "2024-01-15T14:30:05Z"
}
```

---

### GET /graph

Get graph data for visualization.

**Query Parameters:**
| Parameter | Type | Description |
|---|---|---|
| `entityId` | `string` | Center node for graph traversal |
| `hopDepth` | `number` | Maximum hops from center (default: 3) |
| `minAmount` | `number` | Minimum transaction amount filter |
| `timeWindow` | `string` | Time window (e.g., "24h", "7d") |

**Response:** `ApiResponse<GraphData>`
