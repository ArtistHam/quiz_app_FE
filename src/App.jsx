import { Route, BrowserRouter, Routes } from "react-router-dom";

import HomePage from "./components/HomePage/HomePage";
import QuizPage from "./components/QuizPage/QuizPage";
import LeaderboardPage from "./components/LeaderboardPage/LeaderboardPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
