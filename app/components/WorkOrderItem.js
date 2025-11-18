import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Siren, ShieldCheck, Users, Loader } from "lucide-react-native";
import Badge from "./Badge";

const WorkOrderHeader = ({ title }) => (
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
            container: { backgroundColor: "#e3f2fd", borderColor: "#1e88e5" },
            label: { color: "#1e88e5" },
          }}
        />
        <Badge
          icon={<Siren size={14} color="#e53935" />}
          label="Critica"
          style={{
            container: { backgroundColor: "#ffebee", borderColor: "#e53935" },
            label: { color: "#e53935" },
          }}
        />
      </View>
    </View>
  </View>
);

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

  const handleNavigate = () => {
    navigation.navigate("WorkOrderScreen", { order: item });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleNavigate}>
      <WorkOrderHeader title={item.title} />
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
