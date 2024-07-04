import React from "react";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Layout } from "antd";
import { Outlet, useNavigate, useParams } from "react-router";
import BoardsComp from "../../components/boards";
import { useLocalStorageState } from "ahooks";
import { useQuery } from "react-query";
import axios from "axios";
import { FaRegStar, FaRegUserCircle, FaStar } from "react-icons/fa";
import { RiMenu5Line } from "react-icons/ri";

const { Header, Content, Footer, Sider } = Layout;

const HomePage = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useLocalStorageState("collapsed", {
    defaultValue: false,
  });
  const { data } = useQuery([params?.id, "board-data"], () => {
    return axios.get(`http://localhost:3004/boards?id=${+params?.id}`);
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
        <div className="flex items-center gap-2 ms-3 my-4">
          <Button
            type="primary"
            onClick={() => setCollapsed(!collapsed)}
            style={{
              color: "white",
            }}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>

          {!collapsed && (
            <div
              className="flex items-center gap-2 ms-3 cursor-pointer"
              onClick={() => {
                navigate("/");
              }}
            >
              <img
                src="https://cdn-icons-png.freepik.com/512/2496/2496109.png"
                className="w-[30px] rounded-md"
              />
              <span className="text-white text-[20px]">Trello</span>
            </div>
          )}
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
          className="flex items-center gap-3"
        >
          <div className="w-[100%]">
            {data?.data.map((item) => {
              return (
                <div
                  key={item?.id}
                  className="text-white flex items-center justify-between w-[100%]"
                >
                  <div className="flex gap-2 items-center">
                    <h2>{item?.label}</h2>
                    <span
                      className="cursor-pointer"
                      onClick={() => {
                        if (item?.favourite == null) {
                          console.log("null");
                        } else {
                          console.log("unnull");
                        }
                      }}
                    >
                      {item?.favourite == null ? <FaRegStar /> : <FaStar />}
                    </span>
                  </div>

                  <div className="mr-2 flex gap-2 items-center">
                    <span className="mr-2 flex gp-2 items-center text-[17px] cursor-pointer">
                      <RiMenu5Line />
                      <p className="m-0">Filter</p>
                    </span>

                    <span className="h[30px] text-[20px] cursor-pointer">
                      <FaRegUserCircle />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </Header>

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
