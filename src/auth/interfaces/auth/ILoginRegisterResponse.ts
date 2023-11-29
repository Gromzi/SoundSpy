import { IAuthorization } from './IAuthorization'
import { IUser } from './IUser'

export interface ILoginRegisterResponse {
  authorization: IAuthorization
  user: IUser
}
