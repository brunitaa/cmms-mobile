import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import authService from "../services/authService";
import userService from "../services/userService";

import { useNavigation } from "@react-navigation/native";

import { ToastAndroid } from "react-native";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    checkUserSession();
  }, []);

  const checkUserSession = async () => {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      console.log("AccessToken en AuthContext:", accessToken);

      if (accessToken) {
        const response = await authService.verifyAccessToken(accessToken);
        console.log("Respuesta de verifyAccessToken en AuthContext:", response);
        setUser(response.data);
        navigation.reset({
          index: 0,
          routes: [{ name: "WorkOrdersScreen" }],
        });
      }
    } catch (error) {
      console.error("Error al verificar sesión:", error.errors[0].message);
      ToastAndroid.show(error.errors[0].message, ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email, password) => {
    try {
      const response = await authService.signIn(email, password);
      setUser(response.data);
      const accessToken = response.data.auth.accessToken;
      const refreshToken = response.data.auth.refreshToken;

      console.log("accessToken:", accessToken);
      console.log("refreshToken:", refreshToken);
      await AsyncStorage.setItem("accessToken", accessToken);
      await AsyncStorage.setItem("refreshToken", refreshToken);
      console.log("CONTEXT: ", response);
      navigation.reset({
        index: 0,
        routes: [{ name: "WorkOrdersScreen" }],
      });
      return response;
    } catch (error) {
      throw error;
    }
  };

  const signOut = async () => {
    try {
      navigation.reset({
        index: 0,
        routes: [{ name: "SignIn" }],
      });
      const refreshToken = await AsyncStorage.getItem("refreshToken");
      console.log("REFRESHTOKEN EN CONTEXT: ", refreshToken);
      const response = await authService.signOut(refreshToken);
      setUser(null);
      await AsyncStorage.removeItem("accessToken");
      await AsyncStorage.removeItem("refreshToken");

      return response;
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
