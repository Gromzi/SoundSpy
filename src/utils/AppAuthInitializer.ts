import AsyncStorage from '@react-native-async-storage/async-storage'
import { Platform } from 'react-native'
import { login, signInWithGoogle } from '../auth/auth'
import * as SecureStore from 'expo-secure-store'
import { useEffect } from 'react'

type AppAuthInitializerProps = {
  children: React.ReactNode
}

const AppAuthInitializer = ({ children }: AppAuthInitializerProps) => {
  const initializeAuthState = async () => {
    const token: Promise<string | null> =
      Platform.OS === 'web'
        ? AsyncStorage.getItem('token')
        : SecureStore.getItemAsync('token')

    const googleToken: Promise<string | null> =
      Platform.OS === 'web'
        ? AsyncStorage.getItem('googleToken')
        : SecureStore.getItemAsync('googleToken')

    // Check if user is logged in
    token.then((token) => {
      if (token) {
        login()
        console.log('User logged in')
        return
      } else {
        console.log('User not logged in')
      }
    })

    googleToken.then((googleToken) => {
      if (googleToken) {
        signInWithGoogle(googleToken)
        console.log('Google user logged in')
        return
      } else {
        console.log('Google user not logged in')
      }
    })
  }

  useEffect(() => {
    initializeAuthState()
  }, [])

  return children
}

export { AppAuthInitializer }
