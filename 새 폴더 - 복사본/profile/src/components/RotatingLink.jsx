import React from "react";
import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const rotateReverse = keyframes`
  to {
    transform: rotate(-360deg);
  }
`;

const Link = styled.a`
  width: 10rem;
  height: 10rem;
  display: inline-block;
  font: 300 1.55rem/1.4 "Josefin Sans";
  text-transform: uppercase;
  letter-spacing: 0.1175em;
  word-spacing: 0.3em;
  text-decoration: none;
`;

const Svg = styled.svg`
  width: 100%;
  height: auto;
  transform-box: fill-box;
  fill: #333;
  stroke: #333;
  stroke-width: 0.05em;
  stroke-linecap: round;
  stroke-linejoin: round;
`;

const Path = styled.path`
  &.link__arrow {
    stroke-width: 0.075em;
    transition: transform 0.15s cubic-bezier(0.32, 0, 0.67, 0);

    ${Link}:hover & {
      transform: scale(1.1);
      transition: transform 0.3s cubic-bezier(0.33, 1, 0.68, 1);
    }
  }
`;

const Text = styled.text`
  animation: ${rotateReverse} 20s linear infinite;
  transform-origin: 50% 50%;

  ${Link}:hover & {
    animation-play-state: paused;
  }
`;

const TextPath = styled("textPath")`
  stroke: none;
`;

const RotatingLink = () => (
  <Link href="#" aria-labelledby="link1-title link1-desc">
    <Svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <title id="link1-title">Come quick and click this</title>
      <desc id="link1-desc">
        A rotating link with text placed around a circle with an arrow inside
      </desc>
      <Path
        id="link-circle"
        className="link__path"
        d="M 20, 100 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0"
        stroke="none"
        fill="none"
      />
      <Path
        className="link__arrow"
        d="M 75 100 L 125 100 L 110 85 M 125 100 L 110 115"
        fill="none"
      />
      <Text className="link__text">
        <TextPath href="#link-circle">Come quick and click this</TextPath>
      </Text>
    </Svg>
  </Link>
);

export default RotatingLink;
