import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const AboutMeWrapper = styled.div`
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
  border: 1px solid #f00;
  flex: 3;
  height: 100%;
  border-radius: 300px 0 0 300px;
  object-fit: cover;
  padding: 10px;
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

const SVGContainer = styled.svg`
  position: absolute;
  top: -7%;
  right: 0;
  width: 880px;
  height: 500px;
  pointer-events: none;
`;

const AnimatedText = styled.text`
  font-size: 8px;
  font-weight: regular;
  fill: #1d533e;
  font-family: "Dovemayo_gothic, sans-serif";
`;

const AboutMeSection = () => (
  <AboutMeWrapper>
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
    <Img src="/path/to/image.jpg" alt="Profile" />

    <SVGContainer viewBox="0 -10 240 230">
      <path
        id="textPath"
        d="M104.5 0.5H373.5V208.5H104.5C47.0624 208.5 0.5 161.938 0.5 104.5C0.5 47.0624 47.0624 0.5 104.5 0.5Z"
        stroke="transparent"
        fill="none"
      />
      <AnimatedText
        animate={{
          x: [0, -1200],
        }}
        transition={{
          repeat: Infinity,
          duration: 10,
          ease: "linear",
        }}
      ></AnimatedText>
    </SVGContainer>
  </AboutMeWrapper>
);

export default AboutMeSection;
