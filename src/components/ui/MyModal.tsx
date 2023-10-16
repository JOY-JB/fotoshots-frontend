import { Modal } from "antd";
import React from "react";

interface MyModalProps {
  title: string;
  handleCancel: () => void;
  handleOk: (e: React.MouseEvent<HTMLElement>) => void;
  children: React.ReactNode | React.ReactElement;
  isModalOpen: boolean;
}

const MyModal = ({
  title,
  handleOk,
  children,
  isModalOpen,
  handleCancel,
}: MyModalProps) => {
  return (
    <Modal
      title={title}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      {children}
    </Modal>
  );
};

export default MyModal;
