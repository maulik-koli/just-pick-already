const STATUS_CODE = {
    CREATED: 201,
    OK: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    RESOURCE_NOT_FOUND: 404,
    CONFLICT: 409,
    TOO_MANY_REQUESTS: 429,
    INTERNAL_SERVER_ERROR: 500,
} as const;

export type StatusCodeType = keyof typeof STATUS_CODE;

export type ApiResponse<T> = {
    success?: boolean;
    code: StatusCodeType;
    message: string;
    data?: T | null;
}

export type ApiError = {
    success?: boolean;
    code: StatusCodeType;
    message: string;
}