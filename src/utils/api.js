import axios from "axios";

const BASE_URL = "http://localhost:5001/api";

export const fetchQuestions = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/questions`);
    return response.data.questions.map((q) => ({
      file: q,
      isReal: Math.random() < 0.5, // Временная генерация
    }));
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
    await axios.post(`${BASE_URL}/submit-score`, resultData);
    alert("Your score has been submitted successfully!");
  } catch (error) {
    console.error(
      "Error submitting score:",
      error.response ? error.response.data : error.message
    );
  }
};
