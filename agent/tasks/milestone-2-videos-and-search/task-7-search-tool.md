# Task 7: Search Tool

**Milestone**: [M2 - Videos & Search](../../milestones/milestone-2-videos-and-search.md)
**Design Reference**: [Requirements](../../design/requirements.md)
**Estimated Time**: 3 hours
**Dependencies**: Task 6
**Status**: Not Started

---

## Objective

Implement the `youtube_search` MCP tool for searching YouTube videos, channels, and playlists.

---

## Context

Search is one of the most commonly used YouTube features. The tool must support various filters (type, order, date range, region) and return structured results. Search costs 100 quota units per call, so the tool description should make this visible.

---

## Steps

### 1. Create search tool module
Create `src/tools/search.ts`.

### 2. Implement `youtube_search`
- **Params**: q (query), type? (video/channel/playlist), maxResults?, order? (date/rating/relevance/title/viewCount), publishedAfter?, publishedBefore?, regionCode?, pageToken?
- **Returns**: List of search results with id, snippet (title, description, thumbnails, channelTitle)
- **Quota**: 100 units

### 3. Add result formatting
Format search results for agent consumption:
- Include video/channel/playlist IDs
- Include thumbnails URLs
- Include publish dates

### 4. Register with MCP server

---

## Verification

- [ ] `youtube_search` returns results for text queries
- [ ] Type filter works (video only, channel only, playlist only)
- [ ] Order parameter works (relevance, date, viewCount)
- [ ] Pagination via pageToken works
- [ ] Quota cost (100 units) documented in tool description
- [ ] Zod input validation rejects invalid params

---

**Next Task**: [Task 8: Video Tools](task-8-video-tools.md)
