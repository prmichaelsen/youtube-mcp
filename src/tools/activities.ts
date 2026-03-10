import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { YouTubeClient } from "../client/youtube.js";

/**
 * Register Activity MCP tools on the server.
 */
export function registerActivityTools(
  server: McpServer,
  client: YouTubeClient,
): void {
  server.tool(
    "youtube_activities_list",
    "List channel activities (uploads, likes, comments, etc.). Quota: 1 unit.",
    {
      part: z
        .string()
        .default("snippet,contentDetails")
        .describe("Comma-separated parts: snippet, contentDetails, id"),
      channelId: z.string().optional().describe("Channel ID"),
      mine: z.boolean().optional().describe("List authenticated user's activities"),
      maxResults: z
        .number()
        .min(1)
        .max(50)
        .default(10)
        .describe("Max results (1-50)"),
      pageToken: z.string().optional().describe("Pagination token"),
      publishedAfter: z
        .string()
        .optional()
        .describe("Filter after date (RFC 3339)"),
      publishedBefore: z
        .string()
        .optional()
        .describe("Filter before date (RFC 3339)"),
    },
    async (args) => {
      const result = await client.execute((api) =>
        api.activities.list({
          part: [args.part],
          channelId: args.channelId,
          mine: args.mine,
          maxResults: args.maxResults,
          pageToken: args.pageToken,
          publishedAfter: args.publishedAfter,
          publishedBefore: args.publishedBefore,
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
