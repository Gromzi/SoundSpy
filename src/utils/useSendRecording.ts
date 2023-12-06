import { useColorScheme } from 'react-native'
import { colorPalette } from '../theme/colors'
import { useToast } from 'react-native-toast-notifications'
import { useAuthStore } from '../auth/store/authStore'
import { IUser } from '../auth/interfaces/auth/IUser'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { IPredictionResponse } from '../auth/interfaces/prediction/IPredictionResponse'
import { usePredictStore } from '../auth/store/predictStore'
import { IPredictedGenres } from '../auth/interfaces/prediction/IPredictedGenres'

const useSendRecording = () => {
  const colorScheme = useColorScheme()
  const colors = colorPalette[colorScheme === 'dark' ? 'dark' : 'light']

  const user: IUser | null = useAuthStore((state) => state.user)

  const toast = useToast()

  const sendRecording = async (
    audioUri: string,
    setWaitingForResponse: React.Dispatch<React.SetStateAction<boolean>>,
    setResultModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
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
          Accept: 'application/json',
          Authorization: `Bearer ${useAuthStore.getState().token}`,
        },
        body: formData,
      })
      const code = response.status
      const serverResponse = await response.json()
      const predictionData = serverResponse.predict
      const predictionResult: IPredictedGenres = JSON.parse(
        predictionData.result
      )
      console.log('Code: ', code)

      if (code === 200) {
        console.log('Prediction data: ', predictionData)
        console.log('Prediction result: ', predictionData.result)

        // save new prediction to local storage
        AsyncStorage.getItem('history').then((existingData: string | null) => {
          console.log('Existing data: ', existingData)
          const dataArray: IPredictionResponse[] = existingData
            ? JSON.parse(existingData)
            : []

          dataArray.push(predictionData)

          AsyncStorage.setItem('history', JSON.stringify(dataArray)).then(
            () => {
              // set zuustand state
              usePredictStore.getState().setCurrentPrediction(predictionResult)
              console.log(
                'Zustand state: ',
                usePredictStore.getState().currentPrediction
              )
              // show modal with prediction
              setResultModalVisible(true)
            }
          )
        })
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
