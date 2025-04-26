import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { TravelContextProvider } from "./contexts/TravelContext";

createRoot(document.getElementById("root")!).render(
  <TravelContextProvider>
    <App />
  </TravelContextProvider>
);
