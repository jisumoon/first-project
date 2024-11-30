import React from "react";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  background: ${(props) => props.theme.colors.primary};
`;

const Contain = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 20px;

  @media (max-width: 1280px) {
    padding: 40px 20px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const MainTitle = styled.div`
  margin-top: 10px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  color: ${(props) => props.theme.colors.mainbackgtound};
  font-size: 120px;
  font-weight: bold;
  line-height: 1.1;
  letter-spacing: 4px;
  z-index: 1;

  @media (max-width: 1290px) {
    font-size: 100px;
  }

  @media (max-width: 768px) {
    font-size: 70px;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

const BottomTItle = styled.p`
  width: 100%;
  text-align: right;
  font-size: 22px;
  color: ${(props) => props.theme.colors.mainbackgtound};

  @media (max-width: 768px) {
    text-align: center;
    font-size: 18px;
  }
`;

const Img = styled.div`
  position: absolute;
  top: 14%;
  left: 10%;
  margin-left: 40px;

  img {
    width: 440px;
    height: 520px;
    opacity: 0.9;
  }

  @media (max-width: 1290px) {
    img {
      width: 440px;
      height: 520px;
    }
  }

  @media (max-width: 768px) {
    position: relative;
    margin-left: 0;
    top: 0;
    left: 0;
    text-align: center;

    img {
      width: 300px;
      height: 380px;
      margin: 0 auto;
    }
  }
`;

const BottomSection = styled.div`
  margin-top: 490px;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  padding-right: 20px;
  color: ${(props) => props.theme.colors.mainbackgtound};

  @media (max-width: 1290px) {
    margin-top: 500px;
  }

  @media (max-width: 768px) {
    margin-top: 0px;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

const RightInfo = styled.p`
  font-size: 17px;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

const RightDownSection = styled.ul`
  display: flex;
  gap: 40px;
  margin-top: 10px;
  font-family: ${(props) => props.theme.fonts.four};

  li {
    font-size: 20px;
    cursor: pointer;
    transition: transform 0.3s ease;
    color: #fff;
    &:hover {
      transform: translateY(-5px);
    }
  }

  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 20px;
    li {
      font-size: 18px;
    }
  }
`;

const Btn = styled.div`
  position: absolute;
  right: 14%;
  bottom: 10%;
  transform: rotate(-45deg);

  @media (max-width: 768px) {
    right: 10%;
    bottom: 5%;
  }
`;

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text);
  toast.success(`전화번호가 복사되었습니다!`);
};

const Contact = () => {
  return (
    <ContactContainer>
      <Contain>
        <MainTitle>
          <div>LINK</div>
          <div>/MESSAGE</div>
        </MainTitle>
        <BottomTItle>Planting My Future</BottomTItle>
        <Img>
          <img src="/img/codingForest.jpg" alt="codingForest" />
        </Img>
        <BottomSection>
          <RightInfo>
            Just as a small seed grows into a lush forest,
            <br /> I strive to learn, grow, and create better experiences each
            day.
          </RightInfo>
          <RightDownSection>
            <li onClick={() => copyToClipboard("010-2862-4628")}>PHONE</li>
            <li>
              <a href="mailto:jjisu97@naver.com" style={{ color: "inherit" }}>
                EMAIL
              </a>
            </li>
            <li>
              <a
                href="https://github.com/your-github-username"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "inherit" }}
              >
                GITHUB
              </a>
            </li>
            <li>
              <a
                href="https://your-blog-url.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "inherit" }}
              >
                BLOG
              </a>
            </li>
          </RightDownSection>
        </BottomSection>
      </Contain>
      <ToastContainer />
    </ContactContainer>
  );
};

export default Contact;
