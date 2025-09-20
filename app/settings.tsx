import { View, StyleSheet } from "react-native";
import { Text, Switch, Card, useTheme } from "react-native-paper";
import { useAppContext } from "../context/AppContext";

export default function SettingsScreen() {
  const { themeMode, toggleTheme } = useAppContext();
  const paperTheme = useTheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: paperTheme.colors.background },
      ]}
    >
      <Text variant="headlineMedium" style={styles.title}>
        Settings
      </Text>

      <Card style={styles.card}>
        <Card.Content style={styles.row}>
          <Text>Dark Mode</Text>
          <Switch
            value={themeMode === "dark"}
            onValueChange={toggleTheme}
            color={paperTheme.colors.primary}
          />
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { textAlign: "center", marginBottom: 20, fontWeight: "bold" },
  card: { marginBottom: 12, borderRadius: 8 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
