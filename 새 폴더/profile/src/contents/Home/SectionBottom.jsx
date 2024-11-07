import React from "react";
import {
  Section,
  BottomContainer,
  Article,
  Title,
  TitleInfo,
  Info,
} from "../Home/HomeStyled";

const SectionBottom = () => (
  <Section className="bottom">
    <BottomContainer>
      <Article className="title">
        <Title>숲속의 지수</Title>
        <Title>코드를 심다</Title>
        <TitleInfo>
          © [2024] JISU's Code in the Forest. All rights reserved.
        </TitleInfo>
      </Article>
      <Article className="info">
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
);

export default SectionBottom;
