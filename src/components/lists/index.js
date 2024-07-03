import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router";
import { RxDotsVertical } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import TasksComp from "../tasks";

import "./style.css";
import { useState } from "react";
import { message } from "antd";

let API = `http://localhost:3004/lists`;

const ListsComp = () => {
  const params = useParams();
  const queryClient = useQueryClient();
  const [messageApi, contextHolder] = message.useMessage();
  const [editListActive, setEditListActive] = useState(false);
  const [chooseEditList, setChooseEditList] = useState(null);
  const [editListLabel, setEditListLabel] = useState("");

  const successEditList = () => {
    messageApi.open({
      type: "success",
      content: "List edit successfully",
    });
  };
  const successDeleteList = () => {
    messageApi.open({
      type: "success",
      content: "The List was successfully deleted",
    });
  };

  const { data } = useQuery("lists", () => {
    return axios.get(`${API}`);
  });

  const { mutate } = useMutation(
    (updataData) => {
      return axios.put(`${API}/${chooseEditList}`, updataData);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("lists");
        successEditList();
      },
    }
  );

  const upDateData = (list) => {
    const updateList = { ...list, label: editListLabel };
    mutate(updateList);
    setEditListActive(false);
  };

  const handleKeyPress = (e, list) => {
    if (e.key === "Enter") {
      upDateData(list);
    }
  };

  return (
    <>
      {contextHolder}
      <div className="flex flexwrap items-start gap-5">
        {data?.data
          ?.filter((l) => l?.boardId == +params?.id)
          ?.map((list, index) => {
            return (
              <div
                className="bg-[#101204] w-[333px] rounded-md p-2"
                key={index}
              >
                <div className="flex items-center justify-between text-gray-300">
                  {editListActive && chooseEditList == list?.id ? (
                    <div className="flex items-center justify-between w-[100%] edit-list-item">
                      <input
                        className="list-name"
                        placeholder={list?.label}
                        defaultValue={list?.label}
                        onChange={(e) => setEditListLabel(e.target.value)}
                        onKeyPress={(e) => {
                          handleKeyPress(e, list);
                        }}
                      />
                      <span
                        className="icon"
                        onClick={() => {
                          setEditListActive(false);
                        }}
                      >
                        <IoMdClose />
                      </span>
                    </div>
                  ) : (
                    <span
                      className="text-[16px] cursor-pointer w-[100%]"
                      onClick={() => {
                        setEditListActive(true);
                        setChooseEditList(list?.id);
                        setEditListLabel(list?.label);
                      }}
                    >
                      {list?.label}
                    </span>
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
      </div>
    </>
  );
};

export default ListsComp;

// import axios from "axios";
// import { useMutation, useQuery, useQueryClient } from "react-query";
// import { useParams } from "react-router";
// import { RxDotsVertical } from "react-icons/rx";
// import TasksComp from "../tasks";

// import "./style.css";
// import { useState } from "react";

// let API = `http://localhost:3004/lists`;

// const ListsComp = () => {
//   const params = useParams();
//   const queryClient = useQueryClient();
//   const [editListActive, setEditListActive] = useState(false);
//   const [chooseEditList, setChooseEditList] = useState(null);

//   const { data } = useQuery("lists", () => {
//     return axios.get(`${API}`);
//   });

//   const { mutate } = useMutation(
//     (updataData) => {
//       return axios.put(`${API}/${chooseEditList}`, updataData);
//     },
//     {
//       onSuccess: () => {
//         queryClient.invalidateQueries("lists");
//       },
//     }
//   );

//   const upDateData = (list) => {
//     console.log(list);
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") {
//       upDateData();
//     }
//   };

//   return (
//     <>
//       <div className="flex flexwrap items-start gap-5">
//         {data?.data
//           ?.filter((l) => l?.boardId == +params?.id)
//           ?.map((list, index) => {
//             return (
//               <div
//                 className="bg-[#101204] w-[333px] rounded-md p-2"
//                 key={index}
//               >
//                 <div className="flex items-center justify-between text-gray-300">
//                   {editListActive && chooseEditList == list?.id ? (
//                     <input
//                       className="list-name"
//                       placeholder={list?.label}
//                       defaultValue={list?.label}
//                       onChange={(e) => handleKeyPress(e.target.value)}
//                     />
//                   ) : (
//                     <span
//                       className="text-[16px] cursor-pointer w-[100%]"
//                       onClick={() => {
//                         setEditListActive(true);
//                         setChooseEditList(list?.id);
//                       }}
//                     >
//                       {list?.label}
//                     </span>
//                   )}
//                   <span className="text-[18px] font-bold py-1 cursor-pointer">
//                     <RxDotsVertical />
//                   </span>
//                 </div>

//                 <div>
//                   <TasksComp listId={list?.id} />
//                 </div>
//               </div>
//             );
//           })}
//       </div>
//     </>
//   );
// };

// export default ListsComp;
