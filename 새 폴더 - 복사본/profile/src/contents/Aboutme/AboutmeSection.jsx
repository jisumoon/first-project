import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const AboutMeWrapper = styled(motion.div)`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 40px;
  padding-left: 100px;
  margin-top: 100px;
  height: auto;
  min-height: 70vh;

  @media (max-width: 1280px) {
    padding-left: 40px;
    gap: 30px;
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 860px) {
    flex-direction: column;
  }

  @media (max-width: 400px) {
    margin-top: 40px;
    gap: 20px;
  }
`;

const InfoSection = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-items: flex-start;

  @media (max-width: 860px) {
    align-items: flex-end;
  }

  @media (max-width: 400px) {
    align-items: flex-start;
    padding-right: 10px;
  }
`;

const InfoTitle = styled.h2`
  font-size: 36px;
  font-weight: bold;
  line-height: 1.4;
  margin-bottom: 10px;

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
  line-height: 1.6;
  color: ${(props) => props.theme.colors.info};
`;

const Img = styled(motion.img)`
  flex: 3;
  width: 100%;
  height: auto;
  max-height: 400px;
  object-fit: cover;
  border-radius: 300px 0 0 300px;

  @media (max-width: 1280px) {
    max-height: 300px;
  }

  @media (max-width: 768px) {
    max-height: 250px;
  }

  @media (max-width: 400px) {
    max-height: 200px;
  }
`;

const AboutMeSection = () => {
  return (
    <AboutMeWrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
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
          <br />
          다양한 요구와 문제를 파악하여, 더 나은 사용자 경험을 만들어가고
          싶습니다.
        </Info>
      </InfoSection>

      <Img
        src={`/img/main.jpg`}
        alt="Profile"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }}
        transition={{ duration: 0.8 }}
      />
    </AboutMeWrapper>
  );
};

export default AboutMeSection;
