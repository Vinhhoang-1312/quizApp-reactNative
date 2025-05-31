import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, ImageBackground, StyleSheet, View } from "react-native";
import Question from "../../components/Question";
import { QuestionType } from "../../services/api";

export default function Quiz() {
  const router = useRouter();
  const { questions: questionsParam } = useLocalSearchParams<{ questions?: string }>();
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [currQues, setCurrQues] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState<any[]>([]);
  const [options, setOptions] = useState<string[]>([]);

 useEffect(() => {
  if (questionsParam) {
    try {
      const parsed = JSON.parse(questionsParam);
      setQuestions(parsed);
      setCurrQues(0);
      setScore(0);
      setUserAnswers([]);
    } catch (e) {
      console.error("Failed to parse questionsParam", e);
    }
  }
}, [questionsParam]);

  useEffect(() => {
    if (questions && questions[currQues]) {
      setOptions(
        shuffleOptions([questions[currQues].correct_answer, ...questions[currQues].incorrect_answers])
      );
    }
  }, [questions, currQues]);

  const shuffleOptions = (options: string[]) => {
    return [...options].sort(() => Math.random() - 0.5);
  };

  const handleNext = async () => {
    if (currQues === questions.length - 1) {
      await AsyncStorage.setItem("score", score.toString());
      await AsyncStorage.setItem("total", questions.length.toString());
      await AsyncStorage.setItem("userAnswers", JSON.stringify(userAnswers));
      router.replace("/result");
    } else {
      setCurrQues(currQues + 1);
    }
  };

  if (!questions || questions.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
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
          <Question
            currQues={currQues}
            setCurrQues={setCurrQues}
            questions={questions}
            options={options}
            correct={questions[currQues].correct_answer}
            score={score}
            setScore={setScore}
            userAnswers={userAnswers}
            setUserAnswers={setUserAnswers}
            onNext={handleNext}
            onQuit={async () => {
              await AsyncStorage.clear();
              router.replace("/");
            }}
          />
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
    paddingHorizontal: 20,
        backgroundColor: "rgba(0,0,0,0.4)", 

  },
innerBox: {
  width: "100%",
  maxWidth: 400,
  backgroundColor: "transparent", 
  borderRadius: 10,
  padding: 30,
  borderWidth: 1,
  borderColor: "#fff",          
},

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});