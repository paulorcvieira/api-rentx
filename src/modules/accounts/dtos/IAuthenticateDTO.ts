interface IAuthenticateDTO {
  [emailOrUsername: string]: string
  password: string
}

export { IAuthenticateDTO }
