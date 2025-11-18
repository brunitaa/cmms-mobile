import { useState, useEffect, useRef, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Avatar from "../components/Avatar";

import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Keyboard,
  Animated,
  StyleSheet,
  Alert,
  Platform,
  ToastAndroid,
} from "react-native";

export default function MeScreen({ navigation }) {
  const { signOut } = useContext(AuthContext);

  const onSignOutPress = async () => {
    try {
      const response = await signOut();
      ToastAndroid.show(response.message, ToastAndroid.SHORT);
      console.log("Sesión cerrada");
    } catch (error) {
      console.log("Error al cerrar sesión: ", error);
      ToastAndroid.show(error.errors[0].message, ToastAndroid.SHORT);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ width: "100%" }}>
        <View style={styles.header}>
          <Text style={{ fontSize: 25, fontWeight: "semibold" }}>Perfil</Text>
        </View>
        <View
          style={{
            width: "100%",
            display: "flex",
            direction: "column",
            gap: 18,
          }}
        >
          <View
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              gap: 15,
              marginVertical: 16,
            }}
          >
            <Avatar userName="Carlos Mendoza" size={80} />
            <View style={{ paddingBottom: 10 }}>
              <Text style={{ fontWeight: "500", fontSize: 15 }}>Nombre</Text>
              <Text style={{ fontSize: 18 }}>Carlos Daniel</Text>
              <Text style={{ fontSize: 18 }}>Menchaca Arauz</Text>
            </View>
          </View>
          <View>
            <Text style={{ fontWeight: "500", fontSize: 15 }}>Genero</Text>
            <Text style={{ fontSize: 16 }}>Masculino</Text>
          </View>
          <View>
            <Text style={{ fontWeight: "500", fontSize: 15 }}>
              Numero de Identificacion
            </Text>
            <Text style={{ fontSize: 16 }}>123456789</Text>
          </View>
          <View>
            <Text style={{ fontWeight: "500", fontSize: 15 }}>
              Fecha de Nacimiento
            </Text>
            <Text style={{ fontSize: 16 }}>01/01/2000</Text>
          </View>
          <View>
            <Text style={{ fontWeight: "500", fontSize: 15 }}>
              Numero de Telefono
            </Text>
            <Text style={{ fontSize: 16 }}>123456789</Text>
          </View>
          <View>
            <Text style={{ fontWeight: "500", fontSize: 15 }}>Rol</Text>
            <Text style={{ fontSize: 16 }}>Gerente</Text>
          </View>
          <View>
            <Text style={{ fontWeight: "500", fontSize: 15 }}>
              Especialidad
            </Text>
            <Text style={{ fontSize: 16 }}>Ninguna</Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.button}
          onPress={onSignOutPress}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingHorizontal: 24,
    paddingVertical: 50,
  },
  header: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 25,
    fontWeight: "semibold",
  },
  button: {
    width: "100%",
    height: 48,
    backgroundColor: "#084ce8",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
  },
  footer: {
    width: "100%",
    alignItems: "center",
  },
});
