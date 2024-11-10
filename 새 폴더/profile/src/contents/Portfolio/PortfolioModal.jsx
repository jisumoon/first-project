import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const ModalContent = styled(motion.div)`
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  width: 600px;
  max-width: 90%;
  position: relative;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
`;

const PortfolioModal = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <ModalOverlay
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ModalContent
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
      >
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <h2>{item.title_kr}</h2>
        <p>{item.description}</p>
        <img src={item.img} alt={item.title_en} width="100%" />
      </ModalContent>
    </ModalOverlay>
  );
};

export default PortfolioModal;
