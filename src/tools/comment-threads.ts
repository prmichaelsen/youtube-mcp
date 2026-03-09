import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { YouTubeClient } from "../client/youtube.js";

/**
 * Register all CommentThread MCP tools on the server.
 */
export function registerCommentThreadTools(
  server: McpServer,
  client: YouTubeClient,
): void {
  server.tool(
    "youtube_comment_threads_list",
    "List YouTube comment threads on a video or channel. Quota: 1 unit.",
    {
      part: z
        .string()
        .default("snippet,replies")
        .describe("Comma-separated parts: snippet, replies, id"),
      videoId: z
        .string()
        .optional()
        .describe("Filter by video ID"),
      channelId: z
        .string()
        .optional()
        .describe("Filter by channel ID"),
      id: z
        .string()
        .optional()
        .describe("Comma-separated comment thread IDs"),
      maxResults: z
        .number()
        .min(1)
        .max(100)
        .default(20)
        .describe("Max results (1-100)"),
      pageToken: z.string().optional().describe("Pagination token"),
      order: z
        .enum(["time", "relevance"])
        .optional()
        .describe("Sort order (time or relevance)"),
      searchTerms: z
        .string()
        .optional()
        .describe("Search within comments"),
    },
    async (args) => {
      const result = await client.execute((api) =>
        api.commentThreads.list({
          part: [args.part],
          videoId: args.videoId,
          channelId: args.channelId,
          id: args.id ? args.id.split(",") : undefined,
          maxResults: args.maxResults,
          pageToken: args.pageToken,
          order: args.order,
          searchTerms: args.searchTerms,
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
    "youtube_comment_threads_insert",
    "Post a new top-level comment on a YouTube video. Requires youtube.force-ssl scope. Quota: 50 units.",
    {
      videoId: z.string().describe("Video ID to comment on"),
      channelId: z.string().describe("Channel ID of the comment author"),
      text: z.string().describe("Comment text"),
    },
    async (args) => {
      const result = await client.execute((api) =>
        api.commentThreads.insert({
          part: ["snippet"],
          requestBody: {
            snippet: {
              videoId: args.videoId,
              channelId: args.channelId,
              topLevelComment: {
                snippet: {
                  textOriginal: args.text,
                },
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
