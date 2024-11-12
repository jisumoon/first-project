import React, { useState, useRef } from "react";
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

  const createRipple = (event) => {
    const now = Date.now();
    if (now - lastRippleTimeRef.current < 200) return;
    lastRippleTimeRef.current = now;

    const rippleX = event.clientX;
    const rippleY = event.clientY;
    const newRipple = { id: Date.now(), x: rippleX, y: rippleY };
    setRipples((prev) => [...prev, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id));
    }, 1000);
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
