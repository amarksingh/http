const InvalidArrayException = require('./invalidArrayException')
const InvalidObjectException = require('./invalidObjectException')
const CollectionInterface = require('@ostro/contracts/collection/collect')

/**
 * Class JsonResources.
 */
class JsonResources {
    /**
     * toObject method.
     * @static
     * @param {*} obj
     * @returns {any}
     */
    static toObject(obj: any) {
        return obj
    }

    /**
     * collection method.
     * @static
     * @param {*} datas
     * @returns {any}
     */
    static collection(datas: any) {
        if (datas instanceof CollectionInterface)
            datas = datas.all()
        if (!Array.isArray(datas))
            throw new InvalidArrayException(`Data should be array`)

        return datas.map(data => (this.toObject(data)))
    }
    
    /**
     * resource method.
     * @static
     * @param {*} obj
     * @returns {any}
     */
    static resource(obj: any) {
        if (typeof obj != 'object' || Array.isArray(obj) || obj === null)
            throw new InvalidObjectException(`Data should be obj`)
        return this.toObject(obj)
    }
}

module.exports = JsonResources;