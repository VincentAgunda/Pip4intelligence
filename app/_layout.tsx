// app/_layout.tsx
import { Tabs } from "expo-router";
import { PaperProvider } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { AppProvider, useAppContext } from "../context/AppContext";

function AppTabs() {
  const { theme } = useAppContext();

  return (
    <PaperProvider theme={theme}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: theme.colors.primary,
          tabBarStyle: {
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            backgroundColor: theme.colors.background,
            height: 60,
          },
          tabBarLabelStyle: { fontSize: 12, marginBottom: 6 },
        }}
      >
        {/* 🚀 PIP4 Intelligence Branding */}
        <Tabs.Screen
          name="index"
          options={{
            title: "PIP4 Intelligence",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="lightbulb" color={color} size={size} />
            ),
          }}
        />

        <Tabs.Screen
          name="history"
          options={{
            title: "History",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="history" color={color} size={size} />
            ),
          }}
        />

        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="settings" color={color} size={size} />
            ),
          }}
        />
      </Tabs>
    </PaperProvider>
  );
}

export default function RootLayout() {
  return (
    <AppProvider>
      <AppTabs />
    </AppProvider>
  );
}
