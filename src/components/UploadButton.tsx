import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  TouchableOpacity,
} from 'react-native'
import { colorPalette } from '../theme/colors'
import { MaterialIcons } from '@expo/vector-icons'
import * as Animatable from 'react-native-animatable'

const UploadButton = () => {
  const colorScheme = useColorScheme()
  const colors = colorPalette[colorScheme === 'dark' ? 'dark' : 'light']

  return (
    <TouchableOpacity>
      <Animatable.View
        animation={'fadeInUpBig'}
        duration={1500}
        style={[
          styles.circle,
          styles.iosShadow,
          { backgroundColor: colors.secondary },
        ]}
      >
        <MaterialIcons name="file-upload" size={30} color={colors.primary} />
      </Animatable.View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  circle: {
    marginTop: 50,
    width: 110,
    height: 40,
    borderRadius: 20,
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

export default UploadButton
