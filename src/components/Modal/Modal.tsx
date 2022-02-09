import { FC } from "react";
import "./modal.scss";

interface ModalProps {
  active: boolean;
  setActive: (active: boolean) => void;
}

const Modal: FC<ModalProps> = ({ active, setActive, children }) => {
  const modalClass = active ? "modal active" : "modal";
  const modalContentClass = active ? "modal__content active" : "modal__content";
  return (
    <div className={modalClass} onClick={() => setActive(false)}>
      <div
        className={modalContentClass}
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
