import { useColorScheme } from 'react-native'
import { colorPalette } from '../theme/colors'
import { useToast } from 'react-native-toast-notifications'

const useSendRecording = () => {
  const colorScheme = useColorScheme()
  const colors = colorPalette[colorScheme === 'dark' ? 'dark' : 'light']

  const toast = useToast()

  const sendRecording = async (
    audioUri: string,
    setWaitingForResponse: React.Dispatch<React.SetStateAction<boolean>>,
    fileName?: string
  ) => {
    setWaitingForResponse(true)
    try {
      let filename: string

      if (!fileName) {
        const extension = audioUri.split('.').pop()
        const timestamp = Date.now()
        filename = `recording_${timestamp}.${extension}`
      } else {
        filename = fileName
      }

      const fileContent = await fetch(audioUri).then((res) => res.blob())

      const formData = new FormData()
      formData.append('sound', fileContent, filename)

      const response = await fetch('https://soundset.webitup.pl/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      })
      const code = await response.status
      console.log('Code: ', code)

      if (code === 200) {
        // save new prediction to local storage
        // show modal with prediction
        console.log('Prediction: ', await response.json())
      }
    } catch (error) {
      toast.show('Something went wrong, try again later', {
        type: 'danger',
        placement: 'bottom',
        textStyle: { fontFamily: 'Kanit-Regular' },
        style: {
          borderRadius: 16,
          backgroundColor: colors.error,
          marginBottom: 50,
        },
        animationType: 'slide-in',
      })
      console.error(error)
    }
    setWaitingForResponse(false)
  }

  return { sendRecording }
}

export default useSendRecording
