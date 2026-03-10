import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { createReadStream } from "fs";
import { YouTubeClient } from "../client/youtube.js";

/**
 * Register all Caption MCP tools on the server.
 */
export function registerCaptionTools(
  server: McpServer,
  client: YouTubeClient,
): void {
  server.tool(
    "youtube_captions_list",
    "List caption tracks for a YouTube video. Requires youtube.force-ssl scope. Quota: 50 units.",
    {
      part: z
        .string()
        .default("snippet")
        .describe("Comma-separated parts: snippet, id"),
      videoId: z.string().describe("Video ID to list captions for"),
    },
    async (args) => {
      const result = await client.execute((api) =>
        api.captions.list({
          part: [args.part],
          videoId: args.videoId,
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
    "youtube_captions_insert",
    "Upload a caption track for a YouTube video (SRT/VTT). Requires youtube.force-ssl scope. Quota: 400 units.",
    {
      videoId: z.string().describe("Video ID to add captions to"),
      language: z.string().describe("BCP-47 language code (e.g. en, es, ja)"),
      name: z.string().default("").describe("Caption track name"),
      filePath: z.string().describe("Absolute path to caption file (SRT/VTT)"),
      isDraft: z
        .boolean()
        .optional()
        .describe("Whether the caption track is a draft"),
    },
    async (args) => {
      const fileStream = createReadStream(args.filePath);

      const result = await client.execute((api) =>
        api.captions.insert({
          part: ["snippet"],
          requestBody: {
            snippet: {
              videoId: args.videoId,
              language: args.language,
              name: args.name,
              isDraft: args.isDraft,
            },
          },
          media: {
            mimeType: "application/octet-stream",
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

  server.tool(
    "youtube_captions_update",
    "Update a caption track (replace file or change draft status). Requires youtube.force-ssl scope. Quota: 450 units.",
    {
      id: z.string().describe("Caption track ID to update"),
      filePath: z
        .string()
        .optional()
        .describe("Absolute path to new caption file (SRT/VTT)"),
      isDraft: z
        .boolean()
        .optional()
        .describe("Whether the caption track is a draft"),
    },
    async (args) => {
      const media = args.filePath
        ? {
            mimeType: "application/octet-stream",
            body: createReadStream(args.filePath),
          }
        : undefined;

      const result = await client.execute((api) =>
        api.captions.update({
          part: ["snippet"],
          requestBody: {
            id: args.id,
            snippet: {
              ...(args.isDraft !== undefined && { isDraft: args.isDraft }),
            },
          },
          ...(media && { media }),
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
    "youtube_captions_download",
    "Download a caption track's content as text. Requires youtube.force-ssl scope. Quota: 200 units.",
    {
      id: z.string().describe("Caption track ID to download"),
      tfmt: z
        .enum(["srt", "vtt"])
        .optional()
        .describe("Caption format (srt or vtt)"),
    },
    async (args) => {
      const result = await client.execute((api) =>
        api.captions.download({
          id: args.id,
          tfmt: args.tfmt,
        }),
      );

      return {
        content: [
          {
            type: "text" as const,
            text: typeof result.data === "string"
              ? result.data
              : JSON.stringify(result.data, null, 2),
          },
        ],
      };
    },
  );

  server.tool(
    "youtube_captions_delete",
    "Delete a caption track from a YouTube video. Requires youtube.force-ssl scope. Quota: 50 units.",
    {
      id: z.string().describe("Caption track ID to delete"),
    },
    async (args) => {
      await client.execute((api) =>
        api.captions.delete({
          id: args.id,
        }),
      );

      return {
        content: [
          {
            type: "text" as const,
            text: `Caption track ${args.id} deleted successfully.`,
          },
        ],
      };
    },
  );
}
