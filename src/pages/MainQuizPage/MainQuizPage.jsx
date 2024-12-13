import React, { useState, useEffect } from "react";

import QuizResults from "../../components/QuizResults/QuizResults";

import * as styles from "./MainQuizPage.module.css";
import { fetchQuestions, submitScore } from "../../utils/api";
import dayjs from "dayjs";

import { Link } from "react-router-dom";

const MainQuizPage = () => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [questions, setQuestions] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);

  const [quizMeta, setQuizMeta] = useState({
    startedAt: null,
    completedAt: null,
    isCompleted: false,
    finalScore: null,
    finalTime: null,
  });

  const [userName, setUserName] = useState("");
  const [submitting, setSubmitting] = useState(false);

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

    if (showQuiz) {
      loadQuestions();
    }
  }, [showQuiz]);

  const handleStartQuiz = () => {
    setShowQuiz(true);
  };

  const handleAnswer = (answer) => {
    const currentFile = questions[currentQuestion];

    setUserAnswers((prevAnswers) => [
      ...prevAnswers,
      { file: currentFile, isReal: answer === "real" },
    ]);

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

  const handleSubmit = async () => {
    setSubmitting(true);
    const requestData = {
      name: userName,
      results: userAnswers,
    };

    try {
      // The back is expected to return an object { score: number, time: number }
      const responseData = await submitScore(requestData);

      setQuizMeta((prev) => ({
        ...prev,
        finalScore: responseData.score,
        finalTime: responseData.time,
      }));
    } catch (error) {
      console.error("Error submitting score:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const resetQuiz = () => {
    setShowQuiz(false);
    setQuestions(null);
    setCurrentQuestion(0);
    setUserAnswers([]);
    setQuizMeta({
      startedAt: null,
      completedAt: null,
      isCompleted: false,
      finalScore: null,
      finalTime: null,
    });
    setUserName("");
  };

  if (!showQuiz) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Welcome to the Quiz!</h1>
        <button onClick={handleStartQuiz} className={styles.button}>
          Start Quiz
        </button>
        <Link to="/leaderboard" className={styles.button}>
          View Leaderboard
        </Link>
      </div>
    );
  }

  if (questions === null) {
    return <div>Loading...</div>;
  }

  if (quizMeta.isCompleted) {
    return (
      <QuizResults
        score={quizMeta.finalScore}
        timeTaken={quizMeta.finalTime}
        onSubmit={handleSubmit}
        userName={userName}
        setUserName={setUserName}
        resetQuiz={resetQuiz}
        submitting={submitting}
      />
    );
  }

  const currentFile = questions[currentQuestion];
  const extension = currentFile.split(".").pop().toLowerCase();
  const isVideo = ["mp4", "mov"].includes(extension);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Question {currentQuestion + 1}</h1>
      {isVideo ? (
        <video key={currentQuestion} className={styles.media} controls>
          <source src={`http://${currentFile}`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <img
          key={currentQuestion}
          src={`http://${currentFile}`}
          alt="question"
          className={styles.image}
        />
      )}

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

export default MainQuizPage;
