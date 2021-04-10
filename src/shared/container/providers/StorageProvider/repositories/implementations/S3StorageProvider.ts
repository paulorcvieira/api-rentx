import aws, { S3 } from 'aws-sdk'
import fs from 'fs'
import mime from 'mime'
import path from 'path'

import uploadConfig from '@config/upload-config'

import { IStorageProvider } from '../IStorageProvider'

export class S3StorageProvider implements IStorageProvider {
  private client: S3

  constructor() {
    this.client = new aws.S3({
      region: process.env.AWS_DEFAULT_REGION,
    })
  }

  public async saveFile(folder: string, file: string): Promise<string> {
    const originalPath = path.resolve(uploadConfig.folder(folder), file)

    const ContentType = mime.lookup(originalPath)

    if (!ContentType) {
      throw new Error('File not found')
    }

    const fileContent = await fs.promises.readFile(originalPath)

    await this.client
      .putObject({
        Bucket: uploadConfig.config.aws.bucket,
        Key: file,
        ACL: 'public-read',
        Body: fileContent,
        ContentType,
      })
      .promise()

    await fs.promises.unlink(originalPath)

    return file
  }

  public async deleteFile(_folder: string, file: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: uploadConfig.config.aws.bucket,
        Key: file,
      })
      .promise()
  }
}
