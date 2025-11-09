import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const ResetBtn = ({ setStart, theme }) => {
  const handleReset = () => {
    if (setStart) {
      setStart(false);
    }
  };

  return (
    <TouchableOpacity activeOpacity={0.8} style={{ flex: 1 }} onPress={handleReset}>
      <LinearGradient
        colors={[
          theme?.cardBackground || "rgba(38, 42, 49, 0.6)",
          theme?.cardBackground || "rgba(33, 33, 51, 0.3)",
          theme?.cardBackground || "rgba(20, 26, 36, 0.3)",
        ]}
        style={styles.pauseContainer}
        start={{ x: 0.2, y: 0.1 }}
        end={{ x: 0.8, y: 1 }}
      >
        <View style={styles.pauseContent}>
          <Ionicons name="refresh-outline" size={24} color={theme?.iconColor || "white"} />
          <Text style={{ color: theme?.textColor || "#fff", fontWeight: "bold" }}>Reset</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default ResetBtn;

const styles = StyleSheet.create({
  pauseContent: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
  },
  pauseContainer: {
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "rgba(68, 73, 81, 0.5)",
    padding: 18,
  },
});
