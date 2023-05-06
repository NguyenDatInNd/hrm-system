import React from "react";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import iconAttendance from "../css/img/icon_attendance.svg";
import iconEmployee from "../css/img/icon_employee.svg";
import iconGlobal from "../css/img/icon_global.svg";
import iconLeave from "../css/img/icon_leave.svg";
import iconMaster from "../css/img/icon_master.svg";
import iconPayroll from "../css/img/icon_payroll.svg";
import iconUser from "../css/img/icon_user.svg";
import styled from "styled-components";

const MenuStyled = styled(Menu)`
  width: 329px;
  height: 100vh;
  overflow: auto;
  background: rgb(251, 252, 253);
  box-shadow: rgb(241, 243, 245) 0px 5px 20px;
  position: fixed;
  top:0;
  padding: 80px 0px;

  .ant-menu-submenu-arrow {
    display: none;
  }

  .ant-menu-item-selected {
    background-color: #f1f3f5;
    color: #11181c;
  }

  .ant-menu-item-group-title {
    width: 281px;
    height: 33px;
    font-family: "SVN-Sofia Pro";
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 33px;
    letter-spacing: -0.03em;
    color: #11181c;
  }

`;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuProps["items"] = [
  getItem(
    <Link to="/">General</Link>,
    "/",
    null,
    [
      getItem(
        <Link to="/attendance">Attendance Management</Link>,
        "/attendance",
        <img src={iconAttendance} alt="" />
      ),
      getItem(
        <Link to="/leave">Leave Management</Link>,
        "/leave",
        <img src={iconLeave} alt="" />
      ),
      getItem(
        <Link to="/payroll">Payroll Management</Link>,
        "/payroll",
        <img src={iconPayroll} alt="" />
      ),
      getItem(
        <Link to="/employee">Employee Management</Link>,
        "/employee",
        <img src={iconEmployee} alt="" />
      ),
      getItem(
        <Link to="/user">User Management</Link>,
        "/user",
        <img src={iconUser} alt="" />
      ),
      getItem("Master Management", "master", <img src={iconMaster} alt="" />, [
        getItem(
          <Link to="/master/employee-grading">Employee Grading</Link>,
          "/employee-grading"
        ),
        getItem(
          <Link to="/master/benefit-setup">Benefit Setup</Link>,
          "/benefit-setup"
        ),
        getItem(
          <Link to="/master/leave-setup">Leave Setup</Link>,
          "/leave-setup"
        ),
        getItem(<Link to="/master/department">Department</Link>, "/department"),
        getItem(<Link to="/master/position">Position</Link>, "/position"),
        getItem(
          <Link to="/master/marriage-status">Marriage Status</Link>,
          "/marriage-status"
        ),
        getItem(
          <Link to="/master/compensation-setup">Compensation Setup</Link>,
          "/compensation-setup"
        ),
      ]),
    ],
    "group"
  ),

  { type: "divider" },

  getItem(
    "Advance",
    "advance",
    null,
    [
      getItem("Global Settings", "14", <img src={iconGlobal} alt="" />, [
        getItem(
          <Link to="/global/minimum-wages">Minimum Wages</Link>,
          "/minimum-wages"
        ),
        getItem(
          <Link to="/global/employee-allowance">Employee Allowance</Link>,
          "/employee-allowance"
        ),
        getItem(
          <Link to="/global/safety-insurance">Safety Insurance</Link>,
          "/safety-insurance"
        ),
        getItem(
          <Link to="/global/health-insurance">Health Insurance</Link>,
          "/health-insurance"
        ),
        getItem(
          <Link to="/global/public-holiday">Public Holiday</Link>,
          "/public-holiday"
        ),
        getItem(
          <Link to="/global/ot-configure">OT Configure</Link>,
          "/ot-configure"
        ),
        getItem(
          <Link to="/global/working-hour">Working Hour</Link>,
          "/working-hour"
        ),
        getItem(
          <Link to="/global/other-default">Other Default</Link>,
          "/other-default"
        ),
      ]),
      getItem(
        <Link to="/settings">Settings</Link>,
        "/settings",
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18.9596 14.5835C18.9596 14.9252 18.6763 15.2085 18.3346 15.2085H12.5013V15.4168C12.5013 16.6668 11.7513 17.0835 10.8346 17.0835H5.83464C4.91797 17.0835 4.16797 16.6668 4.16797 15.4168V15.2085H1.66797C1.3263 15.2085 1.04297 14.9252 1.04297 14.5835C1.04297 14.2418 1.3263 13.9585 1.66797 13.9585H4.16797V13.7502C4.16797 12.5002 4.91797 12.0835 5.83464 12.0835H10.8346C11.7513 12.0835 12.5013 12.5002 12.5013 13.7502V13.9585H18.3346C18.6763 13.9585 18.9596 14.2418 18.9596 14.5835Z"
            fill="#006ADC"
          ></path>
          <path
            opacity="0.4"
            d="M18.9577 5.4165C18.9577 5.75817 18.6743 6.0415 18.3327 6.0415H15.8327V6.24984C15.8327 7.49984 15.0827 7.9165 14.166 7.9165H9.16602C8.24935 7.9165 7.49935 7.49984 7.49935 6.24984V6.0415H1.66602C1.32435 6.0415 1.04102 5.75817 1.04102 5.4165C1.04102 5.07484 1.32435 4.7915 1.66602 4.7915H7.49935V4.58317C7.49935 3.33317 8.24935 2.9165 9.16602 2.9165H14.166C15.0827 2.9165 15.8327 3.33317 15.8327 4.58317V4.7915H18.3327C18.6743 4.7915 18.9577 5.07484 18.9577 5.4165Z"
            fill="#006ADC"
          ></path>
        </svg>
      ),
    ],
    "group"
  ),
];

const SideBar: React.FC = () => {
  return (
    <>
      <MenuStyled
        defaultSelectedKeys={["/employee"]}
        defaultOpenKeys={["general"]}
        mode="inline"
        items={items}
      />
    </>
  );
};

export default SideBar;
