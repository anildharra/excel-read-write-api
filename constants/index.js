const constants = {
    ENVIRONMENT: process.env.ENVIRONMENT,
    PORT: 3000,
    STATUS_CODE: {
        SUCCESS: 200,
        CREATED: 201,
        NOT_FOUND: 404,
        INTERNAL_SERVER_ERROR: 500,
        BAD_REQUEST: 400,
        FORBIDDEN: 403,
        UNAUTHORIZED: 401
    },
    STATUS:{
        SUCCESS:    "Successfully generated xlsx",
        FAILED:     "Failed"
    }
}
module.exports = constants