import { Text, Pressable, StyleSheet, View } from "react-native";
import { SplashScreen, useRouter } from "expo-router";
import { useAuthStore } from "../auth/store/authStore";
import { IUser } from "../auth/interfaces/IUser";
import { login } from "../auth/auth";
import { BackgroundGrandient } from "../components/BackgroundGrandient";
import Logo from "../components/Logo";
import { colorPalette } from "../theme/colors";

SplashScreen.preventAutoHideAsync();

export default function WelcomeScreen() {
  const user: IUser | null = useAuthStore((state) => state.user);

  const handleContinueClick = () => {
    const router = useRouter();
    router.replace("/home");
  };

  return (
    <BackgroundGrandient>
      <View style={styles.mainContainer}>
        <Logo />
        <View style={styles.inputContainer}>
          <Pressable onPress={handleContinueClick}>
            {user ? (
              <Text style={[styles.text, { fontSize: 24 }]}>
                Continue as {user.username}
              </Text>
            ) : (
              <Text style={[styles.text, { fontSize: 24 }]}>
                Continue as guest
              </Text>
            )}
          </Pressable>

          {!user && (
            <Pressable onPress={login}>
              <Text style={[styles.text, { fontSize: 18, marginTop: 50 }]}>
                Log into account
              </Text>
            </Pressable>
          )}
        </View>
      </View>
    </BackgroundGrandient>
  );
}

const styles = StyleSheet.create({
  text: {
    color: colorPalette.dark.text,
    fontFamily: "Kanit-Medium",
  },
  inputContainer: {
    marginTop: '30%',
    justifyContent: "center",
    alignItems: "center",
  },
  mainContainer: {
    flex: 1,
    alignItems: "center",
  }
});
