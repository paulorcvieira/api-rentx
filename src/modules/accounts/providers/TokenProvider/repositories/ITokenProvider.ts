export interface IPayload {
  sub: string
  email: string
}

export default interface ITokenProvider {
  generateToken(id: string, roles: string[]): string
  generateRefreshToken(id: string, email: string, roles: string[]): string
  expiresRefreshTokenDays(): number
  verifyIsValidToken(token: string): IPayload
}
