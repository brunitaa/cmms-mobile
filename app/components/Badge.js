import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Badge = ({ icon, label, containerStyle, labelStyle }) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {icon}
      <Text style={[styles.label, labelStyle]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderWidth: 1,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    alignSelf: "flex-start",
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#4b4b4b",
  },
});

export default Badge;
