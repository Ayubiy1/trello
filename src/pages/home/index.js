import React, { useState } from "react";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Layout } from "antd";
import { Outlet } from "react-router";
import BoardsComp from "../../components/boards";
import { useLocalStorageState } from "ahooks";

const { Header, Content, Footer, Sider } = Layout;

const HomePage = () => {
  const [collapsed, setCollapsed] = useLocalStorageState("collapsed", {
    defaultValue: false,
  });

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{ backgroundColor: "#22272B" }}
      >
        <div className="flex items-center gap-2 ms-3">
          <Button
            type="primary"
            onClick={() => setCollapsed(!collapsed)}
            style={{
              color: "white",
            }}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>

          <div className="flex items-center gap-2 ms-3 mt3 my-4">
            <img
              src="https://cdn-icons-png.freepik.com/512/2496/2496109.png"
              className="w-[30px] rounded-md"
            />
            <span className="text-white text-[20px]">Trello</span>
          </div>
        </div>

        <div className="demo-logo-vertical" />
        <BoardsComp />
      </Sider>

      <Layout className="bg-gray-700">
        <Header
          style={{
            padding: 0,
            background: "#22272B",
          }}
        />

        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>

          <div>
            <Outlet />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
          className="bg-gray-700"
        >
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
export default HomePage;
