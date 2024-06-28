import React, { useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem("Option 1", "1", <PieChartOutlined />),
  getItem("Option 2", "2", <DesktopOutlined />),
  getItem("User", "sub1", <UserOutlined />, [
    getItem("Tom", "3"),
    getItem("Bill", "4"),
    getItem("Alex", "5"),
  ]),
  getItem("Team", "sub2", <TeamOutlined />, [
    getItem("Team 1", "6"),
    getItem("Team 2", "8"),
  ]),
  getItem("Files", "9", <FileOutlined />),
];
const App = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="flex items-center gap-2 ms-1 mt3 my-4">
          <img
            src="https://cdn-icons-png.freepik.com/512/2496/2496109.png"
            className="w-[30px] rounded-md"
          />
          <span className="text-white text-[20px]">Trello</span>
        </div>

        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          // mode="inline"
          items={items}
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
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            Bill is a cat.
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
export default App;

// import { useDispatch, useSelector } from "react-redux";
// import "./App.css";
// import { addTodo, deleteTodo } from "./store/todoSlice";

// function App() {
//   const todoSlice = useSelector((state) => state.todo);
//   const dispatch = useDispatch();

//   const sumbitForm = (e) => {
//     e.preventDefault();
//     let inpValue = e.target[0].value;

//     let todoObj = {
//       id: Date.now(),
//       title: inpValue,
//       chacked: false,
//     };

//     dispatch(addTodo(todoObj));
//   };

//   const handleDelete = (id) => {
//     dispatch(deleteTodo(id));
//   };

//   return (
//     <div className="App bg-gray-700 h-[100vh]">
//       <form onSubmit={(e) => sumbitForm(e)}>
//         <input type="text" placeholder="todo title" />
//         <button type="submit">Add</button>
//       </form>

//       <div style={{ width: "400px", margin: "0 auto" }}>
//         {todoSlice.lists?.map((item) => {
//           return (
//             <div
//               key={item?.id}
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//               }}
//             >
//               <p>{item?.title}</p>

//               <button onClick={() => handleDelete(item.id)}>Delete</button>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default App;
