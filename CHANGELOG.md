# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.8.0] - 2026-03-09

### Added
- 6 Video MCP tools: list, insert (upload), update, delete, rate, getRating (src/tools/videos.ts)
- Streaming file upload for youtube_videos_insert (1600 quota units)
- Video rating tools (like/dislike/none) for authenticated users
- 8 unit tests for video tools registration and description validation
- 47 total tests passing across 8 test suites

### Changed
- Task T8 (Video Tools) completed in Milestone M2

## [0.7.0] - 2026-03-09

### Added
- YouTube Search MCP tool: youtube_search (src/tools/search.ts)
- Search by query with filters: type (video/channel/playlist), order, date range, region
- Pagination support via pageToken
- 3 unit tests for search tool registration and description
- 39 total tests passing across 7 test suites

### Changed
- Task T7 (Search Tool) completed in Milestone M2

## [0.6.0] - 2026-03-09

### Added
- Test fixtures for YouTube API responses (playlists, playlist items)
- Mock client helper for unit testing
- E2E server creation tests
- Integration test scaffold (skippable without API credentials)
- 36 total tests passing across 6 test suites

### Changed
- Milestone M1 (Foundation + Playlists MVP) completed

## [0.5.0] - 2026-03-09

### Added
- 4 Playlist MCP tools: list, insert, update, delete (src/tools/playlists.ts)
- 4 PlaylistItems MCP tools: list, insert, update, delete (src/tools/playlist-items.ts)
- All tools have Zod input validation and quota cost in descriptions
- Server registers tools when auth is provided
- Unit tests for tool registration and description validation

## [0.4.0] - 2026-03-09

### Added
- YouTube API client wrapper (src/client/youtube.ts)
- YouTubeClient class with authenticated API access
- Error mapping: 400/401/403/404/409/5xx to clear messages
- Quota-exceeded detection (403 with quotaExceeded reason)
- Retry with exponential backoff for 5xx errors (1s, 2s, 4s)
- Quota cost constants for all operation types
- 13 unit tests for client module

## [0.3.0] - 2026-03-09

### Added
- Google OAuth 2.0 authentication module (src/auth/oauth.ts)
- YouTubeAuth class with token storage, refresh, and scope management
- Authorization URL generation with configurable scopes
- Automatic token refresh with 5-minute expiry buffer
- Secure token persistence (0600 file permissions)
- OAuth scope constants for all YouTube API scope categories
- Unit tests for auth module (9 tests passing)

## [0.2.0] - 2026-03-09

### Added
- TypeScript project scaffolding with esbuild build system
- MCP server entry point with stdio transport
- Package.json with build, dev, test, typecheck scripts
- tsconfig.json targeting ES2022/Node16 with strict mode
- Jest testing configuration with ts-jest ESM support
- Shared type definitions (TokenData, ServerConfig, YouTubeErrorResponse)
- Directory structure: src/{auth,client,tools,types,transport}, tests/{unit,integration}

## [0.1.0] - 2026-03-09

### Added
- Project requirements covering all 52 YouTube Data API v3 endpoints
- 4 milestones: Foundation + Playlists (MVP), Videos & Search, Social Features, Full Coverage
- 17 tasks with dependency chains and time estimates (70-90 hours total)
- ACP agent patterns, designs, and command templates
- Project progress tracking via progress.yaml
