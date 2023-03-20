import React from "react";

const Modal = ({ selectedImg, closeModal }) => {
  const closeImg = (e) => {
    if (e.target.classList.contains("backdrop")) closeModal();
  };

  return (
    // onClick={closeImg} is for closing the modal when clicking outside the image
    <div className="backdrop" onClick={closeImg}>
      <img src={selectedImg} alt="Modal view" />
    </div>
  );
};

export default Modal;
