import serveStatic from 'serve-static';

/**
 * Class ServeStatic.
 */
class ServeStatic {
    declare $app?: any;
    declare options?: Record<string, any>;

    $defaultOptions: Record<string, any> = { 'maxAge': '180d' };

    $options: Record<string, any> = {};
    $publicPath: string;

    /**
     * Create a new instance.
     */
    constructor() {
        this.$publicPath = this.$app ? this.$app['path.public'] : (typeof $app !== 'undefined' ? ($app as any)['path.public'] : '');
    }

    /**
     * Handle static file serving.
     *
     * @param context - Middleware context with request, response, next.
     */
    handle({ request, response, next }: Record<string, any>): void {
        serveStatic(this.$publicPath, { ...this.$defaultOptions, ...(this.$options || this.options || {}) })(request, response, next);
    }
}

export = ServeStatic;