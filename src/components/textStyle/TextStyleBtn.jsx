import { Feather, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../../context/ThemeContext";

const TextStyleBtn = ({ text, stylesState, size, styleColor }) => {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const [modal, setModal] = useState(false);
  
  const handleNavigation = () => {
    if (!text || text.trim() === '') {
      alert('Lütfen önce bir metin girin!');
      return;
    }
    navigation.navigate("DisplayPage", {
      text: text,
      size: size,
      styleColor: styleColor,
      stylesState: stylesState,
    });
  };
  return (
    <View style={{ flex: 1, marginTop: 70, gap: 12 }}>
      <TouchableOpacity 
        style={[styles.btnPrev, { backgroundColor: "white" }, !text && styles.btnDisabled]} 
        onPress={() => text ? setModal(true) : alert('Lütfen önce bir metin girin!')}
        disabled={!text}
      >
        <FontAwesome name="eye" size={24} color={theme.secondaryColor} />
        <Text style={{ color: theme.secondaryColor, fontWeight: "600" }}>Preview</Text>
      </TouchableOpacity>
      <Modal
        visible={modal}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: "white" }]}>
            <Text
              style={{
                fontWeight: stylesState?.bold ? "bold" : "normal",
                fontSize: size || 16,
                color: styleColor || "#000",
                fontStyle: stylesState?.italic ? "italic" : "normal",
                textAlign: stylesState?.align || "left",
                textDecorationLine: stylesState?.underline
                  ? "underline"
                  : "none",
              }}
            >
              {text || 'Metin bulunamadı'}
            </Text>
            <Pressable
              style={[styles.closeButton, { backgroundColor: theme.secondaryColor }]}
              onPress={() => setModal(false)}
            >
              <Text style={{ color: theme.textColor }}>Kapat</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        style={[styles.btnPrev, { backgroundColor: theme.buttonBackground }, !text && styles.btnDisabled]}
        onPress={handleNavigation}
        disabled={!text}
      >
        <Text style={{ color: "#fff" }}>Start Display</Text>
        <Feather name="arrow-right" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default TextStyleBtn;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    borderRadius: 16,
    padding: 24,
    width: "80%",
    alignItems: "center",
  },
  closeButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  btnPrev: {
    width: "100%",
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
    justifyContent: "center",
    gap: 12,
  },
  btnDisabled: {
    opacity: 0.5,
    backgroundColor: "#ccc",
  },
});
