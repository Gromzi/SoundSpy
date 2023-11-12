import {
  View,
  Text,
  useColorScheme,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import React, { useState } from 'react'
import { colorPalette } from '../../../theme/colors'
import { Button, TextInput } from 'react-native-paper'
import { Controller, useForm } from 'react-hook-form'

type FormData = {
  email: string
  password: string
}

export default function LoginScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const onSubmit = (data: FormData) => console.log(data)

  const colorScheme = useColorScheme()
  const colors = colorPalette[colorScheme === 'dark' ? 'dark' : 'light']

  const [showPassword, setShowPassword] = useState(false)

  return (
    <View style={[styles.mainContainer, { backgroundColor: colors.contrast }]}>
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
            left={<TextInput.Icon icon={'email'} color={colors.cardContrast} />}
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
            style={{ width: '100%', maxWidth: 400 }}
            error={errors.password ? true : false}
            left={<TextInput.Icon icon={'lock'} color={colors.cardContrast} />}
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
        style={{ width: '100%', maxWidth: 400, borderRadius: 4, marginTop: 20 }}
      >
        Sign in
      </Button>
    </View>
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
