import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000" // Adjust the URL to match your backend API
});

export default instance;
