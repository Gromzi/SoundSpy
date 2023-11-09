import { View, StyleSheet, useColorScheme, Pressable } from 'react-native'
import { colorPalette } from '../theme/colors'
import { MaterialIcons } from '@expo/vector-icons'
import * as Animatable from 'react-native-animatable'
import { useState } from 'react'

const RecordButton = () => {
  const colorScheme = useColorScheme()
  const colors = colorPalette[colorScheme === 'dark' ? 'dark' : 'light']

  return (
    <Pressable>
      <Animatable.View
        animation={'pulse'}
        iterationCount={'infinite'}
        duration={3000}
        style={[
          styles.circle,
          styles.iosShadow,
          { backgroundColor: colors.secondary },
        ]}
      >
        <MaterialIcons name="music-note" size={175} color={colors.primary} />
      </Animatable.View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  circle: {
    marginTop: '50%',
    width: 250,
    height: 250,
    borderRadius: 250 / 2,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 50,
  },
  gradient: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Kanit-Regular',
  },
  iosShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 50,
  },
})

export default RecordButton
