import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"; // AsyncStorage en React Native
import authService from "../services/authService"; // Importa el servicio de autenticación
import userService from "../services/userService";

import { useNavigation } from "@react-navigation/native"; // Importamos el hook de navegación

import { ToastAndroid } from "react-native";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Almacena los datos del usuario
  const [loading, setLoading] = useState(true); // Estado de carga (para la sesión)
  const navigation = useNavigation(); // Usamos el hook de navegación

  // useEffect(() => {
  //   checkUserSession();
  // }, []);

  const checkUserSession = async () => {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      console.log("AccessToken en AuthContext:", accessToken);

      if (accessToken) {
        const response = await authService.verifyAccessToken(accessToken);
        console.log("Respuesta de verifyAccessToken en AuthContext:", response);
        setUser(response.data); // Si hay un token, el usuario está logueado
        navigation.reset({
          index: 0,
          routes: [{ name: "WorkOrdersScreen" }],
        }); // Navega a la pantalla principal
      }
    } catch (error) {
      console.error("Error al verificar sesión:", error.errors[0].message);
      ToastAndroid.show(error.errors[0].message, ToastAndroid.SHORT);
    } finally {
      setLoading(false); // Ya terminamos la carga
    }
  };

  const signIn = async (email, password) => {
    try {
      const response = await authService.signIn(email, password);
      setUser(response.data); // Almacena el usuario en el estado
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
      }); // Navega a la pantalla principal
      const refreshToken = await AsyncStorage.getItem("refreshToken");
      console.log("REFRESHTOKEN EN CONTEXT: ", refreshToken);
      const response = await authService.signOut(refreshToken); // Llama al servicio de logout
      setUser(null); // Elimina al usuario del estado
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
