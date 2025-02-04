import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginComponent from "./components/auth-components/LoginComponent";
import Dashboard from "./components/expense-components/DashboardComponent";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
