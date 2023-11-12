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
        name="login"
        options={{
          headerTitle: 'Log in with email',
          headerTintColor: colors.cardText,
          headerStyle: { backgroundColor: colors.contrast },
        }}
      />
    </Stack>
  )
}
