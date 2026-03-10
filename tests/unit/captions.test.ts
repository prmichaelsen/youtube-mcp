import { jest } from "@jest/globals";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerCaptionTools } from "../../src/tools/captions.js";
import { createMockClient } from "../helpers/mock-client.js";

const CAPTION_LIST_RESPONSE = {
  data: {
    kind: "youtube#captionListResponse",
    items: [
      {
        kind: "youtube#caption",
        id: "cap123",
        snippet: {
          videoId: "vid123",
          lastUpdated: "2026-01-15T00:00:00Z",
          trackKind: "standard",
          language: "en",
          name: "English",
          audioTrackType: "unknown",
          isCC: false,
          isLarge: false,
          isEasyReader: false,
          isDraft: false,
          isAutoSynced: false,
          status: "serving",
        },
      },
    ],
  },
};

describe("Caption Tools Registration", () => {
  it("registers all 5 caption tools", () => {
    const { client } = createMockClient(CAPTION_LIST_RESPONSE);
    const server = new McpServer({ name: "test", version: "0.0.1" });
    registerCaptionTools(server, client);

    const registeredTools = (server as any)._registeredTools;
    expect(registeredTools.youtube_captions_list).toBeDefined();
    expect(registeredTools.youtube_captions_insert).toBeDefined();
    expect(registeredTools.youtube_captions_update).toBeDefined();
    expect(registeredTools.youtube_captions_download).toBeDefined();
    expect(registeredTools.youtube_captions_delete).toBeDefined();
  });

  it("youtube_captions_list has quota cost 50 in description", () => {
    const { client } = createMockClient(CAPTION_LIST_RESPONSE);
    const server = new McpServer({ name: "test", version: "0.0.1" });
    registerCaptionTools(server, client);

    const tool = (server as any)._registeredTools.youtube_captions_list;
    expect(tool.description).toContain("50");
  });

  it("youtube_captions_insert has quota cost 400 in description", () => {
    const { client } = createMockClient(CAPTION_LIST_RESPONSE);
    const server = new McpServer({ name: "test", version: "0.0.1" });
    registerCaptionTools(server, client);

    const tool = (server as any)._registeredTools.youtube_captions_insert;
    expect(tool.description).toContain("400");
  });

  it("youtube_captions_update has quota cost 450 in description", () => {
    const { client } = createMockClient(CAPTION_LIST_RESPONSE);
    const server = new McpServer({ name: "test", version: "0.0.1" });
    registerCaptionTools(server, client);

    const tool = (server as any)._registeredTools.youtube_captions_update;
    expect(tool.description).toContain("450");
  });

  it("youtube_captions_download has quota cost 200 in description", () => {
    const { client } = createMockClient(CAPTION_LIST_RESPONSE);
    const server = new McpServer({ name: "test", version: "0.0.1" });
    registerCaptionTools(server, client);

    const tool = (server as any)._registeredTools.youtube_captions_download;
    expect(tool.description).toContain("200");
  });

  it("youtube_captions_delete has quota cost 50 in description", () => {
    const { client } = createMockClient(CAPTION_LIST_RESPONSE);
    const server = new McpServer({ name: "test", version: "0.0.1" });
    registerCaptionTools(server, client);

    const tool = (server as any)._registeredTools.youtube_captions_delete;
    expect(tool.description).toContain("50");
  });

  it("all caption tools mention force-ssl scope", () => {
    const { client } = createMockClient(CAPTION_LIST_RESPONSE);
    const server = new McpServer({ name: "test", version: "0.0.1" });
    registerCaptionTools(server, client);

    const tools = (server as any)._registeredTools;
    for (const name of [
      "youtube_captions_list",
      "youtube_captions_insert",
      "youtube_captions_update",
      "youtube_captions_download",
      "youtube_captions_delete",
    ]) {
      expect(tools[name].description).toMatch(/force-ssl/i);
    }
  });
});
