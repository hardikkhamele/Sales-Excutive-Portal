import React from "react";
import { BrowserRouter } from "react-router-dom";
import { SalesProvider } from "./context/SalesContext";
import { AppRoutes } from "./routes/AppRoutes";

export function App() {
  return (
    <BrowserRouter>
      <SalesProvider>
        <AppRoutes />
      </SalesProvider>
    </BrowserRouter>
  );
}

export default App;
