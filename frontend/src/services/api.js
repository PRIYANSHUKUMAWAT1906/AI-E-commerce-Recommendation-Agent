import axios from "axios";

const api = axios.create({
  baseURL:
"https://ai-e-commerce-recommendation-agent.onrender.com"
});

export default api;