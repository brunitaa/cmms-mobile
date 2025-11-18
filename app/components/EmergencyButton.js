import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Vibration,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const EmergencyButton = ({ onPress }) => {
  const timer = useRef(null);

  const handlePressIn = () => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      console.log("Emergencia activada");
      onPress();
      Vibration.vibrate(500);
    }, 2000);
  };

  const handlePressOut = () => {
    clearTimeout(timer.current);
  };

  return (
    <TouchableOpacity
      style={styles.button}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.8}
    >
      <MaterialIcons name="emergency" size={30} color="#fff" />
      <Text style={styles.buttonText}>Emergencia</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E7180B",
    paddingHorizontal: 16,
    borderRadius: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    marginLeft: 8,
  },
});

export default EmergencyButton;
