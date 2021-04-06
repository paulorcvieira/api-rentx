import crypto from 'crypto'
import multer, { StorageEngine } from 'multer'
import { resolve } from 'path'

interface IUploadConfig {
  driver: 's3' | 'disk'

  folder: (folder: string) => string

  upload(
    folder: string,
  ): {
    storage: StorageEngine
  }

  config: {
    // eslint-disable-next-line @typescript-eslint/ban-types
    disk: {}
    aws: {
      bucket: string
    }
  }
}

const STORAGE_DRIVER = process.env.STORAGE_DRIVER || 'disk'

export default {
  driver: STORAGE_DRIVER,

  folder: (folder: string) => {
    if (folder === 'tmp') return resolve(__dirname, '..', '..', 'tmp')
    return resolve(__dirname, '..', '..', 'tmp', folder)
  },

  upload: (folder: string) => {
    return {
      storage: multer.diskStorage({
        destination: resolve(__dirname, '..', '..', folder),
        filename: (request, file, callback) => {
          const fileHash = crypto.randomBytes(16).toString('hex')
          const fileName = `${fileHash}-${file.originalname}`

          return callback(null, fileName)
        },
      }),
    }
  },

  config: {
    disk: {},
    aws: {
      bucket: process.env.AWS_BUCKET_NAME,
    },
  },
} as IUploadConfig
