import React, { useEffect, useState } from "react";

import QuizResults from "../QuizResults/QuizResults";

import * as styles from "./QuizPage.module.css";
import { fetchQuestions, submitScore } from "../../utils/api";

import dayjs from "dayjs";

const QuizPage = () => {
  const [questions, setQuestions] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [quizMeta, setQuizMeta] = useState({
    startedAt: null,
    completedAt: null,
    isCompleted: false,
  });
  const [userName, setUserName] = useState("");

  // Загружаем вопросы
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const preparedQuestions = await fetchQuestions();
        setQuestions(preparedQuestions);
        setQuizMeta((prev) => ({ ...prev, startedAt: dayjs() }));
      } catch (error) {
        console.error("Failed to load questions");
      }
    };
    loadQuestions();
  }, []);

  // Обработка ответа пользователя
  const handleAnswer = (answer) => {
    const isCorrect =
      answer === (questions[currentQuestion].isReal ? "real" : "fake");

    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setQuizMeta((prev) => ({
        ...prev,
        completedAt: dayjs(),
        isCompleted: true,
      }));
    }
  };

  // Отправка данных после завершения квиза
  const handleSubmit = async () => {
    const timeTaken = quizMeta.completedAt.diff(quizMeta.startedAt, "seconds");
    const resultData = {
      name: userName,
      score: score,
      time: timeTaken,
    };

    console.log("Result data prepared for backend:", resultData);
    await submitScore(resultData);
  };

  if (questions === null) {
    return <div>Loading...</div>;
  }

  // Отображение результата и формы ввода имени
  if (quizMeta.isCompleted) {
    return (
      <QuizResults
        score={score}
        startedAt={quizMeta.startedAt}
        completedAt={quizMeta.completedAt}
        onSubmit={handleSubmit}
        userName={userName}
        setUserName={setUserName}
      />
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Question {currentQuestion + 1}</h1>
      {questions[currentQuestion] &&
        (questions[currentQuestion].file &&
        ["mp4", "MOV", "mov"].some((ext) =>
          questions[currentQuestion].file.endsWith(ext)
        ) ? (
          <video key={currentQuestion} className={styles.media} controls>
            <source
              src={`http://${questions[currentQuestion].file}`}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        ) : (
          <img
            key={currentQuestion}
            src={`http://${questions[currentQuestion].file}`}
            alt="question"
            className={styles.image}
          />
        ))}

      <div className={styles.buttons}>
        <button onClick={() => handleAnswer("real")} className={styles.button}>
          Real
        </button>
        <button onClick={() => handleAnswer("fake")} className={styles.button}>
          AI Generated
        </button>
      </div>
    </div>
  );
};

export default QuizPage;
