import React from "react";
import { AuthProvider } from "./context";
import "./default.css";
import Routes from "./routes";

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;
