import AsyncStorage from '@react-native-async-storage/async-storage'
import { Platform, useColorScheme } from 'react-native'
import { login, logout, signInWithGoogle } from '../auth/auth'
import * as SecureStore from 'expo-secure-store'
import { useEffect, useState } from 'react'
import { ToastProvider, useToast } from 'react-native-toast-notifications'
import { router } from 'expo-router'
import { colorPalette } from '../theme/colors'

type AppAuthInitializerProps = {
  children: React.ReactNode
}

const AppAuthInitializer = ({ children }: AppAuthInitializerProps) => {
  const toast = useToast()
  const [delayRender, setDelayRender] = useState(false)
  const [tokenExpired, setTokenExpired] = useState(false)

  const colorScheme = useColorScheme()
  const colors = colorPalette[colorScheme === 'dark' ? 'dark' : 'light']

  const initializeAuthState = async () => {
    const history = await AsyncStorage.getItem('history')
    // console.log('History: ', history)

    const token: Promise<string | null> =
      Platform.OS === 'web'
        ? AsyncStorage.getItem('USER_TOKEN')
        : SecureStore.getItemAsync('USER_TOKEN')

    const googleToken: Promise<string | null> =
      Platform.OS === 'web'
        ? AsyncStorage.getItem('googleToken')
        : SecureStore.getItemAsync('googleToken')

    // Check if user is logged in
    token.then(async (token) => {
      if (token) {
        // console.log('Token: ', token)
        // console.log('Token parse: ', JSON.parse(token))
        // make request to api to check if token is valid
        try {
          const response = await fetch('https://soundset.webitup.pl/api/user', {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + JSON.parse(token),
            },
          })
          const code = response.status
          const json = await response.json()
          // console.log('Code: ', code)

          if (code == 401) {
            setTokenExpired(true)
            return
          }

          if (code == 200) {
            await login(json)
          }
        } catch (error) {
          console.log('Error: ', error)
        }

        // console.log('User logged in')
        return
      } else {
        // console.log('User not logged in')
      }
    })

    googleToken.then((googleToken) => {
      if (googleToken) {
        signInWithGoogle(googleToken)
        // console.log('Google user logged in')
        return
      } else {
        // console.log('Google user not logged in')
      }
    })
  }

  useEffect(() => {
    initializeAuthState()
    setDelayRender(true)
  }, [])

  useEffect(() => {
    if (tokenExpired) {
      logout()
      router.replace('/auth')
      toast.show('Your session has expired. Please log in again', {
        type: 'danger',
        placement: 'bottom',
        textStyle: { fontFamily: 'Kanit-Regular' },
        style: {
          borderRadius: 16,
          backgroundColor: colors.error,
          marginBottom: 50,
        },
        animationType: 'slide-in',
      })
    }
  }, [delayRender, tokenExpired])

  return children
}

export { AppAuthInitializer }
