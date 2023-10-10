import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import { useAuthStore } from '../auth/store/authStore'
import { IUser } from '../auth/interfaces/IUser'
import { login } from '../auth/auth'

export default function WelcomeScreen() {
  const user: IUser | null = useAuthStore((state) => state.user)

  const handleContinueClick = () => {
    const router = useRouter()
    router.replace('/home')
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
      }}
    >
      <Pressable onPress={handleContinueClick}>
        {user ? (
          <Text>Continue as {user.username}</Text>
        ) : (
          <Text>Continue as guest</Text>
        )}
      </Pressable>

      {!user && (
        <Pressable onPress={login}>
          <Text>Log into account</Text>
        </Pressable>
      )}
    </View>
  )
}
