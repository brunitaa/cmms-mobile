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
import OtpInput from "../components/OtpInput";

const KEYBOARD_OFFSET_RATIO = 2.5;

const ResetPassword = ({ navigation }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const keyboardOffset = useKeyboard(KEYBOARD_OFFSET_RATIO);

  const otpValue = otp.join("");

  const validateFields = useCallback(() => {
    if (!otpValue || !password || !confirmPassword) {
      ToastAndroid.show("Completa todos los campos", ToastAndroid.SHORT);
      return false;
    }

    if (password !== confirmPassword) {
      ToastAndroid.show("Las contraseñas no coinciden", ToastAndroid.SHORT);
      return false;
    }

    return true;
  }, [otpValue, password, confirmPassword]);

  const goToLogin = useCallback(() => {
    navigation.reset({ index: 0, routes: [{ name: "SignIn" }] });
  }, [navigation]);

  const onResetPasswordPress = useCallback(() => {
    if (!validateFields()) return;

    ToastAndroid.show(
      "Contraseña restablecida correctamente",
      ToastAndroid.SHORT
    );

    console.log("OTP:", otpValue);
    console.log("Nueva contraseña:", password);

    ToastAndroid.show("Por favor vuelve a iniciar sesión", ToastAndroid.SHORT);

    goToLogin();
  }, [validateFields, otpValue, password, goToLogin]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.formContainer,
          { transform: [{ translateY: keyboardOffset }] },
        ]}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Restablecer</Text>
          <Text style={[styles.title, { marginTop: -2 }]}>Contraseña</Text>
          <Text style={styles.subtitle}>
            Introduce el código enviado a tu correo{"\n"}y tu nueva contraseña
          </Text>
        </View>

        <OtpInput otp={otp} setOtp={setOtp} />

        <View style={styles.divider} />

        <TextInput
          style={styles.input}
          placeholder="Nueva contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TextInput
          style={styles.input}
          placeholder="Confirmar contraseña"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        <TouchableOpacity
          style={styles.button}
          onPress={onResetPasswordPress}
          activeOpacity={0.85}
        >
          <Text style={styles.buttonText}>Restablecer Contraseña</Text>
        </TouchableOpacity>

        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>¿Recuerdas tu contraseña? </Text>
          <TouchableOpacity onPress={goToLogin}>
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
  },
  input: {
    width: "100%",
    height: 48,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 12,
    marginBottom: 16,
    borderRadius: 10,
  },
  button: {
    width: "100%",
    height: 48,
    backgroundColor: "#084ce8",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 10,
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
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    width: "100%",
    marginBottom: 20,
  },
});

export default ResetPassword;
