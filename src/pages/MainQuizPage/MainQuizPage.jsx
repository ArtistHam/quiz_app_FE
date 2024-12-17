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
import { submitScore } from "../../utils/api";

import dayjs from "dayjs";

const MainQuizPage = () => {
  const isMobile = useIsMobile();

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
    const currentFile = questions[currentQuestion];

    setUserAnswers((prevAnswers) => [
      ...prevAnswers,
      { file: currentFile, isReal: answer === "real" },
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

  const handleSubmit = async () => {
    setSubmitting(true);
    const requestData = {
      results: userAnswers.map((ans) => ({
        file: ans.file,
        isReal: ans.isReal,
      })),
      name: userName,
    };

    try {
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
    setQuestionStartTime(null);
    setQuestionTimeSpent(0);
    setMobileStep("initial");
  };

  if (!showQuiz) {
    return (
      <>
        <Header />
        <StartScreen
          isMobile={isMobile}
          mobileStep={mobileStep}
          handleMobileTakeQuiz={handleMobileTakeQuiz}
          handleMobileReady={handleMobileReady}
        />
      </>
    );
  }

  if (questions === null) {
    return <LoadingScreen />;
  }

  if (quizMeta.isCompleted) {
    return (
      <>
        <Header isResultsPage={true} />
        <QuizResults
          score={quizMeta.finalScore}
          timeTaken={quizMeta.finalTime}
          onSubmit={handleSubmit}
          userName={userName}
          setUserName={setUserName}
          resetQuiz={resetQuiz}
          submitting={submitting}
          onTryAgain={handleTryAgain}
        />
      </>
    );
  }

  // Quiz in progress
  const currentFile = questions[currentQuestion];
  const extension = currentFile.split(".").pop().toLowerCase();
  const isVideo = ["mp4", "mov"].includes(extension);
  const totalQuestions = 10;
  const questionCount = `${currentQuestion + 1}/${totalQuestions}`;
  const progressDots = Array.from({ length: totalQuestions }, (_, i) => {
    if (i < currentQuestion) {
      return styles.dotPast;
    } else if (i === currentQuestion) {
      return styles.dotCurrent;
    } else {
      return styles.dotFuture;
    }
  });

  if (isMobile) {
    return (
      <>
        <Header />
        <MobileQuiz
          currentFile={currentFile}
          isVideo={isVideo}
          handleAnswer={handleAnswer}
          questionCount={questionCount}
          questionTimeSpent={questionTimeSpent}
          progressDots={progressDots}
        />
      </>
    );
  }

  return (
    <>
      <Header />
      <DesktopQuiz
        currentFile={currentFile}
        isVideo={isVideo}
        handleAnswer={handleAnswer}
        totalTimeSpent={totalTimeSpent}
        questionTimeSpent={questionTimeSpent}
        questionCount={questionCount}
        progressDots={progressDots.map((cls) => cls)}
      />
    </>
  );
};

export default MainQuizPage;
