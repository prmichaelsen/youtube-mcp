# Task 2: OAuth 2.0 Setup

**Milestone**: [M1 - Foundation + Playlists (MVP)](../../milestones/milestone-1-foundation-playlists-mvp.md)
**Design Reference**: [Requirements](../../design/requirements.md)
**Estimated Time**: 4 hours
**Dependencies**: Task 1
**Status**: Not Started

---

## Objective

Implement Google OAuth 2.0 authentication flow for the YouTube Data API v3, including token storage, refresh, and minimum-scope request strategy.

---

## Context

The YouTube API requires OAuth 2.0 for user-scoped operations. The auth module must handle initial authorization (redirect flow), token persistence, and automatic refresh. Scopes should be requested based on the minimum needed for the operations being performed.

---

## Steps

### 1. Create OAuth client module
Create `src/auth/oauth.ts` with:
- Google OAuth2 client initialization from environment variables
- Authorization URL generation with appropriate scopes
- Token exchange (authorization code → access/refresh tokens)
- Token refresh logic
- Token persistence to disk

### 2. Define OAuth scopes
Map YouTube API scopes to operation categories:
- `youtube.readonly` — List operations
- `youtube` — Full account management
- `youtube.upload` — Video uploads
- `youtube.force-ssl` — Comments, captions

### 3. Create token storage
Implement secure token storage:
- Store tokens in configurable path (TOKEN_STORAGE_PATH)
- Encrypt at rest (optional, document trade-offs)
- Never log tokens

### 4. Handle token refresh
Implement automatic token refresh:
- Check token expiry before API calls
- Refresh transparently
- Handle refresh token revocation gracefully

---

## Verification

- [ ] OAuth client initializes from env vars
- [ ] Authorization URL generated with correct scopes
- [ ] Token exchange works with valid authorization code
- [ ] Tokens persist to disk and reload on restart
- [ ] Token refresh works automatically
- [ ] Tokens never appear in logs or error messages

---

**Next Task**: [Task 3: YouTube API Client Wrapper](task-3-youtube-api-client-wrapper.md)
