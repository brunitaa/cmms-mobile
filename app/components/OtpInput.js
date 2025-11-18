import React, { useRef } from "react";
import { TextInput, View, StyleSheet } from "react-native";

const OtpInput = ({ otp, setOtp }) => {
  const inputRefs = useRef(otp.map(() => React.createRef()));

  // Función para manejar el cambio en los cuadros del OTP
  const handleOtpChange = (text, index) => {
    if (text.length <= 1) {
      const updatedOtp = [...otp];
      updatedOtp[index] = text;
      setOtp(updatedOtp);

      // Mover al siguiente cuadro automáticamente si el campo no está vacío
      if (text.length === 1 && index < otp.length - 1) {
        inputRefs.current[index + 1].current.focus();
      }

      // Mover al campo anterior si está vacío y el índice no es el primero
      if (text.length === 0 && index > 0) {
        inputRefs.current[index - 1].current.focus();
      }
    }
  };

  return (
    <View style={styles.otpContainer}>
      {otp.map((digit, index) => (
        <TextInput
          key={index}
          ref={inputRefs.current[index]}
          style={styles.otpInput}
          value={digit}
          onChangeText={(text) => handleOtpChange(text, index)}
          onKeyPress={({ nativeEvent }) => {
            if (nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
              // Si se presiona backspace y el cuadro está vacío, moverse al anterior
              const prevInputRef = inputRefs.current[index - 1];
              if (prevInputRef && prevInputRef.current) {
                prevInputRef.current.focus();
                const updatedOtp = [...otp];
                updatedOtp[index - 1] = ""; // Borrar el valor del campo anterior
                setOtp(updatedOtp);
              }
            }
          }}
          keyboardType="numeric"
          maxLength={1}
          textAlign="center"
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    width: "100%",
  },
  otpInput: {
    width: 48,
    height: 48,
    borderWidth: 1,
    borderColor: "#ccc",
    textAlign: "center",
    fontSize: 18,
    borderRadius: 10,
  },
});

export default OtpInput;
