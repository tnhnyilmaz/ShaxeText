import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Button,
  Alert,
} from "react-native";
import TextInputTopText from "./TextInputTopText";
import BottomIconText from "./BottomIconText";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";

const TextInputContainer = ({text,setText}) => {
  const { theme } = useTheme();
  const [isListening, setListening] = useState(false);

  useEffect(() => {}, []);

  const handleVoiceInput = () => {
    Alert.alert(
      'Gerçek Ses Tanıma',
      'Gerçek ses tanıma için:\n\n1. Google Cloud Speech API\n2. Azure Speech Services\n3. AWS Transcribe\n\ngibi harici servisler gerekiyor.\n\nŞu anda Expo bu özelliği desteklemiyor.',
      [
        { text: 'Tamam' },
        { 
          text: 'Manuel Giriş', 
          onPress: () => {
            // Manuel metin girişi için input'a odaklan
          }
        }
      ]
    );
  };

  const handleTextChange = (value) => {
    setText(value);
  };

  const handleClear = () => {
    setText("");
  };

  return (
    <View style={styles.wrapper}>
      <View style={[styles.textInputContainer, { backgroundColor: "white" }]}>
        <TextInputTopText />
        <TextInput
          style={styles.textInput}
          editable
          placeholder="Type your message here..."
          multiline
          value={text}
          onChangeText={handleTextChange}
        />
        <View style={styles.iconRow}>
          <TouchableOpacity onPress={handleVoiceInput}>
            <BottomIconText
              icon={<FontAwesome name="microphone" size={20} color={isListening ? "#ef4444" : "#6b7280"} />}
              label={isListening ? "Dinliyor..." : "Voice Input"}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleClear}>
            <BottomIconText
              icon={<FontAwesome5 name="eraser" size={20} color="#6b7280" />}
              label={"Clear"}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default TextInputContainer;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  textInputContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
  },
  textInput: {
    flex: 1,
    backgroundColor: "#f9fafb",
    borderRadius: 16,
    padding: 10,
    marginVertical: 10,
    textAlignVertical: "top", // multiline TextInput için
  },
  iconRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});
