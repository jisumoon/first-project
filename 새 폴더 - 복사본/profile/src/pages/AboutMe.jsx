import React from "react";
import styled from "styled-components";
import AboutMeSection from "../contents/Aboutme/AboutmeSection";
import SkilltypeSection from "../contents/Aboutme/SkilltypeSection";
import InterviewSection from "../contents/Aboutme/InterviewSection";
import CareerSection from "../contents/Aboutme/CareerSection";

const Contain = styled.div`
  width: 100%;
  padding-bottom: 100px;
`;

const Title = styled.h1`
  width: 100%;
  padding-top: 80px;
  font-size: 26px;
  font-weight: 900;
  text-align: center;
  color: ${(props) => props.theme.colors.primary};
`;

const AboutMe = () => (
  <Contain>
    <Title>Here's a brief introduction about who I am</Title>
    <AboutMeSection />
    <SkilltypeSection />
    <CareerSection />
    <InterviewSection />
    {/* <Banner /> */}
  </Contain>
);

export default AboutMe;
