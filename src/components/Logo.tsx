import { View, Text, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { colorPalette } from '../theme/colors'
import * as Animatable from 'react-native-animatable'
import { useState } from 'react'

const Logo = () => {
  const [animationEnded, setAnimationEnded] = useState(false)

  return (
    <Animatable.View
      animation={!animationEnded ? 'fadeInDownBig' : 'bounce'}
      direction={!animationEnded ? 'normal' : 'alternate'}
      iterationCount={!animationEnded ? 1 : 'infinite'}
      onAnimationEnd={() => setAnimationEnded(true)}
      duration={!animationEnded ? 5000 : 8000}
      style={styles.circle}
    >
      <LinearGradient
        colors={[colorPalette.dark.secondary, colorPalette.dark.primary]}
        start={{ x: 0.5, y: 1 }}
        end={{ x: 0.5, y: 0 }}
        style={styles.gradient}
      >
        <Text style={[styles.text, { color: colorPalette.dark.text }]}>
          SoundSet
        </Text>
      </LinearGradient>
    </Animatable.View>
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
  },
  gradient: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 30,
    fontFamily: 'Kanit-Regular',
  },
})

export default Logo
