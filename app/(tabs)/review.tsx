import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import he from "he";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface AnswerReview {
  question: string;
  correct: string;
  selected: string;
  options: string[];
}

export default function Review() {
  const router = useRouter();
  const [answers, setAnswers] = useState<AnswerReview[]>([]);

  useEffect(() => {
    (async () => {
      const storedAnswers = await AsyncStorage.getItem("userAnswers");
      if (storedAnswers) {
        setAnswers(JSON.parse(storedAnswers));
      }
    })();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Review Your Answers</Text>
      {answers.map((ans, index) => (
        <View
          key={index}
          style={[
            styles.questionBlock,
            ans.selected === ans.correct ? styles.correct : styles.wrong,
          ]}
        >
          <Text style={styles.questionText}>{he.decode(ans.question)}</Text>
          <Text>
            Your answer: <Text style={styles.answerText}>{he.decode(ans.selected)}</Text>
          </Text>
          <Text>Correct answer: {he.decode(ans.correct)}</Text>
        </View>
      ))}

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.replace("/")}
      >
        <Text style={styles.buttonText}>Back to Home</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  questionBlock: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 8,
  },
  correct: {
    backgroundColor: "#C8E6C9",
  },
  wrong: {
    backgroundColor: "#FFCDD2",
  },
  questionText: {
    fontSize: 18,
    marginBottom: 8,
  },
  answerText: {
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#2196F3",
    padding: 15,
    borderRadius: 6,
    marginTop: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});