import React, { useState, useEffect } from "react";
import * as styles from "./MainQuizPage.module.css";

import QuizResults from "../../components/QuizResults/QuizResults";
import StartScreen from "./components/StartScreen/StartScreen";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";
import MobileQuiz from "./components/MobileQuiz/MobileQuiz";
import DesktopQuiz from "./components/DesktopQuiz/DesktopQuiz";
import Header from "../../components/Header/Header";

import { useIsMobile } from "../../utils/hooks/useIsMobile";
import { useQuizTimer } from "../../utils/hooks/useQuizTimer";
import { useQuestions } from "../../utils/hooks/useQuestions";
import { submitScore, submitHighscore } from "../../utils/api";

import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const MainQuizPage = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const [showQuiz, setShowQuiz] = useState(false);
  const { questions, setQuestions, loadQuestions } = useQuestions();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);

  const [quizMeta, setQuizMeta] = useState({
    startedAt: null,
    completedAt: null,
    isCompleted: false,
    finalScore: null,
    finalTime: null,
    isTopTen: false,
  });

  const [userName, setUserName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [mobileStep, setMobileStep] = useState("initial");
  const [questionStartTime, setQuestionStartTime] = useState(null);

  const { totalTimeSpent, questionTimeSpent, setQuestionTimeSpent } =
    useQuizTimer(quizMeta, showQuiz, questionStartTime);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("start") === "1") {
      handleStartQuiz();
    }
  }, []);

  const handleMobileTakeQuiz = () => {
    if (isMobile && mobileStep === "initial") {
      setMobileStep("info");
    } else {
      handleStartQuiz();
    }
  };

  const handleMobileReady = () => {
    handleStartQuiz();
  };

  const handleStartQuiz = async () => {
    setShowQuiz(true);
    await loadQuestions(setQuizMeta, setQuestionStartTime);
  };

  const handleTryAgain = async () => {
    resetQuiz();
    try {
      await loadQuestions(setQuizMeta, setQuestionStartTime);
      setShowQuiz(true);
    } catch (error) {
      console.error("Failed to fetch questions:", error);
    }
  };

  const handleAnswer = (answer) => {
    const currentFileObj = questions[currentQuestion];
    const userIsReal = answer === "real";
    const isCorrect = currentFileObj.isReal === userIsReal;

    // Сохраняем правильность ответа сразу
    setUserAnswers((prevAnswers) => [
      ...prevAnswers,
      {
        id: currentFileObj.id,
        isReal: userIsReal,
        correct: isCorrect,
      },
    ]);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setQuestionStartTime(dayjs());
      setQuestionTimeSpent(0);
    } else {
      setQuizMeta((prev) => ({
        ...prev,
        completedAt: dayjs(),
        isCompleted: true,
      }));
    }
  };

  useEffect(() => {
    const fetchFinalResults = async () => {
      if (
        quizMeta.isCompleted &&
        quizMeta.finalScore === null &&
        userAnswers.length === 10
      ) {
        setSubmitting(true);
        const requestData = {
          results: userAnswers.map((ans) => ({
            id: ans.id,
            isReal: ans.isReal,
          })),
          time: totalTimeSpent,
        };

        try {
          const responseData = await submitScore(requestData);
          setQuizMeta((prev) => ({
            ...prev,
            finalScore: responseData.score,
            finalTime: totalTimeSpent,
            isTopTen: responseData.isHighScore,
          }));
        } catch (error) {
          console.error("Error submitting score:", error);
        } finally {
          setSubmitting(false);
        }
      }
    };

    fetchFinalResults();
  }, [quizMeta.isCompleted, quizMeta.finalScore, totalTimeSpent, userAnswers]);

  const handleSubmitHighscore = async () => {
    setSubmitting(true);
    const requestData = {
      name: userName,
      time: quizMeta.finalTime,
      results: userAnswers.map((ans) => ({
        id: ans.id,
        isReal: ans.isReal,
      })),
    };

    try {
      await submitHighscore(requestData);
      navigate("/quiz_app_FE/leaderboard");
    } catch (error) {
      console.error("Error submitting highscore:", error);
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
      isTopTen: false,
    });
    setUserName("");
    setQuestionStartTime(null);
    setQuestionTimeSpent(0);
    setMobileStep("initial");
  };

  if (!showQuiz) {
    return (
      <div className={styles.pageWrapper}>
        <div className={styles.background}></div>
        <Header />
        <StartScreen
          isMobile={isMobile}
          mobileStep={mobileStep}
          handleMobileTakeQuiz={handleMobileTakeQuiz}
          handleMobileReady={handleMobileReady}
        />
      </div>
    );
  }

  if (questions === null) {
    return (
      <div className={styles.pageWrapper}>
        <div className={styles.background}></div>
        <Header />
        <LoadingScreen />
      </div>
    );
  }

  if (quizMeta.isCompleted && quizMeta.finalScore === null) {
    return (
      <div className={styles.pageWrapper}>
        <div className={styles.background}></div>
        <Header isResultsPage={true} />
        <LoadingScreen />
      </div>
    );
  }

  if (quizMeta.isCompleted && quizMeta.finalScore !== null) {
    return (
      <div className={styles.pageWrapper}>
        <div className={styles.background}></div>
        <Header isResultsPage={true} />
        <QuizResults
          score={quizMeta.finalScore}
          timeTaken={quizMeta.finalTime}
          onSubmitHighscore={handleSubmitHighscore}
          userName={userName}
          setUserName={setUserName}
          resetQuiz={resetQuiz}
          submitting={submitting}
          onTryAgain={handleTryAgain}
          isTopTen={quizMeta.isTopTen}
        />
      </div>
    );
  }

  const totalQuestions = 10;
  const currentFile = questions[currentQuestion];
  const extension = currentFile.url.split(".").pop().toLowerCase();
  const isVideo = ["mp4", "mov"].includes(extension);
  const questionCount = `${currentQuestion + 1}/${totalQuestions}`;

  const progressDots = Array.from({ length: totalQuestions }, (_, i) => {
    if (i < userAnswers.length) {
      return userAnswers[i].correct ? "correct" : "incorrect";
    } else if (i === currentQuestion) {
      return "current";
    } else {
      return "future";
    }
  });

  if (isMobile) {
    return (
      <div className={styles.pageWrapper}>
        <div className={styles.background}></div>
        <Header />
        <MobileQuiz
          currentFile={currentFile}
          isVideo={isVideo}
          handleAnswer={handleAnswer}
          questionCount={questionCount}
          questionTimeSpent={questionTimeSpent}
          progressDots={progressDots}
        />
      </div>
    );
  }

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.background}></div>
      <Header />
      <DesktopQuiz
        currentFile={currentFile}
        isVideo={isVideo}
        handleAnswer={handleAnswer}
        totalTimeSpent={totalTimeSpent}
        questionTimeSpent={questionTimeSpent}
        questionCount={questionCount}
        progressDots={progressDots}
      />
    </div>
  );
};

export default MainQuizPage;
