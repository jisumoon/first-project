import React from "react";
import { motion } from "framer-motion";
import RippleEffect from "../../components/RippleEffect";
import {
  Section,
  Article,
  UpperInfo,
  TtitleNumber,
  TitleSpan,
  TitleLogo,
  TittleOne,
  BottomBtn,
  Btn,
  ImgContainer,
  Right,
  RightTitle,
  RightInfo,
  Img,
} from "../Home/HomeStyled";

import {
  containerVariants,
  fadeInVariants,
  fadeInWithDelayVariants,
} from "../Home/Animation";

const SectionTop = ({ createRipple, ripples }) => (
  <Section
    as={motion.section}
    className="top"
    initial="hidden"
    animate="visible"
    variants={containerVariants}
    onMouseMove={createRipple}
  >
    <RippleEffect ripples={ripples} />
    <Article className="left" as={motion.article} variants={fadeInVariants}>
      <UpperInfo>
        <TtitleNumber>0626k</TtitleNumber>
        <TitleSpan>X</TitleSpan>
        <TitleLogo>PORTFOLIO</TitleLogo>
        <TittleOne>+ 더 보기</TittleOne>
      </UpperInfo>
      <BottomBtn>
        <Btn>
          <span>PORTFOLIO</span>
        </Btn>
        <Btn>
          <span>INTERVIEW</span>
        </Btn>
        <Btn>
          <span>RESUME</span>
        </Btn>
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
);

export default SectionTop;
