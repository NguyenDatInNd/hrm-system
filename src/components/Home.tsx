import React from "react";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import BreadCrumb from "./Breadcrumb";
import HeaderContent from "./Header";
const { Content, Sider, Footer } = Layout;

const Home: React.FC = () => {
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
              margin: "80px 30px",
            }}
          >
            <BreadCrumb />
            <Content
              style={{
                height: "100vh",
              }}
            >
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
