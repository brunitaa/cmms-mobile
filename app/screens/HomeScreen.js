import React from "react";
import { View, Button, Alert } from "react-native";
import { signOut } from "../services/authService";

export default function HomeScreen({ navigation }) {
  const handleSignOut = async () => {
    try {
      await signOut();
      navigation.replace("SignIn");
    } catch (error) {
      Alert.alert("Error", "No se pudo cerrar sesión");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Button title="Cerrar Sesión" onPress={handleSignOut} />
    </View>
  );
}
