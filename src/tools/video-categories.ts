import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { YouTubeClient } from "../client/youtube.js";

/**
 * Register VideoCategory MCP tools on the server.
 */
export function registerVideoCategoryTools(
  server: McpServer,
  client: YouTubeClient,
): void {
  server.tool(
    "youtube_video_categories_list",
    "List YouTube video categories for a region. Quota: 1 unit.",
    {
      part: z
        .string()
        .default("snippet")
        .describe("Comma-separated parts: snippet"),
      regionCode: z
        .string()
        .optional()
        .describe("ISO 3166-1 alpha-2 region code (e.g. US, GB)"),
      id: z
        .string()
        .optional()
        .describe("Comma-separated category IDs"),
      hl: z
        .string()
        .optional()
        .describe("Host language for localized names (BCP-47)"),
    },
    async (args) => {
      const result = await client.execute((api) =>
        api.videoCategories.list({
          part: [args.part],
          regionCode: args.regionCode,
          id: args.id ? args.id.split(",") : undefined,
          hl: args.hl,
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
