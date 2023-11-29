import { IUser } from './IUser'

export interface IAuthState {
  token: string | null
  user: IUser | null
  googleToken: string | null
  googleUser: any

  setToken: (token: string | null) => void
  setUser: (user: IUser | null | any) => void
  setGoogleToken: (googleToken: string | null) => void
  setGoogleUser: (googleUser: any) => void
}
