/**
 * Shared types for the YouTube MCP server.
 */

export interface TokenData {
  access_token: string;
  refresh_token: string;
  scope: string;
  token_type: string;
  expiry_date: number;
}

export interface YouTubeErrorResponse {
  code: number;
  message: string;
  errors?: Array<{
    message: string;
    domain: string;
    reason: string;
  }>;
}

export type TransportType = "stdio" | "http";

export interface ServerConfig {
  transport: TransportType;
  httpPort: number;
  httpHost: string;
  tokenStoragePath: string;
  googleClientId: string;
  googleClientSecret: string;
  googleRedirectUri: string;
}
