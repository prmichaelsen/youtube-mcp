# Milestone 1: Foundation + Playlists (MVP)

**Goal**: Establish project infrastructure with OAuth 2.0 auth and implement all Playlist/PlaylistItems MCP tools
**Duration**: 1-2 weeks
**Dependencies**: None
**Status**: Not Started

---

## Overview

This milestone delivers the minimum viable product: a working MCP server that authenticates via OAuth 2.0 and exposes all 8 Playlist and PlaylistItems endpoints as MCP tools. It establishes the project scaffolding, build system, and patterns that all subsequent milestones build upon.

---

## Deliverables

### 1. Project Infrastructure
- TypeScript project with esbuild build system
- package.json with all scripts (build, dev, test, typecheck)
- tsconfig.json configured for Node.js 20+ / ES2022
- Directory structure: src/, tests/, agent/

### 2. OAuth 2.0 Authentication
- Google OAuth 2.0 client integration
- Token storage and refresh flow
- Minimum-scope request strategy

### 3. YouTube API Client Wrapper
- Centralized googleapis client initialization
- Error mapping (YouTube API errors → clear MCP error responses)
- Retry with exponential backoff on transient 5xx errors

### 4. Playlist MCP Tools (4 tools)
- `youtube_playlists_list` — List user's playlists
- `youtube_playlists_insert` — Create a playlist
- `youtube_playlists_update` — Update playlist metadata
- `youtube_playlists_delete` — Delete a playlist

### 5. PlaylistItems MCP Tools (4 tools)
- `youtube_playlist_items_list` — List videos in a playlist
- `youtube_playlist_items_insert` — Add a video to a playlist
- `youtube_playlist_items_update` — Update item position
- `youtube_playlist_items_delete` — Remove a video from a playlist

### 6. stdio Transport
- MCP server running over stdio transport

---

## Success Criteria

- [ ] Project builds successfully (`npm run build`)
- [ ] TypeScript compiles without errors (`npm run typecheck`)
- [ ] OAuth 2.0 flow completes (authorize, token refresh)
- [ ] `youtube_playlists_list` returns user's playlists
- [ ] `youtube_playlist_items_insert` adds a video to a playlist
- [ ] `youtube_playlist_items_list` lists videos in a playlist
- [ ] All 8 Priority 1 tools implemented and functional
- [ ] Server works via stdio transport
- [ ] Tests pass (`npm test`)

---

## Key Files to Create

```
youtube-mcp/
├── package.json
├── tsconfig.json
├── esbuild.build.js
├── .gitignore
├── .env.example
├── src/
│   ├── index.ts
│   ├── server.ts
│   ├── auth/
│   │   └── oauth.ts
│   ├── client/
│   │   └── youtube.ts
│   ├── tools/
│   │   ├── playlists.ts
│   │   └── playlist-items.ts
│   └── types/
│       └── index.ts
└── tests/
    ├── tools/
    │   ├── playlists.test.ts
    │   └── playlist-items.test.ts
    └── setup.ts
```

---

## Tasks

1. [Task 1: Project Scaffolding](../tasks/milestone-1-foundation-playlists-mvp/task-1-project-scaffolding.md) — Set up directories, config files, and build system
2. [Task 2: OAuth 2.0 Setup](../tasks/milestone-1-foundation-playlists-mvp/task-2-oauth-setup.md) — Implement Google OAuth 2.0 authentication
3. [Task 3: YouTube API Client Wrapper](../tasks/milestone-1-foundation-playlists-mvp/task-3-youtube-api-client-wrapper.md) — Create centralized API client with error handling
4. [Task 4: Playlist Tools](../tasks/milestone-1-foundation-playlists-mvp/task-4-playlist-tools.md) — Implement 4 Playlist MCP tools
5. [Task 5: PlaylistItems Tools](../tasks/milestone-1-foundation-playlists-mvp/task-5-playlist-items-tools.md) — Implement 4 PlaylistItems MCP tools
6. [Task 6: Testing & Verification MVP](../tasks/milestone-1-foundation-playlists-mvp/task-6-testing-verification-mvp.md) — End-to-end testing of MVP functionality

---

## Environment Variables

```env
# Google OAuth 2.0
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
GOOGLE_REDIRECT_URI=http://localhost:3000/callback

# Token Storage
TOKEN_STORAGE_PATH=./.tokens
```

---

## Testing Requirements

- [ ] Unit tests for OAuth token refresh logic
- [ ] Unit tests for YouTube API client error mapping
- [ ] Unit tests for each Playlist tool (mock API responses)
- [ ] Unit tests for each PlaylistItems tool (mock API responses)
- [ ] Integration test: OAuth flow end-to-end
- [ ] Integration test: list playlists with real API

---

## Risks and Mitigation

| Risk | Impact | Probability | Mitigation Strategy |
|------|--------|-------------|---------------------|
| OAuth flow complexity | Medium | Medium | Leverage existing mcp-auth patterns |
| YouTube API quota during dev | Medium | Medium | Use mock responses for unit tests |
| googleapis API changes | Low | Low | Pin googleapis version |

---

**Next Milestone**: [Milestone 2: Videos & Search](milestone-2-videos-and-search.md)
**Blockers**: None
**Notes**: This milestone establishes all patterns (tool structure, error handling, testing) used by subsequent milestones.
