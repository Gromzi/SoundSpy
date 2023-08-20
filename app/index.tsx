import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'

export default function index() {
  return (
    <View style={styles.container}>
      <Text>Ayo</Text>
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#253340',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
