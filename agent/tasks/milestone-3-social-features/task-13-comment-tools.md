# Task 13: Comment Tools

**Milestone**: [M3 - Social Features](../../milestones/milestone-3-social-features.md)
**Design Reference**: [Requirements](../../design/requirements.md)
**Estimated Time**: 5 hours
**Dependencies**: Task 12
**Status**: Not Started

---

## Objective

Implement 5 MCP tools for YouTube Comment management: list, insert, update, delete, and moderate.

---

## Context

Comment tools handle replies to existing comments and comment moderation. The moderation tool (setModerationStatus) is particularly important for channel owners managing their community. All comment write operations require youtube.force-ssl scope.

---

## Steps

### 1. Create comment tools module
Create `src/tools/comments.ts`.

### 2. `youtube_comments_list`
- **Params**: part (snippet), parentId, maxResults?, pageToken?
- **Returns**: List of reply comments
- **Quota**: 1 unit

### 3. `youtube_comments_insert`
- **Params**: parentId, text
- **Returns**: Created comment
- **Quota**: 50 units

### 4. `youtube_comments_update`
- **Params**: id, text
- **Returns**: Updated comment
- **Quota**: 50 units

### 5. `youtube_comments_delete`
- **Params**: id
- **Returns**: Success confirmation
- **Quota**: 50 units

### 6. `youtube_comments_moderate`
- **Params**: id, moderationStatus (heldForReview/published/rejected), banAuthor?
- **Returns**: Success confirmation
- **Quota**: 50 units

### 7. Register tools and write tests

---

## Verification

- [ ] `youtube_comments_list` returns replies to a comment
- [ ] `youtube_comments_insert` posts a reply
- [ ] `youtube_comments_update` edits comment text
- [ ] `youtube_comments_delete` removes a comment
- [ ] `youtube_comments_moderate` changes moderation status
- [ ] banAuthor parameter works with moderate tool
- [ ] All tools use youtube.force-ssl scope

---

**Next Task**: [Task 14: Caption Tools](../milestone-4-full-coverage/task-14-caption-tools.md)
