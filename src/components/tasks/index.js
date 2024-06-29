import axios from "axios";
import { useQuery } from "react-query";

const TasksComp = ({ listId }) => {
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
                className="bg-[#22272B] text-gray-300 my-1 p-2"
              >
                {/* #1D2125 */}
                {task?.label}
              </div>
            );
          })}
      </div>
    </>
  );
};

export default TasksComp;
