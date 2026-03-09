/**
 * Integration tests for Playlist tools.
 *
 * These tests require real YouTube API credentials and consume quota.
 * They are skipped by default. To run:
 *   YOUTUBE_INTEGRATION_TESTS=1 npm test -- --testPathPattern=integration
 *
 * Required env vars:
 *   GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, TOKEN_STORAGE_PATH (with valid tokens)
 */

const SKIP = !process.env.YOUTUBE_INTEGRATION_TESTS;

const describeIntegration = SKIP ? describe.skip : describe;

describeIntegration("Playlist Integration Tests", () => {
  it("placeholder - requires real API credentials", () => {
    expect(true).toBe(true);
  });
});
