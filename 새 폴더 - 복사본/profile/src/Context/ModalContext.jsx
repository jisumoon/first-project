import React, { createContext, useContext, useState } from "react";

// Context 생성
const ModalContext = createContext();

// Provider 컴포넌트
export const ModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 모달 상태를 변경하는 함수
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <ModalContext.Provider value={{ isModalOpen, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

// Custom Hook으로 Context 소비
export const useModal = () => {
  return useContext(ModalContext);
};
