import { jest } from "@jest/globals";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerChannelSectionTools } from "../../src/tools/channel-sections.js";
import { registerChannelBannerTools } from "../../src/tools/channel-banners.js";
import { registerThumbnailTools } from "../../src/tools/thumbnails.js";
import { registerWatermarkTools } from "../../src/tools/watermarks.js";
import { createMockClient } from "../helpers/mock-client.js";

const MOCK_RESPONSE = {
  data: { kind: "youtube#channelSectionListResponse", items: [] },
};

describe("Channel Section Tools Registration", () => {
  it("registers all 4 channel section tools", () => {
    const { client } = createMockClient(MOCK_RESPONSE);
    const server = new McpServer({ name: "test", version: "0.0.1" });
    registerChannelSectionTools(server, client);

    const tools = (server as any)._registeredTools;
    expect(tools.youtube_channel_sections_list).toBeDefined();
    expect(tools.youtube_channel_sections_insert).toBeDefined();
    expect(tools.youtube_channel_sections_update).toBeDefined();
    expect(tools.youtube_channel_sections_delete).toBeDefined();
  });

  it("youtube_channel_sections_list has quota cost 1 in description", () => {
    const { client } = createMockClient(MOCK_RESPONSE);
    const server = new McpServer({ name: "test", version: "0.0.1" });
    registerChannelSectionTools(server, client);

    const tool = (server as any)._registeredTools.youtube_channel_sections_list;
    expect(tool.description).toContain("1 unit");
  });

  it("youtube_channel_sections_insert has quota cost 50 in description", () => {
    const { client } = createMockClient(MOCK_RESPONSE);
    const server = new McpServer({ name: "test", version: "0.0.1" });
    registerChannelSectionTools(server, client);

    const tool = (server as any)._registeredTools.youtube_channel_sections_insert;
    expect(tool.description).toContain("50");
  });
});

describe("Channel Banner Tools Registration", () => {
  it("registers youtube_channel_banners_insert", () => {
    const { client } = createMockClient(MOCK_RESPONSE);
    const server = new McpServer({ name: "test", version: "0.0.1" });
    registerChannelBannerTools(server, client);

    const tools = (server as any)._registeredTools;
    expect(tools.youtube_channel_banners_insert).toBeDefined();
  });

  it("has quota cost 50 in description", () => {
    const { client } = createMockClient(MOCK_RESPONSE);
    const server = new McpServer({ name: "test", version: "0.0.1" });
    registerChannelBannerTools(server, client);

    const tool = (server as any)._registeredTools.youtube_channel_banners_insert;
    expect(tool.description).toContain("50");
  });
});

describe("Thumbnail Tools Registration", () => {
  it("registers youtube_thumbnails_set", () => {
    const { client } = createMockClient(MOCK_RESPONSE);
    const server = new McpServer({ name: "test", version: "0.0.1" });
    registerThumbnailTools(server, client);

    const tools = (server as any)._registeredTools;
    expect(tools.youtube_thumbnails_set).toBeDefined();
  });

  it("has quota cost 50 in description", () => {
    const { client } = createMockClient(MOCK_RESPONSE);
    const server = new McpServer({ name: "test", version: "0.0.1" });
    registerThumbnailTools(server, client);

    const tool = (server as any)._registeredTools.youtube_thumbnails_set;
    expect(tool.description).toContain("50");
  });
});

describe("Watermark Tools Registration", () => {
  it("registers both watermark tools", () => {
    const { client } = createMockClient(MOCK_RESPONSE);
    const server = new McpServer({ name: "test", version: "0.0.1" });
    registerWatermarkTools(server, client);

    const tools = (server as any)._registeredTools;
    expect(tools.youtube_watermarks_set).toBeDefined();
    expect(tools.youtube_watermarks_unset).toBeDefined();
  });

  it("youtube_watermarks_set has quota cost 50 in description", () => {
    const { client } = createMockClient(MOCK_RESPONSE);
    const server = new McpServer({ name: "test", version: "0.0.1" });
    registerWatermarkTools(server, client);

    const tool = (server as any)._registeredTools.youtube_watermarks_set;
    expect(tool.description).toContain("50");
  });

  it("youtube_watermarks_unset has quota cost 50 in description", () => {
    const { client } = createMockClient(MOCK_RESPONSE);
    const server = new McpServer({ name: "test", version: "0.0.1" });
    registerWatermarkTools(server, client);

    const tool = (server as any)._registeredTools.youtube_watermarks_unset;
    expect(tool.description).toContain("50");
  });
});
