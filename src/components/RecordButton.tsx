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

type Props = {
  recording: boolean
  setRecording: React.Dispatch<React.SetStateAction<boolean>>

  waitingForResponse: boolean
}

const RecordButton = ({
  recording,
  setRecording,
  waitingForResponse,
}: Props) => {
  const colorScheme = useColorScheme()
  const colors = colorPalette[colorScheme === 'dark' ? 'dark' : 'light']

  const showAlert = () =>
    Alert.alert(
      'Cancel Recording',
      'Are you sure you want to cancel recording?',
      [
        {
          text: 'Cancel',
          onPress: () => setRecording(false),
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

  const handleRecordPress = () => {
    if (recording) {
      if (Platform.OS === 'web') {
        if (confirm('Are you sure you want to cancel recording?')) {
          setRecording(false)
        } else null
      } else showAlert()
    } else setRecording(true)
  }

  let recordButton: React.ReactNode = null

  if (recording) {
    recordButton = (
      <Animatable.View
        animation={'bounce'}
        direction={'alternate'}
        iterationCount={'infinite'}
        duration={2000}
        style={[
          styles.circle,
          styles.iosShadow,
          { backgroundColor: colors.error },
        ]}
      >
        <MaterialIcons name="music-note" size={175} color={colors.primary} />
      </Animatable.View>
    )
  } else if (!recording) {
    recordButton = (
      <Animatable.View
        animation={'pulse'}
        iterationCount={'infinite'}
        duration={3000}
        style={[
          styles.circle,
          styles.iosShadow,
          { backgroundColor: colors.secondary },
        ]}
      >
        <MaterialIcons name="music-note" size={175} color={colors.primary} />
      </Animatable.View>
    )
  }

  return (
    <TouchableOpacity onPress={handleRecordPress} disabled={waitingForResponse}>
      {recordButton}
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
})

export default RecordButton
