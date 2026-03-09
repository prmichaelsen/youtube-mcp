# Task 6: Testing & Verification MVP

**Milestone**: [M1 - Foundation + Playlists (MVP)](../../milestones/milestone-1-foundation-playlists-mvp.md)
**Design Reference**: [Requirements](../../design/requirements.md)
**Estimated Time**: 3 hours
**Dependencies**: Task 4, Task 5
**Status**: Not Started

---

## Objective

Create comprehensive tests for all MVP functionality and verify end-to-end operation of the MCP server with all 8 Playlist/PlaylistItems tools.

---

## Context

This task ensures the MVP is reliable before moving to Milestone 2. It covers unit tests with mocked API responses, integration tests with the real API (optional, quota-aware), and end-to-end server verification.

---

## Steps

### 1. Create test utilities
- Mock YouTube API client for unit tests
- Test fixtures for playlist/playlistItem responses
- Helper to create test MCP server instance

### 2. Write unit tests for playlist tools
Test each tool with mocked API responses:
- Happy path
- Error cases (not found, unauthorized, quota exceeded)
- Input validation (invalid params rejected)

### 3. Write unit tests for playlist items tools
Same coverage as playlist tools.

### 4. Write integration tests (optional)
- Mark as skippable (require real API credentials)
- Test actual API calls with small operations
- Clean up test data after each test

### 5. End-to-end verification
- Start MCP server via stdio
- Send tool calls via MCP protocol
- Verify responses

---

## Verification

- [ ] All unit tests pass (`npm test`)
- [ ] Test coverage > 80% for tools
- [ ] Mocked tests don't require API credentials
- [ ] Integration tests skippable without credentials
- [ ] Server starts and responds to MCP tool calls

---

**Next Task**: [Task 7: Search Tool](../milestone-2-videos-and-search/task-7-search-tool.md)
