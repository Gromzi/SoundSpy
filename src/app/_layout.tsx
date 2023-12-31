import { SplashScreen, Stack } from 'expo-router'
import { AppAuthInitializer } from '../utils/AppAuthInitializer'
import { useFonts } from 'expo-font'
import { useEffect, useMemo } from 'react'
import {
  ThemeProvider,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native'
import { Platform, useColorScheme } from 'react-native'
import * as NavigationBar from 'expo-navigation-bar'
import { colorPalette } from '../theme/colors'
import { ToastProvider } from 'react-native-toast-notifications'
import Loader from '../components/Loader'
import * as WebBrowser from 'expo-web-browser'

SplashScreen.preventAutoHideAsync()

if (Platform.OS === 'web') {
  WebBrowser.maybeCompleteAuthSession()
}

export default () => {
  const colorScheme = useColorScheme()
  const colors = colorPalette[colorScheme === 'dark' ? 'dark' : 'light']

  if (colorScheme === 'dark') {
    NavigationBar.setBackgroundColorAsync(colorPalette.dark.contrast)
    NavigationBar.setButtonStyleAsync('light')
  } else {
    NavigationBar.setBackgroundColorAsync(colorPalette.light.contrast)
    NavigationBar.setButtonStyleAsync('dark')
  }

  const isWeb = useMemo(() => Platform.OS === 'web', [])
  useEffect(() => {
    if (isWeb)
      document.body.style.cssText = `height: ${window.innerHeight * 0.01}px;`
  }, [])

  const [fontsLoaded, fontError] = useFonts({
    'Kanit-Regular': require('../../assets/fonts/Kanit-Regular.ttf'),
    'Kanit-Bold': require('../../assets/fonts/Kanit-Bold.ttf'),
    'Kanit-Medium': require('../../assets/fonts/Kanit-Medium.ttf'),
  })

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded, fontError])

  if (!fontsLoaded || fontError) return null

  return (
    <ToastProvider>
      {!fontsLoaded && (
        <Loader color={colors.secondary} size={'large'} centered={true} />
      )}
      <AppAuthInitializer>
        <ThemeProvider
          value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
        >
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </ThemeProvider>
      </AppAuthInitializer>
    </ToastProvider>
  )
}
