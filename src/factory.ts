import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createServerWithToken } from "./server.js";

/**
 * Create an MCP server instance with a raw OAuth access token.
 * This factory function is used by mcp-auth for multi-tenant support.
 *
 * @param accessToken - YouTube OAuth access token for the user
 * @returns Configured McpServer instance with all YouTube tools
 */
export function createServer(accessToken: string): McpServer {
  return createServerWithToken(accessToken);
}
