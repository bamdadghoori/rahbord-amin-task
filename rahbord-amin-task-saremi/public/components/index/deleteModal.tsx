import React, { useEffect, useState } from "react";
import styled, { keyframes } from 'styled-components';

// Define keyframes for the rising and exiting animations
const riseIn = keyframes`
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const exitOut = keyframes`
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(100%);
    opacity: 0;
  }
`;

const ModalOverlay = styled.div<{ isVisible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: ${({ isVisible }) => (isVisible ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  z-index: 1000;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transition: opacity 0.3s ease-out;
`;

const ModalContent = styled.div<{ isVisible: boolean }>`
  background: white;
  padding: 20px;
  border-radius: 5px;
  width: 400px;
  text-align: center;
  animation: ${({ isVisible }) => (isVisible ? riseIn : exitOut)} 0.3s forwards;

  .btn-danger {
    background-color: rgb(211, 41, 41);
    color: rgb(255, 255, 255);
    border: 1px solid rgba(211, 41, 41, 1);
  }

  .btn {
    display: inline-flex;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    border-radius: 0.375rem;
    font-weight: 500;
    transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter, -webkit-backdrop-filter;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 0.2s;
    padding: 0.5rem 0.75rem;
    width: 6rem;
  }

  .btn-danger:hover {
    background-color: rgba(211, 41, 41, 0.9);
    border: 1px solid rgba(211, 41, 41, 0.9);
  }

  .btn-cancel {
    border: 1px solid rgba(226, 232, 240, 1);
    background-color: transparent;
  }

  .btn-cancel:hover {
    border: 1px solid rgba(226, 232, 240, 0.9);
    background-color: rgba(226, 232, 240, 0.9);
  }

  h2 {
    font-size: 1.2rem;
    line-height: 2.25rem;
    font-weight: 700;
  }
`;

interface ModalProps {
  id: number;
  title: string;
  isVisible: boolean;
  onClose: () => void;

  handleDelete: (arg:number) => void;
}

const DeleteModal: React.FC<ModalProps> = ({ id, title, isVisible, onClose,handleDelete }) => {

  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!isVisible) {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 300); // Match this duration to the exitOut animation duration
    }
  }, [isVisible]);

  return (
    <ModalOverlay isVisible={isVisible || isAnimating} onClick={onClose}>
      <ModalContent isVisible={isVisible || isAnimating} onClick={(e) => e.stopPropagation()}>
        <h2>"{title}" پاک میشود.</h2>
        <p>آیا از پاک کردن "{title}" مطمئن هستید؟</p>
        <div className="flex gap-3 justify-center mt-4">
          <button className="btn btn-danger" onClick={()=>{handleDelete(id);onClose()}}>حذف</button>
          <button className="btn btn-cancel" onClick={onClose}>لغو</button>
        </div>
      </ModalContent>
    </ModalOverlay>
  );
};

export default DeleteModal;
