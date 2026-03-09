# Project Requirements

**Project Name**: youtube-mcp
**Created**: 2026-03-09
**Status**: Active

---

## Overview

An MCP server that wraps the YouTube Data API v3, enabling AI agents to manage YouTube content — playlists, videos, channels, comments, and more — through the Model Context Protocol. Authenticated via OAuth 2.0.

---

## Problem Statement

AI agents have no native way to interact with YouTube. Users must manually manage playlists, search for videos, and handle content outside their agent workflows. An MCP server bridging the YouTube API lets agents automate these tasks directly.

---

## Goals and Objectives

### Primary Goals
1. Expose all YouTube Data API v3 endpoints as MCP tools
2. Implement OAuth 2.0 authentication for user-scoped access
3. Support both stdio and streamable HTTP transports

### Secondary Goals
1. Provide clear error messages mapping YouTube API errors
2. Support quota-aware usage (expose quota costs per tool)

---

## Functional Requirements

### Priority 1 — Playlists (MVP)

These endpoints ship first.

| # | Resource | Method | MCP Tool Name | Description |
|---|----------|--------|---------------|-------------|
| 1 | Playlists | list | `youtube_playlists_list` | List authenticated user's playlists or by ID/channelId |
| 2 | PlaylistItems | insert | `youtube_playlist_items_insert` | Add a video to a playlist |
| 3 | PlaylistItems | list | `youtube_playlist_items_list` | List videos in a playlist |
| 4 | Playlists | insert | `youtube_playlists_insert` | Create a new playlist |
| 5 | Playlists | update | `youtube_playlists_update` | Update playlist title/description/privacy |
| 6 | Playlists | delete | `youtube_playlists_delete` | Delete a playlist |
| 7 | PlaylistItems | update | `youtube_playlist_items_update` | Update item position in playlist |
| 8 | PlaylistItems | delete | `youtube_playlist_items_delete` | Remove a video from a playlist |

### Priority 2 — Videos & Search

| # | Resource | Method | MCP Tool Name | Description |
|---|----------|--------|---------------|-------------|
| 9 | Search | list | `youtube_search` | Search for videos, channels, playlists |
| 10 | Videos | list | `youtube_videos_list` | Get video details (snippet, stats, contentDetails) |
| 11 | Videos | insert | `youtube_videos_insert` | Upload a video |
| 12 | Videos | update | `youtube_videos_update` | Update video metadata |
| 13 | Videos | delete | `youtube_videos_delete` | Delete a video |
| 14 | Videos | rate | `youtube_videos_rate` | Like/dislike a video |
| 15 | Videos | getRating | `youtube_videos_get_rating` | Get user's rating on videos |

### Priority 3 — Channels & Subscriptions

| # | Resource | Method | MCP Tool Name | Description |
|---|----------|--------|---------------|-------------|
| 16 | Channels | list | `youtube_channels_list` | Get channel details |
| 17 | Channels | update | `youtube_channels_update` | Update channel metadata |
| 18 | Subscriptions | list | `youtube_subscriptions_list` | List subscriptions |
| 19 | Subscriptions | insert | `youtube_subscriptions_insert` | Subscribe to a channel |
| 20 | Subscriptions | delete | `youtube_subscriptions_delete` | Unsubscribe from a channel |

### Priority 4 — Comments

| # | Resource | Method | MCP Tool Name | Description |
|---|----------|--------|---------------|-------------|
| 21 | CommentThreads | list | `youtube_comment_threads_list` | List comment threads on a video |
| 22 | CommentThreads | insert | `youtube_comment_threads_insert` | Post a top-level comment |
| 23 | Comments | list | `youtube_comments_list` | List replies to a comment |
| 24 | Comments | insert | `youtube_comments_insert` | Reply to a comment |
| 25 | Comments | update | `youtube_comments_update` | Edit a comment |
| 26 | Comments | delete | `youtube_comments_delete` | Delete a comment |
| 27 | Comments | setModerationStatus | `youtube_comments_moderate` | Approve/reject/hold a comment |

### Priority 5 — Captions

| # | Resource | Method | MCP Tool Name | Description |
|---|----------|--------|---------------|-------------|
| 28 | Captions | list | `youtube_captions_list` | List captions for a video |
| 29 | Captions | insert | `youtube_captions_insert` | Upload a caption track |
| 30 | Captions | update | `youtube_captions_update` | Update a caption track |
| 31 | Captions | download | `youtube_captions_download` | Download caption content |
| 32 | Captions | delete | `youtube_captions_delete` | Delete a caption track |

### Priority 6 — Channel Management

| # | Resource | Method | MCP Tool Name | Description |
|---|----------|--------|---------------|-------------|
| 33 | ChannelSections | list | `youtube_channel_sections_list` | List channel sections |
| 34 | ChannelSections | insert | `youtube_channel_sections_insert` | Create a channel section |
| 35 | ChannelSections | update | `youtube_channel_sections_update` | Update a channel section |
| 36 | ChannelSections | delete | `youtube_channel_sections_delete` | Delete a channel section |
| 37 | ChannelBanners | insert | `youtube_channel_banners_insert` | Upload a channel banner |
| 38 | Thumbnails | set | `youtube_thumbnails_set` | Set a custom thumbnail |
| 39 | Watermarks | set | `youtube_watermarks_set` | Set a channel watermark |
| 40 | Watermarks | unset | `youtube_watermarks_unset` | Remove a channel watermark |
| 41 | PlaylistImages | list | `youtube_playlist_images_list` | List playlist images |
| 42 | PlaylistImages | insert | `youtube_playlist_images_insert` | Add a playlist image |
| 43 | PlaylistImages | update | `youtube_playlist_images_update` | Update a playlist image |
| 44 | PlaylistImages | delete | `youtube_playlist_images_delete` | Delete a playlist image |

### Priority 7 — Metadata & Reporting

| # | Resource | Method | MCP Tool Name | Description |
|---|----------|--------|---------------|-------------|
| 45 | Activities | list | `youtube_activities_list` | List channel activities |
| 46 | Members | list | `youtube_members_list` | List channel members |
| 47 | MembershipsLevels | list | `youtube_memberships_levels_list` | List membership levels |
| 48 | I18nLanguages | list | `youtube_i18n_languages_list` | List supported languages |
| 49 | I18nRegions | list | `youtube_i18n_regions_list` | List supported regions |
| 50 | VideoCategories | list | `youtube_video_categories_list` | List video categories |
| 51 | VideoAbuseReportReasons | list | `youtube_video_abuse_report_reasons_list` | List abuse report reasons |
| 52 | Videos | reportAbuse | `youtube_videos_report_abuse` | Report a video |

---

## Non-Functional Requirements

### Performance
- MCP tool calls should add < 200ms overhead on top of YouTube API latency
- Support concurrent tool calls

### Security
- OAuth 2.0 tokens never logged or exposed in tool outputs
- Refresh tokens stored securely
- Scopes requested match minimum needed per operation

### Reliability
- Graceful handling of YouTube API quota exhaustion (clear error, not crash)
- Retry with exponential backoff on transient 5xx errors

---

## Technical Requirements

### Technology Stack
- **Language**: TypeScript 5.x
- **Runtime**: Node.js 20+
- **Protocol**: MCP (via @modelcontextprotocol/sdk)
- **API Client**: googleapis (official Google API Node.js client)
- **Auth**: OAuth 2.0 via Google Identity
- **Build**: esbuild
- **Test**: Jest

### Dependencies
- `@modelcontextprotocol/sdk` — MCP server implementation
- `googleapis` — YouTube Data API v3 client
- `zod` — Input validation for tool parameters

### OAuth Scopes
- `https://www.googleapis.com/auth/youtube` — Full access (manage account)
- `https://www.googleapis.com/auth/youtube.readonly` — Read-only access
- `https://www.googleapis.com/auth/youtube.upload` — Upload videos
- `https://www.googleapis.com/auth/youtube.force-ssl` — Comments, captions

---

## User Stories

### As an AI Agent
1. I want to list a user's playlists so that I can help them organize videos
2. I want to add videos to playlists so that I can curate content for users
3. I want to search YouTube so that I can find relevant videos for users
4. I want to read comments so that I can summarize community feedback

### As a Developer
1. I want to connect this MCP server to Claude so that my agent can manage YouTube
2. I want clear error messages so that I can debug API issues quickly
3. I want both stdio and HTTP transport so that I can deploy flexibly

---

## Constraints

### Technical Constraints
- YouTube API quota: 10,000 units/day by default
- Some operations cost 50-1600 quota units (video upload = 1600)
- OAuth requires user interaction for initial consent

### Resource Constraints
- Single developer
- Must work within free-tier YouTube API quota for development

---

## Success Criteria

### MVP Success Criteria
- [ ] OAuth 2.0 flow working (authorize, token refresh)
- [ ] `youtube_playlists_list` returns user's playlists
- [ ] `youtube_playlist_items_insert` adds a video to a playlist
- [ ] `youtube_playlist_items_list` lists videos in a playlist
- [ ] Server works via stdio transport
- [ ] All Priority 1 endpoints implemented and tested

### Full Release Success Criteria
- [ ] All 52 endpoints implemented
- [ ] Both stdio and streamable HTTP transports working
- [ ] Comprehensive error handling with quota awareness
- [ ] Documentation and usage examples

---

## Out of Scope

1. **YouTube Analytics API** — separate API, separate project
2. **YouTube Live Streaming API** — separate API, separate project
3. **OAuth server/auth proxy** — handled by separate mcp-auth project
4. **Web UI** — this is an MCP server only

---

## Assumptions

1. Users have a Google Cloud project with YouTube Data API v3 enabled
2. Users have OAuth 2.0 client credentials configured
3. MCP SDK remains stable
4. googleapis npm package provides adequate YouTube API coverage

---

## Risks

| Risk | Impact | Probability | Mitigation Strategy |
|------|--------|-------------|---------------------|
| YouTube API quota exhaustion during dev | Medium | Medium | Use test/sandbox account, mock responses for tests |
| OAuth flow complexity | Medium | Medium | Leverage existing mcp-auth patterns |
| Google API breaking changes | Low | Low | Pin googleapis version, monitor release notes |
| Quota cost per tool not obvious to agents | Medium | High | Include quota cost in tool descriptions |

---

## Timeline

### Phase 1: Foundation + Playlists (MVP)
- Project setup, OAuth flow, MCP server scaffold
- Priority 1 endpoints (Playlists + PlaylistItems)
- stdio transport

### Phase 2: Videos & Search
- Priority 2 endpoints
- Streamable HTTP transport

### Phase 3: Social Features
- Priority 3 (Channels, Subscriptions)
- Priority 4 (Comments)

### Phase 4: Full Coverage
- Priority 5-7 (Captions, Channel Management, Metadata)
- Documentation and polish

---

## References

- [YouTube Data API v3 Reference](https://developers.google.com/youtube/v3/docs): Complete API documentation
- [YouTube API Getting Started](https://developers.google.com/youtube/v3/getting-started): Setup guide
- [YouTube API Quota Calculator](https://developers.google.com/youtube/v3/determine_quota_cost): Quota costs per operation
- [MCP Specification](https://modelcontextprotocol.io): Model Context Protocol docs
- [googleapis npm](https://www.npmjs.com/package/googleapis): Official Google API client

---

**Status**: Active
**Last Updated**: 2026-03-09
