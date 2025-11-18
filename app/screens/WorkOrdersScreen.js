import { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";

import { LogOut } from "lucide-react-native";

import { StatusBar } from "expo-status-bar";

import Badge from "../components/Badge";
import SearchBar from "../components/SearchBar";
import Avatar from "../components/Avatar";
import EmergencyButton from "../components/EmergencyButton";
import WorkOrderItem from "../components/WorkOrderItem";
import Dropdown from "../components/Dropdown";

import { AudioContext } from "../contexts/AudioContext";

import AsyncStorage from "@react-native-async-storage/async-storage";
import workOrderService from "../services/workOrderService";

export default function WorkOrdersScreen({ navigation }) {
  const { player } = useContext(AudioContext);
  const [workOrders, setWorkOrders] = useState([]);

  useEffect(() => {
    const fetchWorkOrders = async () => {
      try {
        const accessToken = await AsyncStorage.getItem("accessToken");
        console.log("AccessToken en WorkOrdersScreen:", accessToken);

        const response = await workOrderService.getAllWorkOrders(accessToken);
        console.log("Órdenes de trabajo obtenidas:", response.data);

        setWorkOrders(response.data);
      } catch (error) {
        const errorMsg =
          error?.errors?.[0]?.message || error.message || "Error desconocido";
        ToastAndroid.show(errorMsg, ToastAndroid.LONG);
        console.log("Error al obtener las órdenes de trabajo:", error);
      }
    };

    fetchWorkOrders();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" backgroundColor="#ffffff" />

      <View style={styles.headerContainer}>
        <View style={styles.userInfo}>
          <Avatar userName="Carlos Mendoza" size={50} />
          <View style={styles.userText}>
            <Text style={styles.userName}>Carlos Daniel</Text>
            <Text style={styles.userEmail}>carlosdaniel@gmail.com</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => console.log("Cerrar sesión")}
        >
          <LogOut size={24} color="#4b4b4b" />
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />

      <EmergencyButton
        onPress={() => {
          player.play();
          navigation.reset({
            index: 0,
            routes: [{ name: "EmergencyScreen" }],
          });
        }}
      />

      <View style={styles.divider} />
      <View style={styles.searchContainer}>
        <SearchBar onSearch={(query) => console.log("Buscar:", query)} />
      </View>

      <View style={styles.divider} />

      <FlatList
        data={workOrders}
        renderItem={({ item }) => <WorkOrderItem item={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f5",
    paddingTop: 40,
    paddingHorizontal: 10,
    paddingBottom: 50,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#ffffff",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#e1e1e1",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  userText: {
    marginLeft: 10,
  },
  userName: {
    fontSize: 17,
    fontWeight: "500",
  },
  userEmail: {
    marginTop: -3,
    color: "#4b4b4b",
  },
  logoutButton: {
    backgroundColor: "#f4f4f5",
    padding: 10,
    borderRadius: 12,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    width: "100%",
    marginVertical: 10,
  },
  searchContainer: {
    marginBottom: 10,
  },
  listContent: {
    paddingBottom: 10,
  },
});
