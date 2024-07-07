import React from "react";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { setChooseTaskId } from "../../store/todoSlice";
import EditModalTask from "../modals/edit-task";
import { useState } from "react";
import { RxDotsVertical } from "react-icons/rx";
import { Dropdown } from "antd";

import "./style.css";

const TasksComp = ({ listId }) => {
  const chooseTaskId = useSelector((state) => state?.todo?.chooseTaskId);
  const queryClient = useQueryClient();

  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const [selectTaskId, setSelectTaskId] = useState(false);

  const { data } = useQuery("tasks", () => {
    return axios.get(`http://localhost:3004/tasks`);
  });

  const { mutate } = useMutation(
    () => {
      return axios.delete(`http://localhost:3004/tasks/${chooseTaskId}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("tasks");
      },
    }
  );

  const items = [
    {
      label: <a href="https://www.antgroup.com">Edit</a>,
      key: "0",
    },
    {
      label: <span>Delete</span>,
      with: 300,
      onClick: () => {
        mutate();
      },
      key: "1",
    },
    {
      label: "Something",
      key: "3",
    },
  ];

  return (
    <>
      <div className="bg-gray600 p-1">
        {data?.data
          ?.filter((t) => t?.listId == listId)
          ?.map((task) => {
            return (
              <div
                key={task?.id}
                className="bg-[#1D2125] text-gray-300 my-1 p-2 cursor-pointer flex items-center justify-between"
              >
                <p
                  className="m-0 w-[100%]"
                  onClick={() => {
                    setOpen(true);
                    dispatch(setChooseTaskId(task?.id));
                  }}
                >
                  {task?.label}
                </p>

                <Dropdown
                  menu={{
                    items,
                  }}
                  trigger={["click"]}
                >
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(setChooseTaskId(task?.id));
                    }}
                  >
                    <span className="text-[18px] text-gray-300 font-bold py-1 cursor-pointer">
                      <RxDotsVertical />
                    </span>
                  </a>
                </Dropdown>
              </div>
            );
          })}

        <EditModalTask open={open} setOpen={setOpen} />
      </div>
    </>
  );
};

export default TasksComp;
