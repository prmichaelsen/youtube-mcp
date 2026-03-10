import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { YouTubeClient } from "../client/youtube.js";

/**
 * Register i18n MCP tools on the server.
 */
export function registerI18nTools(
  server: McpServer,
  client: YouTubeClient,
): void {
  server.tool(
    "youtube_i18n_languages_list",
    "List YouTube supported languages for metadata. Quota: 1 unit.",
    {
      part: z
        .string()
        .default("snippet")
        .describe("Comma-separated parts: snippet"),
      hl: z
        .string()
        .optional()
        .describe("Host language for localized names (BCP-47)"),
    },
    async (args) => {
      const result = await client.execute((api) =>
        api.i18nLanguages.list({
          part: [args.part],
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

  server.tool(
    "youtube_i18n_regions_list",
    "List YouTube supported regions. Quota: 1 unit.",
    {
      part: z
        .string()
        .default("snippet")
        .describe("Comma-separated parts: snippet"),
      hl: z
        .string()
        .optional()
        .describe("Host language for localized names (BCP-47)"),
    },
    async (args) => {
      const result = await client.execute((api) =>
        api.i18nRegions.list({
          part: [args.part],
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
