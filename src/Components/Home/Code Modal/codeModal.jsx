import React from "react";
import { Modal } from "react-responsive-modal";
import "../../../css/responsive_modal.css";
import code from "../img/ratcode.png";
const CodeModal = ({ open, onCloseModal }) => {
  return (
    <Modal open={open} onClose={onCloseModal} center>
      <img
        src={code}
        style={{ height: "100%", width: "100%" }}
        alt="Rate in a maze code"
      />
    </Modal>
  );
};

export default CodeModal;
