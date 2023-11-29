import { View, Text, useColorScheme, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { colorPalette } from '../../../theme/colors'
import { Button, TextInput } from 'react-native-paper'
import { Controller, useForm } from 'react-hook-form'
import { router } from 'expo-router'
import Loader from '../../../components/Loader'
import { useToast } from 'react-native-toast-notifications'

type FormData = {
  email: string
}

export default function EmailScreen() {
  const colorScheme = useColorScheme()
  const colors = colorPalette[colorScheme === 'dark' ? 'dark' : 'light']

  const [isLoading, setIsLoading] = useState(false)

  const toast = useToast()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: '',
    },
  })
  const onSubmit = async (data: FormData) => {
    console.log(data)
    setIsLoading(true)
    try {
      const response = await fetch(
        `https://soundset.webitup.pl/api/auth/exist?email=${encodeURIComponent(
          data.email
        )}`,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      )
      const json = await response.json()
      const exist = json.exist

      if (exist) {
        router.push({
          pathname: '/login',
          params: {
            email: data.email,
          },
        })
      } else {
        router.push({
          pathname: '/register',
          params: {
            email: data.email,
          },
        })
      }
    } catch (error) {
      toast.show('Something went wrong, try again later', {
        type: 'danger',
        placement: 'bottom',
        animationType: 'slide-in',
      })
      console.error(error)
    }
    setIsLoading(false)
  }

  return (
    <>
      <View
        style={[styles.mainContainer, { backgroundColor: colors.contrast }]}
      >
        <Controller
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Email is required',
            },
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Entered value does not match email format',
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="E-Mail"
              mode="outlined"
              style={{ width: '100%', maxWidth: 400 }}
              error={errors.email ? true : false}
              left={
                <TextInput.Icon icon={'email'} color={colors.cardContrast} />
              }
              textColor={colors.cardText}
              theme={{
                colors: {
                  primary: colors.secondary,
                  background: colors.contrast,
                },
              }}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="email"
        />
        {errors.email && (
          <Text style={styles.errorText}>{errors.email.message}</Text>
        )}

        <Button
          icon="login"
          mode="outlined"
          onPress={handleSubmit(onSubmit)}
          buttonColor={colors.secondary}
          textColor={colors.contrast}
          style={{
            width: '100%',
            maxWidth: 400,
            borderRadius: 4,
            marginTop: 20,
          }}
        >
          Log in / Register
        </Button>
      </View>

      {isLoading && (
        <Loader color={colors.secondary} size={'large'} centered={true} />
      )}
    </>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    paddingLeft: 35,
    paddingRight: 35,
    paddingTop: 40,
    gap: 20,
  },

  text: {
    fontFamily: 'Kanit-Regular',
  },

  errorText: {
    marginTop: -10,
    marginLeft: 5,
    color: '#D43232',
    width: '100%',
    maxWidth: 400,
  },
})
