import { jest } from "@jest/globals";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerCommentTools } from "../../src/tools/comments.js";
import { createMockClient } from "../helpers/mock-client.js";

const COMMENT_RESPONSE = {
  data: {
    kind: "youtube#commentListResponse",
    pageInfo: { totalResults: 5, resultsPerPage: 20 },
    items: [
      {
        kind: "youtube#comment",
        id: "reply123",
        snippet: {
          parentId: "c123",
          textDisplay: "Thanks!",
          textOriginal: "Thanks!",
          authorDisplayName: "Reply User",
          authorChannelId: { value: "UCreply" },
          likeCount: 1,
          publishedAt: "2026-01-16T10:00:00Z",
          updatedAt: "2026-01-16T10:00:00Z",
        },
      },
    ],
  },
};

const EMPTY_RESPONSE = { data: {} };

describe("Comment Tools Registration", () => {
  it("registers all 5 comment tools", () => {
    const { client } = createMockClient(COMMENT_RESPONSE);
    const server = new McpServer({ name: "test", version: "0.0.1" });
    registerCommentTools(server, client);

    const registeredTools = (server as any)._registeredTools;
    expect(registeredTools.youtube_comments_list).toBeDefined();
    expect(registeredTools.youtube_comments_insert).toBeDefined();
    expect(registeredTools.youtube_comments_update).toBeDefined();
    expect(registeredTools.youtube_comments_delete).toBeDefined();
    expect(registeredTools.youtube_comments_moderate).toBeDefined();
  });

  it("youtube_comments_list has quota cost 1 in description", () => {
    const { client } = createMockClient(COMMENT_RESPONSE);
    const server = new McpServer({ name: "test", version: "0.0.1" });
    registerCommentTools(server, client);

    const tool = (server as any)._registeredTools.youtube_comments_list;
    expect(tool.description).toContain("1 unit");
  });

  it("youtube_comments_insert has quota cost 50 in description", () => {
    const { client } = createMockClient(COMMENT_RESPONSE);
    const server = new McpServer({ name: "test", version: "0.0.1" });
    registerCommentTools(server, client);

    const tool = (server as any)._registeredTools.youtube_comments_insert;
    expect(tool.description).toContain("50");
  });

  it("youtube_comments_update has quota cost 50 in description", () => {
    const { client } = createMockClient(COMMENT_RESPONSE);
    const server = new McpServer({ name: "test", version: "0.0.1" });
    registerCommentTools(server, client);

    const tool = (server as any)._registeredTools.youtube_comments_update;
    expect(tool.description).toContain("50");
  });

  it("youtube_comments_delete has quota cost 50 in description", () => {
    const { client } = createMockClient(COMMENT_RESPONSE);
    const server = new McpServer({ name: "test", version: "0.0.1" });
    registerCommentTools(server, client);

    const tool = (server as any)._registeredTools.youtube_comments_delete;
    expect(tool.description).toContain("50");
  });

  it("youtube_comments_moderate has quota cost 50 in description", () => {
    const { client } = createMockClient(COMMENT_RESPONSE);
    const server = new McpServer({ name: "test", version: "0.0.1" });
    registerCommentTools(server, client);

    const tool = (server as any)._registeredTools.youtube_comments_moderate;
    expect(tool.description).toContain("50");
  });

  it("moderate description mentions moderation", () => {
    const { client } = createMockClient(COMMENT_RESPONSE);
    const server = new McpServer({ name: "test", version: "0.0.1" });
    registerCommentTools(server, client);

    const tool = (server as any)._registeredTools.youtube_comments_moderate;
    expect(tool.description).toMatch(/[Mm]oderation/);
  });

  it("insert description mentions force-ssl scope", () => {
    const { client } = createMockClient(COMMENT_RESPONSE);
    const server = new McpServer({ name: "test", version: "0.0.1" });
    registerCommentTools(server, client);

    const tool = (server as any)._registeredTools.youtube_comments_insert;
    expect(tool.description).toMatch(/force-ssl/i);
  });
});
