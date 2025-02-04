import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginComponent from "./components/auth-components/LoginComponent";
    import DashboardComponent from "./components/expense-components/DashboardComponent";
import Insights from "./components/expense-components/Insights";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/dashboard" element={<DashboardComponent />} />
        {/* <Route path="/register" element={<Register />} /> */}
        <Route path="/insights" element={<Insights />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
