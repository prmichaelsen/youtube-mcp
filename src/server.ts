import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { YouTubeClient } from "./client/youtube.js";
import { YouTubeAuth } from "./auth/oauth.js";
import { registerPlaylistTools } from "./tools/playlists.js";
import { registerPlaylistItemsTools } from "./tools/playlist-items.js";

/**
 * Create and configure the MCP server with all YouTube tools.
 */
export function createServer(auth?: YouTubeAuth): McpServer {
  const server = new McpServer({
    name: "youtube-mcp",
    version: "0.6.0",
  });

  if (auth) {
    const client = new YouTubeClient(auth);
    registerPlaylistTools(server, client);
    registerPlaylistItemsTools(server, client);
  }

  return server;
}
