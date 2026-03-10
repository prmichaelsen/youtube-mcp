import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { YouTubeClient } from "../client/youtube.js";

/**
 * Register Member and MembershipsLevel MCP tools on the server.
 */
export function registerMemberTools(
  server: McpServer,
  client: YouTubeClient,
): void {
  server.tool(
    "youtube_members_list",
    "List channel members (sponsors/members). Quota: 1 unit.",
    {
      part: z
        .string()
        .default("snippet")
        .describe("Comma-separated parts: snippet"),
      mode: z
        .enum(["listMembers", "updates"])
        .default("listMembers")
        .describe("Mode: listMembers (all) or updates (recent changes)"),
      maxResults: z
        .number()
        .min(1)
        .max(1000)
        .default(25)
        .describe("Max results (1-1000)"),
      pageToken: z.string().optional().describe("Pagination token"),
    },
    async (args) => {
      const result = await client.execute((api) =>
        api.members.list({
          part: [args.part],
          mode: args.mode,
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
    "youtube_memberships_levels_list",
    "List membership levels for a channel. Quota: 1 unit.",
    {
      part: z
        .string()
        .default("snippet")
        .describe("Comma-separated parts: snippet, id"),
    },
    async (args) => {
      const result = await client.execute((api) =>
        api.membershipsLevels.list({
          part: [args.part],
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
