import AsyncStorage from "@react-native-async-storage/async-storage";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, ImageBackground, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
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
    <ImageBackground
      source={{ uri: "https://firebasestorage.googleapis.com/v0/b/coba-mart.appspot.com/o/background.jpg?alt=media&token=6116eee1-f85c-4c3c-b384-ce0303170415" }}
      style={styles.background}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <BlurView intensity={10} tint="light" style={styles.box}>
          <Text style={styles.title}>Welcome to Quiz App</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            placeholderTextColor="#999"
            value={name}
            onChangeText={(text) => setName(text)}
          />
          {!!error && <Text style={styles.error}>{error}</Text>}
          <TouchableOpacity style={styles.button} onPress={handleStart}>
            <Text style={styles.buttonText}>Start Quiz</Text>
          </TouchableOpacity>
        </BlurView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
    backgroundColor: "rgba(0,0,0,0.4)", // mờ lớp nền
  },
  box: {
    borderRadius: 20,
    padding: 30,
    width: "100%",
    maxWidth: 400,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "white",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    width: "100%",
    marginBottom: 12,
    backgroundColor: "#f9f9f9",
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  button: {
  backgroundColor: "#1e90ff",
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 6,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});