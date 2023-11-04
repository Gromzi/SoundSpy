import { SplashScreen, Stack } from "expo-router";
import { AppAuthInitializer } from "../utils/AppAuthInitializer";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import {
  ThemeProvider,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import { useColorScheme } from "react-native";

SplashScreen.preventAutoHideAsync();

export default () => {
  const colorScheme = useColorScheme();

  const [fontsLoaded, fontError] = useFonts({
    "Kanit-Regular": require("../../assets/fonts/Kanit-Regular.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded || fontError) return null;

  return (
    <AppAuthInitializer>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </AppAuthInitializer>
  );
};
