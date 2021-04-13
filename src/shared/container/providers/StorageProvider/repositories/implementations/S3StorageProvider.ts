import aws, { S3 } from 'aws-sdk'
import fs from 'fs'
import mime from 'mime'
import { resolve } from 'path'

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
    const originalPath = resolve(uploadConfig.folder(folder), file)

    const fileContent = await fs.promises.readFile(originalPath)

    const ContentType = mime.getType(originalPath)

    if (!ContentType) {
      throw new Error('File not found')
    }

    await this.client
      .putObject({
        Bucket: `${uploadConfig.config.aws.bucket}/${folder}`,
        Key: file,
        ACL: 'public-read',
        Body: fileContent,
        ContentType,
      })
      .promise()

    await fs.promises.unlink(originalPath)

    return file
  }

  public async deleteFile(folder: string, file: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: `${uploadConfig.config.aws.bucket}/${folder}`,
        Key: file,
      })
      .promise()
  }
}
