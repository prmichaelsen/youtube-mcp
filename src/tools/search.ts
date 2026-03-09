import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { YouTubeClient } from "../client/youtube.js";

/**
 * Register the YouTube Search MCP tool on the server.
 */
export function registerSearchTools(
  server: McpServer,
  client: YouTubeClient,
): void {
  server.tool(
    "youtube_search",
    "Search YouTube for videos, channels, or playlists. Quota: 100 units.",
    {
      q: z.string().describe("Search query"),
      type: z
        .enum(["video", "channel", "playlist"])
        .optional()
        .describe("Filter by resource type"),
      maxResults: z
        .number()
        .min(1)
        .max(50)
        .default(10)
        .describe("Max results (1-50)"),
      order: z
        .enum(["date", "rating", "relevance", "title", "viewCount"])
        .optional()
        .describe("Sort order"),
      publishedAfter: z
        .string()
        .optional()
        .describe("Filter by publish date (RFC 3339, e.g. 2025-01-01T00:00:00Z)"),
      publishedBefore: z
        .string()
        .optional()
        .describe("Filter by publish date (RFC 3339, e.g. 2026-01-01T00:00:00Z)"),
      regionCode: z
        .string()
        .optional()
        .describe("ISO 3166-1 alpha-2 region code (e.g. US, GB, JP)"),
      pageToken: z.string().optional().describe("Pagination token"),
    },
    async (args) => {
      const result = await client.execute((api) =>
        api.search.list({
          part: ["snippet"],
          q: args.q,
          type: args.type ? [args.type] : undefined,
          maxResults: args.maxResults,
          order: args.order,
          publishedAfter: args.publishedAfter,
          publishedBefore: args.publishedBefore,
          regionCode: args.regionCode,
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
}
