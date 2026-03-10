import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { createReadStream } from "fs";
import { YouTubeClient } from "../client/youtube.js";

/**
 * Register Channel Banner MCP tools on the server.
 */
export function registerChannelBannerTools(
  server: McpServer,
  client: YouTubeClient,
): void {
  server.tool(
    "youtube_channel_banners_insert",
    "Upload a channel banner image. Returns a URL to use with channels.update. Quota: 50 units.",
    {
      filePath: z.string().describe("Absolute path to banner image file"),
    },
    async (args) => {
      const fileStream = createReadStream(args.filePath);

      const result = await client.execute((api) =>
        api.channelBanners.insert({
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
