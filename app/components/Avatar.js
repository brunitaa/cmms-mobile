import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Avatar = ({ userName, size = 50 }) => {
  const getInitials = (name) => {
    if (!name) return "??";
    const names = name.trim().split(" ");
    if (names.length > 1) {
      return (names[0][0] + names[1][0]).toUpperCase();
    }
    return names[0].substring(0, 2).toUpperCase();
  };

  const initials = getInitials(userName);

  return (
    <View
      style={[
        styles.avatarContainer,
        { width: size, height: size, borderRadius: size / 2 },
      ]}
    >
      <Text style={[styles.avatarText, { fontSize: size / 2.5 }]}>
        {initials}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    backgroundColor: "#f4f4f5",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontWeight: "600",
    color: "#4b4b4b",
  },
});

export default Avatar;
