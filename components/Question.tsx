import he from "he";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface QuestionProps {
  currQues: number;
  setCurrQues: (n: number) => void;
  questions: any[];
  options: string[];
  correct: string;
  score: number;
  setScore: (score: number) => void;
  userAnswers: any[];
  setUserAnswers: (answers: any[]) => void;
  onNext: () => void;
  onQuit: () => void;
}

const Question: React.FC<QuestionProps> = ({
  currQues,
  setCurrQues,
  questions,
  options,
  correct,
  score,
  setScore,
  userAnswers,
  setUserAnswers,
  onNext,
  onQuit,
}) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [error, setError] = useState<string>("");

  const handleSelect = (option: string) => {
    if (selected) return; // disable change after selected
    setSelected(option);
    setError("");
    if (option === correct) setScore(score + 1);

    const updatedAnswers = [...userAnswers];
    updatedAnswers[currQues] = {
      question: questions[currQues].question,
      correct: correct,
      selected: option,
      options: options,
      answerText: questions[currQues].correct_answer,
    };
    setUserAnswers(updatedAnswers);
  };

  const getOptionStyle = (option: string) => {
    if (!selected) return styles.optionButton;

    if (option === selected && option === correct) {
      return [styles.optionButton, styles.correctOption];
    }
    if (option === selected && option !== correct) {
      return [styles.optionButton, styles.wrongOption];
    }
    if (option === correct) {
      return [styles.optionButton, styles.correctOption];
    }
    return styles.optionButton;
  };

  const handleNextPress = () => {
    if (!selected) {
      setError("Please select an option first");
      return;
    }
    setSelected(null);
    setError("");
    onNext();
  };

  return (
    <View style={styles.questionContainer}>
      <Text style={styles.questionCount}>
        Question {currQues + 1} / {questions.length}
      </Text>
      <Text style={styles.questionText}>{he.decode(questions[currQues].question)}</Text>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      {options.map((option) => (
        <TouchableOpacity
          key={option}
          style={getOptionStyle(option)}
          onPress={() => handleSelect(option)}
          disabled={!!selected}
        >
          <Text style={styles.optionText}>{he.decode(option)}</Text>
        </TouchableOpacity>
      ))}

     <View style={styles.controls}>
  <TouchableOpacity
    style={[styles.controlButton, styles.quitButton]}
    onPress={onQuit}
  >
    <Text style={[styles.controlButtonText, { color: "#ccc" }]}>Quit</Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={[styles.controlButton, styles.nextButton]}
    onPress={handleNextPress}
  >
    <Text style={styles.controlButtonText}>
      {currQues === questions.length - 1 ? "Submit" : "Next Question"}
    </Text>
  </TouchableOpacity>
</View>
    </View>
  );
};

export default Question;

const styles = StyleSheet.create({
  questionContainer: {
    flex: 1,
  },
  questionCount: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  questionText: {
    fontSize: 20,
    marginBottom: 20,
    color: "white",
  },
  optionButton: {
    backgroundColor: "#eee",
    padding: 12,
    marginVertical: 6,
    borderRadius: 6,
  },
  optionText: {
    fontSize: 16,
    textAlign: "center",
  },
 correctOption: {
  backgroundColor: "#9FD39F", 
  borderColor: "#10B981",   
  borderWidth: 1,
},
wrongOption: {
  backgroundColor: "#CF9EA2",
  borderColor: "#CD1423",   
  borderWidth: 1,
},
 controls: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: 30,
},

controlButton: {
  paddingVertical: 12,
  paddingHorizontal: 20,
  borderRadius: 30,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 3,
  elevation: 2,
},

quitButton: {
  backgroundColor: "transparent",
  borderWidth: 1,
  borderColor: "#ccc",
  marginRight: 10,
},

nextButton: {
  backgroundColor: "#1e90ff",
},

controlButtonText: {
  color: "#fff",
  fontWeight: "600",
  fontSize: 16,
},

  error: {
    color: "orange",
    marginBottom: 10,
  },
});
