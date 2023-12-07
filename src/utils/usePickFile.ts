import * as DocumentPicker from 'expo-document-picker'
import { useColorScheme } from 'react-native'
import { useToast } from 'react-native-toast-notifications'
import { colorPalette } from '../theme/colors'
import useSendRecording from './useSendRecording'

export const usePickFile = () => {
  const colorScheme = useColorScheme()
  const colors = colorPalette[colorScheme === 'dark' ? 'dark' : 'light']

  const toast = useToast()

  const { sendRecording } = useSendRecording()

  const pickFile = async (
    setWaitingForResponse: React.Dispatch<React.SetStateAction<boolean>>,
    setResultModalVisible: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'audio/*',
        copyToCacheDirectory: false,
      })

      if (!result.canceled) {
        if (result.assets.length === 1) {
          // Only one file was selected
          console.log(
            'File URI:',
            result.assets[0].uri,
            'File name:',
            result.assets[0].name
          )
          const audioUri = result.assets[0].uri
          const fileType = result.assets[0].mimeType

          sendRecording(
            audioUri,
            setWaitingForResponse,
            setResultModalVisible,
            fileType
          )
        } else {
          // More than one file was selected, handle this case accordingly
          console.log('Please select only one file')
        }
      } else {
        console.log('Document picking canceled')
        toast.show('Document picking canceled', {
          type: 'danger',
          textStyle: { fontFamily: 'Kanit-Regular' },
          style: {
            borderRadius: 16,
            backgroundColor: colors.error,
            marginBottom: 50,
          },
          placement: 'bottom',
          animationType: 'slide-in',
        })
      }
    } catch (error) {
      console.error('Error picking document:', error)
      toast.show('Error picking document', {
        type: 'danger',
        textStyle: { fontFamily: 'Kanit-Regular' },
        style: {
          borderRadius: 16,
          backgroundColor: colors.error,
          marginBottom: 50,
        },
        placement: 'bottom',
        animationType: 'slide-in',
      })
    }
  }

  return { pickFile }
}
