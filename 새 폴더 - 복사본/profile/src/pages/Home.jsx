import React, { useState, useRef, useEffect } from "react";
import AnimatedSvg from "../contents/Home/AnimateSvg";
import SectionTop from "../contents/Home/SectionTop";
import SectionBottom from "../contents/Home/SectionBottom";
import { Main } from "../contents/Home/HomeStyled";
import Header from "../components/Header";
import styled from "styled-components";

const Container = styled.div`
  background: url(${(props) => props.$url}) center/cover no-repeat;
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
  z-index: -4;
`;

const Home = () => {
  const [ripples, setRipples] = useState([]);
  const lastRippleTimeRef = useRef(0);
  const rippleTimeouts = useRef([]);

  useEffect(() => {
    return () => {
      // 컴포넌트 언마운트 시 모든 타임아웃 정리
      rippleTimeouts.current.forEach(clearTimeout);
    };
  }, []);

  const createRipple = (event) => {
    const now = Date.now();
    // 연속 클릭 방지: 200ms보다 짧으면 무시
    if (now - lastRippleTimeRef.current < 200) return;
    lastRippleTimeRef.current = now;

    // ripple의 위치 계산
    const rippleX = event.clientX;
    const rippleY = event.clientY;
    const newRipple = { id: Date.now(), x: rippleX, y: rippleY };

    // 새로운 ripple 추가
    setRipples((prev) => [...prev, newRipple]);

    // 1초 후 ripple 제거
    const timeout = setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id));
    }, 1000);

    rippleTimeouts.current.push(timeout);
  };

  return (
    <Container $url="/img/homebg.png">
      <Header />
      <Main>
        <AnimatedSvg />
        <SectionTop createRipple={createRipple} ripples={ripples} />
        <SectionBottom />
      </Main>
    </Container>
  );
};

export default Home;
