# Task 10: Channel Tools

**Milestone**: [M3 - Social Features](../../milestones/milestone-3-social-features.md)
**Design Reference**: [Requirements](../../design/requirements.md)
**Estimated Time**: 3 hours
**Dependencies**: Task 9
**Status**: Not Started

---

## Objective

Implement 2 MCP tools for YouTube Channel management: list and update.

---

## Context

Channel tools allow agents to view channel details (subscriber count, description, branding) and update channel metadata. The update operation requires the full youtube scope.

---

## Steps

### 1. Create channel tools module
Create `src/tools/channels.ts`.

### 2. `youtube_channels_list`
- **Params**: part (snippet, contentDetails, statistics, brandingSettings), id?, mine?, forUsername?, maxResults?
- **Returns**: Channel details
- **Quota**: 1 unit

### 3. `youtube_channels_update`
- **Params**: id, description?, keywords?, defaultLanguage?, country?
- **Returns**: Updated channel object
- **Quota**: 50 units

### 4. Register tools and write tests

---

## Verification

- [ ] `youtube_channels_list` returns channel details (mine=true)
- [ ] `youtube_channels_list` returns details by channel ID
- [ ] `youtube_channels_update` modifies channel description
- [ ] Zod validation and quota costs documented

---

**Next Task**: [Task 11: Subscription Tools](task-11-subscription-tools.md)
