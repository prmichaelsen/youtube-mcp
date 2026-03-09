import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { YouTubeClient } from "../client/youtube.js";

/**
 * Register all Playlist MCP tools on the server.
 */
export function registerPlaylistTools(
  server: McpServer,
  client: YouTubeClient,
): void {
  server.tool(
    "youtube_playlists_list",
    "List YouTube playlists by channel, ID, or for the authenticated user. Quota: 1 unit.",
    {
      part: z
        .string()
        .default("snippet,contentDetails")
        .describe("Comma-separated list of parts: snippet, contentDetails, status, id, player, localizations"),
      channelId: z.string().optional().describe("Filter by channel ID"),
      id: z.string().optional().describe("Comma-separated playlist IDs"),
      mine: z.boolean().optional().describe("List authenticated user's playlists"),
      maxResults: z.number().min(0).max(50).default(25).describe("Max results (0-50)"),
      pageToken: z.string().optional().describe("Pagination token"),
    },
    async (args) => {
      const result = await client.execute((api) =>
        api.playlists.list({
          part: [args.part],
          channelId: args.channelId,
          id: args.id ? [args.id] : undefined,
          mine: args.mine,
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
    "youtube_playlists_insert",
    "Create a new YouTube playlist. Quota: 50 units.",
    {
      title: z.string().describe("Playlist title"),
      description: z.string().optional().describe("Playlist description"),
      privacyStatus: z
        .enum(["public", "private", "unlisted"])
        .default("private")
        .describe("Privacy status"),
      defaultLanguage: z.string().optional().describe("Default language (BCP-47)"),
    },
    async (args) => {
      const result = await client.execute((api) =>
        api.playlists.insert({
          part: ["snippet", "status"],
          requestBody: {
            snippet: {
              title: args.title,
              description: args.description,
              defaultLanguage: args.defaultLanguage,
            },
            status: {
              privacyStatus: args.privacyStatus,
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
    "youtube_playlists_update",
    "Update a YouTube playlist's title, description, or privacy status. Quota: 50 units.",
    {
      id: z.string().describe("Playlist ID to update"),
      title: z.string().optional().describe("New playlist title"),
      description: z.string().optional().describe("New playlist description"),
      privacyStatus: z
        .enum(["public", "private", "unlisted"])
        .optional()
        .describe("New privacy status"),
    },
    async (args) => {
      const result = await client.execute((api) =>
        api.playlists.update({
          part: ["snippet", "status"],
          requestBody: {
            id: args.id,
            snippet: {
              title: args.title ?? "",
              ...(args.description !== undefined && {
                description: args.description,
              }),
            },
            ...(args.privacyStatus && {
              status: {
                privacyStatus: args.privacyStatus,
              },
            }),
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
    "youtube_playlists_delete",
    "Delete a YouTube playlist. Quota: 50 units.",
    {
      id: z.string().describe("Playlist ID to delete"),
    },
    async (args) => {
      await client.execute((api) =>
        api.playlists.delete({
          id: args.id,
        }),
      );

      return {
        content: [
          {
            type: "text" as const,
            text: `Playlist ${args.id} deleted successfully.`,
          },
        ],
      };
    },
  );
}
