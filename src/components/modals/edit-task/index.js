import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import { useSelector } from "react-redux";

import "./style.css";
import axios from "axios";
import { useQuery } from "react-query";

const EditModalTask = ({ taskId, open, setOpen }) => {
  const chooseTaskId = useSelector((state) => state.todo?.chooseTaskId);
  const [loading, setLoading] = React.useState(true);
  const [editTaskItem, setEditTaskItem] = useState(null);

  const { data } = useQuery([chooseTaskId, "task-edit-modal"], () => {
    return axios.get(`http://localhost:3004/tasks/?id=${chooseTaskId}`);
  });

  useEffect(() => {
    data?.data.map((item) => {
      setEditTaskItem(item);
    });
  }, [data?.data]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, [loading]);

  const showLoading = () => {
    setOpen(true);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  return (
    <>
      <Modal
        centered
        title={<p className="m-0">{editTaskItem?.label}</p>}
        footer={
          <Button type="primary" onClick={showLoading}>
            Reload
          </Button>
        }
        loading={loading}
        open={open}
        onCancel={() => setOpen(false)}
      ></Modal>
    </>
  );
};
export default EditModalTask;
