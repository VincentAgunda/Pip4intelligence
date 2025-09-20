import { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import {
  Button,
  TextInput,
  Card,
  Text,
  ActivityIndicator,
  useTheme,
  IconButton,
} from "react-native-paper";
import { API_KEY } from "@env";
import axios from "axios";
import * as Clipboard from "expo-clipboard";
import { useAppContext } from "../context/AppContext";
import { MaterialIcons } from "@expo/vector-icons";

export default function HomeScreen() {
  const theme = useTheme();
  const { addHistory } = useAppContext();

  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const analyzePrompt = async () => {
    if (!prompt) return;

    setLoading(true);
    try {
      const res = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`,
        { contents: [{ parts: [{ text: prompt }] }] },
        { headers: { "Content-Type": "application/json" } }
      );

      let aiText =
        res.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No response from API";

      setResponse(aiText);
      addHistory({ prompt, response: aiText });
    } catch (error: any) {
      console.error("API Error:", error.response?.data || error.message);
      setResponse(
        "Error analyzing prompt: " +
          (error.response?.data?.error?.message || error.message)
      );
    }
    setLoading(false);
  };

  const copyToClipboard = async (text: string) => {
    await Clipboard.setStringAsync(text);
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.header}>
            <MaterialIcons
              name="psychology"
              size={28}
              color={theme.colors.primary}
            />
            <Text variant="headlineMedium" style={styles.title}>
              PIP4 Intelligence
            </Text>
          </View>

          <TextInput
            label="Enter your prompt"
            value={prompt}
            onChangeText={setPrompt}
            style={styles.input}
            multiline
            numberOfLines={4}
            placeholder="Ask me anything..."
            mode="outlined"
          />

          <Button
            mode="contained"
            onPress={analyzePrompt}
            loading={loading}
            disabled={!prompt || loading}
            style={styles.button}
          >
            Analyze
          </Button>

          {loading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator animating={true} size="large" />
              <Text style={styles.loadingText}>Analyzing prompt...</Text>
            </View>
          )}

          {response ? (
            <View
              style={[
                styles.responseContainer,
                { backgroundColor: theme.colors.surface },
              ]}
            >
              <View style={styles.responseHeader}>
                <Text variant="titleMedium" style={styles.responseTitle}>
                  Response
                </Text>
                <IconButton
                  icon="content-copy"
                  size={20}
                  onPress={() => copyToClipboard(response)}
                />
              </View>
              <Text style={styles.response}>{response}</Text>

              <Button
                mode="text"
                onPress={() => setResponse("")}
                style={styles.clearButton}
              >
                Clear Response
              </Button>
            </View>
          ) : null}
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: { marginTop: 20, marginBottom: 20, borderRadius: 12, elevation: 4 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  title: { marginLeft: 8, fontWeight: "bold" },
  button: { marginBottom: 16, borderRadius: 8 },
  input: { marginBottom: 16 },
  loadingContainer: { alignItems: "center", marginVertical: 16 },
  loadingText: { marginTop: 8 },
  responseContainer: { marginTop: 16, padding: 12, borderRadius: 8 },
  responseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  responseTitle: { fontWeight: "bold" },
  response: { fontSize: 16, lineHeight: 24, marginTop: 8 },
  clearButton: { marginTop: 8 },
});
