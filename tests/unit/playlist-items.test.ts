import { jest } from "@jest/globals";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerPlaylistItemsTools } from "../../src/tools/playlist-items.js";
import { createMockClient, createTestServer } from "../helpers/mock-client.js";
import { PLAYLIST_ITEM_LIST_RESPONSE, PLAYLIST_ITEM_INSERT_RESPONSE } from "../fixtures/youtube-responses.js";

describe("PlaylistItems Tools Registration", () => {
  it("registers 4 playlist items tools on the server", () => {
    const { server } = createTestServer();
    const registeredTools = (server as any)._registeredTools;
    expect(registeredTools.youtube_playlist_items_list).toBeDefined();
    expect(registeredTools.youtube_playlist_items_insert).toBeDefined();
    expect(registeredTools.youtube_playlist_items_update).toBeDefined();
    expect(registeredTools.youtube_playlist_items_delete).toBeDefined();
  });

  it("each tool has a description mentioning quota", () => {
    const { server } = createTestServer();
    const registeredTools = (server as any)._registeredTools;
    for (const [name, tool] of Object.entries(registeredTools)) {
      if (name.startsWith("youtube_playlist_items_")) {
        expect((tool as any).description).toMatch(/[Qq]uota/);
      }
    }
  });
});

describe("youtube_playlist_items_list", () => {
  it("is registered with correct description", () => {
    const { server } = createTestServer({ data: PLAYLIST_ITEM_LIST_RESPONSE });
    const tool = (server as any)._registeredTools.youtube_playlist_items_list;
    expect(tool.description).toContain("List");
    expect(tool.description).toContain("1");
  });
});

describe("youtube_playlist_items_insert", () => {
  it("is registered with correct description", () => {
    const { server } = createTestServer({ data: PLAYLIST_ITEM_INSERT_RESPONSE });
    const tool = (server as any)._registeredTools.youtube_playlist_items_insert;
    expect(tool.description).toContain("Add");
    expect(tool.description).toContain("50");
  });
});

describe("youtube_playlist_items_delete", () => {
  it("is registered with correct description", () => {
    const { server } = createTestServer();
    const tool = (server as any)._registeredTools.youtube_playlist_items_delete;
    expect(tool.description).toContain("Remove");
    expect(tool.description).toContain("50");
  });
});
