import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomePage from "./src/screens/HomePage";
import DisplayPage from "./src/screens/DisplayPage";
import { ThemeProvider } from "./src/context/ThemeContext";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Home" component={HomePage} />
          <Stack.Screen name="DisplayPage" component={DisplayPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
