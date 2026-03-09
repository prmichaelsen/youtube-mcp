import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { YouTubeClient } from "../client/youtube.js";

/**
 * Register all PlaylistItems MCP tools on the server.
 */
export function registerPlaylistItemsTools(
  server: McpServer,
  client: YouTubeClient,
): void {
  server.tool(
    "youtube_playlist_items_list",
    "List videos in a YouTube playlist. Quota: 1 unit.",
    {
      playlistId: z.string().describe("Playlist ID to list items from"),
      part: z
        .string()
        .default("snippet,contentDetails")
        .describe("Comma-separated parts: snippet, contentDetails, id, status"),
      maxResults: z.number().min(0).max(50).default(25).describe("Max results (0-50)"),
      pageToken: z.string().optional().describe("Pagination token"),
    },
    async (args) => {
      const result = await client.execute((api) =>
        api.playlistItems.list({
          part: [args.part],
          playlistId: args.playlistId,
          maxResults: args.maxResults,
          pageToken: args.pageToken,
        }),
      );

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(result.data, null, 2),
          },
        ],
      };
    },
  );

  server.tool(
    "youtube_playlist_items_insert",
    "Add a video to a YouTube playlist. Quota: 50 units.",
    {
      playlistId: z.string().describe("Playlist ID to add the video to"),
      videoId: z.string().describe("Video ID to add"),
      position: z.number().min(0).optional().describe("Position in playlist (0-based)"),
    },
    async (args) => {
      const result = await client.execute((api) =>
        api.playlistItems.insert({
          part: ["snippet"],
          requestBody: {
            snippet: {
              playlistId: args.playlistId,
              resourceId: {
                kind: "youtube#video",
                videoId: args.videoId,
              },
              ...(args.position !== undefined && { position: args.position }),
            },
          },
        }),
      );

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(result.data, null, 2),
          },
        ],
      };
    },
  );

  server.tool(
    "youtube_playlist_items_update",
    "Update a playlist item's position. Quota: 50 units.",
    {
      id: z.string().describe("Playlist item ID"),
      playlistId: z.string().describe("Playlist ID"),
      videoId: z.string().describe("Video ID"),
      position: z.number().min(0).describe("New position (0-based)"),
    },
    async (args) => {
      const result = await client.execute((api) =>
        api.playlistItems.update({
          part: ["snippet"],
          requestBody: {
            id: args.id,
            snippet: {
              playlistId: args.playlistId,
              resourceId: {
                kind: "youtube#video",
                videoId: args.videoId,
              },
              position: args.position,
            },
          },
        }),
      );

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(result.data, null, 2),
          },
        ],
      };
    },
  );

  server.tool(
    "youtube_playlist_items_delete",
    "Remove a video from a YouTube playlist. Quota: 50 units.",
    {
      id: z.string().describe("Playlist item ID to delete"),
    },
    async (args) => {
      await client.execute((api) =>
        api.playlistItems.delete({
          id: args.id,
        }),
      );

      return {
        content: [
          {
            type: "text" as const,
            text: `Playlist item ${args.id} deleted successfully.`,
          },
        ],
      };
    },
  );
}
