import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { createReadStream } from "fs";
import { YouTubeClient } from "../client/youtube.js";

/**
 * Register Thumbnail MCP tools on the server.
 */
export function registerThumbnailTools(
  server: McpServer,
  client: YouTubeClient,
): void {
  server.tool(
    "youtube_thumbnails_set",
    "Set a custom thumbnail for a YouTube video. Quota: 50 units.",
    {
      videoId: z.string().describe("Video ID to set thumbnail for"),
      filePath: z.string().describe("Absolute path to thumbnail image file"),
    },
    async (args) => {
      const fileStream = createReadStream(args.filePath);

      const result = await client.execute((api) =>
        api.thumbnails.set({
          videoId: args.videoId,
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
            text: JSON.stringify(result.data, null, 2),
          },
        ],
      };
    },
  );
}
