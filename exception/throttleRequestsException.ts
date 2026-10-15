const HttpException = require('./httpException');
/**
 * Class ThrottleRequestsException.
 */
class ThrottleRequestsException extends HttpException {
    /**
     * Create a new instance.
     * @param {*} $retryAfter
     * @param {*} $message
     * @param {*} $headers
     */
    constructor($retryAfter: any = null, $message: string = '', $headers: Record<string, any> = {}) {
        if ($retryAfter) {
            $headers['Retry-After'] = $retryAfter;
        }

        super(429, $message, $headers);
    }
}
module.exports = ThrottleRequestsException;
