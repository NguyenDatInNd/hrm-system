import React from "react";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import BreadCrumb from "./Breadcrumb";
import HeaderContent from "./Header";
import { useAppDispatch } from "../redux/store";
import {fetchInforUser } from "../redux/reducer";
const { Content, Sider, Footer } = Layout;

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
