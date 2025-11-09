import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const themes = {
  dark: {
    background: ['#141a24', '#010102', '#141a24'],
    homeBackground: ['#6666f2', '#846ffb'],
    textColor: '#fff',
    primaryColor: '#00d9ffff',
    secondaryColor: '#6366f1',
    cardBackground: 'rgba(38, 42, 49, 0.6)',
    borderColor: '#444951ff',
    iconColor: '#fff',
    buttonBackground: '#11accfff',
    errorBackground: '#000',
  },
  light: {
    background: ['#f8fafc', '#e2e8f0', '#f1f5f9'],
    homeBackground: ['#3b82f6', '#6366f1'],
    textColor: '#1f2937',
    primaryColor: '#3b82f6',
    secondaryColor: '#6366f1',
    cardBackground: 'rgba(255, 255, 255, 0.9)',
    borderColor: '#d1d5db',
    iconColor: '#374151',
    buttonBackground: '#3b82f6',
    errorBackground: '#fff',
  },
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const currentTheme = isDark ? themes.dark : themes.light;

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, theme: currentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};