import { Text, Pressable, View } from "react-native";
import { SplashScreen, useRouter } from "expo-router";
import { useAuthStore } from "../auth/store/authStore";
import { IUser } from "../auth/interfaces/IUser";
import { login } from "../auth/auth";
import { BackgroundGrandient } from "../components/BackgroundGrandient";
import Logo from "../components/Logo";

SplashScreen.preventAutoHideAsync();

export default function WelcomeScreen() {
  const user: IUser | null = useAuthStore((state) => state.user);

  const handleContinueClick = () => {
    const router = useRouter();
    router.replace("/home");
  };

  return (
      <BackgroundGrandient>
        <Logo />

        <Pressable onPress={handleContinueClick}>
          {user ? (
            <Text style={{fontFamily: 'Kanit-Regular'}}>Continue as {user.username}</Text>
          ) : (
            <Text>Continue as guest</Text>
          )}
        </Pressable>

        {!user && (
          <Pressable onPress={login}>
            <Text>Log into account</Text>
          </Pressable>
        )}
      </BackgroundGrandient>
  );
}
