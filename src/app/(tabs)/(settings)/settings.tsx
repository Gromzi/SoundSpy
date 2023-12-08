import { View, StyleSheet, useColorScheme } from 'react-native'
import React, { useState } from 'react'
import { colorPalette } from '../../../theme/colors'
import { BackgroundGrandient } from '../../../components/BackgroundGrandient'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import TabLabel from '../../../components/TabLabel'
import SettingsCard from '../../../components/SettingsCard'
import Loader from '../../../components/Loader'

export default function SettingsScreen() {
  const [isLoading, setIsLoading] = useState(false)

  const colorScheme = useColorScheme()
  const colors = colorPalette[colorScheme === 'dark' ? 'dark' : 'light']

  return (
    <BackgroundGrandient>
      {isLoading && (
        <Loader color={colors.secondary} size={'large'} centered={true} />
      )}
      <View style={styles.mainContainer}>
        <TabLabel
          labelText="Settings"
          icon={
            <MaterialCommunityIcons
              name="cog"
              size={48}
              color={colors.secondary}
            />
          }
        />
        <View style={styles.contentContainer}>
          <SettingsCard setIsLoading={setIsLoading} />
        </View>
      </View>
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
    paddingLeft: 35,
    paddingRight: 35,
    paddingTop: 90,
    paddingBottom: 20,
  },

  contentContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
})
