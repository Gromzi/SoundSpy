import { View, Text, useColorScheme, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { colorPalette } from '../../../theme/colors';
import { Avatar, Button, TextInput } from 'react-native-paper';
import { Controller, useForm } from 'react-hook-form';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Loader from '../../../components/Loader';
import * as Animatable from 'react-native-animatable';
import { login } from '../../../auth/auth';
import { useToast } from 'react-native-toast-notifications';

type FormData = {
  email: string;
  password: string;
};

type LoginData = {
  name: string;
  picture: string;
};

export default function LoginScreen() {
  const colorScheme = useColorScheme();
  const colors = colorPalette[colorScheme === 'dark' ? 'dark' : 'light'];

  const router = useRouter();
  const toast = useToast();

  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState<LoginData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isWrongPassword, setIsWrongPassword] = useState(false);

  const params = useLocalSearchParams();
  const { email } = params;

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormData>({
    defaultValues: {
      email: email?.toString(),
      password: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    console.log(data);
    setIsLoading(true);
    try {
      const response = await fetch(
        'https://soundset.webitup.pl/api/auth/login',
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
      );
      const code = await response.status;
      const json = await response.json();
      console.log('Code: ', code);

      if (code == 401) {
        setIsWrongPassword(true);
        toast.show('Wrong password!', {
          type: 'danger',
          placement: 'bottom',
          textStyle: { fontFamily: 'Kanit-Regular' },
          style: {
            borderRadius: 16,
            backgroundColor: colors.error,
            marginBottom: 50,
          },
          animationType: 'slide-in',
        });
      }

      if (code == 200) {
        setIsWrongPassword(false);
        await login(json);
        router.back();
        router.back();
        router.back();
        toast.show('Successfully logged in!', {
          type: 'success',
          duration: 2000,
          placement: 'bottom',
          textStyle: { fontFamily: 'Kanit-Regular' },
          style: {
            borderRadius: 16,
            backgroundColor: colors.primary,
            marginBottom: 50,
          },
          animationType: 'slide-in',
        });
      }
    } catch (error) {
      toast.show('Something went wrong. Try again later', {
        type: 'danger',
        placement: 'bottom',
        textStyle: { fontFamily: 'Kanit-Regular' },
        style: {
          borderRadius: 16,
          backgroundColor: colors.error,
          marginBottom: 50,
        },
        animationType: 'slide-in',
      });
      console.error(error);
    }
    setIsLoading(false);
  };

  const getLoginData = async (data: FormData) => {
    try {
      const response = await fetch(
        `https://soundset.webitup.pl/api/auth/logindata?email=${encodeURIComponent(
          data.email
        )}`,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );
      const json = await response.json();
      setLoginData(json);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getLoginData(getValues());
  }, []);

  return (
    <View style={{ width: '100%', flex: 1, backgroundColor: colors.contrast }}>
      {loginData && (
        <Animatable.View
          style={[styles.mainContainer, { backgroundColor: colors.contrast }]}
          animation={'fadeInUpBig'}
        >
          {loginData?.picture ? (
            <Avatar.Image source={{ uri: loginData?.picture }} size={120} />
          ) : (
            <Avatar.Icon size={120} icon="account" />
          )}

          <View
            style={{ width: '100%', alignItems: 'center', marginBottom: 40 }}
          >
            <Text
              style={[{ color: colors.secondary, fontSize: 35 }, styles.text]}
            >
              Welcome back
            </Text>
            <Text
              style={[
                { color: colors.secondary, fontSize: 45, marginBottom: 10 },
                styles.text,
              ]}
            >
              {loginData.name}
            </Text>
            <Text
              style={[
                {
                  color: colors.secondary,
                  fontSize: 15,
                  marginStart: 0,
                },
                styles.text,
              ]}
            >
              Nice to see you! :)
            </Text>
          </View>

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
                style={{ width: '100%', maxWidth: 400, display: 'none' }}
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
                error={errors.password || isWrongPassword ? true : false}
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
                onSubmitEditing={handleSubmit(onSubmit)}
                autoFocus
                value={value}
              />
            )}
            name="password"
          />
          {errors.password && (
            <Text style={[styles.errorText]}>{errors.password.message}</Text>
          )}
          {isWrongPassword && (
            <Text style={[styles.errorText, { marginTop: 0 }]}>
              Wrong password
            </Text>
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
            Sign in
          </Button>
        </Animatable.View>
      )}

      {(isLoading || !loginData) && (
        <Loader color={colors.secondary} size={'large'} centered={true} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    paddingLeft: 35,
    paddingRight: 35,
    paddingTop: 20,
    gap: 5,
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
});
