import { useState, useCallback } from "react";
import { fetchQuestions } from "../api";
import dayjs from "dayjs";

export function useQuestions() {
  const [questions, setQuestions] = useState(null);

  const loadQuestions = useCallback(
    async (setQuizMeta, setQuestionStartTime) => {
      const preparedQuestions = await fetchQuestions();
      setQuestions(preparedQuestions);

      const start = dayjs();
      setQuizMeta((prev) => ({ ...prev, startedAt: start }));
      setQuestionStartTime(start);
    },
    []
  );

  return { questions, setQuestions, loadQuestions };
}
