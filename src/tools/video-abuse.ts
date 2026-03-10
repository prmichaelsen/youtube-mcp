import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { YouTubeClient } from "../client/youtube.js";

/**
 * Register Video Abuse Report MCP tools on the server.
 */
export function registerVideoAbuseTools(
  server: McpServer,
  client: YouTubeClient,
): void {
  server.tool(
    "youtube_video_abuse_report_reasons_list",
    "List valid reasons for reporting a YouTube video. Quota: 1 unit.",
    {
      part: z
        .string()
        .default("snippet")
        .describe("Comma-separated parts: snippet"),
      hl: z
        .string()
        .optional()
        .describe("Host language for localized reason text (BCP-47)"),
    },
    async (args) => {
      const result = await client.execute((api) =>
        api.videoAbuseReportReasons.list({
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
    "youtube_videos_report_abuse",
    "Report a YouTube video for abuse. Quota: 50 units.",
    {
      videoId: z.string().describe("Video ID to report"),
      reasonId: z.string().describe("Abuse reason ID (from report_reasons_list)"),
      secondaryReasonId: z
        .string()
        .optional()
        .describe("Secondary reason ID"),
      comments: z
        .string()
        .optional()
        .describe("Additional comments about the report"),
      language: z
        .string()
        .optional()
        .describe("Language of the report (BCP-47)"),
    },
    async (args) => {
      await client.execute((api) =>
        api.videos.reportAbuse({
          requestBody: {
            videoId: args.videoId,
            reasonId: args.reasonId,
            secondaryReasonId: args.secondaryReasonId,
            comments: args.comments,
            language: args.language,
          },
        }),
      );

      return {
        content: [
          {
            type: "text" as const,
            text: `Video ${args.videoId} reported for abuse (reason: ${args.reasonId}).`,
          },
        ],
      };
    },
  );
}
