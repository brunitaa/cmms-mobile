import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { ChevronLeft, Siren, ShieldCheck } from "lucide-react-native";
import Dropdown from "../components/Dropdown";

const Header = ({ order, navigation }) => (
  <View style={styles.headerContainer}>
    <TouchableOpacity
      style={styles.backButton}
      onPress={() => navigation.goBack()}
    >
      <ChevronLeft size={24} color="#4b4b4b" />
    </TouchableOpacity>
    <View style={styles.headerTextContainer}>
      <Text style={styles.orderTitle}>Orden de Trabajo #{order.id}</Text>
      <Text style={styles.orderDate}>
        {new Date(order.createdAt).toLocaleString()}
      </Text>
    </View>
  </View>
);

const InfoCard = ({ icon, iconColor, iconBg, label, value }) => (
  <View style={styles.infoCard}>
    <View style={[styles.iconContainer, { backgroundColor: iconBg }]}>
      {icon}
    </View>
    <View style={styles.infoTextContainer}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  </View>
);

const Content = ({ order }) => (
  <ScrollView>
    <View style={styles.contentContainer}>
      {/* Título */}
      <View style={styles.card}>
        <Text style={styles.cardLabel}>Título</Text>
        <Text style={styles.cardValue}>{order.title}</Text>
      </View>

      {/* Tipo y Prioridad */}
      <View style={styles.row}>
        <InfoCard
          icon={<ShieldCheck size={30} color="#1e88e5" />}
          iconColor="#1e88e5"
          iconBg="#e3f2fd"
          label="Tipo"
          value="Preventivo"
        />
        <InfoCard
          icon={<Siren size={30} color="#e53935" />}
          iconColor="#e53935"
          iconBg="#ffebee"
          label="Prioridad"
          value="Crítica"
        />
      </View>

      {/* Descripción */}
      <View style={styles.card}>
        <Text style={styles.cardLabel}>Descripción</Text>
        <Text style={styles.cardValue}>{order.description}</Text>
      </View>

      <View style={styles.separator} />

      {/* Ascensor */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Ascensor</Text>
        <View style={styles.rowBetween}>
          <Text style={styles.labelText}>Nombre</Text>
          <Text style={styles.valueText}>Panorámico</Text>
        </View>
        <View style={styles.rowBetween}>
          <Text style={styles.labelText}>Capacidad</Text>
          <Text style={styles.valueText}>12 Personas</Text>
        </View>
        <View style={styles.rowBetween}>
          <Text style={styles.labelText}>Ubicación</Text>
          <Text style={styles.valueText}>Interior</Text>
        </View>
        <View style={styles.rowBetween}>
          <Text style={styles.labelText}>Nro. de Paradas</Text>
          <Text style={styles.valueText}>10</Text>
        </View>
      </View>

      <View style={styles.separator} />

      {/* Edificio */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Edificio</Text>
        <View style={styles.rowBetween}>
          <Text style={styles.labelText}>Nombre</Text>
          <Text style={styles.valueText}>San Diego</Text>
        </View>
        <View style={styles.rowBetween}>
          <Text style={styles.labelText}>Dirección</Text>
          <Text style={styles.valueText}>Gobernador Centeno 1234</Text>
        </View>
        <View style={styles.rowBetween}>
          <Text style={styles.labelText}>Ciudad</Text>
          <Text style={styles.valueText}>Santa Cruz de la Sierra</Text>
        </View>
        <View style={styles.rowBetween}>
          <Text style={styles.labelText}>Administrador</Text>
          <Text style={styles.valueText}>Juan Perez</Text>
        </View>
      </View>

      <View style={styles.separator} />

      <Dropdown
        options={["Asignada", "En Progreso", "Completada"]}
        onSelect={(option) => console.log("Estado cambiado a:", option)}
      />
    </View>
  </ScrollView>
);

export default function WorkOrderScreen({ route, navigation }) {
  const { order } = route.params;

  return (
    <View style={styles.container}>
      <Header order={order} navigation={navigation} />
      <View style={styles.separator} />
      <Content order={order} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f5",
    padding: 10,
    paddingTop: 40,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#e1e1e1",
    gap: 10,
  },
  backButton: {
    backgroundColor: "#f4f4f5",
    padding: 10,
    borderRadius: 12,
  },
  headerTextContainer: {
    flexDirection: "column",
    gap: 2,
  },
  orderTitle: {
    fontSize: 15,
    fontWeight: "500",
  },
  orderDate: {
    marginTop: -1,
    fontSize: 13,
    color: "#7a7a7b",
  },
  contentContainer: {
    flex: 1,
    gap: 10,
  },
  card: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#e1e1e1",
    gap: 4,
  },
  cardLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#7a7a7b",
  },
  cardValue: {
    fontSize: 16,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
  infoCard: {
    borderWidth: 1,
    borderColor: "#e1e1e1",
    borderRadius: 18,
    flexDirection: "row",
    padding: 10,
    gap: 10,
    backgroundColor: "#ffffff",
    alignItems: "center",
    flex: 1,
  },
  iconContainer: {
    borderWidth: 1,
    borderColor: "#e1e1e1",
    padding: 8,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  infoTextContainer: {
    flexDirection: "column",
    gap: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  infoLabel: {
    fontSize: 14,
    color: "#7a7a7b",
    fontWeight: "500",
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: -4,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    width: "100%",
    marginVertical: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 8,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  labelText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#7a7a7b",
  },
  valueText: {
    fontSize: 16,
    fontWeight: "500",
  },
});
