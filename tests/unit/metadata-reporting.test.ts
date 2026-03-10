import { jest } from "@jest/globals";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerActivityTools } from "../../src/tools/activities.js";
import { registerMemberTools } from "../../src/tools/members.js";
import { registerI18nTools } from "../../src/tools/i18n.js";
import { registerVideoCategoryTools } from "../../src/tools/video-categories.js";
import { registerVideoAbuseTools } from "../../src/tools/video-abuse.js";
import { createMockClient } from "../helpers/mock-client.js";

const MOCK_RESPONSE = { data: { items: [] } };

describe("Activity Tools Registration", () => {
  it("registers youtube_activities_list", () => {
    const { client } = createMockClient(MOCK_RESPONSE);
    const server = new McpServer({ name: "test", version: "0.0.1" });
    registerActivityTools(server, client);

    const tools = (server as any)._registeredTools;
    expect(tools.youtube_activities_list).toBeDefined();
  });

  it("has quota cost 1 in description", () => {
    const { client } = createMockClient(MOCK_RESPONSE);
    const server = new McpServer({ name: "test", version: "0.0.1" });
    registerActivityTools(server, client);

    const tool = (server as any)._registeredTools.youtube_activities_list;
    expect(tool.description).toContain("1 unit");
  });
});

describe("Member Tools Registration", () => {
  it("registers both member tools", () => {
    const { client } = createMockClient(MOCK_RESPONSE);
    const server = new McpServer({ name: "test", version: "0.0.1" });
    registerMemberTools(server, client);

    const tools = (server as any)._registeredTools;
    expect(tools.youtube_members_list).toBeDefined();
    expect(tools.youtube_memberships_levels_list).toBeDefined();
  });

  it("youtube_members_list has quota cost 1 in description", () => {
    const { client } = createMockClient(MOCK_RESPONSE);
    const server = new McpServer({ name: "test", version: "0.0.1" });
    registerMemberTools(server, client);

    const tool = (server as any)._registeredTools.youtube_members_list;
    expect(tool.description).toContain("1 unit");
  });

  it("youtube_memberships_levels_list has quota cost 1 in description", () => {
    const { client } = createMockClient(MOCK_RESPONSE);
    const server = new McpServer({ name: "test", version: "0.0.1" });
    registerMemberTools(server, client);

    const tool = (server as any)._registeredTools.youtube_memberships_levels_list;
    expect(tool.description).toContain("1 unit");
  });
});

describe("i18n Tools Registration", () => {
  it("registers both i18n tools", () => {
    const { client } = createMockClient(MOCK_RESPONSE);
    const server = new McpServer({ name: "test", version: "0.0.1" });
    registerI18nTools(server, client);

    const tools = (server as any)._registeredTools;
    expect(tools.youtube_i18n_languages_list).toBeDefined();
    expect(tools.youtube_i18n_regions_list).toBeDefined();
  });

  it("both have quota cost 1 in description", () => {
    const { client } = createMockClient(MOCK_RESPONSE);
    const server = new McpServer({ name: "test", version: "0.0.1" });
    registerI18nTools(server, client);

    const tools = (server as any)._registeredTools;
    expect(tools.youtube_i18n_languages_list.description).toContain("1 unit");
    expect(tools.youtube_i18n_regions_list.description).toContain("1 unit");
  });
});

describe("Video Category Tools Registration", () => {
  it("registers youtube_video_categories_list", () => {
    const { client } = createMockClient(MOCK_RESPONSE);
    const server = new McpServer({ name: "test", version: "0.0.1" });
    registerVideoCategoryTools(server, client);

    const tools = (server as any)._registeredTools;
    expect(tools.youtube_video_categories_list).toBeDefined();
  });

  it("has quota cost 1 in description", () => {
    const { client } = createMockClient(MOCK_RESPONSE);
    const server = new McpServer({ name: "test", version: "0.0.1" });
    registerVideoCategoryTools(server, client);

    const tool = (server as any)._registeredTools.youtube_video_categories_list;
    expect(tool.description).toContain("1 unit");
  });
});

describe("Video Abuse Tools Registration", () => {
  it("registers both abuse tools", () => {
    const { client } = createMockClient(MOCK_RESPONSE);
    const server = new McpServer({ name: "test", version: "0.0.1" });
    registerVideoAbuseTools(server, client);

    const tools = (server as any)._registeredTools;
    expect(tools.youtube_video_abuse_report_reasons_list).toBeDefined();
    expect(tools.youtube_videos_report_abuse).toBeDefined();
  });

  it("report reasons has quota cost 1 in description", () => {
    const { client } = createMockClient(MOCK_RESPONSE);
    const server = new McpServer({ name: "test", version: "0.0.1" });
    registerVideoAbuseTools(server, client);

    const tool = (server as any)._registeredTools.youtube_video_abuse_report_reasons_list;
    expect(tool.description).toContain("1 unit");
  });

  it("report abuse has quota cost 50 in description", () => {
    const { client } = createMockClient(MOCK_RESPONSE);
    const server = new McpServer({ name: "test", version: "0.0.1" });
    registerVideoAbuseTools(server, client);

    const tool = (server as any)._registeredTools.youtube_videos_report_abuse;
    expect(tool.description).toContain("50");
  });
});
