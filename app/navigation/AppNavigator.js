import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInScreen from "../screens/SignInScreen";
import HomeScreen from "../screens/HomeScreen"; // ejemplo de otra pantalla
import WorkOrdersScreen from "../screens/WorkOrdersScreen";
import MeScreen from "../screens/MeScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import ResetPasswordScreen from "../screens/ResetPasswordScreen";
import WorkOrderScreen from "../screens/WorkOrderScreen";
import EmergencyScreen from "../screens/EmergencyScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{ title: "Inicio", headerShown: false }}
      />
      <Stack.Screen
        name="WorkOrdersScreen"
        component={WorkOrdersScreen}
        options={{ title: "WorkOrdersScreen", headerShown: false }}
      />
      <Stack.Screen
        name="WorkOrderScreen"
        component={WorkOrderScreen}
        options={{ title: "WorkOrderScreen", headerShown: false }}
      />
      <Stack.Screen
        name="EmergencyScreen"
        component={EmergencyScreen}
        options={{
          title: "EmergencyScreen",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
        options={{ title: "Recuperar Contraseña", headerShown: false }}
      />
      <Stack.Screen
        name="ResetPasswordScreen"
        component={ResetPasswordScreen}
        options={{ title: "Resetear Contraseña", headerShown: false }}
      />

      <Stack.Screen
        name="MeScreen"
        component={MeScreen}
        options={{ title: "Mi Perfil", headerShown: false }}
      />
    </Stack.Navigator>
  );
}
