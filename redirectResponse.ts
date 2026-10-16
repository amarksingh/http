import RedirectResponseContract from '@ostro/contracts/http/redirectResponse';
import { Macroable } from '@ostro/support/macro';
const kUrl = Symbol('url')
const kErrors = Symbol('errors')
const kInputs = Symbol('inputs')
const kFlash = Symbol('flash')
const kResponse = Symbol('response')

/**
 * Class RedirectResponse.
 */
class RedirectResponse extends RedirectResponseContract {

    /**
     * Create a new instance.
     * @param {*} response
     */
    constructor(response: any) {
        super()
        Object.defineProperties(this, {
            [kUrl]: {
                value: undefined,
                writable: true
            },
            [kResponse]: {
                value: response
            },
            [kInputs]: {
                value: [],
                writable: true,
            },
            [kErrors]: {
                value: [],
                writable: true
            },
            [kFlash]: {
                value: [],
                writable: true
            }
        })
    }

    /**
     * to method.
     * @param {*} url
     * @returns {any}
     */
    to(url: string) {
        this[kUrl] = url
        if (this[kResponse]) {
            process.nextTick(() => {
                if (this[kResponse].request.session)
                    this[kResponse].with(...this.getFlash()).withErrors(...this.getErrors()).withInput(...this.getInputs());
                this[kResponse].redirect(this[kUrl]);
            })
        }
        return this
    }

    /**
     * away method.
     * @param {*} url
     * @returns {any}
     */
    away(url: string) {
        this[kResponse].redirect(url);
    }

    /**
     * route method.
     * @returns {any}
     */
    route() {
        this[kUrl] = app('router').route(...arguments)
        return this.to(this[kUrl])
    }

    /**
     * withErrors method.
     * @param {*} errors
     * @returns {any}
     */
    withErrors(...errors: any[]) {
        this[kErrors] = errors
        return this
    }

    /**
     * withInput method.
     * @param {*} inputs
     * @returns {any}
     */
    withInput(...inputs: any[]) {
        this[kInputs] = inputs.length ? inputs : [true]
        return this
    }

    /**
     * with method.
     * @param {*} flash
     * @returns {any}
     */
    with(...flash: any[]) {
        this[kFlash] = flash
        return this
    }

    /**
     * getUrl method.
     * @returns {any}
     */
    getUrl() {
        return this[kUrl]
    }

    /**
     * getErrors method.
     * @returns {any}
     */
    getErrors() {
        return this[kErrors]
    }

    /**
     * getInputs method.
     * @returns {any}
     */
    getInputs() {
        return this[kInputs]
    }

    /**
     * wantedInput method.
     * @returns {any}
     */
    wantedInput() {
        return this[kInputs].length
    }

    /**
     * getFlash method.
     * @returns {any}
     */
    getFlash() {
        return this[kFlash]
    }

    /**
     * back method.
     * @returns {any}
     */
    back() {
        this[kUrl] = 'back'
        if (this[kResponse]) {
            return this.to(this[kUrl])
        }
    }

    /**
     * __get method.
     * @static
     * @param {*} target
     * @param {*} method
     * @returns {any}
     */
    static __get(target: Record<string, any>, method: string) {
        return this.make(new target, method)
    }

}

export default Macroable(RedirectResponse);
