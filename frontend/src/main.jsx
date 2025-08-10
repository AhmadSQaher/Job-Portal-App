import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// Lazy load service worker to not block main thread
const loadServiceWorker = async () => {
  if (import.meta.env.PROD) {
    const { registerServiceWorker } = await import("./utils/serviceWorker.js");
    registerServiceWorker();
  }
};

// Critical rendering path optimization
const root = createRoot(document.getElementById("root"));

// Remove React.StrictMode in production for better performance
if (import.meta.env.DEV) {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  root.render(<App />);
}

// Load service worker after initial render to avoid blocking
setTimeout(loadServiceWorker, 1000);
