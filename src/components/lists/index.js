import axios from "axios";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import { RxDotsVertical } from "react-icons/rx";
import TasksComp from "../tasks";

const ListsComp = () => {
  const params = useParams();

  const { data } = useQuery("lists", () => {
    return axios.get(`https://trello-api-ahgs.onrender.com/lists`);
  });

  return (
    <>
      {data?.data
        ?.filter((l) => l?.boardId == +params?.id)
        ?.map((list, index) => {
          return (
            <div className="bg-[#101204] w-[333px] rounded-md p-2" key={index}>
              <div className="flex items-center justify-between text-gray-300">
                <span className="text-[16px]">{list?.label}</span>
                <span className="text-[18px] font-bold py-1 cursor-pointer">
                  <RxDotsVertical />
                </span>
              </div>

              <div>
                <TasksComp listId={list?.id} />
              </div>
            </div>
          );
        })}
    </>
  );
};

export default ListsComp;
