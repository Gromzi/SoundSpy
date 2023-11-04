import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

export default function LoginScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text style={{ marginBottom: 50 }}>Login Screen</Text>
      <Link href={'/register'} asChild>
        <Pressable>
          <Text>No account? Register!</Text>
        </Pressable>
      </Link>
    </View>
  )
}
