# Task 5: PlaylistItems Tools

**Milestone**: [M1 - Foundation + Playlists (MVP)](../../milestones/milestone-1-foundation-playlists-mvp.md)
**Design Reference**: [Requirements](../../design/requirements.md)
**Estimated Time**: 4 hours
**Dependencies**: Task 3
**Status**: Not Started

---

## Objective

Implement 4 MCP tools for YouTube PlaylistItems management: list, insert, update, and delete.

---

## Context

PlaylistItems tools allow agents to manage the contents of playlists — adding, reordering, and removing videos. These work in conjunction with the Playlist tools from Task 4.

---

## Steps

### 1. Create playlist items tools module
Create `src/tools/playlist-items.ts` with 4 tools:

### 2. `youtube_playlist_items_list`
- **Params**: playlistId, part (snippet, contentDetails), maxResults?, pageToken?
- **Returns**: List of playlist items with video details
- **Quota**: 1 unit

### 3. `youtube_playlist_items_insert`
- **Params**: playlistId, videoId, position?
- **Returns**: Created playlist item
- **Quota**: 50 units

### 4. `youtube_playlist_items_update`
- **Params**: id, playlistId, videoId, position
- **Returns**: Updated playlist item
- **Quota**: 50 units

### 5. `youtube_playlist_items_delete`
- **Params**: id
- **Returns**: Success confirmation
- **Quota**: 50 units

### 6. Register tools with MCP server

---

## Verification

- [ ] `youtube_playlist_items_list` returns items in a playlist
- [ ] `youtube_playlist_items_insert` adds a video to a playlist
- [ ] `youtube_playlist_items_update` changes item position
- [ ] `youtube_playlist_items_delete` removes an item
- [ ] All tools have Zod input validation
- [ ] All tools include quota cost in description

---

**Next Task**: [Task 6: Testing & Verification MVP](task-6-testing-verification-mvp.md)
