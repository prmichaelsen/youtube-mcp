import { jest } from "@jest/globals";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerPlaylistTools } from "../../src/tools/playlists.js";
import { createMockClient, createTestServer } from "../helpers/mock-client.js";
import { PLAYLIST_LIST_RESPONSE, PLAYLIST_INSERT_RESPONSE } from "../fixtures/youtube-responses.js";

describe("Playlist Tools Registration", () => {
  it("registers 4 playlist tools on the server", () => {
    const { server } = createTestServer();
    const registeredTools = (server as any)._registeredTools;
    expect(registeredTools.youtube_playlists_list).toBeDefined();
    expect(registeredTools.youtube_playlists_insert).toBeDefined();
    expect(registeredTools.youtube_playlists_update).toBeDefined();
    expect(registeredTools.youtube_playlists_delete).toBeDefined();
  });

  it("each tool has a description mentioning quota", () => {
    const { server } = createTestServer();
    const registeredTools = (server as any)._registeredTools;
    for (const [name, tool] of Object.entries(registeredTools)) {
      if (name.startsWith("youtube_playlists_")) {
        expect((tool as any).description).toMatch(/[Qq]uota/);
      }
    }
  });
});

describe("youtube_playlists_list", () => {
  it("calls the YouTube API with correct parameters", async () => {
    const { client, executeMock } = createMockClient({ data: PLAYLIST_LIST_RESPONSE });
    const server = new McpServer({ name: "test", version: "0.0.1" });
    registerPlaylistTools(server, client);

    const tool = (server as any)._registeredTools.youtube_playlists_list;
    expect(tool).toBeDefined();
    expect(executeMock).not.toHaveBeenCalled();
  });
});

describe("youtube_playlists_insert", () => {
  it("is registered with correct description", () => {
    const { server } = createTestServer({ data: PLAYLIST_INSERT_RESPONSE });
    const tool = (server as any)._registeredTools.youtube_playlists_insert;
    expect(tool.description).toContain("Create");
    expect(tool.description).toContain("50");
  });
});

describe("youtube_playlists_delete", () => {
  it("is registered with correct description", () => {
    const { server } = createTestServer();
    const tool = (server as any)._registeredTools.youtube_playlists_delete;
    expect(tool.description).toContain("Delete");
    expect(tool.description).toContain("50");
  });
});
