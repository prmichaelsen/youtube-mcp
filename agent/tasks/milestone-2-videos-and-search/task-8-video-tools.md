# Task 8: Video Tools

**Milestone**: [M2 - Videos & Search](../../milestones/milestone-2-videos-and-search.md)
**Design Reference**: [Requirements](../../design/requirements.md)
**Estimated Time**: 5 hours
**Dependencies**: Task 7
**Status**: Not Started

---

## Objective

Implement 6 MCP tools for YouTube Video management: list, insert (upload), update, delete, rate, and getRating.

---

## Context

Video tools are the most complex in this milestone. Video upload (insert) is particularly challenging as it requires file streaming and costs 1600 quota units. The rating tools are simpler but require the youtube scope.

---

## Steps

### 1. Create video tools module
Create `src/tools/videos.ts` with 6 tools.

### 2. `youtube_videos_list`
- **Params**: part (snippet, contentDetails, statistics, status), id?, chart? (mostPopular), myRating? (like/dislike), maxResults?, pageToken?
- **Returns**: Video details
- **Quota**: 1 unit

### 3. `youtube_videos_insert`
- **Params**: title, description?, tags?, categoryId?, privacyStatus, filePath
- **Returns**: Uploaded video object
- **Quota**: 1600 units
- **Note**: Stream file upload, don't buffer entire file

### 4. `youtube_videos_update`
- **Params**: id, title?, description?, tags?, categoryId?, privacyStatus?
- **Returns**: Updated video object
- **Quota**: 50 units

### 5. `youtube_videos_delete`
- **Params**: id
- **Returns**: Success confirmation
- **Quota**: 50 units

### 6. `youtube_videos_rate`
- **Params**: id, rating (like/dislike/none)
- **Returns**: Success confirmation
- **Quota**: 50 units

### 7. `youtube_videos_get_rating`
- **Params**: id (comma-separated list)
- **Returns**: Rating for each video
- **Quota**: 1 unit

### 8. Register all tools

---

## Verification

- [ ] `youtube_videos_list` returns video details by ID
- [ ] `youtube_videos_insert` uploads a video file
- [ ] `youtube_videos_update` modifies video metadata
- [ ] `youtube_videos_delete` removes a video
- [ ] `youtube_videos_rate` sets like/dislike/none
- [ ] `youtube_videos_get_rating` returns user's rating
- [ ] File upload uses streaming (not buffering)
- [ ] Quota costs documented in all tool descriptions

---

**Next Task**: [Task 9: Streamable HTTP Transport](task-9-streamable-http-transport.md)
