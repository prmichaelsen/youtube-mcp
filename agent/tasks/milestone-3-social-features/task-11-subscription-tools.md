# Task 11: Subscription Tools

**Milestone**: [M3 - Social Features](../../milestones/milestone-3-social-features.md)
**Design Reference**: [Requirements](../../design/requirements.md)
**Estimated Time**: 3 hours
**Dependencies**: Task 10
**Status**: Not Started

---

## Objective

Implement 3 MCP tools for YouTube Subscription management: list, insert, and delete.

---

## Context

Subscription tools let agents manage channel subscriptions on behalf of users. Each insert/delete costs 50 quota units. The list operation supports filtering by channel ID.

---

## Steps

### 1. Create subscription tools module
Create `src/tools/subscriptions.ts`.

### 2. `youtube_subscriptions_list`
- **Params**: part (snippet, contentDetails), mine?, channelId?, forChannelId?, maxResults?, pageToken?, order? (alphabetical/relevance/unread)
- **Returns**: List of subscriptions
- **Quota**: 1 unit

### 3. `youtube_subscriptions_insert`
- **Params**: channelId (channel to subscribe to)
- **Returns**: Created subscription object
- **Quota**: 50 units

### 4. `youtube_subscriptions_delete`
- **Params**: id (subscription ID)
- **Returns**: Success confirmation
- **Quota**: 50 units

### 5. Register tools and write tests

---

## Verification

- [ ] `youtube_subscriptions_list` returns user's subscriptions
- [ ] `youtube_subscriptions_insert` subscribes to a channel
- [ ] `youtube_subscriptions_delete` unsubscribes
- [ ] Duplicate subscription handled gracefully (409 conflict)

---

**Next Task**: [Task 12: CommentThread Tools](task-12-comment-thread-tools.md)
