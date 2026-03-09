/**
 * Mock YouTube API response fixtures for testing.
 */

export const PLAYLIST_LIST_RESPONSE = {
  kind: "youtube#playlistListResponse",
  etag: "test-etag",
  pageInfo: { totalResults: 2, resultsPerPage: 25 },
  items: [
    {
      kind: "youtube#playlist",
      etag: "pl-etag-1",
      id: "PLtest123",
      snippet: {
        publishedAt: "2026-01-01T00:00:00Z",
        channelId: "UCtest123",
        title: "My Test Playlist",
        description: "A test playlist",
        channelTitle: "Test Channel",
      },
      contentDetails: {
        itemCount: 5,
      },
    },
    {
      kind: "youtube#playlist",
      etag: "pl-etag-2",
      id: "PLtest456",
      snippet: {
        publishedAt: "2026-02-01T00:00:00Z",
        channelId: "UCtest123",
        title: "Another Playlist",
        description: "Another test playlist",
        channelTitle: "Test Channel",
      },
      contentDetails: {
        itemCount: 10,
      },
    },
  ],
};

export const PLAYLIST_INSERT_RESPONSE = {
  kind: "youtube#playlist",
  etag: "new-pl-etag",
  id: "PLnew789",
  snippet: {
    publishedAt: "2026-03-09T00:00:00Z",
    channelId: "UCtest123",
    title: "New Playlist",
    description: "A newly created playlist",
    channelTitle: "Test Channel",
  },
  status: {
    privacyStatus: "private",
  },
};

export const PLAYLIST_ITEM_LIST_RESPONSE = {
  kind: "youtube#playlistItemListResponse",
  etag: "pli-etag",
  pageInfo: { totalResults: 3, resultsPerPage: 25 },
  items: [
    {
      kind: "youtube#playlistItem",
      etag: "pli-etag-1",
      id: "UExpdGVtMQ",
      snippet: {
        publishedAt: "2026-01-15T00:00:00Z",
        channelId: "UCtest123",
        title: "Test Video 1",
        description: "First video",
        playlistId: "PLtest123",
        position: 0,
        resourceId: {
          kind: "youtube#video",
          videoId: "dQw4w9WgXcQ",
        },
      },
      contentDetails: {
        videoId: "dQw4w9WgXcQ",
        videoPublishedAt: "2009-10-25T06:57:33Z",
      },
    },
    {
      kind: "youtube#playlistItem",
      etag: "pli-etag-2",
      id: "UExpdGVtMg",
      snippet: {
        publishedAt: "2026-01-16T00:00:00Z",
        channelId: "UCtest123",
        title: "Test Video 2",
        description: "Second video",
        playlistId: "PLtest123",
        position: 1,
        resourceId: {
          kind: "youtube#video",
          videoId: "abc123xyz",
        },
      },
      contentDetails: {
        videoId: "abc123xyz",
        videoPublishedAt: "2025-06-15T12:00:00Z",
      },
    },
  ],
};

export const PLAYLIST_ITEM_INSERT_RESPONSE = {
  kind: "youtube#playlistItem",
  etag: "new-pli-etag",
  id: "UExuZXdJdGVt",
  snippet: {
    publishedAt: "2026-03-09T00:00:00Z",
    channelId: "UCtest123",
    title: "Added Video",
    playlistId: "PLtest123",
    position: 2,
    resourceId: {
      kind: "youtube#video",
      videoId: "newvideo123",
    },
  },
};
