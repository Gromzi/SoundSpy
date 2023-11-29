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
        ? AsyncStorage.getItem('USER_TOKEN')
        : SecureStore.getItemAsync('USER_TOKEN')

    const googleToken: Promise<string | null> =
      Platform.OS === 'web'
        ? AsyncStorage.getItem('googleToken')
        : SecureStore.getItemAsync('googleToken')

    // Check if user is logged in
    // token.then(async (token) => {
    //   if (token) {
    //     // make request to api to check if token is valid
    //     try {
    //       const response = await fetch('https://soundset.webitup.pl/api/user', {
    //         headers: {
    //           Accept: 'application/json',
    //           'Content-Type': 'application/json',
    //           Authorization: 'Bearer TOKEN',
    //         },
    //       })
    //       const code = await response.status
    //       const json = await response.json()
    //       console.log('Code: ', code)

    //       if (code == 401) {
    //         //cos
    //       }

    //       if (code == 200) {
    //         await login(json)
    //       }
    //     }
    //     catch (error) {
    //       console.log('Error: ', error)
    //     }

    //     console.log('User logged in')
    //     return
    //   } else {
    //     console.log('User not logged in')
    //   }
    // })

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
