const TokenMismatchExceptionContract = require('@ostro/contracts/http/tokenMismatchException')
/**
 * Class TokenMismatchException.
 */
class TokenMismatchException extends TokenMismatchExceptionContract {
    /**
     * Create a new instance.
     * @param {*} message
     */
    constructor(message: string) {
        super();
        this.name = this.constructor.name;
        this.message = message;
        this.statusCode = 403;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = TokenMismatchException