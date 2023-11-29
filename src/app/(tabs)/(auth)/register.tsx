import { View, Text, useColorScheme, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { colorPalette } from '../../../theme/colors'
import { Button, TextInput } from 'react-native-paper'
import { Controller, set, useForm } from 'react-hook-form'
import { router, useLocalSearchParams } from 'expo-router'
import Loader from '../../../components/Loader'
import * as Animatable from 'react-native-animatable'
import { login } from '../../../auth/auth'

type FormData = {
  email: string
  password: string
}

export default function RegisterScreen() {
  const colorScheme = useColorScheme()
  const colors = colorPalette[colorScheme === 'dark' ? 'dark' : 'light']

  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const params = useLocalSearchParams()
  const { email } = params

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: email?.toString(),
      password: '',
    },
  })
  const onSubmit = async (data: FormData) => {
    console.log(data)
    setIsLoading(true)
    try {
      const response = await fetch(
        'https://soundset.webitup.pl/api/auth/register',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: data.email,
            password: data.password,
          }),
        }
      )
      const code = await response.status
      const json = await response.json()
      console.log('Code: ', code)

      if (code == 401) {
        //cos
      }

      if (code == 200) {
        await login(json)
        router.replace('/settings')
      }
    } catch (error) {
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
              editable={false}
              style={{ width: '100%', maxWidth: 400 }}
              error={errors.email ? true : false}
              left={
                <TextInput.Icon
                  icon={'email'}
                  color={colors.disabledCardContrast}
                />
              }
              textColor={colors.disabledCardText}
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

        <Animatable.View
          style={{ width: '100%', maxWidth: 400 }}
          animation={'fadeInUpBig'}
          delay={500}
        >
          <Controller
            control={control}
            rules={{
              required: {
                value: true,
                message: 'Password is required',
              },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                message:
                  'Password must be at least 8 characters long, one uppercase letter, one lowercase letter, one number and one special character',
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Password"
                mode="outlined"
                error={errors.password ? true : false}
                left={
                  <TextInput.Icon icon={'lock'} color={colors.cardContrast} />
                }
                right={
                  <TextInput.Icon
                    onPress={() => setShowPassword(!showPassword)}
                    icon={showPassword ? 'eye-off' : 'eye'}
                    color={colors.cardText}
                  />
                }
                secureTextEntry={!showPassword}
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
            name="password"
          />
          {errors.password && (
            <Text style={[styles.errorText]}>{errors.password.message}</Text>
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
            Register
          </Button>

          <Text
            style={[
              styles.text,
              {
                marginTop: 30,
                color: colors.secondary,
                fontSize: 18,
                textAlign: 'center',
              },
            ]}
          >
            There's no user with this email. You can register by setting your
            password here!
          </Text>
        </Animatable.View>
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
