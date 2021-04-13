import fs from 'fs'
import { resolve } from 'path'

import uploadConfig from '@config/upload-config'

import { IStorageProvider } from '../IStorageProvider'

export class DiskStorageProvider implements IStorageProvider {
  public async saveFile(folder: string, file: string): Promise<string> {
    await fs.promises.rename(
      resolve(uploadConfig.folder(folder), file),
      resolve(uploadConfig.folder(folder), file),
    )

    return file
  }

  public async deleteFile(folder: string, file: string): Promise<void> {
    const filePath = resolve(uploadConfig.folder(folder), file)

    try {
      await fs.promises.stat(filePath)
    } catch {
      return
    }

    await fs.promises.unlink(filePath)
  }
}
