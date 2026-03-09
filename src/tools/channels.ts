import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { YouTubeClient } from "../client/youtube.js";

/**
 * Register all Channel MCP tools on the server.
 */
export function registerChannelTools(
  server: McpServer,
  client: YouTubeClient,
): void {
  server.tool(
    "youtube_channels_list",
    "List YouTube channels by ID, username, or for the authenticated user. Quota: 1 unit.",
    {
      part: z
        .string()
        .default("snippet,contentDetails,statistics")
        .describe(
          "Comma-separated parts: snippet, contentDetails, statistics, brandingSettings, status, topicDetails",
        ),
      id: z.string().optional().describe("Comma-separated channel IDs"),
      mine: z
        .boolean()
        .optional()
        .describe("List authenticated user's channel"),
      forUsername: z
        .string()
        .optional()
        .describe("Filter by YouTube username"),
      maxResults: z
        .number()
        .min(1)
        .max(50)
        .default(5)
        .describe("Max results (1-50)"),
    },
    async (args) => {
      const result = await client.execute((api) =>
        api.channels.list({
          part: [args.part],
          id: args.id ? args.id.split(",") : undefined,
          mine: args.mine,
          forUsername: args.forUsername,
          maxResults: args.maxResults,
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
    "youtube_channels_update",
    "Update a YouTube channel's metadata (description, keywords, language, country). Quota: 50 units.",
    {
      id: z.string().describe("Channel ID to update"),
      description: z.string().optional().describe("New channel description"),
      keywords: z
        .string()
        .optional()
        .describe("Channel keywords (space-separated)"),
      defaultLanguage: z
        .string()
        .optional()
        .describe("Default language (BCP-47 code)"),
      country: z
        .string()
        .optional()
        .describe("Country (ISO 3166-1 alpha-2 code)"),
    },
    async (args) => {
      const result = await client.execute((api) =>
        api.channels.update({
          part: ["brandingSettings", "localizations"],
          requestBody: {
            id: args.id,
            brandingSettings: {
              channel: {
                ...(args.description !== undefined && {
                  description: args.description,
                }),
                ...(args.keywords !== undefined && {
                  keywords: args.keywords,
                }),
                ...(args.defaultLanguage !== undefined && {
                  defaultLanguage: args.defaultLanguage,
                }),
                ...(args.country !== undefined && {
                  country: args.country,
                }),
              },
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
}
