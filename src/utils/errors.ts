const BackendError = { code: 1000, message: 'Backend error' }

/* eslint-disable  @typescript-eslint/no-explicit-any */
/* eslint-disable  @typescript-eslint/explicit-module-boundary-types */
function handleError(error: any, res: any) {
    const directlyPassThrough = error.response && error.response.status != 1000
    if (directlyPassThrough) {
        res.status(error.response.status).send(error.response.data)
    } else {
        // it will get a [ERR_HTTP_INVALID_STATUS_CODE] error when send with status code 1000
        res.status(200).send(BackendError)
    }
}

type ResponseError = {
    response: {
        status: number
        data: string
    }
}

function createError(status: number, data: string): ResponseError {
    return { response: { status, data } }
}

export { BackendError, handleError, ResponseError, createError }
