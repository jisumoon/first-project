import React, { useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { setCurrentSection } from "../../store/sectionReducer";

const AboutMeWrapper = styled(motion.div)`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 40px;
  margin-top: 140px;
  padding-left: 100px;
  height: 60vh;
`;

const Img = styled.img`
  flex: 3;
  height: 100%;
  border-radius: 300px 0 0 300px;
  object-fit: cover;
`;

const InfoSection = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const InfoTitle = styled.h2`
  font-size: 36px;
  font-weight: bold;
  line-height: 1.4;
  padding-bottom: 10px;
  span {
    &:nth-child(1) {
      color: ${(props) => props.theme.colors.primary};
    }
    &:last-child {
      color: ${(props) => props.theme.colors.secondary};
    }
  }
`;

const Info = styled.h3`
  font-size: 20px;
  font-weight: 400;
  line-height: 1.4;
  color: ${(props) => props.theme.colors.info};
`;

const AboutMeSection = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // AboutMe 섹션이 로드될 때 현재 섹션을 설정
    dispatch(setCurrentSection("aboutMeSection"));
  }, [dispatch]);

  return (
    <AboutMeWrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <InfoSection>
        <InfoTitle>
          사람을 이해하는 <span>뿌리로</span>, <br />
          숲을 가꾸는 <span>프론트엔드</span>
        </InfoTitle>
        <Info>
          치료사로서 환자의 제약을 이해하고 해결책을 찾던 경험이,
          <br />
          사용자 중심의 웹 환경을 설계하는 데 큰 밑거름이 되었습니다.
          <br /> 다양한 요구와 문제를 파악하여, 더 나은 사용자 경험을 만들어가고
          싶습니다.
        </Info>
      </InfoSection>
      <Img src="/img/main.jpg" alt="Profile" />
    </AboutMeWrapper>
  );
};

export default AboutMeSection;
