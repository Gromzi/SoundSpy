import { IUser } from "./IUser"

export interface IAuthState {
    token: string | null
    user: IUser | null
  
    setToken: (token: string | null) => void
    setUser: (user: IUser | null) => void
  }