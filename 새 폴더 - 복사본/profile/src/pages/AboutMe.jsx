import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { setCurrentSection } from "../store/sectionReducer";
import AboutMeSection from "../contents/Aboutme/AboutmeSection";
import SkilltypeSection from "../contents/Aboutme/SkilltypeSection";
import InterviewSection from "../contents/Portfolio/TeamProject";
import CareerSection from "../contents/Aboutme/CareerSection";

const Contain = styled.div`
  width: 100%;
  background: ${(props) => props.theme.colors.mainbackgtound};
  @media (max-width: 1280px) {
    width: 100%;
    padding-bottom: 100px;
  }

  @media (max-width: 1240px) {
    width: 100%;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Title = styled.h1`
  width: 100%;
  padding-top: 80px;
  font-size: 26px;
  font-weight: 900;
  text-align: center;
  color: ${(props) => props.theme.colors.primary};
  @media (max-width: 1240px) {
  }

  @media (max-width: 768px) {
    font-size: 20px;
  }

  @media (max-width: 400px) {
    font-size: 18px;
  }
`;

const AboutMe = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // 현재 섹션을 'aboutMe'로 설정
    dispatch(setCurrentSection("aboutMe"));
  }, [dispatch]);

  return (
    <Contain>
      <Title>Here's a brief introduction about who I am</Title>
      <AboutMeSection />
      <SkilltypeSection />
      <CareerSection />
    </Contain>
  );
};

export default AboutMe;
