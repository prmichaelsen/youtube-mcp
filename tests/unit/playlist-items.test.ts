import { jest } from "@jest/globals";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerPlaylistItemsTools } from "../../src/tools/playlist-items.js";
import { YouTubeClient } from "../../src/client/youtube.js";
import { YouTubeAuth } from "../../src/auth/oauth.js";

function createMockClient() {
  const mockAuth = {
    getClient: jest.fn(),
  } as unknown as YouTubeAuth;

  const client = new YouTubeClient(mockAuth);

  client.execute = jest.fn(async (fn: any) => {
    return { data: { kind: "youtube#playlistItemListResponse", items: [] } };
  }) as any;

  return client;
}

describe("PlaylistItems Tools Registration", () => {
  it("registers 4 playlist items tools on the server", () => {
    const server = new McpServer({ name: "test", version: "0.0.1" });
    const client = createMockClient();
    registerPlaylistItemsTools(server, client);

    const registeredTools = (server as any)._registeredTools;
    expect(registeredTools).toBeDefined();
    expect(registeredTools.youtube_playlist_items_list).toBeDefined();
    expect(registeredTools.youtube_playlist_items_insert).toBeDefined();
    expect(registeredTools.youtube_playlist_items_update).toBeDefined();
    expect(registeredTools.youtube_playlist_items_delete).toBeDefined();
  });

  it("each tool has a description mentioning quota", () => {
    const server = new McpServer({ name: "test", version: "0.0.1" });
    const client = createMockClient();
    registerPlaylistItemsTools(server, client);

    const registeredTools = (server as any)._registeredTools;
    for (const [name, tool] of Object.entries(registeredTools)) {
      if (name.startsWith("youtube_playlist_items_")) {
        expect((tool as any).description).toMatch(/[Qq]uota/);
      }
    }
  });
});
