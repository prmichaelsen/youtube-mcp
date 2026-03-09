# Task 16: Metadata & Reporting Tools

**Milestone**: [M4 - Full Coverage](../../milestones/milestone-4-full-coverage.md)
**Design Reference**: [Requirements](../../design/requirements.md)
**Estimated Time**: 4 hours
**Dependencies**: Task 14
**Status**: Not Started

---

## Objective

Implement 8 MCP tools for YouTube metadata and reporting: activities, members, memberships, i18n, video categories, and abuse reporting.

---

## Context

These are mostly read-only list endpoints (activities, members, i18n, categories) plus one write endpoint (report abuse). They're simpler than earlier tools but complete the full YouTube API coverage.

---

## Steps

### 1. Activities
Create `src/tools/activities.ts`:
- `youtube_activities_list` — List channel activities (1 unit)
  - Params: part (snippet, contentDetails), channelId?, mine?, maxResults?, pageToken?, publishedAfter?, publishedBefore?

### 2. Members
Create `src/tools/members.ts`:
- `youtube_members_list` — List channel members (1 unit)
  - Params: part (snippet), mode? (listMembers/updates), maxResults?, pageToken?

### 3. Memberships Levels
Create `src/tools/memberships-levels.ts`:
- `youtube_memberships_levels_list` — List membership levels (1 unit)
  - Params: part (snippet, id)

### 4. i18n
Create `src/tools/i18n.ts`:
- `youtube_i18n_languages_list` — List supported languages (1 unit)
- `youtube_i18n_regions_list` — List supported regions (1 unit)

### 5. Video Categories
Create `src/tools/video-categories.ts`:
- `youtube_video_categories_list` — List video categories (1 unit)
  - Params: part (snippet), regionCode?, id?

### 6. Abuse Reporting
Create `src/tools/video-abuse.ts`:
- `youtube_video_abuse_report_reasons_list` — List reasons (1 unit)
- `youtube_videos_report_abuse` — Report a video (50 units)
  - Params: videoId, reasonId, secondaryReasonId?, comments?

### 7. Register all tools and write tests

---

## Verification

- [ ] All 8 tools implemented with Zod validation
- [ ] Activities list returns channel activity
- [ ] i18n endpoints return languages and regions
- [ ] Video categories returns category list
- [ ] Abuse report tool works with valid reason IDs
- [ ] All read-only tools cost 1 quota unit

---

**Next Task**: [Task 17: Documentation & Polish](task-17-documentation-polish.md)
