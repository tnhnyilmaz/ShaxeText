import { Entypo, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../context/ThemeContext";

const TopBar = () => {
  const { theme } = useTheme();
  return (
    <View style={styles.topBar}>
      {/* Sol taraf: ikon + text */}
      <View style={styles.topIconText}>
        <View style={styles.iconContainer}>
          <Entypo name="mobile" size={24} color={theme?.iconColor || "white"} />
        </View>
        <Text style={[styles.appName, { color: theme?.textColor || "white" }]}>Shake Text</Text>
      </View>

      {/* Sağ taraf: ayarlar ikonu */}
      <View style={styles.iconContainer}>
        <MaterialIcons name="settings" size={24} color={theme?.iconColor || "white"} />
      </View>
    </View>
  );
};

export default TopBar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70, 
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", 
  },
  topIconText: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.4)",
    padding: 8,
    borderRadius: 10,
  },
  appName: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
});
