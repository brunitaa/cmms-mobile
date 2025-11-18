import React, { useEffect } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { checkToken } from "../services/userService";

export default function LoadingScreen({ navigation }) {
  useEffect(() => {
    const verify = async () => {
      try {
        const user = await checkToken();
        if (user) {
          navigation.replace("Home");
        } else {
          navigation.replace("SignIn");
        }
      } catch (error) {
        console.log("Error verificando token:", error);
        navigation.replace("SignIn");
      }
    };

    verify();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#007AFF" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f4f5",
  },
});
