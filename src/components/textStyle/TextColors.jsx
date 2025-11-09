import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../context/ThemeContext";

const TextColors = ({ setStyleColor }) => {
  const { theme } = useTheme();
  const [selectedColor, setSelectedColor] = useState("#0000FF");
  const colorList = ["#FFD700", "#FF0000", "#00FF00", "#0000FF", "#7e1a1aff"];

  const handleSelectColor = (color) => {
    setSelectedColor(color);
    setStyleColor(color);
  };

  return (
    <View style={styles.colorRow}>
      {colorList.map((color, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleSelectColor(color)}
          activeOpacity={0.7}
        >
          <View
            style={[
              styles.colorShape,
              { backgroundColor: color },
              selectedColor === color && { ...styles.selectedBorder, borderColor: theme?.primaryColor || "#6366f1" },
            ]}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default TextColors;

const styles = StyleSheet.create({
  selectedBorder: {
    borderWidth: 3,
  },

  colorShape: {
    width: 30,
    height: 30,
    borderRadius: 18,
    backgroundColor: "#7e1a1aff",
  },
  colorRow: {
    flexDirection: "row",
    gap: 16,
  },
});
