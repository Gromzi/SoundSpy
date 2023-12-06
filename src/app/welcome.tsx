import { Text, Pressable, StyleSheet, View } from 'react-native'
import { router, useRouter } from 'expo-router'
import { useAuthStore } from '../auth/store/authStore'
import { IUser } from '../auth/interfaces/auth/IUser'
import { BackgroundGrandient } from '../components/BackgroundGrandient'
import Logo from '../components/Logo'
import { colorPalette } from '../theme/colors'
import * as Animatable from 'react-native-animatable'
import { useState } from 'react'

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
                animation={animationEnded ? 'pulse' : 'fadeIn'}
                iterationCount={!animationEnded ? 1 : 'infinite'}
                duration={animationEnded ? 2000 : 1000}
                delay={animationEnded ? 0 : 3000}
                onAnimationEnd={() => setAnimationEnded(true)}
                style={[styles.text, { fontSize: 24 }]}
              >
                Continue as {user.name}
              </Animatable.Text>
            ) : (
              <Animatable.Text
                animation={animationEnded ? 'pulse' : 'fadeIn'}
                iterationCount={!animationEnded ? 1 : 'infinite'}
                duration={2000}
                delay={animationEnded ? 0 : 3000}
                onAnimationEnd={() => setAnimationEnded(true)}
                style={[styles.text, { fontSize: 24 }]}
              >
                Continue as guest
              </Animatable.Text>
            )}
          </Pressable>

          {!user && (
            <Animatable.View
              animation={animationEnded ? '' : 'fadeIn'}
              iterationCount={!animationEnded ? 1 : 'infinite'}
              duration={2000}
              delay={animationEnded ? 0 : 3000}
              onAnimationEnd={() => setAnimationEnded(true)}
              style={{ marginTop: 50 }}
            >
              <Pressable onPress={() => router.replace('/auth')}>
                <Text style={[styles.text, { fontSize: 18 }]}>
                  Log into account
                </Text>
              </Pressable>
            </Animatable.View>
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
