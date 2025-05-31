import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Result() {
  const router = useRouter();
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    (async () => {
      const scoreString = await AsyncStorage.getItem("score");
      const totalString = await AsyncStorage.getItem("total");
      setScore(scoreString ? parseInt(scoreString, 10) : 0);
      setTotal(totalString ? parseInt(totalString, 10) : 0);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://cdn-icons-png.flaticon.com/512/2278/2278992.png" }}
        style={styles.image}
      />
      <Text style={styles.title}>Quiz Completed!</Text>
      <Text style={styles.score}>
        Your score: {score} / {total}
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/review")}
      >
        <Text style={styles.buttonText}>Review Answers</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.homeButton]}
        onPress={() => router.replace("/")}
      >
        <Text style={styles.buttonText}>Go Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 30,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  score: {
    fontSize: 24,
    marginVertical: 20,
  },
  button: {
    backgroundColor: "#2196F3",
    padding: 15,
    borderRadius: 6,
    width: "60%",
    marginVertical: 10,
    alignItems: "center",
  },
  homeButton: {
    backgroundColor: "#f44336",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});