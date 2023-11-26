import { View, Text, useColorScheme, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { colorPalette } from "../../../theme/colors";
import { Avatar, Button, TextInput } from "react-native-paper";
import { Controller, useForm } from "react-hook-form";
import { login } from "../../../auth/auth";
import { router, useLocalSearchParams } from "expo-router";
import Loader from "../../../components/Loader";

type FormData = {
  email: string;
  password: string;
};

type LoginData = {
  name: string;
  picture: string;
};

export default function LoginScreen() {
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
      password: "",
    },
  });

  const [loginData, setLoginData] = useState<LoginData | null>(null);

  const onSubmit = async (data: FormData) => {
    console.log(data);

    try {
      const response = await fetch("https://soundspy.test/api/auth/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });
      const code = await response.status;
      const json = await response.json();
      console.log(code, json);

      if (code == 401) {
        //cos
      }

      if (code == 200) {
        //cos
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getLoginData = async (data: FormData) => {
    try {
      const response = await fetch(
        `https://soundspy.test/api/auth/logindata?email=${encodeURIComponent(
          data.email
        )}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
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

  const colorScheme = useColorScheme();
  const colors = colorPalette[colorScheme === "dark" ? "dark" : "light"];

  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={[styles.mainContainer, { backgroundColor: colors.contrast }]}>
      {loginData ? (
        <>
          {loginData?.picture ? (
            <Avatar.Image source={{ uri: loginData?.picture }} size={120} />
          ) : (
            <Avatar.Icon size={120} icon="account" />
          )}

          <View style={{ width: "100%", alignItems: "center" }}>
            <Text
              style={{ color: colors.secondary, fontSize: 35, marginEnd: 0 }}
            >
              Welcome back
            </Text>
            <Text
              style={{ color: colors.secondary, fontSize: 45, marginEnd: 0 }}
            >
              {loginData?.name}
            </Text>
            <Text
              style={{ color: colors.secondary, fontSize: 15, marginStart: 0 }}
            >
              Nice to see you
            </Text>
          </View>

          <Controller
            control={control}
            rules={{
              required: {
                value: true,
                message: "Email is required",
              },
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Entered value does not match email format",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="E-Mail"
                mode="outlined"
                editable={false}
                style={{ width: "100%", maxWidth: 400, display: "none" }}
                error={errors.email ? true : false}
                left={
                  <TextInput.Icon
                    icon={"email"}
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
                message: "Password is required",
              },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                message:
                  "Password must be at least 8 characters long, one uppercase letter, one lowercase letter, one number and one special character",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Password"
                mode="outlined"
                style={{ width: "100%", maxWidth: 400 }}
                error={errors.password ? true : false}
                left={
                  <TextInput.Icon icon={"lock"} color={colors.cardContrast} />
                }
                right={
                  <TextInput.Icon
                    onPress={() => setShowPassword(!showPassword)}
                    icon={showPassword ? "eye-off" : "eye"}
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
              width: "100%",
              maxWidth: 400,
              borderRadius: 4,
              marginTop: 20,
            }}
          >
            Sign in
          </Button>

          {/* <Button
    onPress={() => {
      login();
      router.replace("/settings");
    }}
  >
    Test login
  </Button> */}
        </>
      ) : (
        <>
          <Loader color={colors.secondary} size={"large"} centered={true} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    paddingLeft: 35,
    paddingRight: 35,
    paddingTop: 40,
    gap: 20,
  },

  text: {
    fontFamily: "Kanit-Regular",
  },

  errorText: {
    marginTop: -10,
    marginLeft: 5,
    color: "#D43232",
    width: "100%",
    maxWidth: 400,
  },
});
