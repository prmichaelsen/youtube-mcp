import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { createReadStream } from "fs";
import { YouTubeClient } from "../client/youtube.js";

/**
 * Register Watermark MCP tools on the server.
 */
export function registerWatermarkTools(
  server: McpServer,
  client: YouTubeClient,
): void {
  server.tool(
    "youtube_watermarks_set",
    "Set a channel watermark (branding image overlay on videos). Quota: 50 units.",
    {
      channelId: z.string().describe("Channel ID to set watermark for"),
      filePath: z.string().describe("Absolute path to watermark image file"),
      timingType: z
        .enum(["offsetFromStart", "offsetFromEnd"])
        .default("offsetFromEnd")
        .describe("When the watermark appears"),
      offsetMs: z
        .number()
        .default(0)
        .describe("Offset in milliseconds from timing type"),
      durationMs: z
        .number()
        .optional()
        .describe("Duration to show watermark in milliseconds"),
    },
    async (args) => {
      const fileStream = createReadStream(args.filePath);

      await client.execute((api) =>
        api.watermarks.set({
          channelId: args.channelId,
          requestBody: {
            timing: {
              type: args.timingType,
              offsetMs: String(args.offsetMs),
              durationMs: args.durationMs
                ? String(args.durationMs)
                : undefined,
            },
          },
          media: {
            mimeType: "image/png",
            body: fileStream,
          },
        }),
      );

      return {
        content: [
          {
            type: "text" as const,
            text: `Watermark set for channel ${args.channelId} successfully.`,
          },
        ],
      };
    },
  );

  server.tool(
    "youtube_watermarks_unset",
    "Remove the channel watermark. Quota: 50 units.",
    {
      channelId: z.string().describe("Channel ID to remove watermark from"),
    },
    async (args) => {
      await client.execute((api) =>
        api.watermarks.unset({
          channelId: args.channelId,
        }),
      );

      return {
        content: [
          {
            type: "text" as const,
            text: `Watermark removed from channel ${args.channelId} successfully.`,
          },
        ],
      };
    },
  );
}
