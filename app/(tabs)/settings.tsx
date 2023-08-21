import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

export default function SettingsScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text style={{ marginBottom: 50 }}>Settings Screen</Text>
      <Link href={'/login'} asChild>
        <Pressable>
          <Text>Log into account</Text>
        </Pressable>
      </Link>
    </View>
  )
}
