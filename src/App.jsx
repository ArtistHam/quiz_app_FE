import { Route, BrowserRouter, Routes } from "react-router-dom";

import LeaderboardPage from "./pages/LeaderboardPage/LeaderboardPage";
import MainQuizPage from "./pages/MainQuizPage/MainQuizPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/quiz_app_FE/" element={<MainQuizPage />} />
        <Route path="/quiz_app_FE/leaderboard" element={<LeaderboardPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
