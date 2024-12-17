import React, { useState, useEffect } from "react";
import QuizResults from "../../components/QuizResults/QuizResults";
import Button from "../../components/Button/Button";
import * as styles from "./MainQuizPage.module.css";
import { fetchQuestions, submitScore } from "../../utils/api";
import dayjs from "dayjs";
import Header from "../../components/Header/Header";

const formatTime = (secondsTotal) => {
  const h = String(Math.floor(secondsTotal / 3600)).padStart(2, "0");
  const m = String(Math.floor((secondsTotal % 3600) / 60)).padStart(2, "0");
  const s = String(secondsTotal % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
};

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

  const [totalTimeSpent, setTotalTimeSpent] = useState(0);
  const [questionStartTime, setQuestionStartTime] = useState(null);
  const [questionTimeSpent, setQuestionTimeSpent] = useState(0);

  const [isMobile, setIsMobile] = useState(false);
  const [mobileStep, setMobileStep] = useState("initial");

  useEffect(() => {
    // Если есть параметр start=1 в URL, сразу запускаем квиз
    const params = new URLSearchParams(window.location.search);
    if (params.get("start") === "1") {
      handleStartQuiz();
    }
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 576);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
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

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const preparedQuestions = await fetchQuestions();
        setQuestions(preparedQuestions);

        const start = dayjs();
        setQuizMeta((prev) => ({ ...prev, startedAt: start }));
        setQuestionStartTime(start);
      } catch (error) {
        console.error("Failed to load questions");
      }
    };

    if (showQuiz) {
      loadQuestions();
    }
  }, [showQuiz]);

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

  const handleStartQuiz = () => {
    setShowQuiz(true);
  };

  const handleTryAgain = async () => {
    resetQuiz();

    try {
      const preparedQuestions = await fetchQuestions();
      setQuestions(preparedQuestions);

      const start = dayjs();
      setQuizMeta((prev) => ({ ...prev, startedAt: start }));
      setQuestionStartTime(start);

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
    setTotalTimeSpent(0);
    setQuestionTimeSpent(0);
    setQuestionStartTime(null);
    setMobileStep("initial");
  };

  // BEFORE QUIZ START
  if (!showQuiz) {
    return (
      <>
        <Header />
        <div className={styles.mainScreenContainer}>
          <div className={styles.orangeGradient}></div>
          <div className={styles.mainLayout}>
            <div className={styles.leftColumn}>
              <img
                src="/images/decorativeStar.png"
                alt="Star"
                className={styles.starImage}
              />
              <h1 className={styles.mainTitle}>Will you guess?</h1>

              {(!isMobile || mobileStep === "info") && (
                <p className={styles.infoText}>
                  You will see an image or a video with two buttons next to it:
                  "Real" and "Fake". After making a choice, you are presented
                  with the next image (total of 10 images). Upon completing the
                  quiz, you will see your score (number of correct guesses) and
                  time taken.
                </p>
              )}

              <div className={styles.buttonsRow}>
                {(!isMobile || mobileStep === "initial") && (
                  <>
                    <Button variant="primary" onClick={handleMobileTakeQuiz}>
                      Take quiz »
                    </Button>
                    <Button variant="secondary" as="link" to="/leaderboard">
                      Highscore
                    </Button>
                  </>
                )}
                {isMobile && mobileStep === "info" && (
                  <Button variant="primary" onClick={handleMobileReady}>
                    I'm ready!
                  </Button>
                )}
              </div>
            </div>

            {/* Показываем aiHuman.png только если не мобильная версия или если mobileStep === 'initial' */}
            {(!isMobile || (isMobile && mobileStep === "initial")) && (
              <div className={styles.rightColumn}>
                <img
                  src="/images/aiHuman.png"
                  alt="Decorative"
                  className={styles.mainImage}
                />
                <div className={styles.greenGradient}></div>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }

  // LOADING QUESTIONS
  if (questions === null) {
    return (
      <>
        <Header />
        <div className={styles.loadingContainer}>Loading...</div>
      </>
    );
  }

  // RESULTS
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

  // QUIZ IN PROGRESS
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

  // Мобильная версия во время квиза
  if (isMobile) {
    return (
      <>
        <Header />
        <div className={styles.mobileQuizContainer}>
          <div className={styles.mobileMediaFrame}>
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
            <div className={styles.mobileTopBar}>
              <img
                src="/images/timerIcon.png"
                alt="Timer"
                className={styles.timerIcon}
              />
              <span>{formatTime(questionTimeSpent)}</span>
              <div className={styles.mobileQuestionCounter}>
                {questionCount}
              </div>
            </div>
          </div>

          <div className={styles.answerButtonsMobile}>
            <Button
              variant="outline-orange"
              onClick={() => handleAnswer("real")}
            >
              Real
            </Button>
            <Button
              variant="outline-orange"
              onClick={() => handleAnswer("fake")}
            >
              Fake
            </Button>
          </div>

          <div className={styles.mobileBlurBlock}>
            <div className={styles.mobileBlurQuestionCounter}>
              {questionCount}
            </div>
            <div className={styles.mobileProgressDots}>
              {progressDots.map((dotClass, i) => (
                <span key={i} className={`${styles.dot} ${dotClass}`} />
              ))}
            </div>
          </div>

          {/* aiHuman3 в правом нижнем углу */}
          <img
            src="/images/aiHuman3.png"
            alt="Decor"
            className={styles.mobileAiHuman}
          />
        </div>
      </>
    );
  }

  // DESKTOP QUIZ
  return (
    <>
      <Header />

      <div className={styles.container}>
        <div className={styles.quizLayout}>
          <div className={styles.quizLeftColumn}>
            <div className={styles.centeredLeftColumn}>
              <div className={styles.topSection}>
                <h1 className={styles.quizTitle}>Quiz has started!</h1>
                <p className={styles.quizText}>
                  Now you see an image or a video with two buttons below: "Real"
                  and "Fake".
                  <br />
                  <br />
                  Make your choice depending on what you think about this one:
                  whether it’s a real person’s photo, or it’s a fake made by an
                  AI.
                  <br />
                  <br />
                  The time is counting!
                </p>
              </div>

              <div className={styles.bottomSection}>
                <div className={styles.totalTime}>
                  <span className={styles.totalTimeLabel}>
                    Total time spent:
                  </span>
                  <span className={styles.totalTimeValue}>
                    {formatTime(totalTimeSpent)}
                  </span>
                </div>

                <div className={styles.questionCounter}>{questionCount}</div>

                <div className={styles.progressDots}>
                  {progressDots.map((dotClass, i) => (
                    <span key={i} className={`${styles.dot} ${dotClass}`} />
                  ))}
                </div>
              </div>
            </div>
            <div className={styles.decorContainer}>
              <img
                src="/images/aiHuman3.png"
                alt="Decor"
                className={styles.decorBottomLeft}
              />

              <div className={styles.rotatedGradient}></div>

              <div className={styles.centerBottomDecor}>
                <img src="/images/decorativeStar3.png" alt="Decor" />
              </div>
            </div>
          </div>

          <div className={styles.quizRightColumn}>
            <div className={styles.mediaFrame}>
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

              <div className={styles.questionTime}>
                <img
                  src="/images/timerIcon.png"
                  alt="Timer"
                  className={styles.timerIcon}
                />
                <span>{formatTime(questionTimeSpent)}</span>
              </div>
            </div>

            <div className={styles.answerButtons}>
              <Button
                variant="outline-orange"
                onClick={() => handleAnswer("real")}
              >
                Real
              </Button>
              <Button
                variant="outline-orange"
                onClick={() => handleAnswer("fake")}
              >
                Fake
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainQuizPage;
