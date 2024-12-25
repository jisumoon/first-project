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

const Section = styled.div`
  margin-bottom: 10px;

  p {
    font-size: 14px;
    margin-bottom: 10px;
    line-height: 1.6;
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
      >
        {Array.isArray(data) &&
          data.map((item, index) => (
            <Section key={index}>
              {item.technology && <p>• {item.technology}</p>}
              {item.achievement && <p>• {item.achievement}</p>}
              {item.limitation && <p>⸰ 제한점: {item.limitation}</p>}
              {item.improvement && <p>⸰ 해결방안: {item.improvement}</p>}
              {item.problem && <p>• 코드 오류: {item.problem}</p>}
              {item.solution && <p>• 코드 수정: {item.solution}</p>}
            </Section>
          ))}
      </AccordionContent>
    </AccordionContainer>
  );
};

export default Accordion;
