// src/components/Modal.tsx
import React from "react";

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 p-2"
        >
          <i className="fi fi-rr-cross-circle text-4xl"></i>
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
