import { jest } from "@jest/globals";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerPlaylistTools } from "../../src/tools/playlists.js";
import { YouTubeClient } from "../../src/client/youtube.js";
import { YouTubeAuth } from "../../src/auth/oauth.js";

// Create a mock client that returns canned responses
function createMockClient() {
  const mockAuth = {
    getClient: jest.fn(),
  } as unknown as YouTubeAuth;

  const client = new YouTubeClient(mockAuth);

  // Override execute to return mock data
  client.execute = jest.fn(async (fn: any) => {
    // Return a mock response based on what the function would call
    return { data: { kind: "youtube#playlistListResponse", items: [] } };
  }) as any;

  return client;
}

describe("Playlist Tools Registration", () => {
  it("registers 4 playlist tools on the server", () => {
    const server = new McpServer({ name: "test", version: "0.0.1" });
    const client = createMockClient();
    registerPlaylistTools(server, client);

    // Access internal registered tools to verify registration
    const registeredTools = (server as any)._registeredTools;
    expect(registeredTools).toBeDefined();
    expect(registeredTools.youtube_playlists_list).toBeDefined();
    expect(registeredTools.youtube_playlists_insert).toBeDefined();
    expect(registeredTools.youtube_playlists_update).toBeDefined();
    expect(registeredTools.youtube_playlists_delete).toBeDefined();
  });

  it("each tool has a description mentioning quota", () => {
    const server = new McpServer({ name: "test", version: "0.0.1" });
    const client = createMockClient();
    registerPlaylistTools(server, client);

    const registeredTools = (server as any)._registeredTools;
    for (const [name, tool] of Object.entries(registeredTools)) {
      if (name.startsWith("youtube_playlists_")) {
        expect((tool as any).description).toMatch(/[Qq]uota/);
      }
    }
  });
});
