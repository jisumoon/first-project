import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import AboutMeSection from "../contents/Aboutme/AboutmeSection";
import SkilltypeSection from "../contents/Aboutme/SkilltypeSection";
import CareerSection from "../contents/Aboutme/CareerSection";

const Contain = styled.div`
  width: 100%;
  background: ${(props) => props.theme.colors.mainbackgtound};
  padding-bottom: 100px;
`;

const Title = styled(motion.h1)`
  width: 100%;
  padding-top: 80px;
  font-size: 26px;
  font-weight: 900;
  text-align: center;
  color: ${(props) => props.theme.colors.primary};

  @media (max-width: 768px) {
    font-size: 20px;
  }

  @media (max-width: 400px) {
    font-size: 14px;
  }
`;

const SectionWrapper = styled.div`
  margin-top: 50px;

  @media (max-width: 768px) {
    margin-top: 30px;
  }
`;

const AboutMe = () => {
  return (
    <Contain>
      <Title
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        Here's a brief introduction about who I am
      </Title>

      <SectionWrapper>
        <AboutMeSection />
      </SectionWrapper>

      <SectionWrapper>
        <SkilltypeSection />
      </SectionWrapper>

      <SectionWrapper>
        <CareerSection />
      </SectionWrapper>
    </Contain>
  );
};

export default AboutMe;
