import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // Your global CSS for styling
import App from "./App"; // Main application component
import reportWebVitals from "./reportWebVitals";

// Create a root element for React
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the application wrapped in React.StrictMode for highlighting potential problems in the application
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Measure performance in your app and report results
// You can pass a function to log results (e.g., reportWebVitals(console.log))
// or send results to an analytics endpoint to understand user interactions and app performance
reportWebVitals();
