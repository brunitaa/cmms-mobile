import { useState, useEffect, useRef, useContext } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
  Vibration,
  BackHandler,
  ToastAndroid,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { AudioContext } from "../contexts/AudioContext";

const PRESS_THRESHOLD = 2000;
const BACKGROUND_INTERVAL = 500;
const LONG_PRESS_DELAY = 3000;

const EmergencyScreen = ({ navigation }) => {
  const { player } = useContext(AudioContext);

  const [bgColor, setBgColor] = useState("red");
  const [textColor, setTextColor] = useState("white");
  const pressStartTime = useRef(null);
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      setBgColor((prev) => (prev === "red" ? "white" : "red"));
      setTextColor((prev) => (prev === "white" ? "red" : "white"));
    }, BACKGROUND_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        ToastAndroid.show(
          "Mantén presionado para salir de emergencia",
          ToastAndroid.SHORT
        );
        return true;
      }
    );

    return () => backHandler.remove();
  }, []);

  const handlePressIn = () => {
    pressStartTime.current = new Date().getTime();
  };

  const handlePressOut = () => {
    pressStartTime.current = null;
  };

  const handleLongPress = () => {
    const duration = new Date().getTime() - pressStartTime.current;
    if (duration >= PRESS_THRESHOLD) {
      exitEmergency();
    }
  };

  const exitEmergency = () => {
    navigation.reset({ index: 0, routes: [{ name: "WorkOrdersScreen" }] });
    Vibration.vibrate(500);
    player.pause();
  };

  return (
    <TouchableWithoutFeedback
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onLongPress={handleLongPress}
      delayLongPress={LONG_PRESS_DELAY}
    >
      <Animated.View
        style={[styles.container, { backgroundColor: bgColor, opacity }]}
      >
        <MaterialIcons name="emergency" size={100} color={textColor} />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default EmergencyScreen;
