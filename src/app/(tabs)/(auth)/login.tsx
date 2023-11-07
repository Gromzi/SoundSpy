import { View, Text, Pressable, StyleSheet, useColorScheme } from 'react-native'
import React from 'react'
import { BackgroundGrandient } from '../../../components/BackgroundGrandient'
import TabLabel from '../../../components/TabLabel'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { colorPalette } from '../../../theme/colors'
import LoginCard from '../../../components/LoginCard'

export default function LoginScreen() {
  const colorScheme = useColorScheme()
  const colors = colorPalette[colorScheme === 'dark' ? 'dark' : 'light']

  return (
    <BackgroundGrandient>
      <View style={styles.mainContainer}>
        <TabLabel
          labelText="Login or Register"
          icon={
            <MaterialCommunityIcons
              name="cloud-check"
              size={48}
              color={colors.secondary}
            />
          }
        />
      </View>
      <LoginCard />
    </BackgroundGrandient>
  )
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Kanit-Medium',
  },
  mainContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
    paddingLeft: 35,
    paddingRight: 35,
    paddingTop: 90,
  },

  contentContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
})
