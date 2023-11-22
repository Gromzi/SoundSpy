import { Audio } from 'expo-av'
import { MONO_PRESET } from './customRecordingPresets'
import { Alert } from 'react-native'

const useRecordSound = (
  setIsRecording: React.Dispatch<React.SetStateAction<boolean>>
) => {
  let recording: Audio.Recording | null = null
  let uri: string | null = null
  let isAborted: boolean = false
  let timeoutId: NodeJS.Timeout | null = null

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
      recording = newRecording
      console.log('Recording setup complete')

      // Automatically stop recording after 5 seconds
      timeoutId = setTimeout(() => {
        if (!isAborted) {
          stopRecording()
        }
      }, 5150)

      setIsRecording(true)

      console.log('Starting recording..')
    } catch (error) {
      console.error('Failed to start recording', error)
      setIsRecording(false)
    }
  }

  const stopRecording = async () => {
    try {
      if (!recording) {
        console.log('No recording to stop')
        return
      }

      console.log('Stopping recording...')

      await recording.stopAndUnloadAsync()
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
      })

      console.log('Recording state: ', recording)

      const recordingStatus = await recording.getStatusAsync()
      const recordingDuration = recordingStatus.durationMillis

      if (recordingDuration >= 5000) {
        console.log('Time of recording: ', recordingDuration)

        uri = recording.getURI()
        console.log('Recording finished and stored at', uri)
        // SEND RECORDING TO SERVER
      } else {
        console.log('Recording aborted. Duration: ', recordingDuration)
        console.log('Aborted recording state: ', recording)
      }

      recording = null
      setIsRecording(false)
    } catch (error) {
      console.error('Failed to stop recording', error)
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
            clearTimeout(timeoutId!)
            isAborted = true
            stopRecording()
          },
          style: 'destructive',
        },
        {
          text: 'Keep recording',
          onPress: () => (isAborted = false),
        },
      ],
      {
        cancelable: true,
      }
    )

  return { startRecording, stopRecording, showAlert, getUri: () => uri }
}

export default useRecordSound
