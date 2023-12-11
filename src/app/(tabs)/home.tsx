import {
  View,
  StyleSheet,
  Text,
  Button,
  Pressable,
  useColorScheme,
  Platform,
} from 'react-native'
import React, { ReactNode, useState } from 'react'
import { BackgroundGrandient } from '../../components/BackgroundGrandient'
import RecordButton from '../../components/RecordButton'
import UploadButton from '../../components/UploadButton'
import * as Animatable from 'react-native-animatable'
import ResultModal from '../../components/ResultModal'
import AboutModal from '../../components/AboutModal'
import { FontAwesome } from '@expo/vector-icons'
import { colorPalette } from '../../theme/colors'

export default function HomeScreen() {
  const colorScheme = useColorScheme()
  const colors = colorPalette[colorScheme === 'dark' ? 'dark' : 'light']

  const [isRecording, setIsRecording] = useState<boolean>(false)
  const [waitingForResponse, setWaitingForResponse] = useState<boolean>(false)
  const [resultModalVisible, setResultModalVisible] = useState<boolean>(false)
  const [aboutModalVisible, setAboutModalVisible] = useState<boolean>(false)

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
        direction={'alternate'}
        duration={3000}
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
      <Pressable
        style={{
          position: 'absolute',
          top: Platform.OS === 'web' ? 8 : 47,
          right: 15,
          padding: 20,
        }}
        hitSlop={10}
        onPress={() => setAboutModalVisible(true)}
      >
        <FontAwesome
          name="question-circle"
          size={32}
          color={colors.secondary}
        />
      </Pressable>

      <AboutModal
        visible={aboutModalVisible}
        setVisible={setAboutModalVisible}
      />

      <ResultModal
        visible={resultModalVisible}
        setVisible={setResultModalVisible}
      />

      <View style={styles.mainContainer}>
        <RecordButton
          isRecording={isRecording}
          setIsRecording={setIsRecording}
          waitingForResponse={waitingForResponse}
          setWaitingForResponse={setWaitingForResponse}
          setResultModalVisible={setResultModalVisible}
        />
        <UploadButton
          isRecording={isRecording}
          waitingForResponse={waitingForResponse}
          setWaitingForResponse={setWaitingForResponse}
          setResultModalVisible={setResultModalVisible}
        />

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
