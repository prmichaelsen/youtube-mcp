import { jest } from "@jest/globals";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerCommentThreadTools } from "../../src/tools/comment-threads.js";
import { createMockClient } from "../helpers/mock-client.js";

const COMMENT_THREAD_RESPONSE = {
  data: {
    kind: "youtube#commentThreadListResponse",
    pageInfo: { totalResults: 50, resultsPerPage: 20 },
    items: [
      {
        kind: "youtube#commentThread",
        id: "ct123",
        snippet: {
          videoId: "vid123",
          topLevelComment: {
            kind: "youtube#comment",
            id: "c123",
            snippet: {
              videoId: "vid123",
              textDisplay: "Great video!",
              textOriginal: "Great video!",
              authorDisplayName: "Test User",
              authorChannelId: { value: "UCuser" },
              likeCount: 5,
              publishedAt: "2026-01-15T12:00:00Z",
              updatedAt: "2026-01-15T12:00:00Z",
            },
          },
          totalReplyCount: 2,
          isPublic: true,
        },
      },
    ],
  },
};

describe("CommentThread Tools Registration", () => {
  it("registers both comment thread tools", () => {
    const { client } = createMockClient(COMMENT_THREAD_RESPONSE);
    const server = new McpServer({ name: "test", version: "0.0.1" });
    registerCommentThreadTools(server, client);

    const registeredTools = (server as any)._registeredTools;
    expect(registeredTools.youtube_comment_threads_list).toBeDefined();
    expect(registeredTools.youtube_comment_threads_insert).toBeDefined();
  });

  it("youtube_comment_threads_list has quota cost 1 in description", () => {
    const { client } = createMockClient(COMMENT_THREAD_RESPONSE);
    const server = new McpServer({ name: "test", version: "0.0.1" });
    registerCommentThreadTools(server, client);

    const tool = (server as any)._registeredTools.youtube_comment_threads_list;
    expect(tool.description).toContain("1 unit");
  });

  it("youtube_comment_threads_insert has quota cost 50 in description", () => {
    const { client } = createMockClient(COMMENT_THREAD_RESPONSE);
    const server = new McpServer({ name: "test", version: "0.0.1" });
    registerCommentThreadTools(server, client);

    const tool = (server as any)._registeredTools.youtube_comment_threads_insert;
    expect(tool.description).toContain("50");
  });

  it("insert description mentions force-ssl scope", () => {
    const { client } = createMockClient(COMMENT_THREAD_RESPONSE);
    const server = new McpServer({ name: "test", version: "0.0.1" });
    registerCommentThreadTools(server, client);

    const tool = (server as any)._registeredTools.youtube_comment_threads_insert;
    expect(tool.description).toMatch(/force-ssl/i);
  });

  it("list description mentions comment", () => {
    const { client } = createMockClient(COMMENT_THREAD_RESPONSE);
    const server = new McpServer({ name: "test", version: "0.0.1" });
    registerCommentThreadTools(server, client);

    const tool = (server as any)._registeredTools.youtube_comment_threads_list;
    expect(tool.description).toMatch(/[Cc]omment/);
  });
});
