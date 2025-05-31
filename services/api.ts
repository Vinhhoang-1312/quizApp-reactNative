import axios from "axios";

export interface QuestionType {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export const fetchQuestions = async (): Promise<QuestionType[]> => {
  const { data } = await axios.get("https://opentdb.com/api.php?amount=5");
  return data.results;
};
