import React, { useState } from "react";
import styled from "styled-components";
import { faBlogger, faGithub } from "@fortawesome/free-brands-svg-icons";
import {
  faCircle,
  faEnvelope,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RotatingLink from "../components/RotatingLink";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.theme.colors.primary};
`;

const Contain = styled.div`
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const LeftSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
`;

const Img = styled.div`
  width: 340px;
  height: 500px;
  border: 4px solid ${(props) => props.theme.colors.mainbackgtound};
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  padding-left: 40px;
  hr {
    width: 60px;
    height: 3px;
    background: #fff;
  }
`;

const RightInfo = styled.p`
  font-size: 36px;
  line-height: 1.6;
  color: #fff;
  font-family: ${(props) => props.theme.fonts.four};
`;

const RightDownSection = styled.ul`
  display: flex;
  gap: 40px;
  margin-top: 10px;
  li {
    font-size: 26px;
    cursor: pointer;
    transition: transform 0.3s ease;
    color: #fff;
    &:hover {
      transform: translateY(-5px);
    }
  }
`;

const Btn = styled.div`
  position: absolute;
  right: 14%;
  bottom: 10%;
  transform: rotate(-45deg);
`;

const copyToClipboard = (text, theme) => {
  navigator.clipboard.writeText(text);
  toast.success(`전화번호가 복사되었습니다!`, {});
};

const Contact = () => {
  return (
    <ContactContainer>
      <Contain>
        <RightSection>
          <RightInfo>
            "작은 씨앗이 자라 울창한 숲을 이루듯, <br /> 오늘도 배우고 성장하며
            더 나은 경험을 <br /> 만들어가겠습니다."
          </RightInfo>
          <RightDownSection>
            <li onClick={() => copyToClipboard("010-2862-4628")}>
              <FontAwesomeIcon icon={faPhone} />
            </li>
            <li>
              <a href="mailto:jjisu97@naver.com" style={{ color: "inherit" }}>
                <FontAwesomeIcon icon={faEnvelope} />
              </a>
            </li>
            <li>
              <a
                href="https://github.com/your-github-username"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "inherit" }}
              >
                <FontAwesomeIcon icon={faGithub} />
              </a>
            </li>
            <li>
              <a
                href="https://your-blog-url.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "inherit" }}
              >
                <FontAwesomeIcon icon={faBlogger} />
              </a>
            </li>
          </RightDownSection>
        </RightSection>
        <Btn>
          <RotatingLink />
        </Btn>
      </Contain>
      <ToastContainer />
    </ContactContainer>
  );
};

export default Contact;
