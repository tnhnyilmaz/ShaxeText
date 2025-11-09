import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../context/ThemeContext";

const TextStyleRow = ({ stylesState = {}, setStylesState = () => {} }) => {
  const { theme } = useTheme();
  const toggleStyle = (key) => {
    if (key === "alignLeft" || key === "alignCenter" || key === "alignRight") {
      setStylesState((prev) => ({
        ...prev,
        align:
          key === "alignLeft"
            ? "left"
            : key === "alignCenter"
            ? "center"
            : "right",
      }));
    } else {
      setStylesState((prev) => ({
        ...prev,
        [key]: !prev[key],
      }));
    }
  };

  return (
    <View style={styles.styleRow}>
      {/* Bold */}
      <TouchableOpacity onPress={() => toggleStyle("bold")}>
        <View
          style={[styles.textStyle, stylesState.bold && styles.activeStyle]}
        >
          <AntDesign name="bold" size={24} color={stylesState.bold ? "white" : "black"} />
        </View>
      </TouchableOpacity>

      {/* Italic */}
      <TouchableOpacity onPress={() => toggleStyle("italic")}>
        <View
          style={[styles.textStyle, stylesState.italic && styles.activeStyle]}
        >
          <AntDesign name="italic" size={24} color={stylesState.italic ? "white" : "black"} />
        </View>
      </TouchableOpacity>

      {/* Underline */}
      <TouchableOpacity onPress={() => toggleStyle("underline")}>
        <View
          style={[
            styles.textStyle,
            stylesState.underline && styles.activeStyle,
          ]}
        >
          <AntDesign name="underline" size={24} color={stylesState.underline ? "white" : "black"} />
        </View>
      </TouchableOpacity>

      {/* Alignment */}
      <View style={styles.alignRow}>
        <TouchableOpacity onPress={() => toggleStyle("alignLeft")}>
          <View
            style={[
              styles.alignBox,
              stylesState.align === "left" && styles.activeStyle,
            ]}
          >
            <AntDesign name="align-left" size={18} color={stylesState.align === "left" ? "white" : "black"} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleStyle("alignCenter")}>
          <View
            style={[
              styles.alignBox,
              stylesState.align === "center" && styles.activeStyle,
            ]}
          >
            <AntDesign name="align-center" size={18} color={stylesState.align === "center" ? "white" : "black"} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleStyle("alignRight")}>
          <View
            style={[
              styles.alignBox,
              stylesState.align === "right" && styles.activeStyle,
            ]}
          >
            <AntDesign name="align-right" size={18} color={stylesState.align === "right" ? "white" : "black"} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TextStyleRow;

const styles = StyleSheet.create({
  styleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textStyle: {
    width: 50,
    height: 50,
    backgroundColor: "#f3f4f6",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },
  activeStyle: {
    backgroundColor: "#6366f1",
    color: "#fff",
  },
  alignRow: {
    flexDirection: "row",
    gap: 6,
  },
  alignBox: {
    width: 40,
    height: 40,
    backgroundColor: "#f3f4f6",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
});
