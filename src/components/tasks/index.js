import axios from "axios";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { setChooseTaskId } from "../../store/todoSlice";
import EditModalTask from "../modals/edit-task";

const TasksComp = ({ listId }) => {
  const dispatch = useDispatch();

  const { data } = useQuery("tasks", () => {
    return axios.get(`https://trello-api-ahgs.onrender.com/tasks`);
  });

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
                onClick={() => {
                  console.log(task?.id);
                  dispatch(setChooseTaskId(task?.id));
                }}
              >
                <p className="m-0">{task?.label}</p>

                <EditModalTask taskId={task?.id} />
              </div>
            );
          })}
      </div>
    </>
  );
};

export default TasksComp;
