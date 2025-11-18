import React, { useState, useCallback } from "react";
import {
  Animated,
  TextInput,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  ToastAndroid,
} from "react-native";
import { useKeyboard } from "../hooks/useKeyboard";

const KEYBOARD_OFFSET_RATIO = 8;

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const keyboardOffset = useKeyboard(KEYBOARD_OFFSET_RATIO);

  const handlePasswordReset = useCallback(() => {
    if (!email.trim()) {
      return ToastAndroid.show("Ingresa un correo válido", ToastAndroid.SHORT);
    }

    ToastAndroid.show(
      "Recuperación de contraseña solicitada",
      ToastAndroid.SHORT
    );
    console.log("Correo para recuperación:", email);

    navigation.reset({
      index: 0,
      routes: [{ name: "ResetPasswordScreen" }],
    });
  }, [email, navigation]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.formContainer,
          { transform: [{ translateY: keyboardOffset }] },
        ]}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Recuperar</Text>
          <Text style={[styles.title, { marginTop: -2 }]}>Contraseña</Text>
          <Text style={styles.subtitle}>Ingresa tu correo electrónico</Text>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          accessibilityLabel="Campo de correo electrónico"
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handlePasswordReset}
          activeOpacity={0.8}
          accessibilityLabel="Botón para solicitar recuperación"
        >
          <Text style={styles.buttonText}>Solicitar</Text>
        </TouchableOpacity>

        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>¿Recuerdas tu contraseña? </Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.footerLink}>Inicia Sesión</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 24,
    paddingVertical: 50,
  },
  formContainer: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    marginBottom: 40,
  },
  header: {
    width: "100%",
    justifyContent: "center",
    alignItems: "flex-start",
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    color: "#777",
    marginTop: 4,
  },
  input: {
    width: "100%",
    height: 48,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 12,
    marginBottom: 16,
    borderRadius: 10,
    backgroundColor: "#ffffff",
  },
  button: {
    width: "100%",
    height: 48,
    backgroundColor: "#084ce8",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 4,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  footerContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  footerText: {
    fontSize: 14,
    fontWeight: "600",
  },
  footerLink: {
    color: "#084ce8",
    fontWeight: "800",
  },
});

export default ForgotPasswordScreen;
