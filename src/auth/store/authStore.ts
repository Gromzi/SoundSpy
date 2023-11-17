import { create } from 'zustand'
import { IAuthState } from '../interfaces/IAuthState'

export const useAuthStore = create<IAuthState>((set) => ({
  token: null,
  user: null,
  googleToken: null,
  googleUser: null,

  setToken: (token: string | null) => set({ token }),
  setUser: (user) => set({ user }),
  setGoogleToken: (googleToken: string | null) => set({ googleToken }),
  setGoogleUser: (googleUser: any) => set({ googleUser }),
}))
