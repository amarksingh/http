const qs = require('qs');
/**
 * Class QueryParser.
 */
class QueryParser {
    
    $extended = false;

    /**
     * handle method.
     * @param {*} { request
     * @param {*} response
     * @param {*} next }
     * @returns {any}
     */
    handle({ request, response, next }) {
        request.query = qs.parse(request._parsedUrl.query, {
            allowPrototypes: this.$extended
        })
        next()
    }
}

module.exports = QueryParser