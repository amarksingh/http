import FileContract from '@ostro/contracts/container/file';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

/**
 * Class File representing an uploaded file buffer and its metadata.
 */
class File extends FileContract {
    filename!: string;
    mimetype!: string;
    encoding!: string;
    buffer!: Buffer;

    /**
     * Create a new File instance.
     *
     * @param data - File data dictionary with filename, mimetype, encoding, and buffer chunks.
     */
    constructor(data: Record<string, any>) {
        super();
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
     * Get the original file name.
     *
     * @returns Original filename.
     */
    getName(): string {
        return this.filename;
    }

    /**
     * Generate a hashed unique filename with extension.
     *
     * @returns Hashed filename.
     */
    getHashname(): string {
        return uuidv4().replace(/-/g, '') + '.' + this.getExtension();
    }

    /**
     * Get the file size in kilobytes (KB).
     *
     * @returns File size in KB.
     */
    getSize(): number {
        return Number((this.buffer.length / 1024).toFixed(2));
    }

    /**
     * Get the file MIME type.
     *
     * @returns MIME type string.
     */
    getMimetype(): string {
        return this.mimetype;
    }

    /**
     * Get the raw file Buffer.
     *
     * @returns Buffer data.
     */
    getBufferData(): Buffer {
        return this.buffer;
    }

    /**
     * Get the file extension without dot.
     *
     * @returns File extension.
     */
    getExtension(): string {
        return path.extname(this.filename).slice(1);
    }

    /**
     * Get the storage type representation.
     *
     * @returns 'buffer'.
     */
    getType(): string {
        return 'buffer';
    }

    /**
     * Alias for getExtension().
     *
     * @returns File extension.
     */
    extension(): string {
        return this.getExtension();
    }

    /**
     * Check if the uploaded file is valid.
     *
     * @returns Always true for constructed buffers.
     */
    isValid(): boolean {
        return true;
    }
}

export default File;
