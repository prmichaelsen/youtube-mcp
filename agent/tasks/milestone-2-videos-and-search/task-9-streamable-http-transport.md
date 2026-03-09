# Task 9: Streamable HTTP Transport

**Milestone**: [M2 - Videos & Search](../../milestones/milestone-2-videos-and-search.md)
**Design Reference**: [Requirements](../../design/requirements.md)
**Estimated Time**: 4 hours
**Dependencies**: Task 8
**Status**: Not Started

---

## Objective

Add streamable HTTP transport to the MCP server, enabling networked deployment alongside the existing stdio transport.

---

## Context

The MCP SDK supports both stdio and streamable HTTP transports. Adding HTTP transport allows the server to be deployed as a networked service, enabling multiple clients to connect simultaneously. The transport should be selectable via configuration.

---

## Steps

### 1. Create HTTP transport module
Create `src/transport/http.ts`:
- HTTP server setup using MCP SDK's StreamableHTTPServerTransport
- Configurable port and host via environment variables

### 2. Update server entry point
Modify `src/index.ts` to select transport based on config:
- `--transport stdio` (default)
- `--transport http --port 3000`

### 3. Add environment variables
```env
TRANSPORT=stdio
HTTP_PORT=3000
HTTP_HOST=0.0.0.0
```

### 4. Test HTTP transport
- Verify MCP requests work over HTTP
- Test concurrent connections
- Verify error responses

---

## Verification

- [ ] Server starts with stdio transport (default)
- [ ] Server starts with HTTP transport (`--transport http`)
- [ ] HTTP transport responds to MCP tool calls
- [ ] Port and host configurable via env vars
- [ ] Both transports work with all existing tools
- [ ] Concurrent HTTP connections handled correctly

---

**Next Task**: [Task 10: Channel Tools](../milestone-3-social-features/task-10-channel-tools.md)
