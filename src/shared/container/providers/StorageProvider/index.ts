import { container } from 'tsyringe'

import uploadConfig from '@config/upload'

import { DiskStorageProvider } from './repositories/implementations/DiskStorageProvider'
import { S3StorageProvider } from './repositories/implementations/S3StorageProvider'
import { IStorageProvider } from './repositories/IStorageProvider'

const providers = {
  disk: DiskStorageProvider,
  s3: S3StorageProvider,
}

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  providers[uploadConfig.driver],
)
