import {
  View,
  StyleSheet,
  useColorScheme,
  Text,
  TouchableOpacity,
  Pressable,
} from 'react-native'
import { colorPalette } from '../theme/colors'
import { Avatar } from 'react-native-paper'
import { MaterialIcons } from '@expo/vector-icons'
import { logout } from '../auth/auth'
import { IUser } from '../auth/interfaces/auth/IUser'
import { useAuthStore } from '../auth/store/authStore'
import React from 'react'
import { Link, router } from 'expo-router'
import * as Animatable from 'react-native-animatable'
import { useToast } from 'react-native-toast-notifications'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { usePredictStore } from '../auth/store/predictStore'

type Props = {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const SettingsCard = ({ setIsLoading }: Props) => {
  const user: IUser | null = useAuthStore((state) => state.user)

  const colorScheme = useColorScheme()
  const colors = colorPalette[colorScheme === 'dark' ? 'dark' : 'light']

  const toast = useToast()

  const handleDeleteHistory = async () => {
    if ((await AsyncStorage.getItem('history')) === null) {
      toast.show('History is already empty!', {
        type: 'info',
        duration: 2000,
        placement: 'bottom',
        textStyle: { fontFamily: 'Kanit-Regular' },
        style: {
          borderRadius: 16,
          backgroundColor: colors.primary,
          marginBottom: 50,
          
        },
        animationType: 'slide-in',
      })
      return
    }

    if (user) {
      setIsLoading(true)
      const response = await fetch(
        'https://soundset.webitup.pl/api/predict/history',
        {
          method: 'DELETE',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${useAuthStore.getState().token}`,
          },
        }
      )
      const code = response.status
      console.log('Delete response code: ', code)

      if (code === 200) {
        toast.show('Successfully deleted history!', {
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
      } else {
        toast.show('Something went wrong. Try again later', {
          type: 'error',
          placement: 'bottom',
          textStyle: { fontFamily: 'Kanit-Regular' },
          style: {
            borderRadius: 16,
            backgroundColor: colors.error,
            marginBottom: 50,
          },
          animationType: 'slide-in',
        })
        setIsLoading(false)
        return
      }

      await AsyncStorage.removeItem('history')
      usePredictStore
        .getState()
        .setRefreshAfterDelete(
          usePredictStore.getState().refreshAfterDelete + 1
        )
      setIsLoading(false)
    } else {
      await AsyncStorage.removeItem('history')
      usePredictStore
        .getState()
        .setRefreshAfterDelete(
          usePredictStore.getState().refreshAfterDelete + 1
        )

      toast.show('Successfully deleted history!', {
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
    }
  }

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
      <Pressable
        disabled={!user}
        onPress={() => router.push('/edit')}
        style={[styles.userInfoContainer]}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
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
      </Pressable>

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
            <Link
              style={[styles.buttonContainer, { marginBottom: 20 }]}
              href={'/edit'}
              asChild
            >
              <TouchableOpacity>
                <Text style={[styles.text, { color: colors.cardText }]}>
                  Edit account
                </Text>
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={32}
                  color={colors.cardText}
                />
              </TouchableOpacity>
            </Link>
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
              onPress={handleDeleteHistory}
              style={[styles.buttonContainer, { marginBottom: 30 }]}
            >
              <Text style={[styles.text, { color: colors.error }]}>
                Delete history
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
            <TouchableOpacity
              onPress={handleDeleteHistory}
              style={[styles.buttonContainer, { marginBottom: 30 }]}
            >
              <Text style={[styles.text, { color: colors.error }]}>
                Delete history
              </Text>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={32}
                color={colors.error}
              />
            </TouchableOpacity>
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
