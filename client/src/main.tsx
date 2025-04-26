import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import App from "./App";
import "./index.css";
import { TravelContextProvider } from "./contexts/TravelContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TravelContextProvider>
      <App />
    </TravelContextProvider>
  </StrictMode>
);
