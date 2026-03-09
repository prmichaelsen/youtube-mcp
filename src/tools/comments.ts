import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { YouTubeClient } from "../client/youtube.js";

/**
 * Register all Comment MCP tools on the server.
 */
export function registerCommentTools(
  server: McpServer,
  client: YouTubeClient,
): void {
  server.tool(
    "youtube_comments_list",
    "List replies to a YouTube comment by parent ID. Quota: 1 unit.",
    {
      part: z
        .string()
        .default("snippet")
        .describe("Comma-separated parts: snippet, id"),
      parentId: z.string().describe("Parent comment ID to list replies for"),
      maxResults: z
        .number()
        .min(1)
        .max(100)
        .default(20)
        .describe("Max results (1-100)"),
      pageToken: z.string().optional().describe("Pagination token"),
    },
    async (args) => {
      const result = await client.execute((api) =>
        api.comments.list({
          part: [args.part],
          parentId: args.parentId,
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
    "youtube_comments_insert",
    "Post a reply to an existing YouTube comment. Requires youtube.force-ssl scope. Quota: 50 units.",
    {
      parentId: z.string().describe("Parent comment ID to reply to"),
      text: z.string().describe("Reply text"),
    },
    async (args) => {
      const result = await client.execute((api) =>
        api.comments.insert({
          part: ["snippet"],
          requestBody: {
            snippet: {
              parentId: args.parentId,
              textOriginal: args.text,
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
    "youtube_comments_update",
    "Update a YouTube comment's text. Requires youtube.force-ssl scope. Quota: 50 units.",
    {
      id: z.string().describe("Comment ID to update"),
      text: z.string().describe("New comment text"),
    },
    async (args) => {
      const result = await client.execute((api) =>
        api.comments.update({
          part: ["snippet"],
          requestBody: {
            id: args.id,
            snippet: {
              textOriginal: args.text,
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
    "youtube_comments_delete",
    "Delete a YouTube comment. Requires youtube.force-ssl scope. Quota: 50 units.",
    {
      id: z.string().describe("Comment ID to delete"),
    },
    async (args) => {
      await client.execute((api) =>
        api.comments.delete({
          id: args.id,
        }),
      );

      return {
        content: [
          {
            type: "text" as const,
            text: `Comment ${args.id} deleted successfully.`,
          },
        ],
      };
    },
  );

  server.tool(
    "youtube_comments_moderate",
    "Set moderation status of a YouTube comment (publish, hold, or reject). Requires youtube.force-ssl scope. Quota: 50 units.",
    {
      id: z.string().describe("Comment ID to moderate"),
      moderationStatus: z
        .enum(["heldForReview", "published", "rejected"])
        .describe("New moderation status"),
      banAuthor: z
        .boolean()
        .optional()
        .describe("Also ban the comment author (only with rejected status)"),
    },
    async (args) => {
      await client.execute((api) =>
        api.comments.setModerationStatus({
          id: args.id.split(","),
          moderationStatus: args.moderationStatus,
          banAuthor: args.banAuthor,
        }),
      );

      return {
        content: [
          {
            type: "text" as const,
            text: `Comment ${args.id} moderation status set to '${args.moderationStatus}'.`,
          },
        ],
      };
    },
  );
}
