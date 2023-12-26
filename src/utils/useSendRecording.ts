import { Platform, useColorScheme } from 'react-native'
import { colorPalette } from '../theme/colors'
import { useToast } from 'react-native-toast-notifications'
import { useAuthStore } from '../auth/store/authStore'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { IPredictionResponse } from '../auth/interfaces/prediction/IPredictionResponse'
import { usePredictStore } from '../auth/store/predictStore'
import { IPredictedGenres } from '../auth/interfaces/prediction/IPredictedGenres'
import * as FileSystem from 'expo-file-system'
import { getBase64Web } from './getBase64Web'

const useSendRecording = () => {
  const colorScheme = useColorScheme()
  const colors = colorPalette[colorScheme === 'dark' ? 'dark' : 'light']

  const toast = useToast()

  const sendRecording = async (
    audioUri: string,
    setWaitingForResponse: React.Dispatch<React.SetStateAction<boolean>>,
    setResultModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
    fileType?: string
  ) => {
    setWaitingForResponse(true)
    try {
      let base64: any

      if (Platform.OS === 'web') {
        base64 = await getBase64Web(audioUri)
      } else {
        base64 = await FileSystem.readAsStringAsync(audioUri, {
          encoding: FileSystem.EncodingType.Base64,
        })
        // console.log('Base64: ', base64)
      }

      const response = await fetch('https://soundset.webitup.pl/api/predict', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${useAuthStore.getState().token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sound:
            Platform.OS === 'android'
              ? `data:${fileType ? fileType : 'audio/m4a'};base64,${base64}`
              : base64,
        }),
      })
      const code = response.status
      const serverResponse = await response.json()
      const predictionData = serverResponse.predict
      const predictionResult: IPredictedGenres = JSON.parse(
        predictionData.result
      )
      // console.log('Code: ', code)

      if (code === 200) {
        // console.log('Prediction data: ', predictionData)
        // console.log('Prediction result: ', predictionData.result)

        // save new prediction to local storage
        AsyncStorage.getItem('history').then((existingData: string | null) => {
          // console.log('Existing data: ', existingData)
          const dataArray: IPredictionResponse[] = existingData
            ? JSON.parse(existingData)
            : []

          dataArray.push(predictionData)

          AsyncStorage.setItem('history', JSON.stringify(dataArray)).then(
            () => {
              // set zuustand state
              usePredictStore.getState().setCurrentPrediction(predictionResult)
              // console.log(
              //   'Zustand state: ',
              //   usePredictStore.getState().currentPrediction
              // )
              // show modal with prediction
              setResultModalVisible(true)
            }
          )
        })
      } else if (code === 413) {
        toast.show('File is too large', {
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
      toast.show('Something went wrong, make sure the file is not too large', {
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
