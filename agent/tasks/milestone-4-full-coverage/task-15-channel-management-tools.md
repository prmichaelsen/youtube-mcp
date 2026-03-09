# Task 15: Channel Management Tools

**Milestone**: [M4 - Full Coverage](../../milestones/milestone-4-full-coverage.md)
**Design Reference**: [Requirements](../../design/requirements.md)
**Estimated Time**: 6 hours
**Dependencies**: Task 14
**Status**: Not Started

---

## Objective

Implement 12 MCP tools for channel customization: channel sections, banners, thumbnails, watermarks, and playlist images.

---

## Context

These tools cover channel visual customization and organization. Many involve file uploads (banners, thumbnails, watermarks, playlist images). They follow the same patterns established in earlier milestones for file handling.

---

## Steps

### 1. Channel Sections (4 tools)
Create `src/tools/channel-sections.ts`:
- `youtube_channel_sections_list` — List sections (1 unit)
- `youtube_channel_sections_insert` — Create section (50 units)
- `youtube_channel_sections_update` — Update section (50 units)
- `youtube_channel_sections_delete` — Delete section (50 units)

### 2. Channel Banners (1 tool)
Create `src/tools/channel-banners.ts`:
- `youtube_channel_banners_insert` — Upload banner image (50 units)

### 3. Thumbnails (1 tool)
Create `src/tools/thumbnails.ts`:
- `youtube_thumbnails_set` — Set custom video thumbnail (50 units)

### 4. Watermarks (2 tools)
Create `src/tools/watermarks.ts`:
- `youtube_watermarks_set` — Set channel watermark (50 units)
- `youtube_watermarks_unset` — Remove watermark (50 units)

### 5. Playlist Images (4 tools)
Create `src/tools/playlist-images.ts`:
- `youtube_playlist_images_list` — List images (1 unit)
- `youtube_playlist_images_insert` — Add image (50 units)
- `youtube_playlist_images_update` — Update image (50 units)
- `youtube_playlist_images_delete` — Delete image (50 units)

### 6. Register all tools and write tests

---

## Verification

- [ ] All 12 tools implemented with Zod validation
- [ ] File upload tools use streaming
- [ ] Channel sections CRUD works end-to-end
- [ ] Banner/thumbnail/watermark uploads work
- [ ] Playlist images CRUD works
- [ ] Quota costs documented

---

**Next Task**: [Task 16: Metadata & Reporting Tools](task-16-metadata-reporting-tools.md)
