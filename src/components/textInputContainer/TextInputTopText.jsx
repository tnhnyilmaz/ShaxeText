import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../context/ThemeContext";

const TextInputTopText = () => {
  const { theme } = useTheme();
  return (
    <View style={styles.contextTop}>
      <Text style={{ fontWeight: "bold", fontSize: 18, color: "#000" }}>Enter Your Text</Text>
      <View>
        <Text style={[styles.charContainer, { color: "#787f8c" }]}>0/500</Text>
      </View>
    </View>
  );
};

export default TextInputTopText;

const styles = StyleSheet.create({
  textInput: {
    backgroundColor:"#f9fafb",
    height:"80%",
    borderRadius:16,
  },
  charContainer: {
    backgroundColor: "#f9fafb",
    padding: 5,
    borderRadius: 10,
    fontSize: 12,
    color: "#787f8c",
  },
  contextTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  contextContainer: {
    padding: 20,
  },
  textInputContainer: {
    width: "100%",
    height: "65%",
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
  },
  container: {
    flex: 1,
    paddingTop: 70,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
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
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
});
