import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import AboutMeSection from "../contents/Aboutme/AboutmeSection";
import CareerSecton from "../contents/Aboutme/CareerSection";
import SkilltypeSection from "../contents/Aboutme/SkilltypeSection";

const Contain = styled(motion.div)`
  width: 100%;
  background: ${(props) => props.theme.colors.mainbackground};
  padding-bottom: 40px;
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

const SectionWrapper = styled(motion.div)`
  margin-top: 50px;
  &:not(:last-child) {
    margin-bottom: 100px;
  }

  @media (max-width: 768px) {
    margin-top: 30px;
  }
`;

const AboutMe = () => {
  const fadeInUpVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: "easeOut",
        staggerChildren: 0.4,
        delayChildren: 0.3,
      },
    },
  };

  return (
    <Contain>
      <Title
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        Here's a brief introduction about who I am
      </Title>
      <SectionWrapper
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUpVariants}
        transition={{ duration: 1, delay: 0 }}
      >
        <AboutMeSection />
      </SectionWrapper>
      <SectionWrapper
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUpVariants}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <SkilltypeSection />
      </SectionWrapper>
      <SectionWrapper
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={fadeInUpVariants}
        transition={{ duration: 1, delay: 0.4 }}
      >
        <CareerSecton />
      </SectionWrapper>
    </Contain>
  );
};

export default AboutMe;
