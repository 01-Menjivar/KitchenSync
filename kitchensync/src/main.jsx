import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App/App";
import { BrowserRouter as Router } from "react-router-dom";
import "./shared/styles/critical.css";
import "./shared/styles/index.css";
import './shared/styles/fonts.css';

createRoot(document.getElementById("root")).render(
    <Router>
        <App />
    </Router>
);