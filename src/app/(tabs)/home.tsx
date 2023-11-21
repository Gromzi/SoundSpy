import { View, StyleSheet, Text } from 'react-native'
import React, { ReactNode, useState } from 'react'
import { BackgroundGrandient } from '../../components/BackgroundGrandient'
import RecordButton from '../../components/RecordButton'
import UploadButton from '../../components/UploadButton'
import * as Animatable from 'react-native-animatable'

export default function HomeScreen() {
  const [isRecording, setIsRecording] = useState<boolean>(false)
  const [waitingForResponse, setWaitingForResponse] = useState<boolean>(false)

  let bottomText: ReactNode = null

  if (isRecording && !waitingForResponse) {
    bottomText = (
      <Animatable.Text
        animation={'shake'}
        iterationCount={'infinite'}
        duration={1500}
        style={styles.text}
      >
        Now recording . . .
      </Animatable.Text>
    )
  } else if (!isRecording && !waitingForResponse) {
    bottomText = (
      <Animatable.Text
        animation={'pulse'}
        iterationCount={'infinite'}
        duration={2000}
        style={styles.text}
      >
        Press the big button to start recording sound!
      </Animatable.Text>
    )
  } else if (!isRecording && waitingForResponse) {
    bottomText = (
      <Animatable.Text
        animation={'swing'}
        iterationCount={'infinite'}
        duration={2000}
        style={styles.text}
      >
        Analysing audio . . .
      </Animatable.Text>
    )
  }

  return (
    <BackgroundGrandient>
      <View style={styles.mainContainer}>
        <RecordButton
          isRecording={isRecording}
          setIsRecording={setIsRecording}
          waitingForResponse={waitingForResponse}
        />
        <UploadButton />

        {bottomText}
      </View>
    </BackgroundGrandient>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    marginTop: 100,
    paddingLeft: 35,
    paddingRight: 35,
    textAlign: 'center',
    color: '#FCECDD',
    fontSize: 20,
    fontFamily: 'Kanit-Medium',
  },
})
