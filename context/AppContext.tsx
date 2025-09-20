import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MD3DarkTheme, MD3LightTheme, ThemeProp } from "react-native-paper";

type HistoryItem = { prompt: string; response: string };

type AppContextType = {
  history: HistoryItem[];
  addHistory: (item: HistoryItem) => void;
  theme: ThemeProp;
  themeMode: "light" | "dark";
  toggleTheme: () => void;
};

const AppContext = createContext<AppContextType>({
  history: [],
  addHistory: () => {},
  theme: MD3LightTheme,
  themeMode: "light",
  toggleTheme: () => {},
});

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [themeMode, setThemeMode] = useState<"light" | "dark">("light");

  const THEME_KEY = "APP_THEME";
  const HISTORY_KEY = "APP_HISTORY";

  // Load saved state
  useEffect(() => {
    (async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_KEY);
        const savedHistory = await AsyncStorage.getItem(HISTORY_KEY);

        if (savedTheme === "dark") setThemeMode("dark");
        if (savedHistory) setHistory(JSON.parse(savedHistory));
      } catch (err) {
        console.warn("Error loading storage:", err);
      }
    })();
  }, []);

  // Save theme changes
  useEffect(() => {
    AsyncStorage.setItem(THEME_KEY, themeMode).catch((err) =>
      console.warn("Error saving theme:", err)
    );
  }, [themeMode]);

  // Save history changes
  useEffect(() => {
    AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(history)).catch((err) =>
      console.warn("Error saving history:", err)
    );
  }, [history]);

  const addHistory = (item: HistoryItem) => {
    setHistory((prev) => [item, ...prev]);
  };

  const toggleTheme = () => {
    setThemeMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const theme = themeMode === "dark" ? MD3DarkTheme : MD3LightTheme;

  return (
    <AppContext.Provider
      value={{ history, addHistory, theme, themeMode, toggleTheme }}
    >
      {children}
    </AppContext.Provider>
  );
};
