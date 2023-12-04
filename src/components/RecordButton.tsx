import {
  StyleSheet,
  useColorScheme,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native'
import { colorPalette } from '../theme/colors'
import { MaterialIcons } from '@expo/vector-icons'
import * as Animatable from 'react-native-animatable'
import useRecordSound from '../utils/useRecordSound'

type Props = {
  isRecording: boolean
  setIsRecording: React.Dispatch<React.SetStateAction<boolean>>
  waitingForResponse: boolean
  setWaitingForResponse: React.Dispatch<React.SetStateAction<boolean>>
}

const RecordButton = ({
  isRecording,
  setIsRecording,
  waitingForResponse,
  setWaitingForResponse,
}: Props) => {
  const colorScheme = useColorScheme()
  const colors = colorPalette[colorScheme === 'dark' ? 'dark' : 'light']

  const { startRecording, abortRecording, showAlert } = useRecordSound(
    setIsRecording,
    setWaitingForResponse
  )

  const handleRecordPress = () => {
    if (isRecording) {
      if (Platform.OS === 'web') {
        if (confirm('Are you sure you want to cancel recording?')) {
          abortRecording()
        } else null
      } else {
        showAlert()
      }
    } else {
      startRecording()
    }
  }

  return (
    <TouchableOpacity onPress={handleRecordPress} disabled={waitingForResponse}>
      <Animatable.View
        animation={isRecording ? 'bounce' : 'pulse'}
        direction={'alternate'}
        iterationCount={'infinite'}
        duration={isRecording ? 2000 : 3000}
        style={[
          styles.circle,
          styles.iosShadow,
          { backgroundColor: isRecording ? '#e80001' : colors.secondary },
          waitingForResponse ? styles.opacity : null,
        ]}
      >
        <MaterialIcons name="music-note" size={175} color={colors.primary} />
      </Animatable.View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  circle: {
    marginTop: '50%',
    width: 250,
    height: 250,
    borderRadius: 250 / 2,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 50,
  },
  gradient: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Kanit-Regular',
  },
  iosShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 50,
  },
  opacity: {
    opacity: 0.5,
  },
})

export default RecordButton
