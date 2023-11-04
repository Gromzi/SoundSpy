import { Platform } from "react-native";
import { useAuthStore } from "./store/authStore";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

const login = async () => {
  // mock data
  const email: string = "ayo@gmail.com";
  const usernameRegex: RegExp = /^([^@]+)/;
  const username: string = email.match(usernameRegex)![0];

  try {
    // mock response
    const response = {
      code: 200,
      token: "EXAMPLE_TOKEN",
      user: { id: "1", username: username, email: email },
    };
    const { token, user } = response;

    // set zustand state
    useAuthStore.getState().setToken(token);
    useAuthStore.getState().setUser(user);

    // store token
    try {
      Platform.OS === "web"
        ? await AsyncStorage.setItem("token", token)
        : await SecureStore.setItemAsync("token", token);
    } catch (error) {
      console.error("Error storing token: ", error);
    }

    console.log(
      "Logged in: ",
      useAuthStore.getState().token,
      useAuthStore.getState().user
    );
  } catch (error) {
    console.error("Error logging in: ", error);
  }
};

const logout = async () => {
  try {
    useAuthStore.getState().setToken(null);
    useAuthStore.getState().setUser(null);

    Platform.OS === "web"
      ? await AsyncStorage.removeItem("token")
      : await SecureStore.deleteItemAsync("token");
  } catch (error) {
    console.error("Error logging out: ", error);
  }
};

export { login, logout };