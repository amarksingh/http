const FileContract = require('@ostro/contracts/container/file')
const { v4: uuidv4 } = require('uuid');
const path = require('path');
/**
 * Class File.
 */
class File extends FileContract {
    /**
     * Create a new instance.
     * @param {*} data
     */
    constructor(data) {
        super()
        Object.defineProperties(this, {
            filename: {
                value: data.filename,
                writable: false,
                configurable: false,
                enumerable: true
            },
            mimetype: {
                value: data.mimetype,
                writable: false,
                configurable: false,
                enumerable: true
            },
            encoding: {
                value: data.encoding,
                writable: false,
                configurable: false,
                enumerable: true
            },
            buffer: {
                value: Buffer.concat(data.buffer),
                writable: false,
                configurable: false,
                enumerable: false
            }
        });
    }

    /**
     * getName method.
     * @returns {any}
     */
    getName() {
        return this.filename
    }

    /**
     * getHashname method.
     * @returns {any}
     */
    getHashname() {
        return uuidv4().replace(/-/g, '') + '.' + this.getExtension();
    }

    /**
     * getSize method.
     * @returns {any}
     */
    getSize() {
        return Number((this.buffer.length / 1024).toFixed(2))
    }

    /**
     * getMimetype method.
     * @returns {any}
     */
    getMimetype() {
        return this.mimetype
    }

    /**
     * getBufferData method.
     * @returns {any}
     */
    getBufferData() {
        return this.buffer
    }

    /**
     * getExtension method.
     * @returns {any}
     */
    getExtension() {
        return path.extname(this.filename).slice(1)
    }

    /**
     * getType method.
     * @returns {any}
     */
    getType() {
        return 'buffer'
    }

    /**
     * extension method.
     * @returns {any}
     */
    extension() {
        return this.getExtension()
    }

    /**
     * isValid method.
     * @returns {any}
     */
    isValid() {
        return true
    }

}
module.exports = File
