const crossOrigin = require('cors');

class CrossOrigin {

    // Configure allowed CORS header values as arrays for easy merging/extension
    $headers = {
        'Access-Control-Allow-Origin': ['*'],
        'Access-Control-Allow-Methods': ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        'Access-Control-Allow-Headers': ["*"]
    };

    handle({ request, response, next }) {
        // Helper: normalize header arrays to array of strings.
        // Accepts:
        // - array of strings (items may contain commas)
        // - single string (may contain commas)
        // Returns flattened, trimmed array of non-empty strings
        const normalizeArray = (val) => {
            if (!val) return [];
            const toItems = (item) => String(item).split(',').map(s => s.trim()).filter(Boolean);
            if (Array.isArray(val)) {
                return val.flatMap(toItems);
            }
            return toItems(val);
        };

        const origins = normalizeArray(this.$headers['Access-Control-Allow-Origin']);
        const methods = normalizeArray(this.$headers['Access-Control-Allow-Methods']);
        const allowedHeaders = normalizeArray(this.$headers['Access-Control-Allow-Headers']);

        const reqOrigin = request.header('Origin') || '';

        // Check whether origin is allowed. Support '*', exact match, and hostname-only matches
        const originAllowed = (origin) => {
            if (!origin) return false;
            if (origins.includes('*')) return true;
            if (origins.includes(origin)) return true;
            const stripped = origin.replace(/(^\w+:|^)\/\//, ''); // remove protocol if present
            if (origins.includes(stripped)) return true;
            return false;
        };

        // Build options for cors middleware
        const options = {
            origin: origins.includes('*') ? '*' : (originAllowed(reqOrigin) ? true : false),
            methods: methods.length ? methods.join(',') : undefined,
            allowedHeaders: allowedHeaders.length ? (allowedHeaders.includes('*') ? '*' : allowedHeaders.join(',')) : (request.header('Access-Control-Request-Headers') || undefined)
        };

        // Call cors middleware with computed options
        crossOrigin(options)(request, response, next);
    }
}

module.exports = CrossOrigin;
