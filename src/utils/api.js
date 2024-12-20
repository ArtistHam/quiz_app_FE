import axios from "axios";

const BASE_URL = "https://quiz-app-be-caa2.onrender.com/api";

export const fetchQuestions = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/questions`);
    return response.data.questions;
  } catch (error) {
    console.error(
      "Error fetching questions:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const submitScore = async (resultData) => {
  try {
    const response = await axios.post(`${BASE_URL}/finish_quiz`, resultData);

    return response.data;
  } catch (error) {
    console.error(
      "Error submitting score:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const fetchHighscores = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/highscore`);
    return response.data.scores;
    // scores: [{ nickname: "Artist", time: "120", score: "10" }, ...]
  } catch (error) {
    console.error(
      "Error fetching highscores:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const submitHighscore = async (data) => {
  // data: { name, time, results: [...] }
  try {
    const response = await axios.post(`${BASE_URL}/highscore`, data);
    return response.data;
  } catch (error) {
    console.error(
      "Error submitting highscore:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
