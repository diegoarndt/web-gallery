import React from "react";

const Modal = ({ selectedImg, closeModal }) => {
  const closeImg = (e) => {
    if (e.target.classList.contains("backdrop")) closeModal();
  };

  return (
    <div className="backdrop" onClick={closeImg}>
      <img src={selectedImg} alt="Full View" />
    </div>
  );
};

export default Modal;
