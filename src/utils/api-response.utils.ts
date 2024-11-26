import { NextResponse } from "next/server";

type ApiResponse<T = any> = {
  success: boolean;
  error?: boolean;
  message?: string;
  data?: T;
};

export function createSuccessResponse<T = any>(
  data?: T,
  message?: string,
  status: number = 200
): NextResponse {
  return NextResponse.json(
    {
      success: true,
      error: false,
      ...(data && typeof data === "object" ? data : {}),
      message: message || "Request successful",
    } as ApiResponse<T>,
    { status }
  );
}

export function createErrorResponse<T = Record<string, any>>(
  data?: T | null,
  message?: string,
  status: number = 400
): NextResponse {
  return NextResponse.json(
    {
      success: false,
      error: true,
      message: message || "An unexpected error occurred.",
      ...(data && typeof data === "object" ? data : {}),
    },
    { status }
  );
}

// export function createSuccessResponse<T = any>(
//   payload: T,
//   status: number = 200
// ): NextResponse {
//   return NextResponse.json(payload, { status });
// }

// export function createErrorResponse<T = any>(
//   payload: T,
//   status: number = 400
// ): NextResponse {
//   return NextResponse.json(payload, { status });
// }
