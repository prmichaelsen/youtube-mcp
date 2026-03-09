import { jest } from "@jest/globals";
import { mapApiError, YouTubeApiError, QUOTA_COSTS, withRetry } from "../../src/client/youtube.js";
import { GaxiosError } from "gaxios";

function createGaxiosError(status: number, message: string, reason?: string): GaxiosError {
  const response = {
    status,
    statusText: "",
    headers: {},
    config: { url: "" },
    data: {
      error: {
        message,
        errors: reason ? [{ reason }] : [],
      },
    },
    request: { responseURL: "" },
  };
  const error = new GaxiosError(message, { url: "" } as any, response as any);
  return error;
}

describe("mapApiError", () => {
  it("maps 400 to invalid parameters", () => {
    const error = createGaxiosError(400, "bad request");
    const mapped = mapApiError(error);
    expect(mapped).toBeInstanceOf(YouTubeApiError);
    expect(mapped.statusCode).toBe(400);
    expect(mapped.message).toContain("Invalid parameters");
  });

  it("maps 401 to auth required", () => {
    const error = createGaxiosError(401, "unauthorized");
    const mapped = mapApiError(error);
    expect(mapped.statusCode).toBe(401);
    expect(mapped.message).toContain("Authentication required");
  });

  it("maps 403 quota exceeded", () => {
    const error = createGaxiosError(403, "quota exceeded", "quotaExceeded");
    const mapped = mapApiError(error);
    expect(mapped.statusCode).toBe(403);
    expect(mapped.message).toContain("quota exceeded");
  });

  it("maps 403 insufficient permissions", () => {
    const error = createGaxiosError(403, "forbidden", "forbidden");
    const mapped = mapApiError(error);
    expect(mapped.statusCode).toBe(403);
    expect(mapped.message).toContain("Insufficient permissions");
  });

  it("maps 404 to not found", () => {
    const error = createGaxiosError(404, "not found");
    const mapped = mapApiError(error);
    expect(mapped.statusCode).toBe(404);
    expect(mapped.message).toContain("not found");
  });

  it("maps 409 to conflict", () => {
    const error = createGaxiosError(409, "duplicate");
    const mapped = mapApiError(error);
    expect(mapped.statusCode).toBe(409);
    expect(mapped.message).toContain("Conflict");
  });

  it("maps 500 to server error", () => {
    const error = createGaxiosError(500, "internal error");
    const mapped = mapApiError(error);
    expect(mapped.statusCode).toBe(500);
    expect(mapped.message).toContain("server error");
  });

  it("maps plain Error", () => {
    const mapped = mapApiError(new Error("some error"));
    expect(mapped.statusCode).toBe(500);
    expect(mapped.message).toBe("some error");
  });

  it("maps string error", () => {
    const mapped = mapApiError("string error");
    expect(mapped.statusCode).toBe(500);
    expect(mapped.message).toBe("string error");
  });
});

describe("QUOTA_COSTS", () => {
  it("has correct costs for standard operations", () => {
    expect(QUOTA_COSTS.list).toBe(1);
    expect(QUOTA_COSTS.insert).toBe(50);
    expect(QUOTA_COSTS.update).toBe(50);
    expect(QUOTA_COSTS.delete).toBe(50);
    expect(QUOTA_COSTS.search).toBe(100);
    expect(QUOTA_COSTS.videoUpload).toBe(1600);
  });
});

describe("withRetry", () => {
  it("returns result on first success", async () => {
    const fn = jest.fn<() => Promise<string>>().mockResolvedValue("success");
    const result = await withRetry(fn, 3);
    expect(result).toBe("success");
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("throws non-retryable errors immediately", async () => {
    const error = createGaxiosError(400, "bad request");
    const fn = jest.fn<() => Promise<string>>().mockRejectedValue(error);
    await expect(withRetry(fn, 3)).rejects.toThrow(YouTubeApiError);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("retries on 5xx errors", async () => {
    const error = createGaxiosError(500, "server error");
    const fn = jest.fn<() => Promise<string>>()
      .mockRejectedValueOnce(error)
      .mockResolvedValueOnce("success");
    const result = await withRetry(fn, 3);
    expect(result).toBe("success");
    expect(fn).toHaveBeenCalledTimes(2);
  }, 10000);

  it("gives up after max retries", async () => {
    const error = createGaxiosError(503, "unavailable");
    const fn = jest.fn<() => Promise<string>>().mockRejectedValue(error);
    await expect(withRetry(fn, 1)).rejects.toThrow(YouTubeApiError);
    expect(fn).toHaveBeenCalledTimes(2); // initial + 1 retry
  }, 10000);
});
