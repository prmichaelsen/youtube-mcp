# Task 3: YouTube API Client Wrapper

**Milestone**: [M1 - Foundation + Playlists (MVP)](../../milestones/milestone-1-foundation-playlists-mvp.md)
**Design Reference**: [Requirements](../../design/requirements.md)
**Estimated Time**: 3 hours
**Dependencies**: Task 2
**Status**: Not Started

---

## Objective

Create a centralized YouTube API client wrapper that handles authenticated API calls, error mapping, and retry logic.

---

## Context

All MCP tools will use this wrapper to interact with the YouTube Data API. It centralizes auth token management, maps YouTube API errors to clear MCP error responses, and implements retry with exponential backoff for transient failures.

---

## Steps

### 1. Create YouTube client module
Create `src/client/youtube.ts`:
- Initialize `google.youtube('v3')` with authenticated OAuth client
- Expose typed methods for each API resource

### 2. Implement error mapping
Map YouTube API error codes to meaningful MCP error messages:
- 400 → Invalid parameters
- 401 → Authentication required/expired
- 403 → Quota exceeded or insufficient permissions
- 404 → Resource not found
- 409 → Conflict (duplicate)
- 5xx → Transient server error (retry)

### 3. Implement retry logic
Add exponential backoff for transient errors:
- Retry on 5xx errors
- Max 3 retries
- Backoff: 1s, 2s, 4s

### 4. Add quota cost awareness
Include quota cost metadata that tools can expose:
- List operations: 1 unit
- Insert/update/delete: 50 units
- Search: 100 units
- Video upload: 1600 units

---

## Verification

- [ ] YouTube client initializes with authenticated OAuth client
- [ ] API errors map to clear error messages
- [ ] 5xx errors trigger retry with backoff
- [ ] Quota costs are documented per operation
- [ ] Client reuses auth tokens correctly

---

**Next Task**: [Task 4: Playlist Tools](task-4-playlist-tools.md)
