import React from "react";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import EmployeeManagement from "./components/content/EmployeeManagement";
import PayrollManagement from "./components/content/PayrollManagement";
import { Login } from "./components/Login";
import Attendance from "./components/content/Attendance";
import Leave from "./components/content/Leave";
import User from "./components/content/User";
import EmployeeGrading from "./components/content/master/EmployeeGrading";
import BenefitSetup from "./components/content/master/BenefitSetup";
import LeaveSetup from "./components/content/master/LeaveSetup";
import Department from "./components/content/master/Department";
import Position from "./components/content/master/Position";

const App: React.FC = () => {
  const authenticated = false;
  const navigate = useNavigate();
  if (!document.cookie.split("=")[1]) {
     navigate('/login')
    //  console.log("123")
  }
  console.log(document.cookie.split("=")[1])
  console.log(document.cookie)
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />}>
          <Route path="/employee" element={<EmployeeManagement />} />
          <Route path="/payroll" element={<PayrollManagement />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/leave" element={<Leave />} />
          <Route path="/user" element={<User />} />
          <Route path="/master/employee-grading" element={<EmployeeGrading />} />
          <Route path="/master/benefit-setup" element={<BenefitSetup />} />
          <Route path="/master/leave-setup" element={<LeaveSetup />} />
          <Route path="/master/department" element={<Department />} />
          <Route path="/master/position" element={<Position />} />
        </Route>
        {/* <Route path="*" element={<Login />}/> */}
      </Routes>
    </>
  );
};

export default App;
