import axios from "axios";

const API = axios.create({
  baseURL: "https://localhost:44301/api/admin/analytics", // Adjust based on your .NET API URL
});

export default API;
