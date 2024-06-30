import React from "react";
import { Button, Modal } from "antd";
import { RxDotsVertical } from "react-icons/rx";
import { useSelector } from "react-redux";

const EditModalTask = ({ taskId }) => {
  const chooseTaskId = useSelector((state) => state.todo?.chooseTaskId);

  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const showLoading = () => {
    setOpen(true);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  return (
    <>
      <span
        className="text-[18px] text-gray-300 font-bold py-1 cursor-pointer"
        onClick={showLoading}
      >
        <RxDotsVertical />
      </span>

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
