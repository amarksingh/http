/**
 * Class URL.
 */
class URL {
    /**
     * Create a new instance.
     * @param {*} url
     */
    constructor(url: string) {
        this.$url = url
        this.$segments = url.pathname.split('/')
    }
    /**
     * segment method.
     * @param {*} index
     * @returns {any}
     */
    segment(index: number) {
        return this.$segments[index]
    }
}
module.exports = URL