import { NextResponse } from "next/server";

export type ApiResponse<T = any> = {
  success: boolean;
  data?: T;
  error?: string;
  errors?: Array<{ field: string; message: string }>;
  timestamp: string;
};

/**
 * Success response (200 OK)
 */
export function apiSuccess<T>(data: T, message?: string): NextResponse<ApiResponse<T>> {
  return NextResponse.json(
    {
      success: true,
      data,
      timestamp: new Date().toISOString()
    },
    { status: 200 }
  );
}

/**
 * Created response (201 Created)
 */
export function apiCreated<T>(data: T, message?: string): NextResponse<ApiResponse<T>> {
  return NextResponse.json(
    {
      success: true,
      data,
      timestamp: new Date().toISOString()
    },
    { status: 201 }
  );
}

/**
 * Bad request (400 Bad Request)
 * Use for validation errors or malformed input
 */
export function apiBadRequest(
  error: string | Array<{ field: string; message: string }>
): NextResponse<ApiResponse> {
  if (typeof error === "string") {
    return NextResponse.json(
      {
        success: false,
        error,
        timestamp: new Date().toISOString()
      },
      { status: 400 }
    );
  }

  return NextResponse.json(
    {
      success: false,
      errors: error,
      timestamp: new Date().toISOString()
    },
    { status: 400 }
  );
}

/**
 * Unauthorized (401 Unauthorized)
 * Use when auth token is missing or invalid
 */
export function apiUnauthorized(error: string = "Unauthorized"): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      error,
      timestamp: new Date().toISOString()
    },
    { status: 401 }
  );
}

/**
 * Forbidden (403 Forbidden)
 * Use when user is authenticated but doesn't have permission
 */
export function apiForbidden(error: string = "Forbidden"): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      error,
      timestamp: new Date().toISOString()
    },
    { status: 403 }
  );
}

/**
 * Not found (404 Not Found)
 */
export function apiNotFound(error: string = "Not found"): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      error,
      timestamp: new Date().toISOString()
    },
    { status: 404 }
  );
}

/**
 * Conflict (409 Conflict)
 * Use for duplicate entries or state conflicts
 */
export function apiConflict(error: string): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      error,
      timestamp: new Date().toISOString()
    },
    { status: 409 }
  );
}

/**
 * Internal server error (500 Internal Server Error)
 */
export function apiError(error: string | Error): NextResponse<ApiResponse> {
  const message = error instanceof Error ? error.message : error;
  console.error("API Error:", message);

  return NextResponse.json(
    {
      success: false,
      error: "Internal server error",
      timestamp: new Date().toISOString()
    },
    { status: 500 }
  );
}

/**
 * Service unavailable (503 Service Unavailable)
 * Use when Firebase or external services are down
 */
export function apiServiceUnavailable(error: string = "Service unavailable"): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      error,
      timestamp: new Date().toISOString()
    },
    { status: 503 }
  );
}

/**
 * Handle validation errors from ValidationSchema
 */
export function apiValidationError(errorString: string): NextResponse<ApiResponse> {
  try {
    const errors = JSON.parse(errorString);
    if (Array.isArray(errors)) {
      return apiBadRequest(errors);
    }
  } catch {
    // Fall through to generic error
  }
  return apiBadRequest(errorString);
}

/**
 * Generic error handler for API routes
 * Catches common error types and returns appropriate response
 */
export function handleApiError(error: any): NextResponse<ApiResponse> {
  if (error.message === "UNAUTHORIZED") {
    return apiUnauthorized();
  }

  if (error.message === "FORBIDDEN") {
    return apiForbidden();
  }

  if (error.message.startsWith("[{")) {
    // Validation error
    return apiValidationError(error.message);
  }

  console.error("Unhandled API error:", error);
  return apiError(error instanceof Error ? error : new Error(String(error)));
}
