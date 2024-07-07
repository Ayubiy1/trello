import axios from "axios";
import { Layout } from "antd";
import { useParams } from "react-router";
import { RiMenu5Line } from "react-icons/ri";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { FaRegStar, FaRegUserCircle, FaStar } from "react-icons/fa";

const { Header } = Layout;

const NavBoardTitle = () => {
  const queryClient = useQueryClient();
  const params = useParams();

  const { data } = useQuery(["board-data", params?.id], () => {
    return axios.get(`http://localhost:3004/boards?id=${+params?.id}`);
  });

  const { mutate } = useMutation(
    (updateBoardData) => {
      return axios.put(
        `http://localhost:3004/boards/${updateBoardData?.id}`,
        updateBoardData
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("board-data");
        queryClient.invalidateQueries("boards-data-favouriteTrue");
      },
    }
  );

  return (
    <>
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
                        const updateData = { ...item, favourite: true };
                        mutate(updateData);
                      } else if (item?.favourite != null) {
                        const updateData = { ...item, favourite: null };
                        mutate(updateData);
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
    </>
  );
};

export default NavBoardTitle;
