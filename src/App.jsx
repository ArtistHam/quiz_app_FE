import { Route, BrowserRouter, Routes } from "react-router-dom";

import LeaderboardPage from "./pages/LeaderboardPage/LeaderboardPage";
import MainQuizPage from "./pages/MainQuizPage/MainQuizPage";
import StatisticPage from "./pages/StaticsticPage/StatisticPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/quiz_app_FE/" element={<MainQuizPage />} />
        <Route path="/quiz_app_FE/leaderboard" element={<LeaderboardPage />} />
        <Route path="/quiz_app_FE/statistic" element={<StatisticPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
