# Task 4: Playlist Tools

**Milestone**: [M1 - Foundation + Playlists (MVP)](../../milestones/milestone-1-foundation-playlists-mvp.md)
**Design Reference**: [Requirements](../../design/requirements.md)
**Estimated Time**: 4 hours
**Dependencies**: Task 3
**Status**: Not Started

---

## Objective

Implement 4 MCP tools for YouTube Playlist management: list, insert, update, and delete.

---

## Context

Playlists are the core MVP feature. Each tool must validate inputs with Zod, call the YouTube API via the client wrapper, and return structured results. Tool descriptions should include quota cost information.

---

## Steps

### 1. Create playlist tools module
Create `src/tools/playlists.ts` with 4 tools:

### 2. `youtube_playlists_list`
- **Params**: part (snippet, contentDetails, status), channelId?, id?, mine?, maxResults?, pageToken?
- **Returns**: List of playlists with metadata
- **Quota**: 1 unit

### 3. `youtube_playlists_insert`
- **Params**: title, description?, privacyStatus (public/private/unlisted)
- **Returns**: Created playlist object
- **Quota**: 50 units

### 4. `youtube_playlists_update`
- **Params**: id, title?, description?, privacyStatus?
- **Returns**: Updated playlist object
- **Quota**: 50 units

### 5. `youtube_playlists_delete`
- **Params**: id
- **Returns**: Success confirmation
- **Quota**: 50 units

### 6. Register tools with MCP server
Add all playlist tools to the server's tool registry with Zod input schemas.

---

## Verification

- [ ] `youtube_playlists_list` returns playlists (mine=true)
- [ ] `youtube_playlists_insert` creates a new playlist
- [ ] `youtube_playlists_update` modifies playlist title/description
- [ ] `youtube_playlists_delete` removes a playlist
- [ ] All tools have Zod input validation
- [ ] All tools include quota cost in description
- [ ] Error cases handled (not found, unauthorized)

---

**Next Task**: [Task 5: PlaylistItems Tools](task-5-playlist-items-tools.md)
