import { View, StyleSheet } from 'react-native'
import React from 'react'
import { BackgroundGrandient } from '../../components/BackgroundGrandient'
import RecordButton from '../../components/RecordButton'
import UploadButton from '../../components/UploadButton'

export default function HomeScreen() {
  return (
    <BackgroundGrandient>
      <View style={styles.mainContainer}>
        <RecordButton />
        <UploadButton />
      </View>
    </BackgroundGrandient>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
  },
})
