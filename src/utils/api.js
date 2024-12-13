import axios from "axios";

const BASE_URL = "http://localhost:5001/api";

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

// the function expects the backend to return an object with the score and time fields
export const submitScore = async (resultData) => {
  try {
    const response = await axios.post(`${BASE_URL}/submit-score`, resultData);
    // It's assumed that response.data = { score: number, time: number }
    return response.data;
  } catch (error) {
    console.error(
      "Error submitting score:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
