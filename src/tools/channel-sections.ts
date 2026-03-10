import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { YouTubeClient } from "../client/youtube.js";

/**
 * Register all ChannelSection MCP tools on the server.
 */
export function registerChannelSectionTools(
  server: McpServer,
  client: YouTubeClient,
): void {
  server.tool(
    "youtube_channel_sections_list",
    "List channel sections (homepage layout) for a YouTube channel. Quota: 1 unit.",
    {
      part: z
        .string()
        .default("snippet,contentDetails")
        .describe("Comma-separated parts: snippet, contentDetails, id, targeting"),
      channelId: z.string().optional().describe("Channel ID"),
      mine: z.boolean().optional().describe("List authenticated user's sections"),
      id: z.string().optional().describe("Comma-separated section IDs"),
    },
    async (args) => {
      const result = await client.execute((api) =>
        api.channelSections.list({
          part: [args.part],
          channelId: args.channelId,
          mine: args.mine,
          id: args.id ? args.id.split(",") : undefined,
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
    "youtube_channel_sections_insert",
    "Create a new channel section on a YouTube channel. Quota: 50 units.",
    {
      type: z
        .enum([
          "allPlaylists",
          "completedEvents",
          "likedPlaylists",
          "likes",
          "liveEvents",
          "multipleChannels",
          "multiplePlaylists",
          "popularUploads",
          "recentActivity",
          "recentPosts",
          "singlePlaylist",
          "subscriptions",
          "upcomingEvents",
        ])
        .describe("Section type"),
      title: z.string().optional().describe("Section title"),
      position: z.number().optional().describe("Position on channel page (0-based)"),
      playlistIds: z
        .string()
        .optional()
        .describe("Comma-separated playlist IDs (for playlist section types)"),
      channelIds: z
        .string()
        .optional()
        .describe("Comma-separated channel IDs (for multipleChannels type)"),
    },
    async (args) => {
      const result = await client.execute((api) =>
        api.channelSections.insert({
          part: ["snippet", "contentDetails"],
          requestBody: {
            snippet: {
              type: args.type,
              title: args.title,
              position: args.position,
            },
            contentDetails: {
              playlists: args.playlistIds
                ? args.playlistIds.split(",")
                : undefined,
              channels: args.channelIds
                ? args.channelIds.split(",")
                : undefined,
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
    "youtube_channel_sections_update",
    "Update a channel section's title or position. Quota: 50 units.",
    {
      id: z.string().describe("Channel section ID to update"),
      title: z.string().optional().describe("New section title"),
      position: z.number().optional().describe("New position (0-based)"),
    },
    async (args) => {
      const result = await client.execute((api) =>
        api.channelSections.update({
          part: ["snippet"],
          requestBody: {
            id: args.id,
            snippet: {
              ...(args.title !== undefined && { title: args.title }),
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
    "youtube_channel_sections_delete",
    "Delete a channel section. Quota: 50 units.",
    {
      id: z.string().describe("Channel section ID to delete"),
    },
    async (args) => {
      await client.execute((api) =>
        api.channelSections.delete({
          id: args.id,
        }),
      );

      return {
        content: [
          {
            type: "text" as const,
            text: `Channel section ${args.id} deleted successfully.`,
          },
        ],
      };
    },
  );
}
