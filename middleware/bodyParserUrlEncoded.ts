const bodyParser = require('body-parser');
/**
 * Class BodyParserUrlEncoded.
 */
class BodyParserUrlEncoded {
    $defaultOptions = {
        'extended': true,
        'parameterLimist': 1000000,
        'bodySize': '80mb'
    };
    
    $options = {};

    /**
     * handle method.
     * @param {*} { request
     * @param {*} response
     * @param {*} next }
     * @returns {any}
     */
    handle({ request, response, next }) {
        bodyParser.urlencoded({
            ...this.$defaultOptions,
            ...this.$options
        })(request, response, next)
    }
}

module.exports = BodyParserUrlEncoded