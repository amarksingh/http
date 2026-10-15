/**
 * Class InvalidObjectException.
 */
class InvalidObjectException extends Error {
    /**
     * Create a new instance.
     * @param {*} message
     */
    constructor(message: string) {
        super();
        this.name = this.constructor.name;
        this.status = 500;
        this.message = message || 'Invalid Object';
        Error.captureStackTrace(this, this.constructor);
    }
}
module.exports = InvalidObjectException