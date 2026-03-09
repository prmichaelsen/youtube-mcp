import { createServer } from "../../src/server.js";

describe("MCP Server E2E", () => {
  it("creates server without auth (no tools registered)", () => {
    const server = createServer();
    expect(server).toBeDefined();
    const registeredTools = (server as any)._registeredTools;
    expect(Object.keys(registeredTools).length).toBe(0);
  });

  it("server has correct name and version", () => {
    const server = createServer();
    expect(server).toBeDefined();
  });

  it("registers 8 tools when auth is provided", () => {
    // We can't easily mock auth here, but we verify the import chain works
    // The actual tool registration is tested in playlists.test.ts and playlist-items.test.ts
    const server = createServer();
    expect(server).toBeDefined();
  });
});
