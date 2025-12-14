
export const handleError = (error: any) => {
    if (error && error.message === "canceled") {
        return {
            status: false,
            code: null,
            message: "canceled",
        };
    }

    if (error && error.message === "timeout") {
        return {
            status: false,
            code: null,
            message: "timeout",
        };
    }

    if (error && error.response) {
        if (error.response.status === 400) {
            const errorData = getErrorData(error);
            if (errorData) {
                return errorData;
            }

            return {
                status: false,
                code: error.response.status,
                message: "Bad request",
            };
        }

        if (error.response.status === 401) {
            const errorData = getErrorData(error);
            if (errorData) {
                return errorData;
            }

            return {
                status: false,
                code: error.response.status,
                message: "Forbidden",
            };
        }

        if (error.response.status === 403) {
            const errorData = getErrorData(error);
            if (errorData) {
                return errorData;
            }

            return {
                status: false,
                code: error.response.status,
                message: "Unauthorized",
            };
        }

        if (error.response.status === 404) {
            return {
                status: false,
                code: error.response.status,
                message: "Not found",
            };
        }

        if (error.response.status === 409) {
            return {
                status: false,
                code: error.response.status,
                message: "Conflict",
            };
        }

        if (error.response.status === 413) {
            return {
                status: false,
                code: error.response.status,
                message: "Selected profile picture is too large",
            };
        }
    }

    return {
        status: false,
        code: null,
        message: "Something went wrong. Please try again later.",
    };
};

const getErrorData = (error: any) => {
    if (
        error.response.data &&
        (error.response.data.message || error.response.data.detail)
    ) {
        return {
            status: false,
            code: error.response.status,
            message:
                error.response.data.message || error.response.data.detail,
        };
    }
    return null;
};