import React, { useState } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SlidersHorizontal } from "lucide-react-native";

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const handleSearchChange = (text) => {
    setSearchQuery(text);
    onSearch(text);
  };

  const toggleFilter = () => {
    setIsFilterVisible((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <TouchableOpacity style={styles.iconContainer}>
          <Ionicons name="search" size={20} color="#888" />
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Buscar..."
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={handleSearchChange}
        />

        <TouchableOpacity style={styles.filterContainer} onPress={toggleFilter}>
          <SlidersHorizontal size={24} color="#4b4b4b" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  searchBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingLeft: 14,
    paddingRight: 10,
    paddingVertical: 8,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#e1e1e1",
  },
  iconContainer: {
    paddingRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  filterContainer: {
    marginLeft: 10,
    backgroundColor: "#f4f4f5",
    borderRadius: 12,
    height: 40,
    width: 45,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SearchBar;
