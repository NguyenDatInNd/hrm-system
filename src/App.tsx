import React from "react";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import { Login } from "./components/Login";
import EmployeeGrading from "./components/content/master/EmployeeGrading";
import { ForgotPassword } from "./components/ForgotPw";
import { ChangePassword } from "./components/ChangePw";
import Settings from "./components/content/Settings";
import EmployeeManagement from "./components/Employee_Management/EmployeeManagement";
import CreateEmployee from "./components/Employee_Management/CreateEmployee";

const App: React.FC = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    if (
      !document.cookie ||
      !document.cookie.split("=")[1] ||
      document.cookie.split("=")[1] === ""
    ) {
      navigate("/login");
    }
  }, [navigate]);
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/" element={<Home />}>
          <Route path="/employee" element={<EmployeeManagement />} />
          <Route
            path="/master/employee-grading"
            element={<EmployeeGrading />}
          />
          <Route path="/settings" element={<Settings />} />
          <Route
            path="/employee/create-or-update/:index"
            element={<CreateEmployee />}
          />
          <Route
            path="/employee/create-or-update"
            element={<CreateEmployee />}
          />
        </Route>
      </Routes>
    </>
  );
};

export default App;
