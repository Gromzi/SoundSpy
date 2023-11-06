import { SplashScreen, Stack } from 'expo-router'
import { AppAuthInitializer } from '../utils/AppAuthInitializer'
import { useFonts } from 'expo-font'
import { useEffect } from 'react'
import {
  ThemeProvider,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native'
import { useColorScheme } from 'react-native'
import * as NavigationBar from 'expo-navigation-bar'
import { colorPalette } from '../theme/colors'

SplashScreen.preventAutoHideAsync()

export default () => {
  const colorScheme = useColorScheme()

  if (colorScheme === 'dark') {
    NavigationBar.setBackgroundColorAsync(colorPalette.dark.contrast)
    NavigationBar.setButtonStyleAsync('light')
  } else {
    NavigationBar.setBackgroundColorAsync(colorPalette.light.contrast)
    NavigationBar.setButtonStyleAsync('dark')
  }

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
    <AppAuthInitializer>
      <ThemeProvider
        value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
      >
        <Stack>
          <Stack.Screen
            name="index"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="(tabs)"
            options={{ headerShown: false }}
          />
        </Stack>
      </ThemeProvider>
    </AppAuthInitializer>
  )
}
