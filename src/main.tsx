import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Suppress cross-origin "Script error" from third-party scripts (GTM, Cal.com)
// These provide no useful debug info and are expected in iframe environments
window.addEventListener("error", (event) => {
  if (event.message === "Script error." && !event.filename) {
    event.preventDefault();
  }
});

createRoot(document.getElementById("root")!).render(<App />);
