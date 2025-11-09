import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import TopBar from "../components/TopBar";
import TextInputContainer from "../components/textInputContainer/TextInputContainer";
import TextStyleContainer from "../components/textStyle/TextStyleContainer";
import TextStyleBtn from "../components/textStyle/TextStyleBtn";
import { useTheme } from "../context/ThemeContext";

const HomePage = () => {
  const { theme } = useTheme();
  const [text, setText] = useState("");
  const [stylesState, setStylesState] = useState({
    bold: false,
    italic: false,
    underline: false,
    align: "left",
  });
  const [size, setSize] = useState(8);
  const [styleColor, setStyleColor] = useState("");

  return (
    <LinearGradient
      colors={theme?.homeBackground || ['#6666f2', '#846ffb']}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      style={styles.container}
    >
      <StatusBar style="light" />

      <View style={styles.contentWrapper}>
        <TopBar />
        <View style={{ flex: 1 }}>
          <TextInputContainer text={text} setText={setText} />
        </View>
        <View style={{ flex: 1 }}>
          <TextStyleContainer
            stylesState={stylesState}
            setStylesState={setStylesState}
            size={size}
            setSize={setSize}
            styleColor={styleColor}
            setStyleColor={setStyleColor}
          />
        </View>
        <View style={{ flex: 1 }}>
          <TextStyleBtn
            text={text}
            stylesState={stylesState}
            size={size}
            styleColor={styleColor}
          />
        </View>
      </View>
    </LinearGradient>
  );
};

export default HomePage;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
    paddingHorizontal: 20,
  },
  contentWrapper: {
    flex: 1,
    justifyContent: "flex-start",
    gap: 20,
  },
});
