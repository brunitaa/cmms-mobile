import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Feather from "@expo/vector-icons/Feather";

import Badge from "./Badge";

import { Siren, ShieldCheck, Users, Loader } from "lucide-react-native";

// Componente Header
const WorkOrderHeader = ({ title, onNavigate, order }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      <View style={{ gap: 4, flex: 1 }}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.titleText}>
          {title}
        </Text>
        <View style={{ flexDirection: "row", gap: 6, marginTop: 4 }}>
          <Badge
            icon={<ShieldCheck size={14} color="#1e88e5" />}
            label="Preventivo"
            style={{
              container: {
                backgroundColor: "#e3f2fd", // Fondo azul claro
                borderColor: "#1e88e5", // Borde azul más fuerte
              },
              label: { color: "#1e88e5" }, // Texto en azul más fuerte
            }}
          />
          <Badge
            icon={<Siren size={14} color="#e53935" />}
            label="Critica"
            style={{
              container: {
                backgroundColor: "#ffebee", // Fondo rojo claro
                borderColor: "#e53935", // Borde rojo más fuerte
              },
              label: { color: "#e53935" }, // Texto en rojo más fuerte
            }}
          />
        </View>
      </View>
    </View>
  );
};

// Componente de Técnicos Asignados
const CardFooter = ({ technicianId }) => (
  <View style={styles.CardFooterContainer}>
    <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
      <Loader size={20} color="black" />
      <Text>En progreso</Text>
    </View>
    <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
      <Users size={20} color="black" />
      <Text>{technicianId} técnicos asignados</Text>
    </View>
  </View>
);

const WorkOrderItem = ({ item }) => {
  const navigation = useNavigation();

  const handleNavigate = (order) => {
    navigation.navigate("WorkOrderScreen", { order });
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => handleNavigate(item)}
    >
      <WorkOrderHeader
        title={item.title}
        onNavigate={handleNavigate}
        order={item}
      />

      <Text style={styles.descriptionText} numberOfLines={3}>
        {item.description}
      </Text>

      <CardFooter technicianId={item.technicianId} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 12,
    backgroundColor: "#ffffff",
    paddingBottom: 14,
    paddingTop: 14,
    paddingHorizontal: 16,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#e1e1e1",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleText: {
    fontSize: 16,
    fontWeight: "500",
    width: "100%",
  },
  navigateButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 15,
    backgroundColor: "#f0f0f0",
    width: 45,
    justifyContent: "center",
    height: 45,
  },
  descriptionText: {
    color: "#555",
  },
  CardFooterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default WorkOrderItem;
