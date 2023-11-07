import { View, StyleSheet, useColorScheme, Text } from 'react-native'
import { colorPalette } from '../theme/colors'

type ButtonWithIcon = {
  text: string
  color: string
  icon: React.ReactNode
}

const ButtonWithIcon = ({ text, color, icon }: ButtonWithIcon) => {
  const colorScheme = useColorScheme()
  const colors = colorPalette[colorScheme === 'dark' ? 'dark' : 'light']

  return (
    <View style={[styles.mainContainer, { backgroundColor: color }]}>
      {icon}
      <Text style={[styles.text, { color: '#2F3033' }]}>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
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
})

export default ButtonWithIcon
