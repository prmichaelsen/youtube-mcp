import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { YouTubeClient } from "../client/youtube.js";

/**
 * Register all Subscription MCP tools on the server.
 */
export function registerSubscriptionTools(
  server: McpServer,
  client: YouTubeClient,
): void {
  server.tool(
    "youtube_subscriptions_list",
    "List YouTube subscriptions for the authenticated user or by channel. Quota: 1 unit.",
    {
      part: z
        .string()
        .default("snippet,contentDetails")
        .describe("Comma-separated parts: snippet, contentDetails, id"),
      mine: z
        .boolean()
        .optional()
        .describe("List authenticated user's subscriptions"),
      channelId: z
        .string()
        .optional()
        .describe("List subscriptions for this channel ID"),
      forChannelId: z
        .string()
        .optional()
        .describe("Check if subscribed to these channel IDs (comma-separated)"),
      maxResults: z
        .number()
        .min(0)
        .max(50)
        .default(25)
        .describe("Max results (0-50)"),
      pageToken: z.string().optional().describe("Pagination token"),
      order: z
        .enum(["alphabetical", "relevance", "unread"])
        .optional()
        .describe("Sort order"),
    },
    async (args) => {
      const result = await client.execute((api) =>
        api.subscriptions.list({
          part: [args.part],
          mine: args.mine,
          channelId: args.channelId,
          forChannelId: args.forChannelId,
          maxResults: args.maxResults,
          pageToken: args.pageToken,
          order: args.order,
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
    "youtube_subscriptions_insert",
    "Subscribe to a YouTube channel. Quota: 50 units.",
    {
      channelId: z.string().describe("Channel ID to subscribe to"),
    },
    async (args) => {
      const result = await client.execute((api) =>
        api.subscriptions.insert({
          part: ["snippet"],
          requestBody: {
            snippet: {
              resourceId: {
                kind: "youtube#channel",
                channelId: args.channelId,
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

  server.tool(
    "youtube_subscriptions_delete",
    "Unsubscribe from a YouTube channel by subscription ID. Quota: 50 units.",
    {
      id: z.string().describe("Subscription ID to delete"),
    },
    async (args) => {
      await client.execute((api) =>
        api.subscriptions.delete({
          id: args.id,
        }),
      );

      return {
        content: [
          {
            type: "text" as const,
            text: `Subscription ${args.id} deleted successfully.`,
          },
        ],
      };
    },
  );
}
