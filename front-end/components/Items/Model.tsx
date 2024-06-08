import React, { useEffect } from "react";
import { FaTimes } from "react-icons/fa";

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-full max-w-4xl mx-auto rounded-lg shadow-lg overflow-hidden animate-slide-in relative max-h-[600px] overflow-y-auto">
          <div className="relative flex justify-between items-center p-4 border-b">
      <span className="text-3xl font-sans font-bold ml-4">Profile</span>
      <button onClick={onClose} className="text-gray-600">
        <FaTimes size={20} />
      </button>
      </div>
            <div>
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
