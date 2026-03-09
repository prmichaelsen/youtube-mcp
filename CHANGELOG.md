# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
