import { View, StyleSheet, useColorScheme, Text } from 'react-native'
import { colorPalette } from '../theme/colors'

type TabLabelProps = {
  labelText: string
  icon: React.ReactNode
}

const TabLabel = ({ labelText, icon }: TabLabelProps) => {
  const colorScheme = useColorScheme()
  const colors = colorPalette[colorScheme === 'dark' ? 'dark' : 'light']

  return (
    <View style={[styles.mainContainer]}>
      {icon}
      <Text style={[styles.text, { color: colors.secondary }]}>
        {labelText}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: 50,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  text: {
    fontSize: 24,
    fontFamily: 'Kanit-Regular',
  },
})

export default TabLabel
