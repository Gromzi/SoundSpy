import { useEffect } from "react";
import WelcomeScreen from "./welcome";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login } from "../auth/auth";
import * as SecureStore from "expo-secure-store";

export default function index() {
  useEffect(() => {
    const token: Promise<string | null> =
      Platform.OS === "web"
        ? AsyncStorage.getItem("token")
        : SecureStore.getItemAsync("token");

    // Check if user is logged in
    token.then((token) => {
      if (token) {
        login();
        console.log("User logged in")
      }
      else {
        console.log("User not logged in")
      }
    });

    
  }, []);

  return <WelcomeScreen />;
}
