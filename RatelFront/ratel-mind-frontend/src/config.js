// src/config.js
// API URL comes from Vite env (recommended for deploy)
// .env example: VITE_API_BASE_URL=https://your-backend.com/api
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.trim() || "http://localhost:8080/api";
