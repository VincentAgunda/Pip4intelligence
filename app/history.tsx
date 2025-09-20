import { ScrollView, StyleSheet } from "react-native";
import { Card, Text, useTheme } from "react-native-paper";
import { useAppContext } from "../context/AppContext";

export default function HistoryScreen() {
  const { history } = useAppContext();
  const theme = useTheme();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Text variant="headlineMedium" style={styles.title}>
        History
      </Text>
      {history.length === 0 ? (
        <Text>No history yet. Try asking something!</Text>
      ) : (
        history.map((item, index) => (
          <Card key={index} style={styles.card}>
            <Card.Content>
              <Text style={styles.prompt}>Q: {item.prompt}</Text>
              <Text style={styles.response}>A: {item.response}</Text>
            </Card.Content>
          </Card>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { textAlign: "center", marginBottom: 20, fontWeight: "bold" },
  card: { marginBottom: 12, borderRadius: 8 },
  prompt: { fontWeight: "600", marginBottom: 4 },
  response: { color: "#333" },
});
