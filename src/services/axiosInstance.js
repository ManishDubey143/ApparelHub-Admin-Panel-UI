import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api"
});

api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/auth/login";
    }
    return Promise.reject(err);
  }
);

export default api;
