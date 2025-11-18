import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { SlidersHorizontal } from "lucide-react-native";

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const handleChange = (text) => {
    setSearchQuery(text);
    onSearch(text);
  };

  const toggleFilterVisibility = () => {
    setIsFilterVisible(!isFilterVisible);
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
          value={searchQuery}
          onChangeText={handleChange}
          placeholderTextColor="#888"
        />
        <TouchableOpacity
          style={styles.filterContainer}
          onPress={toggleFilterVisibility}
        >
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
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    flex: 1,
    paddingLeft: 14,
    paddingRight: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 14,
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    marginLeft: 10,
    backgroundColor: "#f4f4f5",
    borderRadius: 12,
    height: 40,
    width: 45,
  },
});

export default SearchBar;
