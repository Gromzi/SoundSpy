import { Stack } from 'expo-router'
import { useColorScheme } from 'react-native'
import { colorPalette } from '../../../theme/colors'

export default () => {
  const colorScheme = useColorScheme()
  const colors = colorPalette[colorScheme === 'dark' ? 'dark' : 'light']

  return (
    <Stack>
      <Stack.Screen name="settings" options={{ headerShown: false }} />
      <Stack.Screen
        name="edit"
        options={{
          headerTitle: 'Edit your info',
          headerTintColor: colors.cardText,
          headerStyle: { backgroundColor: colors.contrast },
        }}
      />
    </Stack>
  )
}
