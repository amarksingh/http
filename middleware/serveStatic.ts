const serveStatic = require('serve-static');
/**
 * Class ServeStatic.
 */
class ServeStatic {
    $defaultOptions = { 'maxAge': '180d' };

    $options = {};

    /**
     * Create a new instance.
     */
    constructor() {
        this.$publicPath = this.$app ? this.$app['path.public'] : (typeof $app !== 'undefined' ? $app['path.public'] : '');
    }

    /**
     * handle method.
     * @param {*} { request
     * @param {*} response
     * @param {*} next }
     * @returns {any}
     */
    handle({ request, response, next }) {
        serveStatic(this.$publicPath, { ...this.$defaultOptions, ...(this.$options || this.options || {}) })(request, response, next)
    }
}

module.exports = ServeStatic