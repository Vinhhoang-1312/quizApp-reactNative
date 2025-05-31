import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { fetchQuestions, QuestionType } from "../../services/api";

export default function HomeScreen() {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleStart = async () => {
    if (!name.trim()) {
      setError("Please enter your name");
      return;
    }
    setError("");
    try {
      const questions: QuestionType[] = await fetchQuestions();
      await AsyncStorage.setItem("score", "0");
      await AsyncStorage.setItem("startTime", Date.now().toString());
      await AsyncStorage.setItem("userAnswers", JSON.stringify([]));
      await AsyncStorage.setItem("name", name);
      router.push({
        pathname: "/quiz",
        params: { name, questions: JSON.stringify(questions) },
      });
    } catch (error) {
      Alert.alert("Error", "Failed to fetch questions. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Quiz App</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      {!!error && <Text style={styles.error}>{error}</Text>}
      <TouchableOpacity style={styles.button} onPress={handleStart}>
        <Text style={styles.buttonText}>Start Quiz</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    marginBottom: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
    fontSize: 18,
  },
  error: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#2196F3",
    paddingVertical: 15,
    borderRadius: 6,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});