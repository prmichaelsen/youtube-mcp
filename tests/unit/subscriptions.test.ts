import { jest } from "@jest/globals";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerSubscriptionTools } from "../../src/tools/subscriptions.js";
import { createMockClient } from "../helpers/mock-client.js";

const SUBSCRIPTION_RESPONSE = {
  data: {
    kind: "youtube#subscriptionListResponse",
    pageInfo: { totalResults: 2, resultsPerPage: 25 },
    items: [
      {
        kind: "youtube#subscription",
        id: "sub123",
        snippet: {
          publishedAt: "2025-06-01T00:00:00Z",
          title: "Test Channel",
          description: "A channel",
          resourceId: {
            kind: "youtube#channel",
            channelId: "UCtest",
          },
          channelId: "UCmine",
          thumbnails: {
            default: { url: "https://yt3.ggpht.com/test.jpg" },
          },
        },
        contentDetails: {
          totalItemCount: 150,
          newItemCount: 3,
        },
      },
    ],
  },
};

describe("Subscription Tools Registration", () => {
  it("registers all 3 subscription tools", () => {
    const { client } = createMockClient(SUBSCRIPTION_RESPONSE);
    const server = new McpServer({ name: "test", version: "0.0.1" });
    registerSubscriptionTools(server, client);

    const registeredTools = (server as any)._registeredTools;
    expect(registeredTools.youtube_subscriptions_list).toBeDefined();
    expect(registeredTools.youtube_subscriptions_insert).toBeDefined();
    expect(registeredTools.youtube_subscriptions_delete).toBeDefined();
  });

  it("youtube_subscriptions_list has quota cost 1 in description", () => {
    const { client } = createMockClient(SUBSCRIPTION_RESPONSE);
    const server = new McpServer({ name: "test", version: "0.0.1" });
    registerSubscriptionTools(server, client);

    const tool = (server as any)._registeredTools.youtube_subscriptions_list;
    expect(tool.description).toContain("1 unit");
  });

  it("youtube_subscriptions_insert has quota cost 50 in description", () => {
    const { client } = createMockClient(SUBSCRIPTION_RESPONSE);
    const server = new McpServer({ name: "test", version: "0.0.1" });
    registerSubscriptionTools(server, client);

    const tool = (server as any)._registeredTools.youtube_subscriptions_insert;
    expect(tool.description).toContain("50");
  });

  it("youtube_subscriptions_delete has quota cost 50 in description", () => {
    const { client } = createMockClient(SUBSCRIPTION_RESPONSE);
    const server = new McpServer({ name: "test", version: "0.0.1" });
    registerSubscriptionTools(server, client);

    const tool = (server as any)._registeredTools.youtube_subscriptions_delete;
    expect(tool.description).toContain("50");
  });

  it("insert description mentions subscribe", () => {
    const { client } = createMockClient(SUBSCRIPTION_RESPONSE);
    const server = new McpServer({ name: "test", version: "0.0.1" });
    registerSubscriptionTools(server, client);

    const tool = (server as any)._registeredTools.youtube_subscriptions_insert;
    expect(tool.description).toMatch(/[Ss]ubscribe/);
  });
});
