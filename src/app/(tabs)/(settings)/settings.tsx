import { View, Text, Pressable, StyleSheet, useColorScheme } from 'react-native'
import React from 'react'
import { useAuthStore } from '../../../auth/store/authStore'
import { IUser } from '../../../auth/interfaces/auth/IUser'
import { colorPalette } from '../../../theme/colors'
import { BackgroundGrandient } from '../../../components/BackgroundGrandient'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import TabLabel from '../../../components/TabLabel'
import SettingsCard from '../../../components/SettingsCard'

export default function SettingsScreen() {
  const user: IUser | null = useAuthStore((state) => state.user)

  const colorScheme = useColorScheme()
  const colors = colorPalette[colorScheme === 'dark' ? 'dark' : 'light']

  return (
    <BackgroundGrandient>
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
          <SettingsCard />
        </View>

        {/* <Link href={"/login"} asChild>
        <Pressable>
          <Text>Log into account</Text>
        </Pressable>
        </Link> */}
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
