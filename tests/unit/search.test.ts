import { jest } from "@jest/globals";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerSearchTools } from "../../src/tools/search.js";
import { createMockClient } from "../helpers/mock-client.js";

const SEARCH_RESPONSE = {
  data: {
    kind: "youtube#searchListResponse",
    pageInfo: { totalResults: 100, resultsPerPage: 10 },
    nextPageToken: "CAUQAA",
    items: [
      {
        kind: "youtube#searchResult",
        id: { kind: "youtube#video", videoId: "abc123" },
        snippet: {
          publishedAt: "2026-01-15T00:00:00Z",
          channelId: "UCtest",
          title: "Test Video",
          description: "A test video",
          channelTitle: "Test Channel",
          thumbnails: {
            default: { url: "https://i.ytimg.com/vi/abc123/default.jpg" },
          },
        },
      },
    ],
  },
};

describe("Search Tool Registration", () => {
  it("registers youtube_search tool", () => {
    const { client } = createMockClient(SEARCH_RESPONSE);
    const server = new McpServer({ name: "test", version: "0.0.1" });
    registerSearchTools(server, client);

    const registeredTools = (server as any)._registeredTools;
    expect(registeredTools.youtube_search).toBeDefined();
  });

  it("has description mentioning quota cost of 100", () => {
    const { client } = createMockClient(SEARCH_RESPONSE);
    const server = new McpServer({ name: "test", version: "0.0.1" });
    registerSearchTools(server, client);

    const tool = (server as any)._registeredTools.youtube_search;
    expect(tool.description).toContain("100");
  });

  it("has description mentioning search capabilities", () => {
    const { client } = createMockClient(SEARCH_RESPONSE);
    const server = new McpServer({ name: "test", version: "0.0.1" });
    registerSearchTools(server, client);

    const tool = (server as any)._registeredTools.youtube_search;
    expect(tool.description).toMatch(/[Ss]earch/);
    expect(tool.description).toMatch(/video|channel|playlist/i);
  });
});
