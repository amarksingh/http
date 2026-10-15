
const HttpExceptionContract = require('@ostro/contracts/http/httpException')

/**
 * Class HttpException.
 */
class HttpException extends HttpExceptionContract {
    statusCode;
    headers = {};
    message;
    /**
     * Create a new instance.
     * @param {*} $statusCode
     * @param {*} $message
     * @param {*} $headers
     */
    constructor($statusCode, $message = '', $headers = {}) {
        super($message);
        this.name = this.constructor.name;
        this.statusCode = $statusCode;
        this.headers = $headers;
        this.message = $message;
        Error.captureStackTrace(this, this.constructor);

    }

    /**
     * getStatusCode method.
     * @returns {any}
     */
    getStatusCode() {
        return this.statusCode;
    }

    /**
     * getHeaders method.
     * @returns {any}
     */
    getHeaders() {
        return this.headers;
    }

    /**
     * setHeaders method.
     * @param {*} $headers
     * @returns {any}
     */
    setHeaders($headers) {
        this.headers = $headers;
    }
}
module.exports = HttpException;
