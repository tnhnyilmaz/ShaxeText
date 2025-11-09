import { Entypo, FontAwesome5 } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../context/ThemeContext";

const FontSizeRow = ({ size, setSize }) => {
  const { theme } = useTheme();
  const minSize = 8;
  const maxSize = 72;
  const fillPercentage = ((size - minSize) / (maxSize - minSize)) * 100;

  const increaseSize = () => {
    setSize((prev) => Math.min(prev + 2, maxSize));
  };

  const decreaseSize = () => {
    setSize((prev) => Math.max(prev - 2, minSize));
  };
  return (
    <View style={styles.iconWrapper}>
      {/* Eksi butonu */}
      <TouchableOpacity onPress={decreaseSize} activeOpacity={0.7}>
        <View style={styles.iconCon2}>
          <FontAwesome5 name="minus" size={12} color="#4b5563" />
        </View>
      </TouchableOpacity>

      {/* Bar container */}
      <View style={styles.fontSizeRod}>
        <View style={[styles.fontSizeFill, { width: `${fillPercentage}%` }]} />
      </View>

      {/* Artı butonu */}
      <TouchableOpacity onPress={increaseSize} activeOpacity={0.7}>
        <View style={styles.iconCon2}>
          <Entypo name="plus" size={12} color="black" />
        </View>
      </TouchableOpacity>

      {/* Güncel boyut */}
      <Text style={{ marginLeft: 16, fontWeight: "600", color: "#000" }}>{size}px</Text>
    </View>
  );
};

export default FontSizeRow;
const styles = StyleSheet.create({
  iconWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 10,
    gap: 5,
  },
  iconCon2: {
    backgroundColor: "#f3f4f6",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  fontSizeRod: {
    width: "50%",
    height: 12,
    borderRadius: 6,
    backgroundColor: "#e5e7eb",
    overflow: "hidden",
  },
  fontSizeFill: {
    height: "100%",
    borderRadius: 6,
    backgroundColor: "#6366f1",
  },
});
