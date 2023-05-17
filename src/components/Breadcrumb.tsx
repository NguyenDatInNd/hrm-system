import React from "react";
import { Breadcrumb } from "antd";
import { Link, useLocation } from "react-router-dom";

const breadcrumbNameMap: Record<string, string> = {
  "/attendance": "Attendance Management",
  "/leave": "Leave Management",
  "/payroll": "Payroll Management",
  "/employee": "Employee Management",
  "/user": "User Management",
  "/master": "Master Management",
  "/master/employee-grading": "Employee Grading",
  "/master/benefit-setup": "Benefit Setup",
  "/master/leave-setup": "Leave Setup",
  "/master/department": "Department",
  "/master/position": "Position",
  "/master/marriage-status": "Marriage Status",
  "/master/compensation-setup": "Compensation Setup",
  "/global/minimum-wages": "Minimum Wages",
  "/global": "Global Settings",
  "/global/employee-allowance": "Employee Allowance",
  "/global/safety-insurance": "Safety Insurance",
  "/global/health-insurance": "Health Insurance",
  "/global/public-holiday": "Public Holiday",
  "/global/ot-configure": "OT Configure<",
  "/global/working-hour": "Working Hour",
  "/global/other-default": "Other Default",
  "/settings": "Settings",
};

const BreadCrumb: React.FC = () => {
  const location = useLocation();
  const pathSnippets = location.pathname.split("/").filter((i) => i);
  console.log(pathSnippets)

  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
    return {
      key: url,
      title: <Link  to={url}>{breadcrumbNameMap[url]}</Link>,
    };
  });

  const breadcrumbItems = [
    {
      title: <Link to="/">General</Link>,
      key: "/",
    },
  ].concat(extraBreadcrumbItems);

  return <Breadcrumb separator=">" items={breadcrumbItems} />;
};

export default BreadCrumb;
