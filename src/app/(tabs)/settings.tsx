import { View, Text, Pressable, StyleSheet, useColorScheme } from 'react-native'
import React from 'react'
import { useAuthStore } from '../../auth/store/authStore'
import { login, logout } from '../../auth/auth'
import { IUser } from '../../auth/interfaces/IUser'
import { colorPalette } from '../../theme/colors'
import { BackgroundGrandient } from '../../components/BackgroundGrandient'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import TabLabel from '../../components/TabLabel'

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
        <View style={styles.inputContainer}>
          <Text style={{ marginBottom: 50, marginTop: 200 }}>
            Settings Screen
          </Text>

          {user ? (
            <>
              <Text style={{ marginBottom: 20 }}>
                Logged in as {user.username}
              </Text>
              <Pressable onPress={logout}>
                <Text>Logout</Text>
              </Pressable>
            </>
          ) : (
            <>
              <Text style={{ marginBottom: 20 }}>Not logged in</Text>
              <Pressable onPress={login}>
                <Text>Log into account</Text>
              </Pressable>
            </>
          )}
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
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContainer: {
    flex: 1,
    width: '100%',
    paddingLeft: 35,
    paddingRight: 35,
    paddingTop: 90,
    paddingBottom: 20,
  },
})
