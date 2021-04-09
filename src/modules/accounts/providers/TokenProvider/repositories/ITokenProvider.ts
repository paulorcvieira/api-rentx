export default interface ITokenProvider {
  generateToken(id: string, roles: string[]): string
  generateRefreshToken(id: string, email: string, roles: string[]): string
  expiresRefreshTokenDays(): number
}
