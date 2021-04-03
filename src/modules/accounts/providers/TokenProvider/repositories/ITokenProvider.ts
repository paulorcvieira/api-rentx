export default interface ITokenProvider {
  generateToken(id: string, roles: string[]): string
}
