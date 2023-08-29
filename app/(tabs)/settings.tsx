import { View, Text, Pressable } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { useAuthStore } from "../../auth/store/authStore";
import { login, logout } from "../../auth/auth";

export default function SettingsScreen() {
  const user = useAuthStore((state) => state.user);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ marginBottom: 50 }}>Settings Screen</Text>

      {user ? (
        <>
          <Text style={{ marginBottom: 20 }}>Logged in as {user.username}</Text>
          <Pressable onPress={logout}>
            <Text>Logout</Text>
          </Pressable>
        </>
      ) : (
        <>
          <Text style={{ marginBottom: 20 }}>Not logged in</Text>
          <Pressable onPress={login}>
            <Text>Log into account</Text>
          </Pressable>
        </>
      )}

      {/* <Link href={"/login"} asChild>
        <Pressable>
          <Text>Log into account</Text>
        </Pressable>
      </Link> */}
    </View>
  );
}
