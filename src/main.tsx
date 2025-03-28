import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ErrorBoundary } from "react-error-boundary";
import ErrorComponent from "./components/ErrorComponent.js";

const rootElement = document.getElementById("root");

// Проверяем, что элемент с id 'root' существует
if (!rootElement) {
  throw new Error(
    "Root element not found. Make sure there is a div with id 'root' in your HTML.",
  );
}

const root = createRoot(rootElement as HTMLElement);

root.render(
  <StrictMode>
    <ErrorBoundary onReset={() => window.location.replace('/')} FallbackComponent={ErrorComponent}>
      <App/>
    </ErrorBoundary>
  </StrictMode>,
);
