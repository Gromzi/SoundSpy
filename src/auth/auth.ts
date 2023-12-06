import { Platform } from 'react-native'
import { useAuthStore } from './store/authStore'
import * as SecureStore from 'expo-secure-store'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ILoginRegisterResponse } from './interfaces/auth/ILoginRegisterResponse'

const exampleUserData = {
  authorization: {
    token: '2|zhK9QWuBODgeC2eMcPRMI44GzsROnRa1dN8Up2xb2912da4b',
    type: 'bearer',
  },
  user: {
    avatar: null,
    created_at: '2023-11-28T21:32:12.000000Z',
    email: 'mamgier@gmail.com',
    email_verified_at: null,
    google_id: null,
    id: 1,
    name: 'mamgier',
    picture: null,
    updated_at: '2023-11-28T21:32:12.000000Z',
  },
}

const login = async (loginResponse: ILoginRegisterResponse) => {
  const { authorization, user } = loginResponse

  // set zustand state
  useAuthStore.getState().setToken(authorization.token)
  useAuthStore.getState().setUser(user)

  // store token
  try {
    Platform.OS === 'web'
      ? await AsyncStorage.setItem(
          'USER_TOKEN',
          JSON.stringify(authorization.token)
        )
      : await SecureStore.setItemAsync(
          'USER_TOKEN',
          JSON.stringify(authorization.token)
        )
  } catch (error) {
    console.error('Error storing token: ', error)
  }

  // // fetch user history and store it in local storage
  // try {
  //   const response = await fetch('https://soundset.webitup.pl/api/predict', {
  //     headers: {
  //       Accept: 'application/json',
  //       Authorization: `Bearer ${useAuthStore.getState().token}`,
  //     },
  //   })
  //   const code = response.status
  //   const serverResponse = await response.json()
  //   const history = serverResponse.predicts

  //   if (code === 200) {
  //     AsyncStorage.removeItem('history')
  //     AsyncStorage.setItem('history', JSON.stringify(history))
  //   }
  // } catch (error) {
  //   console.error('Error fetching user history: ', error)
  // }

  console.log(
    'Logged in: ',
    useAuthStore.getState().token,
    useAuthStore.getState().user
  )
}

// const login = async () => {
//   // mock data
//   const email: string = 'ayo@gmail.com'
//   const usernameRegex: RegExp = /^([^@]+)/
//   const username: string = email.match(usernameRegex)![0]

//   try {
//     // mock response
//     const response = {
//       code: 200,
//       token: 'EXAMPLE_TOKEN',
//       user: { id: '1', name: username, email: email },
//     }
//     const { token, user } = response

//     // set zustand state
//     useAuthStore.getState().setToken(token)
//     useAuthStore.getState().setUser(user)

//     // store token
//     try {
//       Platform.OS === 'web'
//         ? await AsyncStorage.setItem('token', token)
//         : await SecureStore.setItemAsync('token', token)
//     } catch (error) {
//       console.error('Error storing token: ', error)
//     }

//     console.log(
//       'Logged in: ',
//       useAuthStore.getState().token,
//       useAuthStore.getState().user
//     )
//   } catch (error) {
//     console.error('Error logging in: ', error)
//   }
// }

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
      await AsyncStorage.removeItem('USER_TOKEN')
      await AsyncStorage.removeItem('token')
      await AsyncStorage.removeItem('googleToken')
    } else {
      await SecureStore.deleteItemAsync('USER_TOKEN')
      await SecureStore.deleteItemAsync('token')
      await SecureStore.deleteItemAsync('googleToken')
    }

    await AsyncStorage.removeItem('history')
  } catch (error) {
    console.error('Error logging out: ', error)
  }
}

export { login, logout, signInWithGoogle }
