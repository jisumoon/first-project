import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";

// Animation
const rippleAnimation = keyframes`
  0% {
    transform: scale(0);
    opacity: 0.7;
  }
  50% {
    transform: scale(2);
    opacity: 0.3;
  }
  100% {
    transform: scale(4);
    opacity: 0;
  }
`;

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Main = styled.main`
  width: 100%;
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;

  &.top {
    flex-direction: row;
    padding: 0 200px;
    padding-top: 20px;
  }

  &.bottom {
    height: 150px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 20px 300px;
    background: ${(props) => props.theme.colors.primary};
    color: #cfd69b;
  }
`;

export const Ripple = styled.span`
  position: absolute;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.3);
  pointer-events: none;
  animation: ${rippleAnimation} 1s ease-out;
  width: 30px;
  height: 30px;
  transform: scale(0);
  left: ${({ x }) => `${x - 80}px`};
  top: ${({ y }) => `${y - 10}px`};
`;

export const BottomContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

export const Article = styled(motion.article)`
  width: 100%;

  &.title {
    flex: 3;
  }
  &.info {
    flex: 2;
  }
  &.left {
    flex: 1;
    padding-left: 20px;
  }
  &.middle {
    flex: 1;
    border-radius: 50% 50% 0 0;
    background: rgba(107, 154, 110, 1);
  }
  &.right {
    flex: 1;
  }
`;

export const UpperInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 18px;
  color: #fff;
`;

export const TtitleNumber = styled.span`
  font-size: 30px;
  font-weight: 700;
  letter-spacing: 2px;
`;

export const TitleSpan = styled.span`
  font-size: 22px;
  font-weight: 100;
`;

export const TitleLogo = styled.span`
  font-size: 24px;
  font-weight: 100;
`;

export const TittleOne = styled.span`
  width: 70px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 40px;
  border-radius: 50%;
  background: #cfd69b;
  color: ${(props) => props.theme.colors.secondary};
  font-size: 15px;
  font-weight: 800;
  cursor: pointer;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.1);
  }
`;

export const BottomBtn = styled.div`
  width: 200px;
  margin-top: 52px;
  padding-bottom: 10px;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const Btn = styled.button`
  width: 140px;
  padding: 10px;
  padding-bottom: 20px;
  border: none;
  background: none;
  color: #fff;
  font-size: 20px;
  font-weight: 400;
  text-align: left;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  span {
    position: relative;
    display: inline-block;
    color: #fff;
    background: linear-gradient(90deg, #1d533e 50%, #fff 50%);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    background-size: 200% 100%;
    background-position: 100% 0;
    transition: background-position 0.4s ease;
  }

  &:hover span {
    background-position: 0 0;
  }
`;

export const ImgContainer = styled(motion.div)`
  position: absolute;
  bottom: 20.4%;
  right: 40%;
  width: 300px;
`;

export const Img = styled.img`
  width: 320px;
`;

export const Right = styled(motion.div)`
  position: absolute;
  top: 20%;
  left: 60%;
`;

export const RightTitle = styled.p`
  margin-top: 100px;
  font-size: 80px;

  color: transparent;
  -webkit-text-stroke: 1px rgba(255, 255, 255, 0.6);
`;

export const RightInfo = styled.p`
  margin-top: 30px;
  font-size: 60px;
  color: #fff;
  font-weight: 600;
`;

export const Title = styled.h3`
  font-size: 16px;
  font-weight: 100;
  line-height: 1.2;
  opacity: 0.9;
`;

export const TitleInfo = styled.h5`
  margin-top: 20px;
  font-size: 10px;
  line-height: 1.2;
  opacity: 0.6;
`;

export const Info = styled.p`
  font-size: 12px;
  font-weight: 100;
  line-height: 1.4;
  opacity: 0.6;
`;

export const AnimatedSvg = styled(motion.svg)`
  width: 100%;
  position: absolute;
  top: 46%;
  z-index: -1;
`;
