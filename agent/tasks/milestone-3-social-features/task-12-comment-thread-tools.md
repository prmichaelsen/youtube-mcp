# Task 12: CommentThread Tools

**Milestone**: [M3 - Social Features](../../milestones/milestone-3-social-features.md)
**Design Reference**: [Requirements](../../design/requirements.md)
**Estimated Time**: 3 hours
**Dependencies**: Task 10
**Status**: Not Started

---

## Objective

Implement 2 MCP tools for YouTube CommentThread management: list and insert.

---

## Context

CommentThreads represent top-level comments on videos. The list tool retrieves comment threads, and insert posts new top-level comments. These tools require the youtube.force-ssl scope.

---

## Steps

### 1. Create comment threads tools module
Create `src/tools/comment-threads.ts`.

### 2. `youtube_comment_threads_list`
- **Params**: part (snippet, replies), videoId?, channelId?, id?, maxResults?, pageToken?, order? (time/relevance), searchTerms?
- **Returns**: List of comment threads with top-level comment and reply count
- **Quota**: 1 unit

### 3. `youtube_comment_threads_insert`
- **Params**: videoId, channelId, text
- **Returns**: Created comment thread
- **Quota**: 50 units
- **Scope**: youtube.force-ssl

### 4. Register tools and write tests

---

## Verification

- [ ] `youtube_comment_threads_list` returns comments on a video
- [ ] `youtube_comment_threads_list` supports search within comments
- [ ] `youtube_comment_threads_insert` posts a top-level comment
- [ ] youtube.force-ssl scope requested for write operations

---

**Next Task**: [Task 13: Comment Tools](task-13-comment-tools.md)
