import axios from "axios";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import { RxDotsVertical } from "react-icons/rx";
import TasksComp from "../tasks";
import { Input } from "antd";

import "./style.css";
import { useState } from "react";

const ListsComp = () => {
  const params = useParams();
  const [editListActive, setEditListActive] = useState(false);

  const { data } = useQuery("lists", () => {
    return axios.get(`http://localhost:3004/lists`);
  });

  return (
    <>
      {data?.data
        ?.filter((l) => l?.boardId == +params?.id)
        ?.map((list, index) => {
          return (
            <div className="bg-[#101204] w-[333px] rounded-md p-2" key={index}>
              <div className="flex items-center justify-between text-gray-300">
                {!editListActive ? (
                  <span
                    className="text-[16px] cursor-pointer"
                    onClick={() => {
                      setEditListActive(true);
                    }}
                  >
                    {list?.label}
                  </span>
                ) : (
                  <input className="list-name" />
                )}
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
