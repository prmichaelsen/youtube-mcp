import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { YouTubeClient } from "./client/youtube.js";
import { YouTubeAuth } from "./auth/oauth.js";
import { registerPlaylistTools } from "./tools/playlists.js";
import { registerPlaylistItemsTools } from "./tools/playlist-items.js";
import { registerSearchTools } from "./tools/search.js";
import { registerVideoTools } from "./tools/videos.js";
import { registerChannelTools } from "./tools/channels.js";
import { registerSubscriptionTools } from "./tools/subscriptions.js";
import { registerCommentThreadTools } from "./tools/comment-threads.js";
import { registerCommentTools } from "./tools/comments.js";
import { registerCaptionTools } from "./tools/captions.js";
import { registerChannelSectionTools } from "./tools/channel-sections.js";
import { registerChannelBannerTools } from "./tools/channel-banners.js";
import { registerThumbnailTools } from "./tools/thumbnails.js";
import { registerWatermarkTools } from "./tools/watermarks.js";

/**
 * Create and configure the MCP server with all YouTube tools.
 */
export function createServer(auth?: YouTubeAuth): McpServer {
  const server = new McpServer({
    name: "youtube-mcp",
    version: "0.15.0",
  });

  if (auth) {
    const client = new YouTubeClient(auth);
    registerPlaylistTools(server, client);
    registerPlaylistItemsTools(server, client);
    registerSearchTools(server, client);
    registerVideoTools(server, client);
    registerChannelTools(server, client);
    registerSubscriptionTools(server, client);
    registerCommentThreadTools(server, client);
    registerCommentTools(server, client);
    registerCaptionTools(server, client);
    registerChannelSectionTools(server, client);
    registerChannelBannerTools(server, client);
    registerThumbnailTools(server, client);
    registerWatermarkTools(server, client);
  }

  return server;
}
