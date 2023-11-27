import { Stack } from 'expo-router'
import { useColorScheme } from 'react-native'
import { colorPalette } from '../../../theme/colors'

export default () => {
  const colorScheme = useColorScheme()
  const colors = colorPalette[colorScheme === 'dark' ? 'dark' : 'light']

  return (
    <Stack>
      <Stack.Screen name="auth" options={{ headerShown: false }} />
      <Stack.Screen
        name="email"
        options={{
          headerTitle: 'Log in / Register with E-Mail',
          headerTintColor: colors.cardText,
          headerStyle: { backgroundColor: colors.contrast },
        }}
      />
      <Stack.Screen
        name="login"
        initialParams={{ email: '' }}
        options={{
          headerTitle: 'Log in with E-Mail',
          headerTintColor: colors.cardText,
          headerStyle: { backgroundColor: colors.contrast },
        }}
      />
      <Stack.Screen
        name="register"
        initialParams={{ email: '' }}
        options={{
          headerTitle: 'Register with E-Mail',
          headerTintColor: colors.cardText,
          headerStyle: { backgroundColor: colors.contrast },
        }}
      />
    </Stack>
  )
}
