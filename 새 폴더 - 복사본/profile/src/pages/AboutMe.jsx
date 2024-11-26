import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { setPage } from "../store/sectionSliceReducer";
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

  @media (max-width: 768px) {
    margin-top: 30px;
  }
`;

const AboutMe = () => {
  // 애니메이션 variants
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 50 }, // 초기 상태
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeInOut" },
    },
  };

  return (
    <Contain id="aboutMe">
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
        viewport={{ once: true, amount: 0.2 }} // 뷰포트에 20% 이상 들어오면 트리거
        variants={fadeInUpVariants}
      >
        <AboutMeSection />
      </SectionWrapper>
      <SectionWrapper
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUpVariants}
      >
        <SkilltypeSection />
      </SectionWrapper>
      <SectionWrapper
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUpVariants}
      >
        <CareerSecton />
      </SectionWrapper>
    </Contain>
  );
};

export default AboutMe;
