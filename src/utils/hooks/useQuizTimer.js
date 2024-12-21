import { useState, useEffect } from "react";
import dayjs from "dayjs";

export function useQuizTimer(quizMeta, showQuiz, questionStartTime) {
  const [totalTimeSpent, setTotalTimeSpent] = useState(0);
  const [questionTimeSpent, setQuestionTimeSpent] = useState(0);

  useEffect(() => {
    if (showQuiz && !quizMeta.isCompleted && quizMeta.startedAt) {
      const interval = setInterval(() => {
        const now = dayjs();
        const totalDiff = now.diff(quizMeta.startedAt, "second");
        setTotalTimeSpent(totalDiff);

        if (questionStartTime) {
          const questionDiff = now.diff(questionStartTime, "second");
          setQuestionTimeSpent(questionDiff);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [showQuiz, quizMeta.isCompleted, quizMeta.startedAt, questionStartTime]);

  return { totalTimeSpent, questionTimeSpent, setQuestionTimeSpent };
}
