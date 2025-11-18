import React, { useState, useCallback, useContext } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Animated,
  StyleSheet,
  ToastAndroid,
} from "react-native";
import { AuthContext } from "../contexts/AuthContext";
import { useKeyboard } from "../hooks/useKeyboard";

const KEYBOARD_OFFSET_RATIO = 7.2;

const SignInScreen = ({ navigation }) => {
  const { signIn } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const keyboardOffset = useKeyboard(KEYBOARD_OFFSET_RATIO);

  const handleSignIn = useCallback(async () => {
    if (!email.trim() || !password.trim()) {
      navigation.reset({
        index: 0,
        routes: [{ name: "WorkOrdersScreen" }],
      });
      return ToastAndroid.show(
        "Por favor, completa todos los campos",
        ToastAndroid.SHORT
      );
    }

    try {
      const response = await signIn(email, password);
      ToastAndroid.show(response.message, ToastAndroid.SHORT);
    } catch (error) {
      const errorMessage = error?.errors?.[0]?.message || "Error desconocido";
      ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
    }
  }, [email, password, signIn]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.formContainer,
          { transform: [{ translateY: keyboardOffset }] },
        ]}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Iniciar Sesión</Text>
          <Text style={styles.subtitle}>
            Ingresa tu correo electrónico y contraseña
          </Text>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Correo Electrónico"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          accessibilityLabel="Campo de correo electrónico"
        />

        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCorrect={false}
          accessibilityLabel="Campo de contraseña"
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleSignIn}
          activeOpacity={0.8}
          accessibilityLabel="Botón para iniciar sesión"
        >
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>

        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>¿Olvidaste tu contraseña? </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("ForgotPasswordScreen")}
            accessibilityLabel="Botón para recuperar contraseña"
          >
            <Text style={styles.footerLink}>Recuperar</Text>
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
    backgroundColor: "#ffffff",
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
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    color: "#777",
  },
  input: {
    width: "100%",
    height: 48,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 12,
    marginBottom: 16,
    borderRadius: 12,
  },
  button: {
    width: "100%",
    height: 48,
    backgroundColor: "#1447e6",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    marginTop: 8,
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
    color: "#0057ff",
    fontWeight: "800",
  },
});

export default SignInScreen;
