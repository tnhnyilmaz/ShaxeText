import { AntDesign, Entypo, FontAwesome5, Fontisto } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import FontSizeRow from "./FontSizeRow";
import TextStyleRow from "./TextStyleRow";
import TextColors from "./TextColors";
import { useTheme } from "../../context/ThemeContext";

const TextStyleContainer = ({stylesState,setStylesState,size,setSize,styleColor,setStyleColor}) => {
  const { theme } = useTheme();
 

  return (
    <View style={{}}>
      <View style={[styles.textInputContainer, { backgroundColor: "white" }]}>
        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#000" }}>Text Style</Text>
        <Text style={{ color: "#000" }}>Font Size</Text>
        <FontSizeRow size={size} setSize={setSize} />
        <TextStyleRow stylesState={stylesState} setStylesState={setStylesState} />
        <View style={{ gap: 8 }}>
          <Text style={{ color: "#000" }}>Text Color</Text>
          <TextColors  setStyleColor={setStyleColor} />
        </View>
      </View>
    </View>
  );
};

export default TextStyleContainer;

const styles = StyleSheet.create({
  
  textInputContainer: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 16,
    gap: 12,
    padding: 20,
  },
});
