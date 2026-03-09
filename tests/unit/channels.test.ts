import { jest } from "@jest/globals";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerChannelTools } from "../../src/tools/channels.js";
import { createMockClient } from "../helpers/mock-client.js";

const CHANNEL_RESPONSE = {
  data: {
    kind: "youtube#channelListResponse",
    pageInfo: { totalResults: 1, resultsPerPage: 5 },
    items: [
      {
        kind: "youtube#channel",
        id: "UCtest123",
        snippet: {
          title: "Test Channel",
          description: "A test channel",
          customUrl: "@testchannel",
          publishedAt: "2020-01-01T00:00:00Z",
          thumbnails: {
            default: { url: "https://yt3.ggpht.com/test/default.jpg" },
          },
        },
        contentDetails: {
          relatedPlaylists: {
            likes: "LL",
            uploads: "UUtest123",
          },
        },
        statistics: {
          viewCount: "1000000",
          subscriberCount: "50000",
          videoCount: "200",
        },
      },
    ],
  },
};

describe("Channel Tools Registration", () => {
  it("registers both channel tools", () => {
    const { client } = createMockClient(CHANNEL_RESPONSE);
    const server = new McpServer({ name: "test", version: "0.0.1" });
    registerChannelTools(server, client);

    const registeredTools = (server as any)._registeredTools;
    expect(registeredTools.youtube_channels_list).toBeDefined();
    expect(registeredTools.youtube_channels_update).toBeDefined();
  });

  it("youtube_channels_list has quota cost 1 in description", () => {
    const { client } = createMockClient(CHANNEL_RESPONSE);
    const server = new McpServer({ name: "test", version: "0.0.1" });
    registerChannelTools(server, client);

    const tool = (server as any)._registeredTools.youtube_channels_list;
    expect(tool.description).toContain("1 unit");
  });

  it("youtube_channels_update has quota cost 50 in description", () => {
    const { client } = createMockClient(CHANNEL_RESPONSE);
    const server = new McpServer({ name: "test", version: "0.0.1" });
    registerChannelTools(server, client);

    const tool = (server as any)._registeredTools.youtube_channels_update;
    expect(tool.description).toContain("50");
  });

  it("youtube_channels_list description mentions channels", () => {
    const { client } = createMockClient(CHANNEL_RESPONSE);
    const server = new McpServer({ name: "test", version: "0.0.1" });
    registerChannelTools(server, client);

    const tool = (server as any)._registeredTools.youtube_channels_list;
    expect(tool.description).toMatch(/[Cc]hannel/);
  });
});
