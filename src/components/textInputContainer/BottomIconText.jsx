import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../context/ThemeContext";

const BottomIconText = ({label,icon}) => {
  const { theme } = useTheme();
  return (
    <View style={styles.voiceContainer}>
      {icon}
      <Text style={{ fontWeight: "400", color: "#6b7280" }}>{label}</Text>
    </View>
  );
};

export default BottomIconText;

const styles = StyleSheet.create({
  voiceContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
