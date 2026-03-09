# Task 14: Caption Tools

**Milestone**: [M4 - Full Coverage](../../milestones/milestone-4-full-coverage.md)
**Design Reference**: [Requirements](../../design/requirements.md)
**Estimated Time**: 5 hours
**Dependencies**: Task 13
**Status**: Not Started

---

## Objective

Implement 5 MCP tools for YouTube Caption management: list, insert, update, download, and delete.

---

## Context

Caption tools enable agents to manage video subtitles/captions. Insert and update require file uploads (SRT, VTT formats). Download returns caption content as text. All operations require the youtube.force-ssl scope.

---

## Steps

### 1. Create caption tools module
Create `src/tools/captions.ts`.

### 2. `youtube_captions_list`
- **Params**: videoId, part (snippet, id)
- **Returns**: List of caption tracks with language, name, status
- **Quota**: 50 units

### 3. `youtube_captions_insert`
- **Params**: videoId, language, name, filePath, isDraft?
- **Returns**: Created caption track
- **Quota**: 400 units

### 4. `youtube_captions_update`
- **Params**: id, filePath?, isDraft?
- **Returns**: Updated caption track
- **Quota**: 450 units

### 5. `youtube_captions_download`
- **Params**: id, tfmt? (srt/vtt)
- **Returns**: Caption content as text
- **Quota**: 200 units

### 6. `youtube_captions_delete`
- **Params**: id
- **Returns**: Success confirmation
- **Quota**: 50 units

### 7. Register tools and write tests

---

## Verification

- [ ] `youtube_captions_list` returns caption tracks for a video
- [ ] `youtube_captions_insert` uploads a caption file
- [ ] `youtube_captions_update` updates a caption track
- [ ] `youtube_captions_download` returns caption text
- [ ] `youtube_captions_delete` removes a caption track
- [ ] Supports SRT and VTT formats

---

**Next Task**: [Task 15: Channel Management Tools](task-15-channel-management-tools.md)
