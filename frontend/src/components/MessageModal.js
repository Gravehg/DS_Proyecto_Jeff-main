import React from "react";
import ReactModal from "react-modal";

function MessageModal({ message, is_open, close, error }) {
  return (
    <ReactModal
      isOpen={is_open}
      onRequestClose={close}
      className="mt-4 mb-4 modal-dialog modal-lg"
    >
      {error ? (
        <div className=" alert alert-danger">{message}</div>
      ) : (
        <div className=" alert alert-success">{message}</div>
      )}
    </ReactModal>
  );
}

export default MessageModal;
