import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as ScreenOrientation from "expo-screen-orientation";
import { Accelerometer } from "expo-sensors";
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
  const [shakeAxis, setShakeAxis] = useState("y"); // 'x' veya 'y'

  // ========== SHAKE DETECTION STATES ==========
  const [subscription, setSubscription] = useState(null);
  const accelerationHistory = useRef([]);
  const currentShakeSpeedRef = useRef(0.3); // Sadece ref, state yok!

  // Güvenlik kontrolü
  if (!text || text.trim() === "") {
    return (
      <View
        style={[
          styles.errorContainer,
          { backgroundColor: theme.errorBackground },
        ]}
      >
        <Text style={[styles.errorText, { color: theme.textColor }]}>
          Metin bulunamadı
        </Text>
      </View>
    );
  }

  // ========== SHAKE MODE CONTROL ==========
  useEffect(() => {
    if (shakeEnabled) {
      _subscribe();
      setStart(false); // Manuel başlatmayı durdur
    } else {
      _unsubscribe();
      currentShakeSpeedRef.current = 0.3; // State yerine ref'i sıfırla
    }

    return () => _unsubscribe();
  }, [shakeEnabled]);

  const _subscribe = () => {
    setSubscription(
      Accelerometer.addListener((accelerometerData) => {
        handleAcceleration(accelerometerData);
      })
    );
    Accelerometer.setUpdateInterval(50);
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  const handleAcceleration = ({ x, y, z }) => {
    // Seçilen eksene göre ivme değerini al
    const selectedAcceleration = shakeAxis === "x" ? Math.abs(x) : Math.abs(y);

    // Gravity etkisini çıkar
    const netAcceleration = Math.abs(
      selectedAcceleration - (shakeAxis === "y" ? 1 : 0)
    );

    accelerationHistory.current.push(netAcceleration);
    if (accelerationHistory.current.length > 5) {
      accelerationHistory.current.shift();
    }

    const avgAcceleration =
      accelerationHistory.current.reduce((a, b) => a + b, 0) /
      accelerationHistory.current.length;

    let calculatedSpeed = 0.3;
    if (avgAcceleration > 0.03) {
      calculatedSpeed = Math.min(0.3 + avgAcceleration * 20, 5);
    }

    // SADECE ref'e yaz - state güncellemesi YOK, render YOK!
    currentShakeSpeedRef.current = calculatedSpeed;
  };

  const toggleShakeMode = () => {
    setShakeEnabled(!shakeEnabled);
    if (shakeEnabled) {
      setStart(false);
    }
  };

  const toggleShakeAxis = () => {
    setShakeAxis((prev) => (prev === "x" ? "y" : "x"));
    // Eksen değiştiğinde geçmiş verileri temizle
    accelerationHistory.current = [];
  };

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);

    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);

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

  // ========== ANIMATION LOGIC ==========
  const animationRef = useRef(null);
  const lastSpeedRef = useRef(0);
  const animationLoopRef = useRef(null);

  useEffect(() => {
    if (!shakeEnabled && !start) {
      if (animationRef.current) {
        animationRef.current.stop();
        animationRef.current = null;
      }
      scrollY.setValue(0);
      return;
    }

    // Shake modunda sürekli animasyon güncelleme
    if (shakeEnabled) {
      const updateAnimation = () => {
        const effectiveSpeed = currentShakeSpeedRef.current; // Ref'ten oku

        if (effectiveSpeed > 0) {
          const speedDiff = Math.abs(effectiveSpeed - lastSpeedRef.current);

          // Sadece önemli hız değişikliklerinde güncelle
          if (speedDiff > 0.5 || !animationRef.current) {
            scrollY.stopAnimation((currentValue) => {
              const duration = Math.max(2000, 15000 / (effectiveSpeed + 0.1));

              const remaining = 1 - currentValue;
              const adjustedDuration = duration * remaining;

              if (animationRef.current) {
                animationRef.current.stop();
              }

              animationRef.current = Animated.loop(
                Animated.sequence([
                  Animated.timing(scrollY, {
                    toValue: 1,
                    duration: Math.max(100, adjustedDuration),
                    useNativeDriver: true,
                  }),
                  Animated.timing(scrollY, {
                    toValue: 0,
                    duration: 0,
                    useNativeDriver: true,
                  }),
                  Animated.timing(scrollY, {
                    toValue: 1,
                    duration: duration,
                    useNativeDriver: true,
                  }),
                ])
              );

              animationRef.current.start();
              lastSpeedRef.current = effectiveSpeed;
            });
          }
        }
      };

      // İlk animasyonu başlat
      updateAnimation();

      // Her 500ms'de bir animasyonu güncelle
      animationLoopRef.current = setInterval(updateAnimation, 500);

      return () => {
        if (animationLoopRef.current) {
          clearInterval(animationLoopRef.current);
        }
        if (animationRef.current) {
          animationRef.current.stop();
        }
      };
    } else if (start) {
      // Manuel mod
      const duration = Math.max(2000, 15000 / (scrollSpeed + 0.1));
      scrollY.setValue(0);

      if (animationRef.current) {
        animationRef.current.stop();
      }

      animationRef.current = Animated.loop(
        Animated.timing(scrollY, {
          toValue: 1,
          duration: duration,
          useNativeDriver: true,
        })
      );

      animationRef.current.start();

      return () => {
        if (animationRef.current) {
          animationRef.current.stop();
        }
      };
    }
  }, [start, scrollSpeed, shakeEnabled]); // currentShakeSpeed kaldırıldı

  // İlk text: ortadan yukarı
  const translateY1 = scrollY.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, -height / 2, -height],
  });

  // İkinci text: alttan ortaya
  const translateY2 = scrollY.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [height, height / 2, 0],
  });

  const getSpeedColor = () => {
    const speed = currentShakeSpeedRef.current;
    if (speed < 0.5) return "#4CAF50";
    if (speed < 1.5) return "#FF9800";
    return "#f44336";
  };

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
                  isLandscape
                    ? "phone-rotate-landscape"
                    : "phone-rotate-portrait"
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

            {/* Shake Axis Toggle - Sadece shake modunda aktif */}
            <TouchableOpacity
              onPress={toggleShakeAxis}
              activeOpacity={0.7}
              disabled={!shakeEnabled}
              style={[
                styles.controlIcon,
                {
                  borderColor: theme.borderColor,
                  backgroundColor: shakeEnabled
                    ? shakeAxis === "x"
                      ? "rgba(33, 150, 243, 0.3)"
                      : "rgba(76, 175, 80, 0.3)"
                    : "rgba(255, 255, 255, 0.1)",
                  opacity: shakeEnabled ? 1 : 0.5,
                },
              ]}
            >
              <Text
                style={[
                  styles.axisText,
                  { color: shakeEnabled ? theme.iconColor : theme.borderColor },
                ]}
              >
                {shakeAxis.toUpperCase()}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={toggleShakeMode}
              activeOpacity={0.7}
              style={[
                styles.controlIcon,
                {
                  borderColor: theme.borderColor,
                  backgroundColor: shakeEnabled
                    ? "rgba(255, 152, 0, 0.3)"
                    : "rgba(255, 255, 255, 0.1)",
                },
              ]}
            >
              <MaterialCommunityIcons
                name="gesture-swipe"
                size={24}
                color={shakeEnabled ? "#FF9800" : theme.iconColor}
              />
            </TouchableOpacity>
          </View>

          {/* Shake Speed Indicator - Kaldırıldı çünkü render'a neden oluyor */}
          {/* Shake modunda hız göstergesi olmayacak, sadece animasyon kayacak */}

          <View style={styles.textContainer}>
            {/* İlk text - ortadan yukarı */}
            <Animated.View
              style={[
                styles.animatedTextWrapper,
                { transform: [{ translateY: translateY1 }] },
              ]}
            >
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
            <Animated.View
              style={[
                styles.animatedTextWrapper,
                {
                  transform: [{ translateY: translateY2 }],
                  position: "absolute",
                },
              ]}
            >
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

          {showControls && !shakeEnabled && (
            <SpeedContent
              setScrollSpeed={setScrollSpeed}
              scrollSpeed={scrollSpeed}
              start={start}
              setStart={setStart}
              isLandscape={isLandscape}
              theme={theme}
            />
          )}

          {showControls && shakeEnabled && (
            <View
              style={[
                styles.shakeInfo,
                { backgroundColor: "rgba(0, 0, 0, 0.3)" },
              ]}
            >
              <Text style={[styles.shakeInfoText, { color: theme.textColor }]}>
                🔔 Telefonu {shakeAxis === "x" ? "Sağa-Sola" : "Yukarı-Aşağı"}{" "}
                sallayın!
              </Text>
              <Text
                style={[styles.shakeInfoSubtext, { color: theme.textColor }]}
              >
                {shakeAxis === "x"
                  ? "← → Yatay eksende sallamalar algılanıyor"
                  : "↑ ↓ Dikey eksende sallamalar algılanıyor"}
              </Text>
              <Text
                style={[
                  styles.shakeInfoSubtext,
                  { color: theme.textColor, marginTop: 4 },
                ]}
              >
                Ekseni değiştirmek için üstteki "{shakeAxis.toUpperCase()}"
                butonuna tıklayın
              </Text>
            </View>
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
  shakeIndicator: {
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  shakeLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    textAlign: "center",
  },
  speedBarContainer: {
    height: 8,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 4,
    overflow: "hidden",
  },
  speedBar: {
    height: "100%",
    borderRadius: 4,
  },
  shakeInfo: {
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  shakeInfoText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  shakeInfoSubtext: {
    fontSize: 12,
    opacity: 0.8,
  },
  axisText: {
    fontSize: 20,
    fontWeight: "bold",
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
