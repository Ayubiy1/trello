import React, { useEffect, useState } from "react";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Layout } from "antd";
import { Outlet, useLocation, useNavigate, useParams } from "react-router";
import BoardsComp from "../../components/boards";
import { useLocalStorageState } from "ahooks";
import NavBoardTitle from "../../components/nav-board-title";
import axios from "axios";
import { useQuery } from "react-query";

import "./style.css";
import { FaRegStar, FaStar } from "react-icons/fa";
import { setChooseBoard } from "../../store/todoSlice";
import { useDispatch } from "react-redux";
const { Content, Footer, Sider } = Layout;

const HomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const params = useParams();

  const [chooseBoardBg, setChooseBoardBg] = useLocalStorageState(
    "chooseBoardBg",
    {
      defaultValue: null,
    }
  );

  const [collapsed, setCollapsed] = useLocalStorageState("collapsed", {
    defaultValue: false,
  });

  const { data, isLoading } = useQuery("boards-data-favouriteTrue", () => {
    return axios.get(`http://localhost:3004/boards?favourite=true`);
  });

  const { data: dataa } = useQuery([params?.id, "board-data-bg"], () => {
    return axios.get(`http://localhost:3004/boards?id=${params?.id}`);
  });

  useEffect(() => {
    dataa?.data?.map((i) => {
      setChooseBoardBg({ backgroungImg: i?.backgroungImg, id: i?.id });
    });
  }, [params?.id]);

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
                dispatch(setChooseBoard(null));
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

      <Layout
        className="bg-gray700"
        style={{
          backgroundImage:
            chooseBoardBg && +params?.id == chooseBoardBg?.id
              ? `url(${chooseBoardBg?.backgroungImg})`
              : "none",
          backgroundColor: "rgb(55 65 81)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        //  style={{ chooseBoardBg != null ?backgroundImage:`url(${chooseBoardBg})`:background: "rgb(55 65 81 )" } }
      >
        <NavBoardTitle />

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
            {location?.pathname == "/" && (
              <div>
                <span className="text-[20px] font-bold text-white">
                  <FaRegStar /> Starred boards
                </span>

                <div className="flex items-center gap-2">
                  {data?.data?.map((item) => {
                    return (
                      <div
                        key={item?.id}
                        style={{
                          width: "212px",
                          color: "white",
                          padding: "5px",
                          height: "101px",
                          cursor: "pointer",
                          overflow: "hidden",
                          borderRadius: "8px",
                          position: "relative",
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          backgroundImage: `url(${item?.backgroungImg})`,
                        }}
                        className="favourite-board mt-2"
                        onClick={() => {
                          navigate(`${item?.id}`);
                        }}
                      >
                        <span
                          style={{
                            color: "white",
                            fontSize: "19px",
                            fontWeight: "bold",
                            textShadow: "0 0 5px black",
                            transform: "translate(-50%, -50%)",
                          }}
                        >
                          {item?.label}
                        </span>

                        <span
                          style={{
                            right: 15,
                            bottom: 10,
                            color: "yellow",
                            position: "absolute",
                          }}
                          className="starr"
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          <FaStar />
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            <Outlet />
          </div>
        </Content>
        {/* <Footer
          style={{
            textAlign: "center",
          }}
          className="bg-gray-700"
        >
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer> */}
      </Layout>
    </Layout>
  );
};
export default HomePage;
