import { google, youtube_v3 } from "googleapis";
import { GaxiosError } from "gaxios";
import { YouTubeAuth } from "../auth/oauth.js";

/**
 * Quota costs per YouTube API operation type.
 */
export const QUOTA_COSTS = {
  list: 1,
  insert: 50,
  update: 50,
  delete: 50,
  search: 100,
  videoUpload: 1600,
  captionList: 50,
  captionInsert: 400,
  captionUpdate: 450,
  captionDownload: 200,
} as const;

/**
 * Mapped error from a YouTube API call.
 */
export class YouTubeApiError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number,
    public readonly reason?: string,
  ) {
    super(message);
    this.name = "YouTubeApiError";
  }
}

/**
 * Map a YouTube API error to a clear, actionable error message.
 */
export function mapApiError(error: unknown): YouTubeApiError {
  if (error instanceof GaxiosError) {
    const status = error.response?.status ?? 500;
    const apiErrors = (error.response?.data as Record<string, unknown>)?.error as
      | { message?: string; errors?: Array<{ reason?: string }> }
      | undefined;
    const reason = apiErrors?.errors?.[0]?.reason;
    const apiMessage = apiErrors?.message || error.message;

    switch (status) {
      case 400:
        return new YouTubeApiError(
          `Invalid parameters: ${apiMessage}`,
          400,
          reason,
        );
      case 401:
        return new YouTubeApiError(
          "Authentication required or expired. Please re-authorize.",
          401,
          reason,
        );
      case 403:
        if (reason === "quotaExceeded" || reason === "dailyLimitExceeded") {
          return new YouTubeApiError(
            "YouTube API quota exceeded. Try again tomorrow or request a quota increase.",
            403,
            reason,
          );
        }
        return new YouTubeApiError(
          `Insufficient permissions: ${apiMessage}`,
          403,
          reason,
        );
      case 404:
        return new YouTubeApiError(
          `Resource not found: ${apiMessage}`,
          404,
          reason,
        );
      case 409:
        return new YouTubeApiError(
          `Conflict (possibly duplicate): ${apiMessage}`,
          409,
          reason,
        );
      default:
        if (status >= 500) {
          return new YouTubeApiError(
            `YouTube server error (${status}): ${apiMessage}`,
            status,
            reason,
          );
        }
        return new YouTubeApiError(
          `YouTube API error (${status}): ${apiMessage}`,
          status,
          reason,
        );
    }
  }

  if (error instanceof Error) {
    return new YouTubeApiError(error.message, 500);
  }

  return new YouTubeApiError(String(error), 500);
}

/**
 * Check if an error is retryable (5xx server error).
 */
function isRetryable(error: unknown): boolean {
  if (error instanceof GaxiosError) {
    const status = error.response?.status ?? 0;
    return status >= 500;
  }
  return false;
}

/**
 * Sleep for a given number of milliseconds.
 */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Execute a function with retry and exponential backoff.
 * Retries on 5xx errors, max 3 retries, backoff: 1s, 2s, 4s.
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
): Promise<T> {
  let lastError: unknown;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (!isRetryable(error) || attempt === maxRetries) {
        throw mapApiError(error);
      }
      const backoffMs = Math.pow(2, attempt) * 1000; // 1s, 2s, 4s
      await sleep(backoffMs);
    }
  }
  throw mapApiError(lastError);
}

/**
 * YouTube API client wrapper.
 * Provides authenticated access to the YouTube Data API v3 with
 * error mapping and retry logic.
 */
export class YouTubeClient {
  private youtubeApi: youtube_v3.Youtube | null = null;
  private auth?: YouTubeAuth;
  private accessToken?: string;

  constructor(authOrToken: YouTubeAuth | string) {
    if (typeof authOrToken === 'string') {
      this.accessToken = authOrToken;
    } else {
      this.auth = authOrToken;
    }
  }

  /**
   * Get the authenticated YouTube API client.
   * Lazily initialized and reuses the client across calls.
   */
  async getApi(): Promise<youtube_v3.Youtube> {
    if (this.accessToken) {
      // Token-based auth (multi-tenant mode)
      const oauth2Client = new google.auth.OAuth2();
      oauth2Client.setCredentials({ access_token: this.accessToken });
      this.youtubeApi = google.youtube({
        version: "v3",
        auth: oauth2Client,
      });
    } else if (this.auth) {
      const authClient = await this.auth.getClient();
      // Always create fresh to pick up refreshed tokens
      this.youtubeApi = google.youtube({
        version: "v3",
        auth: authClient,
      });
    } else {
      throw new Error('No auth configured');
    }
    return this.youtubeApi;
  }

  /**
   * Execute a YouTube API call with retry and error mapping.
   */
  async execute<T>(fn: (api: youtube_v3.Youtube) => Promise<T>): Promise<T> {
    return withRetry(async () => {
      const api = await this.getApi();
      return fn(api);
    });
  }
}
