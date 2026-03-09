import { jest } from "@jest/globals";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { YouTubeClient } from "../../src/client/youtube.js";
import { YouTubeAuth } from "../../src/auth/oauth.js";
import { YouTubeApiError } from "../../src/client/youtube.js";
import { registerPlaylistTools } from "../../src/tools/playlists.js";
import { registerPlaylistItemsTools } from "../../src/tools/playlist-items.js";

/**
 * Create a mock YouTubeClient that returns a configurable response.
 */
export function createMockClient(defaultResponse: unknown = { data: {} }) {
  const mockAuth = {
    getClient: jest.fn(),
  } as unknown as YouTubeAuth;

  const client = new YouTubeClient(mockAuth);

  const executeMock = jest.fn(async () => defaultResponse) as any;
  client.execute = executeMock;

  return { client, executeMock };
}

/**
 * Create a mock client that throws an error.
 */
export function createErrorClient(statusCode: number, message: string) {
  const { client, executeMock } = createMockClient();
  executeMock.mockRejectedValue(new YouTubeApiError(message, statusCode));
  return { client, executeMock };
}

/**
 * Create a test MCP server with all MVP tools registered.
 */
export function createTestServer(mockResponse?: unknown) {
  const { client, executeMock } = createMockClient(mockResponse);
  const server = new McpServer({ name: "test", version: "0.0.1" });
  registerPlaylistTools(server, client);
  registerPlaylistItemsTools(server, client);
  return { server, client, executeMock };
}
