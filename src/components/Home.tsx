import React from "react";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import BreadCrumb from "./Breadcrumb";
import HeaderContent from "./Header";
import { useAppDispatch } from "../redux/store";
import { fetchInforUser } from "../redux/reducer";
const { Content, Sider, Footer } = Layout;

export const autocompleteStyles = {
  maxHeight: "300px",
  backgroundColor: "rgb(241, 243, 245)",
  borderRadius: "6px",
  fontSize: "0.8125rem",
  marginBottom: "4px",
  "& .MuiAutocomplete-inputRoot": {
    padding: "8px 12px 6px 12px",
    "& input": {
      fontSize: "16px",
      lineHeight: "16px",
    },
  },
  "& .MuiAutocomplete-listbox": {
    backgroundColor: "red",
    "& .MuiAutocomplete-option": {
      backgroundColor: "red",
    },
  },
  "& .MuiAutocomplete-tag": {
    color: "rgb(0, 145, 255)",
    backgroundColor: "#fff",
    borderRadius: "6px",
    fontSize: "16px",
    lineHeight: "14px",
    margin: "2px",
    padding: "4px",
  },
  ".MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "& .MuiFormControl-root-MuiTextField-root": {
    marginTop: "0",
  },
};

const Home: React.FC = () => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchInforUser());
  }, [dispatch]);
 
  return (
    <>
      <Layout>
        <HeaderContent />
        <Layout>
          <Sider width={329}>
            <SideBar />
          </Sider>
          <Layout
            style={{
              margin: "96px 46px 0",
              minHeight: "calc(100vh - 96px)"
            }}
          >
            <BreadCrumb />
            <Content>
              <Outlet />
            </Content>
            <Footer style={{ textAlign: "center" }}>
              Copyright © 2022. All Rights Reserved
            </Footer>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
};

export default Home;
