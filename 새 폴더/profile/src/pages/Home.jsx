import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Main = styled.main`
  margin-top: 10px;
  width: 100%;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  &.top {
    flex-direction: row;
    padding: 0 200px;
    padding-top: 20px;
  }

  &.bottom {
    height: 140px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 20px 300px;
    background: ${(props) => props.theme.colors.primary};
    color: #cfd69b;
  }
`;

const BottomContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

const Article = styled(motion.article)`
  width: 100%;
  &.title {
    flex: 3;
  }
  &.info {
    flex: 2;
  }
  &.left {
    flex: 1;
    padding-left: 20px;
  }
  &.middle {
    flex: 1;
    border-radius: 50% 50% 0 0;
    background: #6b9a6e;
  }
  &.right {
    flex: 1;
  }
`;

const UpperInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 18px;
  color: #fff;
`;

const TtitleNumber = styled.span`
  font-size: 30px;
  font-weight: 700;
  letter-spacing: 2px;
`;

const TitleSpan = styled.span`
  font-size: 22px;
  font-weight: 100;
`;

const TitleLogo = styled.span`
  font-size: 24px;
  font-weight: 100;
`;

const TittleOne = styled.span`
  width: 70px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 40px;
  border-radius: 50%;
  background: #d8e28c;
  color: ${(props) => props.theme.colors.secondary};
  font-size: 15px;
  font-weight: 800;
  cursor: pointer;
`;

const BottomBtn = styled.div`
  width: 200px;
  margin-top: 60px;

  padding-bottom: 10px;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const Btn = styled.button`
  width: 100px;
  padding: 10px;
  padding-bottom: 20px;
  border: none;
  background: none;
  color: #fff;
  font-size: 18px;
  text-align: left;
  cursor: pointer;
`;

const ImgContainer = styled(motion.div)`
  position: absolute;
  bottom: 19%;
  right: 34%;
  width: 400px;
`;

const Img = styled.img`
  width: 320px;
`;

const Right = styled(motion.div)`
  position: absolute;
  top: 20%;
  left: 60%;
`;

const RightTitle = styled.p`
  margin-top: 100px;
  font-size: 80px;
  color: transparent;
  -webkit-text-stroke: 1px rgba(255, 255, 255, 0.6);
`;

const RightInfo = styled.p`
  margin-top: 30px;
  font-size: 60px;
  color: #fff;
  font-weight: 600;
`;

const Title = styled.h3`
  font-size: 16px;
  font-weight: 100;
  line-height: 1.2;
  opacity: 0.9;
`;

const TitleInfo = styled.h5`
  margin-top: 20px;
  font-size: 10px;
  line-height: 1.2;
  opacity: 0.6;
`;

const Info = styled.p`
  font-size: 12px;
  font-weight: 100;
  line-height: 1.4;
  opacity: 0.6;
`;

const AnimatedSvg = styled(motion.svg)`
  width: 100%;
  position: absolute;
  top: 46%;
  z-index: -10000;
`;

//variant
const lineVariants = {
  hidden: { width: 0 },
  visible: {
    width: "100%",
    transition: { duration: 4 },
  },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.5,
    },
  },
};

const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
};

const fadeInWithDelayVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 6, delay: 1.5 },
  },
};

const Home = () => {
  return (
    <Container>
      <Main>
        <AnimatedSvg
          width="2000"
          height="40"
          viewBox="0 0 2000 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          initial="hidden"
          animate="visible"
          variants={lineVariants}
        >
          <rect width="2000" height="6" fill="rgba(255, 255, 255, 0.3)" />
        </AnimatedSvg>

        <Section
          className="top"
          as={motion.div}
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <Article className="left" as={motion.div} variants={fadeInVariants}>
            <UpperInfo>
              <TtitleNumber>0626k</TtitleNumber>
              <TitleSpan>X</TitleSpan>
              <TitleLogo>PORTFOLIO</TitleLogo>
              <TittleOne>+ 더 보기</TittleOne>
            </UpperInfo>
            <BottomBtn>
              <Btn>PROTOFOLIO</Btn>
              <Btn>NOTION</Btn>
              <Btn>RESUME</Btn>
            </BottomBtn>
          </Article>

          <Article className="middle" variants={fadeInVariants}>
            <ImgContainer>
              <Img src="/img/profile.png" alt="Profile" />
            </ImgContainer>
          </Article>

          <Article className="right">
            <Right variants={fadeInWithDelayVariants}>
              <RightTitle>FRONTEND</RightTitle>
              <RightInfo>MOON JI SU</RightInfo>
            </Right>
          </Article>
        </Section>

        <Section className="bottom">
          <BottomContainer>
            <Article className="title">
              <Title>숲속의 지수 </Title>
              <Title>코드를 심다</Title>
              <TitleInfo>
                © [2024] JISU's Code in the Forest. All rights reserved.
              </TitleInfo>
            </Article>
            <Article className="info" variants={containerVariants}>
              <Info>
                숲속의 지수는
                <br />
                지식을 쌓아가며 매일 성장하는 여정을 담고 있습니다.
                <br />
                코드를 심어 숲을 가꾸어
                <br />
                꾸준한 발전 과정을 보여줍니다.
              </Info>
            </Article>
          </BottomContainer>
        </Section>
      </Main>
    </Container>
  );
};

export default Home;
