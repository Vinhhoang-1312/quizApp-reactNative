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

    // Lưu câu trả lời
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
        <TouchableOpacity style={[styles.controlButton, styles.quitButton]} onPress={onQuit}>
          <Text style={styles.controlButtonText}>Quit</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.controlButton, styles.nextButton]} onPress={handleNextPress}>
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
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  questionText: {
    fontSize: 18,
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: "#eee",
    padding: 12,
    marginVertical: 6,
    borderRadius: 6,
  },
  optionText: {
    fontSize: 16,
  },
  correctOption: {
    backgroundColor: "#4CAF50",
  },
  wrongOption: {
    backgroundColor: "#F44336",
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  controlButton: {
    flex: 1,
    padding: 15,
    borderRadius: 6,
    alignItems: "center",
    marginHorizontal: 5,
  },
  quitButton: {
    backgroundColor: "#f44336",
  },
  nextButton: {
    backgroundColor: "#2196F3",
  },
  controlButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  error: {
    color: "orange",
    marginBottom: 10,
  },
});
