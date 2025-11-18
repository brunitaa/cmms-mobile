import React, { createContext, useState, useEffect } from "react";
import { useAudioPlayer } from "expo-audio";

import audioSource from "../../assets/emergency_alarm.mp3";

export const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const player = useAudioPlayer(audioSource);
  player.volume = 1.0;

  player.loop = true;

  return (
    <AudioContext.Provider value={{ player }}>{children}</AudioContext.Provider>
  );
};
