import { Audio } from 'expo-av'
import { MONO_PRESET } from './customRecordingPresets'
import { Alert } from 'react-native'
import { useState } from 'react'
import useSendRecording from './useSendRecording'

const useRecordSound = (
  setIsRecording: React.Dispatch<React.SetStateAction<boolean>>,
  setWaitingForResponse: React.Dispatch<React.SetStateAction<boolean>>,
  setResultModalVisible: React.Dispatch<React.SetStateAction<boolean>>
) => {
  let recording: Audio.Recording | null = null
  const [recordingState, setRecordingState] = useState<Audio.Recording | null>(
    null
  )

  const { sendRecording } = useSendRecording()

  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)
  let uri: string | null = null

  const startRecording = async () => {
    try {
      console.log('Requesting permissions..')
      await Audio.requestPermissionsAsync()
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      })

      console.log('Starting recording setup..')

      const { recording: newRecording } = await Audio.Recording.createAsync(
        MONO_PRESET
      )
      // setRecording(newRecording)
      setRecordingState(newRecording)
      recording = newRecording
      console.log('Recording setup complete')

      // Automatically stop recording after 5 seconds

      setTimeoutId(
        setTimeout(() => {
          console.log(
            'Recording state in timeout: ',
            recording ? 'jest' : 'nie ma'
          )
          stopRecordingAutomatically(recording)
        }, 5150)
      )

      setIsRecording(true)

      console.log('Starting recording..')
    } catch (error) {
      console.error('Failed to start recording', error)
      setIsRecording(false)
    }
  }

  const stopRecordingAutomatically = async (
    recording: Audio.Recording | null
  ) => {
    try {
      if (!recording) {
        console.log('No recording to stop')
        return
      }

      console.log('Stopping recording automatically...')

      await recording.stopAndUnloadAsync()
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
      })

      console.log('Recording state: ', recording)

      const recordingStatus = await recording.getStatusAsync()
      const recordingDuration = recordingStatus.durationMillis
      console.log('Time of recording: ', recordingDuration)

      uri = recording.getURI()
      console.log('Recording finished and stored at', uri)

      if (uri) {
        // SEND RECORDING TO SERVER
        sendRecording(uri, setWaitingForResponse, setResultModalVisible)

        console.log('Playing back recorded sound..')
        const playbackObject = new Audio.Sound()
        await playbackObject.loadAsync({ uri: uri })
        await playbackObject.playAsync()
        console.log('Playback complete')
      }

      recording = null

      setIsRecording(false)
    } catch (error) {
      console.error('Failed to stop recording', error)
    }
  }

  const abortRecording = async () => {
    try {
      if (!recordingState || recordingState._isDoneRecording) {
        console.log('No recording to stop')
        return
      }

      console.log('Aborting recording...')

      await recordingState.stopAndUnloadAsync()
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
      })

      console.log('Recording state: ', recording)

      const recordingStatus = await recordingState.getStatusAsync()
      const recordingDuration = recordingStatus.durationMillis
      console.log('Recording aborted. Duration: ', recordingDuration)

      setRecordingState(null)

      setIsRecording(false)
    } catch (error) {
      console.error('Failed to abort recording', error)
    }
  }

  const showAlert = () =>
    Alert.alert(
      'Cancel Recording',
      'Are you sure you want to cancel recording?',
      [
        {
          text: 'Cancel',
          onPress: () => {
            clearTimeout(timeoutId as NodeJS.Timeout)
            abortRecording()
          },
          style: 'destructive',
        },
        {
          text: 'Keep recording',
        },
      ],
      {
        cancelable: true,
      }
    )

  return { startRecording, abortRecording, showAlert, getUri: () => uri }
}

export default useRecordSound
