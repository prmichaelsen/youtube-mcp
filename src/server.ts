import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

/**
 * Create and configure the MCP server with all YouTube tools.
 */
export function createServer(): McpServer {
  const server = new McpServer({
    name: "youtube-mcp",
    version: "0.3.0",
  });

  // Tools will be registered here by subsequent tasks (T4, T5, T7, T8, etc.)

  return server;
}
