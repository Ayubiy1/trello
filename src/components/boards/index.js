import { Menu } from "antd";
import axios from "axios";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router";
import "./style.css";

const BoardsComp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const decodedPath = decodeURIComponent(path);
  const boardName = decodedPath.split("/")[1];

  const { data, isLoading } = useQuery("boards-data", () => {
    return axios.get(`http://localhost:3004/boards`);
  });

  return (
    <>
      <Menu
        theme="dark"
        defaultSelectedKeys={[`${boardName}`]}
        onClick={(e) => {
          navigate(`${e?.key}/`);
        }}
        className="custom-menu bg-[#22272B]"
        items={data?.data}
      />
    </>
  );
};

export default BoardsComp;
