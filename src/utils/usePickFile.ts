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
        copyToCacheDirectory: true,
      })

      if (!result.canceled) {
        if (result.assets.length === 1) {
          // Only one file was selected
          // console.log(
          //   'File URI:',
          //   result.assets[0].uri,
          //   'File name:',
          //   result.assets[0].name
          // )
          const fileSize = result.assets[0].size
          console.log('File size: ', fileSize)
          if(fileSize) {
            // if file size is bigger than 2.15MB, abort
            if(fileSize > 2250000) {
              toast.show('File too big! Pick a less-than-2MB file.', {
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
              return
            }
          }

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
          // console.log('Please select only one file')
          toast.show('Please select only one file', {
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
      } else {
        // console.log('Document picking canceled')
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
      // console.error('Error picking document:', error)
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
