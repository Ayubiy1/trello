import React, { useState } from "react";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Layout, Menu } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router";
import { useQuery } from "react-query";
import axios from "axios";

const { Header, Content, Footer, Sider } = Layout;

const HomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const decodedPath = decodeURIComponent(path);
  const boardName = decodedPath.split("/")[1];

  const [collapsed, setCollapsed] = useState(false);

  const { data, isLoading } = useQuery("boards-data", () => {
    return axios.get(`https://trello-api-ahgs.onrender.com/boards`);
  });

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
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
        <Menu
          theme="dark"
          defaultSelectedKeys={[`${boardName}`]}
          onClick={(e) => {
            console.log(e);
            // navigate(`${e?.key}/`);
          }}
          items={data?.data}
        />
      </Sider>

      <Layout className="bg-gray-700">
        <Header
          style={{
            padding: 0,
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
