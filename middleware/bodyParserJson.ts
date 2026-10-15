const bodyParser = require('body-parser');
/**
 * Class BodyParserJson.
 */
class BodyParserJson {
    $defaultOptions = {
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
    handle({ request, response, next }: Record<string, any>) {
        bodyParser.json({
            ...this.$defaultOptions,
            ...this.$options
        })(request, response, next)
    }
}

module.exports = BodyParserJson