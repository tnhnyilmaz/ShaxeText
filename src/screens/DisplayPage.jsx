import {
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as ScreenOrientation from "expo-screen-orientation";
// import { Accelerometer } from "expo-sensors/build/Accelerometer";
import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SpeedContent from "../components/display/SpeedContent";
import { useTheme } from "../context/ThemeContext";
const { height } = Dimensions.get("window");

const DisplayPage = ({ route }) => {
  const { theme, isDark, toggleTheme } = useTheme();
  const { text, size, styleColor, stylesState } = route.params || {};
  const [scrollSpeed, setScrollSpeed] = useState(0.5);
  const scrollY = useRef(new Animated.Value(0)).current;
  const [start, setStart] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isLandscape, setIsLandscape] = useState(false);
  const [shakeEnabled, setShakeEnabled] = useState(false);

  // Güvenlik kontrolü
  if (!text || text.trim() === '') {
    return (
      <View style={[styles.errorContainer, { backgroundColor: theme.errorBackground }]}>
        <Text style={[styles.errorText, { color: theme.textColor }]}>Metin bulunamadı</Text>
      </View>
    );
  }

  useEffect(() => {
    // Component mount olduğunda portrait moda ayarla
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);

    // Sallama özelliği şu anda devre dışı

    // Cleanup
    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, [shakeEnabled]);

  const toggleOrientation = async () => {
    if (isLandscape) {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT
      );
      setIsLandscape(false);
    } else {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE
      );
      setIsLandscape(true);
    }
  };
  useEffect(() => {
    let animation;
    if (start) {
      scrollY.setValue(0);
      animation = Animated.loop(
        Animated.timing(scrollY, {
          toValue: 1,
          duration: Math.max(2000, 15000 / (scrollSpeed + 0.1)),
          useNativeDriver: true,
        })
      );
      animation.start();
    } else {
      scrollY.stopAnimation();
    }
    return () => {
      if (animation) animation.stop();
    };
  }, [start, scrollSpeed]);

  // İlk text: ortadan yukarı
  const translateY1 = scrollY.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, -height/2, -height],
  });
  
  // İkinci text: alttan ortaya
  const translateY2 = scrollY.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [height, height/2, 0],
  });
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.errorBackground }}>
      <TouchableWithoutFeedback onPress={() => setShowControls(!showControls)}>
        <LinearGradient
          colors={theme.background}
          start={{ x: 0.2, y: 0.1 }}
          end={{ x: 0.8, y: 1 }}
          style={styles.container}
        >
          <View style={styles.topControls}>
            <TouchableOpacity
              onPress={toggleOrientation}
              activeOpacity={0.7}
              style={[styles.controlIcon, { borderColor: theme.borderColor }]}
            >
              <MaterialCommunityIcons
                name={
                  isLandscape ? "phone-rotate-landscape" : "phone-rotate-portrait"
                }
                size={24}
                color={theme.iconColor}
              />
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={toggleTheme}
              activeOpacity={0.7}
              style={[styles.controlIcon, { borderColor: theme.borderColor }]}
            >
              <Ionicons
                name={isDark ? "sunny" : "moon"}
                size={24}
                color={theme.iconColor}
              />
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={() => {
                Alert.alert(
                  'Sallama Özelliği',
                  'Sallama özelliği şu anda Expo sınırlamaları nedeniyle çalışmıyor. Manuel olarak hızı ayarlayabilirsiniz.',
                  [{ text: 'Tamam' }]
                );
              }}
              activeOpacity={0.7}
              style={[styles.controlIcon, { borderColor: theme.borderColor, backgroundColor: 'rgba(255, 255, 255, 0.1)' }]}
            >
              <MaterialCommunityIcons
                name="gesture-swipe"
                size={24}
                color={theme.iconColor}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.textContainer}>
            {/* İlk text - ortadan yukarı */}
            <Animated.View style={[styles.animatedTextWrapper, { transform: [{ translateY: translateY1 }] }]}>
              <Text
                style={[
                  styles.displayText,
                  {
                    fontWeight: stylesState?.bold ? "bold" : "normal",
                    fontStyle: stylesState?.italic ? "italic" : "normal",
                    textDecorationLine: stylesState?.underline
                      ? "underline"
                      : "none",
                    textAlign: stylesState?.align || "center",
                    fontSize: size || 24,
                    color: styleColor || theme.textColor,
                  },
                ]}
                numberOfLines={0}
              >
                {text}
              </Text>
            </Animated.View>
            
            {/* İkinci text - alttan ortaya */}
            <Animated.View style={[styles.animatedTextWrapper, { transform: [{ translateY: translateY2 }], position: 'absolute' }]}>
              <Text
                style={[
                  styles.displayText,
                  {
                    fontWeight: stylesState?.bold ? "bold" : "normal",
                    fontStyle: stylesState?.italic ? "italic" : "normal",
                    textDecorationLine: stylesState?.underline
                      ? "underline"
                      : "none",
                    textAlign: stylesState?.align || "center",
                    fontSize: size || 24,
                    color: styleColor || theme.textColor,
                  },
                ]}
                numberOfLines={0}
              >
                {text}
              </Text>
            </Animated.View>
          </View>

          {showControls && (
            <SpeedContent
              setScrollSpeed={setScrollSpeed}
              scrollSpeed={scrollSpeed}
              start={start}
              setStart={setStart}
              isLandscape={isLandscape}
              theme={theme}
            />
          )}
        </LinearGradient>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default DisplayPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  topControls: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    gap: 8,
  },
  controlIcon: {
    width: 48,
    height: 48,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 2,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 20,
    overflow: "hidden",
  },
  animatedTextWrapper: {
    width: "100%",
    alignItems: "center",
  },
  displayText: {
    textAlign: "center",
    width: "100%",
    flexWrap: "wrap",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
  },
});
