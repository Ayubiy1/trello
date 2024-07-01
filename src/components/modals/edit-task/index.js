import React, { useEffect } from "react";
import { Button, Modal } from "antd";
import { useSelector } from "react-redux";

import "./style.css";

const EditModalTask = ({ taskId, open, setOpen }) => {
  const chooseTaskId = useSelector((state) => state.todo?.chooseTaskId);

  // const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

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
        title={<p>Loading Modal</p>}
        footer={
          <Button type="primary" onClick={showLoading}>
            Reload
          </Button>
        }
        loading={loading}
        open={open}
        onCancel={() => setOpen(false)}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};
export default EditModalTask;
