import { Platform } from 'react-native'
import { useAuthStore } from './store/authStore'
import * as SecureStore from 'expo-secure-store'
import AsyncStorage from '@react-native-async-storage/async-storage'
type Auth = {

}

const login = async () => {
  // mock data
  const email: string = 'ayo@gmail.com'
  const usernameRegex: RegExp = /^([^@]+)/
  const username: string = email.match(usernameRegex)![0]

  try {
    // mock response
    const response = {
      code: 200,
      token: 'EXAMPLE_TOKEN',
      user: { id: '1', name: username, email: email },
    }
    const { token, user } = response

    // set zustand state
    useAuthStore.getState().setToken(token)
    useAuthStore.getState().setUser(user)

    // store token
    try {
      Platform.OS === 'web'
        ? await AsyncStorage.setItem('token', token)
        : await SecureStore.setItemAsync('token', token)
    } catch (error) {
      console.error('Error storing token: ', error)
    }

    console.log(
      'Logged in: ',
      useAuthStore.getState().token,
      useAuthStore.getState().user
    )
  } catch (error) {
    console.error('Error logging in: ', error)
  }
}

const signInWithGoogle = async (token: string | undefined) => {
  if (!token) return
  try {
    const response = await fetch('https://www.googleapis.com/userinfo/v2/me', {
      headers: { Authorization: `Bearer ${token}` },
    })

    const user = await response.json()

    // set zustand state
    useAuthStore.getState().setGoogleUser(user)
    useAuthStore.getState().setGoogleToken(token)

    // store token
    try {
      Platform.OS === 'web'
        ? await AsyncStorage.setItem('googleToken', JSON.stringify(token))
        : await SecureStore.setItemAsync('googleToken', JSON.stringify(token))
    } catch (error) {
      console.error('Error storing google token: ', error)
    }

    console.log(
      'Logged in with Google: ',
      useAuthStore.getState().googleToken,
      useAuthStore.getState().googleUser
    )
  } catch (error) {
    console.error('Error signing in with Google: ', error)
  }
}

const logout = async () => {
  try {
    useAuthStore.getState().setToken(null)
    useAuthStore.getState().setUser(null)

    useAuthStore.getState().setGoogleToken(null)
    useAuthStore.getState().setGoogleUser(null)

    if (Platform.OS === 'web') {
      await AsyncStorage.removeItem('token')
      await AsyncStorage.removeItem('googleToken')
    } else {
      await SecureStore.deleteItemAsync('token')
      await SecureStore.deleteItemAsync('googleToken')
    }
  } catch (error) {
    console.error('Error logging out: ', error)
  }
}

export { login, logout, signInWithGoogle }
