// hooks/useKeyboard.js
import { useState, useEffect } from "react";
import { Keyboard, Animated } from "react-native";

export const useKeyboard = (keyboardOffsetRatio) => {
  const [keyboardOffset] = useState(new Animated.Value(0));

  useEffect(() => {
    const onKeyboardShow = (event) => {
      const offset = -event.endCoordinates.height / keyboardOffsetRatio;
      Animated.timing(keyboardOffset, {
        toValue: offset,
        duration: 300,
        useNativeDriver: true,
      }).start();
    };

    const onKeyboardHide = () => {
      Animated.timing(keyboardOffset, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    };

    const showListener = Keyboard.addListener(
      "keyboardDidShow",
      onKeyboardShow
    );
    const hideListener = Keyboard.addListener(
      "keyboardDidHide",
      onKeyboardHide
    );

    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, [keyboardOffset, keyboardOffsetRatio]);

  return keyboardOffset;
};
