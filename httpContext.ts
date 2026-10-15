const { Macroable } = require('@ostro/support/macro')
const kNext = Symbol('next')
const url = require('url');
const URL = require('./url')
const RedirectResponse = require('./redirectResponse')

/**
 * Class HttpContext.
 */
class HttpContext extends Macroable {
    /**
     * Create a new instance.
     * @param {*} request
     * @param {*} response
     * @param {*} next
     */
    constructor(request, response, next) {
        super()
        Object.defineProperty(this, 'request', {
            value: request,
            enumerable: true,
            configurable: false,
            writable: false
        })
        Object.defineProperty(this, 'response', {
            value: response,
            enumerable: true,
            configurable: false,
            writable: false
        })
        if (typeof request._parsedUrl != 'object') {
            request._parsedUrl = url.parse(request.url, false)
        }

    }

    /**
     * setCurrentNext method.
     * @param {*} next
     * @returns {any}
     */
    setCurrentNext(next) {
        this.$next = next
    }

    /**
     * Get redirect.
     * @returns {any}
     */
    get redirect() {
        return new RedirectResponse(this.response)
    }

    /**
     * Get url.
     * @returns {any}
     */
    get url() {
        return new URL(this.request._parsedUrl)
    }

    /**
     * next method.
     * @returns {any}
     */
    next() {
        this.$next(...arguments)
    }

}
module.exports = HttpContext