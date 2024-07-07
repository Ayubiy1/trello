import { Menu } from "antd";
import axios from "axios";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router";
import "./style.css";
import { setChooseBoard } from "../../store/todoSlice";
import { useDispatch, useSelector } from "react-redux";

const BoardsComp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const path = location.pathname;
  const decodedPath = decodeURIComponent(path);
  const boardName = decodedPath.split("/")[1];

  const chooseBoard = useSelector((state) => state?.todo?.chooseBoard);

  const { data, isLoading } = useQuery("boards-data", () => {
    return axios.get(`http://localhost:3004/boards`);
  });

  return (
    <>
      <Menu
        theme="dark"
        defaultSelectedKeys={[
          `${location.pathname != "/" ? chooseBoard : "1231231312312312312"}`,
        ]}
        onClick={(e) => {
          navigate(`${e?.key}/`);
          dispatch(setChooseBoard(e?.key));
        }}
        className="custom-menu bg-[#22272B]"
        items={data?.data}
      />
    </>
  );
};

export default BoardsComp;
