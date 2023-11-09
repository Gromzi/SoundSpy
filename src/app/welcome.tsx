import { Text, Pressable, StyleSheet, View } from 'react-native'
import { SplashScreen, useRouter } from 'expo-router'
import { useAuthStore } from '../auth/store/authStore'
import { IUser } from '../auth/interfaces/IUser'
import { login } from '../auth/auth'
import { BackgroundGrandient } from '../components/BackgroundGrandient'
import Logo from '../components/Logo'
import { colorPalette } from '../theme/colors'
import { useState } from 'react'
import * as Animatable from 'react-native-animatable'

export default function WelcomeScreen() {
  const user: IUser | null = useAuthStore((state) => state.user)

  const [animationEnded, setAnimationEnded] = useState(false)

  const handleContinueClick = () => {
    const router = useRouter()
    router.replace('/home')
  }

  return (
    <BackgroundGrandient>
      <View style={styles.mainContainer}>
        <Logo />
        <View style={styles.inputContainer}>
          <Pressable android_ripple={{}} onPress={handleContinueClick}>
            {user ? (
              <Animatable.Text
                animation={'pulse'}
                iterationCount={'infinite'}
                duration={2000}
                style={[styles.text, { fontSize: 24 }]}
              >
                Continue as {user.username}
              </Animatable.Text>
            ) : (
              <Animatable.Text
                animation={'pulse'}
                iterationCount={'infinite'}
                duration={2000}
                style={[styles.text, { fontSize: 24 }]}
              >
                Continue as guest
              </Animatable.Text>
            )}
          </Pressable>

          {!user && (
            <Pressable onPress={login}>
              <Text style={[styles.text, { fontSize: 18, marginTop: 50 }]}>
                Log into account
              </Text>
            </Pressable>
          )}
        </View>
      </View>
    </BackgroundGrandient>
  )
}

const styles = StyleSheet.create({
  text: {
    color: colorPalette.dark.text,
    fontFamily: 'Kanit-Medium',
  },
  inputContainer: {
    marginTop: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
  },
})
