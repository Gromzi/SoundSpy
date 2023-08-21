import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'

export default function WelcomeScreen() {
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
      }}
    >
      <Pressable onPress={handleContinueClick}>
        <Text>Continue</Text>
      </Pressable>
    </View>
  )
}
