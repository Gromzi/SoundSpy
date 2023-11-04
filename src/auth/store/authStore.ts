import { create } from 'zustand'
import { IAuthState } from '../interfaces/IAuthState'

export const useAuthStore = create<IAuthState>((set) => ({
  token: null,
  user: null,
  
  setToken: (token: string | null) => set({ token }),
  setUser: (user) => set({ user }),
}))
