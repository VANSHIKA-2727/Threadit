import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/AuthContext"; // ✅ ADD THIS
import { PostsProvider } from "./context/Postscontext"; // ✅ ADD THIS
import { ThemeProvider } from "./context/ThemeContext";

(function initTheme() {
  try {
    const t = localStorage.getItem("theme") || "light";
    document.documentElement.classList.toggle("dark", t === "dark");
  } catch {
    /* ignore */
  }
})();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <PostsProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </PostsProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);