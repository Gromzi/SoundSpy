import { LinearGradient } from 'expo-linear-gradient'
import { colorPalette } from '../theme/colors'
import { useColorScheme } from 'react-native'

type BackgroundGrandientProps = {
  children: React.ReactNode
}

const BackgroundGrandient = ({ children }: BackgroundGrandientProps) => {
  const colorScheme = useColorScheme()
  const colors = colorPalette[colorScheme === 'dark' ? 'dark' : 'light']

  return (
    <>
      <LinearGradient
        colors={[colors.primary, colors.secondary]}
        start={{ x: 0.5, y: 0.5 }}
        end={{ x: 0.5, y: 1 }}
        style={{
          flex: 1,
          alignItems: 'center',
        }}
      >
        {children}
      </LinearGradient>
    </>
  )
}

export { BackgroundGrandient }
