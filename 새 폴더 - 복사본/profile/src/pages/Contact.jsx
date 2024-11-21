import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone, faLink } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faBlogger } from "@fortawesome/free-brands-svg-icons";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 50px 100px;
  background: ${(props) => props.theme.colors.mainbackgtound || "#faf8ef"};
  width: 100%;
  margin: 0 auto;
  gap: 140px;
  height: 100vh;

  @media (max-width: 1024px) {
    gap: 40px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }
`;

const TextContainer = styled.div`
  flex: 2;
  max-width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 20px;
  height: 100%;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.primary || "#333"};

  @media (max-width: 768px) {
    font-size: 30px;
  }
`;

const Description = styled.div`
  font-size: 16px;
  color: ${(props) => props.theme.colors.info || "#666"};
  line-height: 1.6;
  font-family: ${(props) => props.theme.fonts.secondary};

  .thanks {
    margin-bottom: 20px;
    font-size: 18px;
  }

  .contact-info {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;

    p {
      margin: 0;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    a {
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }

    svg {
      color: ${(props) => props.theme.colors.primary || "#333"};
      font-size: 18px;
    }
  }

  @media (max-width: 768px) {
    font-size: 14px;

    .thanks {
      font-size: 16px;
    }
  }
`;

const ImageContainer = styled.div`
  height: 80%;
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  @media (max-width: 1024px) {
    justify-content: center;
    gap: 15px;
  }

  @media (max-width: 768px) {
    justify-content: center;
    gap: 10px;
  }
`;

const ImageItem = styled.div`
  border-radius: 4px;
  border-bottom: 4px solid ${(props) => props.theme.colors.primary};
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;

  width: ${(props) => (props.large ? "60%" : "38%")}; /* 큰 이미지는 더 넓게 */

  @media (max-width: 1024px) {
    width: ${(props) => (props.large ? "100%" : "48%")}; /* 태블릿 크기 */
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const GallerySection = () => {
  return (
    <Wrapper>
      <TextContainer>
        <Title>Contact</Title>
        <Description>
          <p className="thanks">
            코드 한 줄 한 줄이 숲이 되어가는 여정을 기록합니다.
          </p>

          <div className="contact-info">
            <p>
              <FontAwesomeIcon icon={faEnvelope} />

              <a href="mailto:example@example.com">jjisu97@naver.com</a>
            </p>
            <p>
              <FontAwesomeIcon icon={faPhone} />
              010.2862.4628
            </p>
            <p>
              <FontAwesomeIcon icon={faGithub} />

              <a href="https://github.com/example">github.com/example</a>
            </p>
            <p>
              <FontAwesomeIcon icon={faBlogger} />
              <a href="https://exampleblog.com">exampleblog.com</a>
            </p>
          </div>
        </Description>
      </TextContainer>

      <ImageContainer>
        <ImageItem
          large={true}
          image="https://via.placeholder.com/300x450?text=Image+1"
        />
        <ImageItem image="https://via.placeholder.com/150x150?text=Image+2" />
        <ImageItem image="https://via.placeholder.com/150x150?text=Image+3" />
        <ImageItem
          large={true}
          image="https://via.placeholder.com/300x450?text=Image+4"
        />
      </ImageContainer>
    </Wrapper>
  );
};

export default GallerySection;
