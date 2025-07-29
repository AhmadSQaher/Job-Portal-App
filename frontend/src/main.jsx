import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { 
  initPerformanceMonitoring, 
  observeResourceTiming, 
  preloadCriticalResources,
  setupLazyLoading,
  markPerformance 
} from "./utils/performanceMonitor.js";
import { registerServiceWorker } from "./utils/serviceWorker.js";

// Mark app start
markPerformance('app-start');

// Initialize performance monitoring
if (process.env.NODE_ENV === 'production') {
  initPerformanceMonitoring();
  observeResourceTiming();
  registerServiceWorker();
  // Only preload in production
  preloadCriticalResources();
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Mark app render complete
markPerformance('app-rendered');

// Setup lazy loading after initial render
setTimeout(() => {
  setupLazyLoading();
}, 100);
