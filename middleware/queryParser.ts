import qs from 'qs';

/**
 * Class QueryParser.
 */
class QueryParser {
    
    $extended: boolean = false;

    /**
     * Handle incoming request query string.
     *
     * @param context - Middleware context with request, response, next.
     */
    handle({ request, response, next }: Record<string, any>): void {
        request.query = qs.parse(request._parsedUrl.query, {
            allowPrototypes: this.$extended
        });
        next();
    }
}

export = QueryParser;