import type { IHttpRequest } from '@ostro/contracts/http/request';

import accepts from 'accepts';
import { isIP } from 'net';
import { pathToRegexp } from 'path-to-regexp';
import typeis from 'type-is';
import fresh from 'fresh';
import parseRange from 'range-parser';
import parse from 'parseurl';
import proxyaddr from 'proxy-addr';
import { compileTrust } from './utils';
const kRequest = Symbol('request');
import { Macroable } from '@ostro/support/macro';
import HttpRequestContract from '@ostro/contracts/http/request';
let booleanValue = [1, "1", true, "true", "on", "yes"];

/**
 * Class HttpRequest.
 */
class HttpRequest extends Macroable.extend(HttpRequestContract) implements IHttpRequest {
    [kRequest]: any;
    [key: string]: any;

    /**
     * Create a new instance.
     * @param {*} req
     */
    constructor(req: any) {
        super();
        Object.defineProperty(this, kRequest, { value: req });
        this.httpVersionMajor = req.httpVersionMajor;
        this.httpVersionMinor = req.httpVersionMinor;
        this.httpVersion = req.httpVersion;
        this.complete = req.complete;
        this.headers = req.headers;
        this.trailers = req.trailers;
        this.aborted = req.aborted;
        this.upgrade = req.upgrade;
        this.url = req.url;
        this.method = req.method;
        this.statusCode = req.statusCode;
        this.statusMessage = req.statusMessage;
        this.files = {};
    }

    /**
     * get method.
     * @param {*} name
     * @returns {any}
     */
    get(name: string) {
        return this.header(name);
    }

    /**
     * header method.
     * @param {*} name
     * @param {*} defaultValue
     * @returns {any}
     */
    header(name: string, defaultValue: any = undefined) {
        if (!name) {
            throw new TypeError('name argument is required to get');
        }

        if (typeof name !== 'string') {
            throw new TypeError('name must be a string to get');
        }
        var lc = name.toLowerCase();
        switch (lc) {
            case 'referer':
            case 'referrer':
                return this.headers.referrer ||
                    this.headers.referer || defaultValue;
            default:
                return this.headers[lc] || defaultValue;
        }
    }

    /**
     * hasHeader method.
     * @param {*} key
     * @returns {any}
     */
    hasHeader(key: string) {
        return typeof this.get(key) != 'undefined'
    }

    /**
     * absolute method.
     * @returns {any}
     */
    absolute() {
        return this._parsedUrl;
    }

    /**
     * accepts method.
     * @returns {any}
     */
    accepts(...args: any[]) {
        var accept = accepts(this);
        return accept.types.apply(accept, args);
    }

    /**
     * acceptsEncodings method.
     * @returns {any}
     */
    acceptsEncodings() {
        var accept = accepts(this);
        return accept.encodings.apply(accept, arguments);
    }

    /**
     * acceptsCharsets method.
     * @returns {any}
     */
    acceptsCharsets() {
        var accept = accepts(this);
        return accept.charsets.apply(accept, arguments);
    }

    /**
     * acceptsLanguages method.
     * @returns {any}
     */
    acceptsLanguages() {
        var accept = accepts(this);
        return accept.languages.apply(accept, arguments);
    }

    /**
     * prefers method.
     * @returns {any}
     */
    prefers(...args: any[]) {
        return this.is(...args)
    }

    /**
     * getAcceptableContentTypes method.
     * @returns {any}
     */
    getAcceptableContentTypes(...args: any[]) {
        return this.accepts(...args)
    }

    /**
     * range method.
     * @param {*} size
     * @param {*} options
     * @returns {any}
     */
    range(size: number, options: Record<string, any>) {
        var range = this.get('Range');
        if (!range) return;
        return parseRange(size, range, options);
    }

    /**
     * param method.
     * @param {*} name
     * @param {*} defaultValue
     * @returns {any}
     */
    param(name: string, defaultValue: any) {
        var params = this.params || {};

        if (null != params[name] && params.hasOwnProperty(name)) return params[name];
        return defaultValue;
    }


    /**
     * is method.
     * @param {*} types
     * @returns {any}
     */
    is(...types: any[]) {
        var arr: any = types;
        if (types.length === 1 && Array.isArray(types[0])) {
            arr = types[0];
        }
        return typeis(this, arr);
    }

    /**
     * protocol method.
     * @returns {any}
     */
    protocol() {
        var proto = this.connection.encrypted ?
            'https' :
            'http';
        var trust = this.app ? this.app['trust.proxy'] : undefined;
        if (!compileTrust(trust)(this.connection.remoteAddress, 0)) {
            return proto;
        }
        var header = this.get('X-Forwarded-Proto') || proto
        var index = header.indexOf(',')

        return index !== -1 ?
            header.substring(0, index).trim() :
            header.trim()
    }

    /**
     * secure method.
     * @returns {any}
     */
    secure() {
        return this.protocol() === 'https';
    }

    /**
     * ip method.
     * @returns {any}
     */
    ip() {
        var trust = this.app ? this.app['trust.proxy'] : undefined;
        return proxyaddr(this, compileTrust(trust));
    }

    /**
     * ips method.
     * @returns {any}
     */
    ips() {
        var trust = this.app ? this.app['trust.proxy'] : undefined;
        var addrs = proxyaddr.all(this, compileTrust(trust));
        addrs.reverse().pop()
        return addrs
    }

    /**
     * subdomains method.
     * @returns {any}
     */
    subdomains() {
        var hostname = this.hostname();

        if (!hostname) return [];

        var subdomains = !isIP(hostname) ?
            hostname.split('.').reverse() : [hostname];

        return subdomains.slice(2);
    }

    /**
     * request method.
     * @returns {any}
     */
    request() {
        return this[kRequest]
    }

    /**
     * segment method.
     * @param {*} num
     * @returns {any}
     */
    segment(num: any) {
        return this.segments()[num]
    }

    /**
     * segments method.
     * @returns {any}
     */
    segments() {
        return this.path().substr(1).split('/')
    }

    /**
     * path method.
     * @returns {any}
     */
    path() {
        return parse(this).pathname;
    }

    /**
     * hostname method.
     * @returns {any}
     */
    hostname() {
        var host = this.get('X-Forwarded-Host');

        var trust = this.app ? this.app['trust.proxy'] : undefined;
        if (!host || !compileTrust(trust)(this.connection.remoteAddress, 0)) {
            host = this.get('Host');
        } else if (host.indexOf(',') !== -1) {

            host = host.substring(0, host.indexOf(',')).trimRight()
        }

        if (!host) return;
        var offset = host[0] === '[' ?
            host.indexOf(']') + 1 :
            0;
        var index = host.indexOf(':', offset);

        return index !== -1 ?
            host.substring(0, index) :
            host;
    }

    /**
     * fresh method.
     * @param {*} res
     * @returns {any}
     */
    fresh(res: any) {
        var method = this.method;
        var status = res.statusCode
        if ('GET' !== method && 'HEAD' !== method) return false;
        if ((status >= 200 && status < 300) || 304 === status) {
            return fresh(this.headers, {
                'etag': res.get('ETag'),
                'last-modified': res.get('Last-Modified')
            })
        }

        return false;
    }

    /**
     * xhr method.
     * @returns {any}
     */
    xhr() {
        var val = this.get('X-Requested-With') || '';
        return val.toLowerCase() === 'xmlhttprequest';
    }

    /**
     * all method.
     * @returns {any}
     */
    all() {
        return { ...this.query,
            ...this.body,
            ...this.files
        }
    }

    /**
     * input method.
     * @param {*} key
     * @param {*} value
     * @returns {any}
     */
    input(key?: string, value: any = null) {
        if (!key) return this.all();
        return (this.all()[key] || value) || null
    }

    /**
     * boolean method.
     * @param {*} key
     * @returns {any}
     */
    boolean(key: string) {
        return Boolean(booleanValue.includes(this.input(key)))
    }

    /**
     * hasAny method.
     * @param {*} keys
     * @returns {any}
     */
    hasAny(keys: any[] = []) {
        let allInputsKeys = Object.keys(this.all())
        return Boolean(keys.filter(value => allInputsKeys.includes(value)).length)
    }

    /**
     * filled method.
     * @param {*} key
     * @returns {any}
     */
    filled(key: string) {
        return !!this.input(key)
    }

    /**
     * missing method.
     * @param {*} key
     * @returns {any}
     */
    missing(key: string) {
        return !(key in this.all())
    }

    /**
     * getQuery method.
     * @param {*} key
     * @param {*} value
     * @returns {any}
     */
    getQuery(key: string, value: any) {
        return key ? (this.query[key] || value) : this.query
    }

    /**
     * getBody method.
     * @param {*} key
     * @param {*} value
     * @returns {any}
     */
    getBody(key: string, value: any) {
        return key ? (this.body[key] || value) : this.body
    }

    /**
     * add method.
     * @param {*} key
     * @param {*} value
     * @returns {any}
     */
    add(key: string, value: any) {
        this.body[key] = value
    }

    /**
     * only method.
     * @returns {any}
     */
    only() {
        let inputKeys = Object.keys(this.all())
        inputKeys = Array.from(arguments).filter(value => inputKeys.includes(value))
        let data = {}
        for (var i = 0; i < inputKeys.length; i++) {
            data[inputKeys[i]] = this[inputKeys[i]]
        }
        return data
    }

    /**
     * except method.
     * @returns {any}
     */
    except() {
        let data = { ...this.all() }
        for (var i = 0; i <= arguments.length; i++) {
            delete data[arguments[i]]
        }
        return data
    }

    /**
     * has method.
     * @param {*} key
     * @returns {any}
     */
    has(key: string | string[]) {
        const keys = !Array.isArray(key) ? [key] : key;
        return this.hasAny(keys);
    }

    whenHas(key: string, done: (val: any) => void = () => {}, error: () => void = () => {}) {
        if (this.has(key)) {
            done(this.input(key))
        } else {
            error()
        }
    }

    whenFilled(key: string, done: (val: any) => void = () => {}, error: () => void = () => {}) {
        let input = this.input(key)
        if (input) {
            done(input)

        } else {
            error()

        }
    }

    /**
     * file method.
     * @param {*} key
     * @returns {any}
     */
    file(key: string) {
        return this.files[key]
    }

    /**
     * hasFile method.
     * @param {*} key
     * @param {*} value
     * @returns {any}
     */
    hasFile(key: string, value: boolean = false) {
        return Boolean(this.files[key] || value)
    }

    /**
     * isMethod method.
     * @param {*} value
     * @returns {any}
     */
    isMethod(value: any) {
        return Boolean(this.method && this.method.toUpperCase() === value.toUpperCase())
    }

    /**
     * ajax method.
     * @returns {any}
     */
    ajax() {
        return this.xhr()
    }

    /**
     * wantJson method.
     * @returns {any}
     */
    wantJson() {
        return (this.headers.accept || '').toLowerCase() == 'application/json'
    }

    /**
     * expectsJson method.
     * @returns {any}
     */
    expectsJson() {
        return this.wantJson()
    }

    /**
     * fullUrl method.
     * @returns {any}
     */
    fullUrl() {
        return this.hostname() + this.url.split('?')[0]
    }

    /**
     * fullUrlWithQuery method.
     * @returns {any}
     */
    fullUrlWithQuery() {
        return this.hostname() + this.url
    }

    /**
     * fullUrlIs method.
     * @param {*} except
     * @returns {any}
     */
    fullUrlIs(except: any) {
        return pathToRegexp(except).test(this.url)
    }

    /**
     * getUser method.
     * @returns {any}
     */
    getUser() {
        return this.header('AUTH_USER');
    }

    /**
     * bearerToken method.
     * @returns {any}
     */
    bearerToken() {
        let $header = this.header('Authorization', '');

        if ($header.startsWith('Bearer ')) {
            return $header.substr(7);
        }
    }

    /**
     * getPassword method.
     * @returns {any}
     */
    getPassword() {
        return this.header('AUTH_PW');
    }

    /**
     * getUserInfo method.
     * @returns {any}
     */
    getUserInfo() {
        let $userinfo = this.getUser();

        let $pass = this.getPassword();
        if ($pass !== undefined && '' != $pass) {
            $userinfo += ":" + $pass;
        }

        return $userinfo;
    }

    /**
     * __get method.
     * @param {*} target
     * @param {*} key
     * @returns {any}
     */
    __get(target: Record<string, any>, key: string) {
        if (target.has(key))
            return target.input(key)
        return (this as any).make((target as any)[kRequest], key)
    }

}

export default HttpRequest;