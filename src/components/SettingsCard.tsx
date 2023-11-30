import {
  View,
  StyleSheet,
  useColorScheme,
  Text,
  TouchableOpacity,
} from 'react-native'
import { colorPalette } from '../theme/colors'
import { Avatar } from 'react-native-paper'
import { MaterialIcons } from '@expo/vector-icons'
import { logout } from '../auth/auth'
import { IUser } from '../auth/interfaces/auth/IUser'
import { useAuthStore } from '../auth/store/authStore'
import React from 'react'
import { Link } from 'expo-router'
import * as Animatable from 'react-native-animatable'
import { useToast } from 'react-native-toast-notifications'

const SettingsCard = () => {
  const user: IUser | null = useAuthStore((state) => state.user)

  const colorScheme = useColorScheme()
  const colors = colorPalette[colorScheme === 'dark' ? 'dark' : 'light']

  const toast = useToast()

  return (
    <Animatable.View
      animation={'fadeInUpBig'}
      duration={500}
      style={[
        styles.card,
        styles.iosShadow,
        { backgroundColor: colors.contrast },
      ]}
    >
      <View style={styles.userInfoContainer}>
        <Avatar.Image
          size={48}
          source={
            user?.picture
              ? { uri: user.picture }
              : require('../../assets/images/avatar.png')
          }
        />
        {user ? (
          <Text style={[styles.text, { color: colors.cardText }]}>
            {user.name}
          </Text>
        ) : (
          <Text style={[styles.text, { color: colors.cardText }]}>Guest</Text>
        )}
      </View>

      <View
        style={[styles.divider, { backgroundColor: colors.cardContrast }]}
      ></View>

      <View style={styles.settingsContainer}>
        <Text
          style={[styles.text, { color: colors.secondary, marginBottom: 30 }]}
        >
          Account Settings
        </Text>

        {user ? (
          <React.Fragment>
            <TouchableOpacity
              style={[styles.buttonContainer, { marginBottom: 20 }]}
            >
              <Text style={[styles.text, { color: colors.cardText }]}>
                Edit account
              </Text>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={32}
                color={colors.cardText}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                logout()
                toast.show('Successfully logged out!', {
                  type: 'success',
                  placement: 'bottom',
                  textStyle: { fontFamily: 'Kanit-Regular' },
                  style: {
                    borderRadius: 16,
                    backgroundColor: colors.primary,
                    marginBottom: 50,
                  },
                  animationType: 'slide-in',
                })
              }}
              hitSlop={10}
              style={[styles.buttonContainer, { marginBottom: 20 }]}
            >
              <Text style={[styles.text, { color: colors.cardText }]}>
                Logout
              </Text>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={32}
                color={colors.cardText}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.buttonContainer, { marginBottom: 30 }]}
            >
              <Text style={[styles.text, { color: colors.error }]}>
                Delete account
              </Text>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={32}
                color={colors.error}
              />
            </TouchableOpacity>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Link
              style={[styles.buttonContainer, { marginBottom: 20 }]}
              href={'/auth'}
              asChild
            >
              <TouchableOpacity hitSlop={10}>
                <Text style={[styles.text, { color: colors.cardText }]}>
                  Login
                </Text>
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={32}
                  color={colors.cardText}
                />
              </TouchableOpacity>
            </Link>
          </React.Fragment>
        )}

        <View
          style={[
            styles.divider,
            { backgroundColor: colors.cardContrast, marginBottom: 30 },
          ]}
        ></View>

        <Text
          style={[styles.text, { color: colors.secondary, marginBottom: 30 }]}
        >
          App configuration
        </Text>

        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={[styles.text, { color: colors.cardText }]}>
            Duration of recording
          </Text>
          <MaterialIcons
            name="keyboard-arrow-down"
            size={32}
            color={colors.cardText}
          />
        </TouchableOpacity>
      </View>
    </Animatable.View>
  )
}

const styles = StyleSheet.create({
  card: {
    marginTop: 20,
    width: 315,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 50,
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
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    width: '100%',

    paddingTop: 25,
    paddingLeft: 17,
    paddingRight: 17,
    paddingBottom: 20,
  },
  settingsContainer: {
    width: '100%',

    paddingTop: 20,
    paddingLeft: 17,
    paddingRight: 17,
    paddingBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },

  divider: {
    width: '100%',
    height: 0.5,
    opacity: 0.5,
  },
})

export default SettingsCard
