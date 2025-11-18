import React, { useRef, useEffect } from "react";
import { TextInput, View, StyleSheet } from "react-native";

const OtpInput = ({ otp, setOtp }) => {
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current = otp.map(
      (_, i) => inputRefs.current[i] || React.createRef()
    );
  }, [otp]);

  const handleOtpChange = (text, index) => {
    if (text.length > 1) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = text;
    setOtp(updatedOtp);

    if (text && index < otp.length - 1) {
      inputRefs.current[index + 1].current.focus();
    }

    if (!text && index > 0) {
      inputRefs.current[index - 1].current.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      const updatedOtp = [...otp];
      updatedOtp[index - 1] = "";
      setOtp(updatedOtp);
      inputRefs.current[index - 1].current.focus();
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
          onKeyPress={(e) => handleKeyPress(e, index)}
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
    fontSize: 18,
    borderRadius: 10,
  },
});

export default OtpInput;
