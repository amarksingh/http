/**
 * Class URL.
 */
class URL {
    /**
     * Create a new instance.
     * @param {*} url
     */
    constructor(url) {
        this.$url = url
        this.$segments = url.pathname.split('/')
    }
    /**
     * segment method.
     * @param {*} index
     * @returns {any}
     */
    segment(index) {
        return this.$segments[index]
    }
}
module.exports = URL