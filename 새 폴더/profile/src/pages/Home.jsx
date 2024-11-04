import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  width: 100%;
`;

const Main = styled.main``;

const Section = styled.section`
  width: 100%;
  &.bottom {
    background: ${(props) => props.theme.colors.primary};
    color: #fff;
    display: flex;
  }
`;

const Article = styled.article`
  width: 100%;
  &.title {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  &.info {
    flex: 3;
  }
`;

const ArticleImg = styled.div``;

const Title = styled.h3``;

const TitleInfo = styled.h5``;

const Info = styled.p``;

const Home = () => {
  return (
    <Container>
      <Main>
        <Section className="top">
          <Article></Article>
          <ArticleImg></ArticleImg>
          <Article></Article>
        </Section>
        <Section className="bottom">
          <Article className="title">
            <Title>숲속의 지수</Title>
            <TitleInfo>
              <FontAwesomeIcon icon={faCode} />
              코드를 심다
            </TitleInfo>
          </Article>
          <Article className="info">
            <Info>
              숲속의 지수는 꾸준히 지식을 쌓아가는 여정을 담고있습니다.
              <br /> 코드를 심어 나가며 숲을 가꾸듯, 매일 성장과 발전을 이뤄내는
              과정을 담았습니다.
            </Info>
          </Article>
        </Section>
      </Main>
    </Container>
  );
};

export default Home;
