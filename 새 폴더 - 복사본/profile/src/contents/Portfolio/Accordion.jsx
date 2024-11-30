import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

const AccordionContainer = styled.div`
  width: 100%;
  margin-top: 10px;
  border-radius: 8px;
`;

const AccordionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 20px;
  background: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  font-weight: bold;
  border-radius: 4px;
`;

const AccordionContent = styled(motion.div)`
  overflow: hidden;
  padding: 10px 20px;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 0;
  padding: 0;
  list-style-type: none;
`;

const ListItem = styled.li`
  font-size: 14px;
  padding: 5px 0;
  border-bottom: 1px solid #eee;
  &:last-child {
    border-bottom: none;
  }
`;

const Accordion = ({ id, title, data }) => {
  const [isOpen, setIsOpen] = useState(false);

  const variants = {
    open: { opacity: 1, height: "auto", transition: { duration: 0.3 } },
    closed: { opacity: 0, height: 0, transition: { duration: 0.3 } },
  };

  return (
    <AccordionContainer>
      <AccordionHeader onClick={() => setIsOpen(!isOpen)}>
        {title}
        <FontAwesomeIcon icon={isOpen ? faCaretUp : faCaretDown} />
      </AccordionHeader>
      <AccordionContent
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={variants}
        defaultOpen
      >
        <List>
          {Array.isArray(data) &&
            data.map((item, index) => (
              <ListItem key={index}>
                ▪️ {typeof item === "object" ? JSON.stringify(item) : item}
              </ListItem>
            ))}
        </List>
      </AccordionContent>
    </AccordionContainer>
  );
};

export default Accordion;
