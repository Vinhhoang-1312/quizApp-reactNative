import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Result() {
  const router = useRouter();
  const [score, setScore] = useState<number | null>(null);
  const [total, setTotal] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScore = async () => {
      try {
        const scoreString = await AsyncStorage.getItem("score");
        const totalString = await AsyncStorage.getItem("total");
        setScore(scoreString ? parseInt(scoreString, 10) : 0);
        setTotal(totalString ? parseInt(totalString, 10) : 0);
      } catch (error) {
        console.error("Error loading score from AsyncStorage", error);
      } finally {
        setLoading(false);
      }
    };
    fetchScore();
  }, []);

  const getResultImage = () => {
    if (score !== null && total !== null) {
      return score >= 2
        ? "https://cdn-icons-png.flaticon.com/512/2278/2278992.png"
        : "https://cdn-icons-png.flaticon.com/512/1828/1828843.png"; 
    }
    return "https://cdn-icons-png.flaticon.com/512/2278/2278992.png";
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.score}>Loading...</Text>
      </View>
    );
  }
 return (
    <ImageBackground
      source={{ uri: "https://firebasestorage.googleapis.com/v0/b/coba-mart.appspot.com/o/background.jpg?alt=media&token=6116eee1-f85c-4c3c-b384-ce0303170415" }}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <View style={styles.innerBox}>
          <Image source={{ uri: getResultImage() }} style={styles.image} />
          <Text style={styles.title}>Quiz Completed!</Text>
          <Text style={styles.score}>
            Your score: {score} / {total}
          </Text>
          <TouchableOpacity style={styles.button} onPress={() => router.push("/review")}>
            <Text style={styles.buttonText}>Review Answers</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.homeButton]} onPress={() => router.replace("/")}>
            <Text style={styles.buttonText}>Go Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
    paddingHorizontal: 20,
  },
  innerBox: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "transparent",
    borderRadius: 10,
    padding: 30,
    borderWidth: 1,
    borderColor: "#fff",
    alignItems: "center",
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  score: {
    fontSize: 22,
    color: "#fff",
    marginBottom: 20,
  },
  button: {
  backgroundColor: "#1e90ff",
    padding: 15,
    borderRadius: 6,
    width: "100%",
    marginVertical: 10,
    alignItems: "center",
  },
  homeButton: {
    backgroundColor: "#10255A",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});