import React from "react";
import { createPortal } from "react-dom";
import classes from "./Modal.module.css";

type ModalProps = {
  onClose?: () => void;
  handleClick?: () => void;
  ref: React.RefObject<HTMLDialogElement | null>;
  children?: React.ReactNode;
};

function Modal({ ref, onClose, children }: ModalProps) {
  function handleOutsideClick(e: React.MouseEvent<HTMLDialogElement>) {
    if (e.target === ref.current) {
      ref.current?.close();
    }
  }
  function handleClose() {
    if (onClose) {
      onClose();
    }
    ref.current?.close();
  }

  return createPortal(
    <dialog ref={ref} className={classes.modal} onClick={handleOutsideClick}>
      <div className={classes["modal-content"]}>
        {children}
        <button className={classes.close} onClick={handleClose}>
          ✖
        </button>
      </div>
    </dialog>,
    document.getElementById("modal") as HTMLElement
  );
}

export default Modal;
