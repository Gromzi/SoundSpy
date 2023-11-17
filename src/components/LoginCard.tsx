import {
  View,
  StyleSheet,
  useColorScheme,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native'
import { colorPalette } from '../theme/colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { login, signInWithGoogle } from '../auth/auth'
import { Link, useRouter } from 'expo-router'
import * as Animatable from 'react-native-animatable'
import { useEffect, useState } from 'react'
import LoginModal from './LoginModal'
import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'
import { IUser } from '../auth/interfaces/IUser'
import { useAuthStore } from '../auth/store/authStore'
import { makeRedirectUri } from 'expo-auth-session'

WebBrowser.maybeCompleteAuthSession()

const LoginCard = () => {
  const colorScheme = useColorScheme()
  const colors = colorPalette[colorScheme === 'dark' ? 'dark' : 'light']

  const user: IUser | null = useAuthStore((state) => state.user)

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      '859237873642-h8phdeqtoqicf2vcr714ofg5bcn6n79f.apps.googleusercontent.com',
    iosClientId: '', // need to use IOS to get iosClientId
    webClientId: '', // need to host web app on https protocol

    redirectUri: makeRedirectUri({
      scheme: 'com.gromzi.SoundSet',
      path: '/settings',
    }),
  })

  const [modalVisible, setModalVisible] = useState(false)

  const router = useRouter()

  // const onLoginPressHandler = () => {
  //   Platform.OS === 'android' && promptAsync()
  //   login()
  //   router.back()
  // }

  useEffect(() => {
    handleSignInWithGoogle()
  }, [response])

  const handleSignInWithGoogle = async () => {
    if (response?.type === 'success') {
      console.log('response type: ', response?.type)
      await signInWithGoogle(response.authentication?.accessToken)
    } else {
      console.log('response type: ', response?.type)
    }
  }

  return (
    <Animatable.View
      animation={'fadeInUpBig'}
      duration={500}
      style={[
        styles.card,
        styles.iosShadow,
        { backgroundColor: colors.contrast },
      ]}
    >
      <LoginModal visible={modalVisible} setVisible={setModalVisible} />

      <View style={styles.headerContainer}>
        <MaterialCommunityIcons
          name="cloud-check"
          size={100}
          color={colors.secondary}
        />
        <Text
          style={[
            styles.text,
            { fontSize: 38, color: colors.cardText, textAlign: 'center' },
          ]}
        >
          Save your data
        </Text>
        <Text
          style={[
            styles.text,
            { fontSize: 18, color: colors.cardText, textAlign: 'center' },
          ]}
        >
          Access your predicted genres from any device
        </Text>
      </View>

      <TouchableOpacity
        disabled={user ? true : false}
        onPress={() => {
          if (Platform.OS === 'android') promptAsync()
          else {
            console.log('Only available on Android')
            return
          }
          // router.replace('/settings')
        }}
        style={[
          styles.button,
          styles.iosShadow,
          { backgroundColor: colors.cardContrast },
        ]}
      >
        <MaterialCommunityIcons
          name="google"
          size={32}
          color={colors.contrast}
        />
        <Text style={[styles.text, { color: colors.contrast }]}>
          Log in with Google
        </Text>
      </TouchableOpacity>

      <View style={{ height: 30 }}></View>

      <Link
        disabled={user ? true : false}
        href={'/login'}
        style={[
          styles.button,
          styles.iosShadow,
          { backgroundColor: colors.secondary },
        ]}
        asChild
      >
        <TouchableOpacity>
          <MaterialCommunityIcons
            name="email"
            size={32}
            color={colors.contrast}
          />
          <Text style={[styles.text, { color: colors.contrast }]}>
            Log in with E-Mail
          </Text>
        </TouchableOpacity>
      </Link>
    </Animatable.View>
  )
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: 520,
    maxWidth: 500,
    maxHeight: '70%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    alignItems: 'center',
    elevation: 50,

    paddingTop: 30,
    paddingLeft: 35,
    paddingRight: 35,
  },
  headerContainer: {
    gap: 10,
    alignItems: 'center',
    marginBottom: 55,
  },
  text: {
    fontSize: 18,
    fontFamily: 'Kanit-Regular',
  },
  iosShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 50,
  },
  button: {
    height: 44,
    width: 270,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingLeft: 16,
    paddingRight: 16,
    elevation: 50,
    borderRadius: 10,
  },
})

export default LoginCard
