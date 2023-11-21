import { Audio } from 'expo-av'
import { MONO_PRESET } from './customRecordingPresets'

const useRecordSound = (
  setIsRecording: React.Dispatch<React.SetStateAction<boolean>>
) => {
  let recordingVar: Audio.Recording | null = null
  let uri: string | null = null

  const startRecording = async () => {
    try {
      console.log('Requesting permissions..')
      await Audio.requestPermissionsAsync()
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      })

      console.log('Starting recording..')

      const { recording } = await Audio.Recording.createAsync(MONO_PRESET)
      recordingVar = recording
      console.log('Recording started')
      setIsRecording(true)

      // Automatically stop recording after 5 seconds
      setTimeout(() => {
        stopRecording()
      }, 5150)
    } catch (error) {
      console.error('Failed to start recording', error)
    }
  }

  const stopRecording = async () => {
    try {
      if (recordingVar) {
        console.log('Stopping recording...')

        setIsRecording(false)
        await recordingVar.stopAndUnloadAsync()
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
        })

        console.log('Recording state: ', recordingVar)

        const recordingDuration = await recordingVar
          .getStatusAsync()
          .then((result) => result.durationMillis)

        if (recordingDuration >= 5000) {
          console.log('Time of recording: ', recordingDuration)

          uri = recordingVar.getURI()
          console.log('Recording finished and stored at', uri)
          // SEND RECORDING TO SERVER
        } else {
          console.log('Recording aborted. Duration: ', recordingDuration)
          console.log('Aborted recording state: ', recordingVar)
        }

        recordingVar = null
      } else console.log('No recording to stop')
    } catch (error) {
      console.error('Failed to stop recording', error)
    }
  }

  return { startRecording, stopRecording, uri }
}

export default useRecordSound
