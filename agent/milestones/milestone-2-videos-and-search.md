# Milestone 2: Videos & Search

**Goal**: Implement Search and Video tools plus streamable HTTP transport
**Duration**: 1-2 weeks
**Dependencies**: Milestone 1
**Status**: Not Started

---

## Overview

This milestone adds the most user-facing features: searching YouTube and managing videos. It also introduces the streamable HTTP transport, enabling the server to be deployed as a networked service rather than only stdio.

---

## Deliverables

### 1. Search Tool (1 tool)
- `youtube_search` — Search for videos, channels, and playlists with filtering

### 2. Video Tools (6 tools)
- `youtube_videos_list` — Get video details (snippet, stats, contentDetails)
- `youtube_videos_insert` — Upload a video
- `youtube_videos_update` — Update video metadata
- `youtube_videos_delete` — Delete a video
- `youtube_videos_rate` — Like/dislike a video
- `youtube_videos_get_rating` — Get user's rating on videos

### 3. Streamable HTTP Transport
- HTTP server with streamable transport support
- Configurable port and host

---

## Success Criteria

- [ ] `youtube_search` returns relevant results for queries
- [ ] `youtube_videos_list` returns video details
- [ ] `youtube_videos_insert` uploads a video successfully
- [ ] `youtube_videos_rate` likes/dislikes a video
- [ ] All 7 tools implemented and tested
- [ ] Server works via streamable HTTP transport
- [ ] Both stdio and HTTP transports selectable via config

---

## Key Files to Create

```
src/
├── tools/
│   ├── search.ts
│   └── videos.ts
├── transport/
│   └── http.ts
└── tests/
    └── tools/
        ├── search.test.ts
        └── videos.test.ts
```

---

## Tasks

1. [Task 7: Search Tool](../tasks/milestone-2-videos-and-search/task-7-search-tool.md) — Implement YouTube search with filtering
2. [Task 8: Video Tools](../tasks/milestone-2-videos-and-search/task-8-video-tools.md) — Implement 6 Video MCP tools
3. [Task 9: Streamable HTTP Transport](../tasks/milestone-2-videos-and-search/task-9-streamable-http-transport.md) — Add HTTP transport option

---

## Testing Requirements

- [ ] Unit tests for search tool with various query parameters
- [ ] Unit tests for each video tool (mock API responses)
- [ ] Integration test: search returns results
- [ ] Integration test: HTTP transport serves MCP requests
- [ ] Video upload test with small test file

---

## Risks and Mitigation

| Risk | Impact | Probability | Mitigation Strategy |
|------|--------|-------------|---------------------|
| Video upload quota cost (1600 units) | High | High | Test with smallest possible file, use mock for CI |
| HTTP transport security | Medium | Medium | Implement proper CORS and auth headers |
| Large file handling for uploads | Medium | Low | Stream uploads, don't buffer in memory |

---

**Next Milestone**: [Milestone 3: Social Features](milestone-3-social-features.md)
**Blockers**: None
**Notes**: Video upload is the most quota-expensive operation (1600 units). Test carefully to avoid quota exhaustion.
