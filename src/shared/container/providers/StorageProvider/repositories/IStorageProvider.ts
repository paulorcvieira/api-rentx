export interface IStorageProvider {
  saveFile(folder: string, file: string): Promise<string>
  deleteFile(folder: string, file: string): Promise<void>
}
