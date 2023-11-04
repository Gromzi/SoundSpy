import { View, Text } from 'react-native'
import React from 'react'
import Loader from '../../components/Loader'

export default function HistoryScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>History screen</Text>
      <Loader size="large" color="#0000ff" />
    </View>
  )
}
