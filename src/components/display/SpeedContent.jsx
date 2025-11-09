import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useRef, useState } from "react";
import { PanResponder, StyleSheet, Text, View } from "react-native";
import StartPauseBtn from "./StartPauseBtn";
import ResetBtn from "./ResetBtn";

const SpeedContent = ({setScrollSpeed, scrollSpeed, start, setStart, theme}) => {
  const sliderWidth = useRef(0);
  const sliderStartX = useRef(0);

  const getSpeedLabel = (value) => {
    if (value < 0.25) return "Slow";
    if (value < 0.55) return "Medium";
    if (value < 0.8) return "Fast";
    return "Very Fast";
  };

  const getSpeedColor = (value) => {
    if (value < 0.25) return "rgba(255, 150, 50, 0.66)";
    if (value < 0.55) return "rgba(48, 200, 255, 0.66)";
    if (value < 0.8) return "rgba(50, 255, 150, 0.66)";
    return "rgba(255, 50, 100, 0.66)";
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,

      onPanResponderGrant: (evt) => {
        sliderStartX.current = evt.nativeEvent.locationX;
        const clampedX = Math.max(
          0,
          Math.min(sliderWidth.current, sliderStartX.current)
        );
        const newValue = clampedX / sliderWidth.current;
        setScrollSpeed(newValue);
      },

      onPanResponderMove: (evt, gestureState) => {
        const newX = sliderStartX.current + gestureState.dx;
        const clampedX = Math.max(0, Math.min(sliderWidth.current, newX));
        const newValue = clampedX / sliderWidth.current;
        setScrollSpeed(newValue);
      },
    })
  ).current;

  return (
    <View style={styles.rowContainer}>
      {/* SOLDAKİ SPEED BOX */}
      <LinearGradient
        colors={[
          theme?.cardBackground || "rgba(38, 42, 49, 0.6)",
          theme?.cardBackground || "rgba(33, 33, 51, 0.3)",
          theme?.cardBackground || "rgba(20, 26, 36, 0.3)",
        ]}
        start={{ x: 0.2, y: 0.1 }}
        end={{ x: 0.8, y: 1 }}
        style={[styles.speedContainer, { flex: 1 }]}
      >
        <View style={styles.speedHeader}>
          <View style={styles.speedTitle}>
            <Ionicons name="speedometer" size={24} color={theme?.primaryColor || "#00d9ffff"} />
            <Text style={[styles.speedHeaderText, { color: theme?.textColor }]}>Scroll Speed</Text>
          </View>
          <View
            style={[
              styles.speedText,
              { backgroundColor: getSpeedColor(scrollSpeed) },
            ]}
          >
            <Text style={{ color: theme?.textColor || "#fff", fontWeight: "bold" }}>
              {getSpeedLabel(scrollSpeed)}
            </Text>
          </View>
        </View>

        <View style={{ gap: 12 }}>
          <View
            style={styles.sliderContainer}
            onLayout={(e) => {
              sliderWidth.current = e.nativeEvent.layout.width;
            }}
            {...panResponder.panHandlers}
          >
            <View style={[styles.sliderTrack, { backgroundColor: theme?.borderColor || "rgba(255, 255, 255, 0.2)" }]} />
            <LinearGradient
              colors={[theme?.primaryColor || "#00d9ffff", "#a855f7", "#ec4899"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[
                styles.sliderActiveTrack,
                { width: `${scrollSpeed * 100}%` },
              ]}
            />
            <View
              style={[
                styles.sliderThumb,
                { left: scrollSpeed * sliderWidth.current - 12 },
              ]}
            >
              <View style={[styles.sliderThumbInner, { backgroundColor: theme?.primaryColor || "#00d9ffff" }]} />
            </View>
          </View>
          <View style={styles.sliderLabels}>
            <Text style={[styles.labelText, { color: theme?.textColor }]}>Slow</Text>
            <Text style={[styles.labelText, { color: theme?.textColor }]}>Fast</Text>
          </View>
        </View>
      </LinearGradient>

      {/* SAĞDAKİ BUTONLAR */}
      <View style={styles.sideButtons}>
        <StartPauseBtn start={start} setStart={setStart} theme={theme} />
        <ResetBtn setStart={setStart} theme={theme} />
      </View>
    </View>
  );
};

export default SpeedContent;

const styles = StyleSheet.create({
  rowContainer: {
    position: "absolute", // 👈 Sabitleme
    bottom: 24, // 👈 Ekranın altından biraz boşluk
    left: 12,
    right: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    zIndex: 10, // 👈 Üstte kalması için
  },

  speedContainer: {
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "rgba(68, 73, 81, 0.5)",
    padding: 18,
    gap: 24,
  },
  speedHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  speedTitle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  speedHeaderText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  speedText: {
    borderRadius: 12,
    padding: 6,
    paddingHorizontal: 12,
  },
  sliderContainer: {
    width: "100%",
    height: 24,
    justifyContent: "center",
    position: "relative",
  },
  sliderTrack: {
    width: "100%",
    height: 8,
    borderRadius: 20,
    position: "absolute",
  },
  sliderActiveTrack: {
    height: 8,
    borderRadius: 20,
    position: "absolute",
  },
  sliderThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#fff",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  sliderThumbInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  sliderLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  labelText: {
    fontWeight: "bold",
  },
  sideButtons: {
    flexDirection: "column",
    gap: 12,
    width: 100,
  },
});
