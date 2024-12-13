import { Route, BrowserRouter, Routes } from "react-router-dom";

import LeaderboardPage from "./pages/LeaderboardPage/LeaderboardPage";
import MainQuizPage from "./pages/MainQuizPage/MainQuizPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainQuizPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
