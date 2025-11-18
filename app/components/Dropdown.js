import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Animated,
  Modal,
  Pressable,
} from "react-native";
import { ChevronDown } from "lucide-react-native";

const Dropdown = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const heightAnim = useRef(new Animated.Value(0)).current;
  const toggleDropdown = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    Animated.timing(heightAnim, {
      toValue: isOpen ? options.length * 47 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isOpen, options.length]);

  const handleSelect = (option) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <View style={styles.container}>
      {/* Botón principal */}
      <TouchableOpacity style={styles.button} onPress={toggleDropdown}>
        <Text style={styles.buttonText}>
          {selectedOption || "Selecciona una opción"}
        </Text>
        <ChevronDown size={20} color="#333" />
      </TouchableOpacity>

      {/* Modal del dropdown */}
      <Modal
        transparent
        visible={isOpen}
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <Pressable style={styles.overlay} onPress={() => setIsOpen(false)}>
          <Animated.View style={[styles.dropdown, { height: heightAnim }]}>
            <FlatList
              data={options}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => handleSelect(item)}
                >
                  <Text style={styles.optionText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </Animated.View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { width: "100%" },
  button: {
    backgroundColor: "#fff",
    height: 50,
    paddingHorizontal: 15,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#e1e1e1",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 3,
  },
  buttonText: { fontSize: 16 },
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  dropdown: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 18,
  },
  option: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  optionText: {
    fontSize: 16,
    textAlign: "center",
    color: "#333",
  },
});

export default Dropdown;
