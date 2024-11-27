import React, { useState } from "react";
import styled from "styled-components";
import useRippleEffect from "../Hook/useRippleEffect";
import RippleEffectComponent from "../components/RippleEffectContainer";
import { faBlogger, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
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
  font-family: ${(props) => props.theme.fonts.third};
`;

const Contain = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const RightSection = styled.div`
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
`;

const RightDownSection = styled.ul`
  display: flex;
  gap: 40px;
  margin-top: 10px;
  font-family: ${(props) => props.theme.fonts.four};
  li {
    font-size: 22px;
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
  const { ripples, containerRef } = useRippleEffect();

  return (
    <ContactContainer>
      <RippleEffectComponent ref={containerRef} ripples={ripples} />
      <Contain>
        <RightSection>
          <span>감사합니다</span>
          <RightInfo>
            "작은 씨앗이 자라 울창한 숲을 이루듯, <br /> 오늘도 배우고 성장하며
            더 나은 경험을 <br /> 만들어가겠습니다."
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
        </RightSection>
      </Contain>
      <ToastContainer />
    </ContactContainer>
  );
};

export default Contact;
