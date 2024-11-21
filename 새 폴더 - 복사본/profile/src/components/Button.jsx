import React from "react";
import styled from "styled-components";

const CtaButton = styled.button`
  position: relative;
  margin: auto;
  padding: 19px 22px;
  font-weight: bold;
  color: inherit;
  transition: all 0.2s ease;
  cursor: pointer;
  border: none; /* 버튼 테두리 제거 */
  background: none; /* 배경 제거 */
  text-decoration: none;
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    border-radius: 28px;
    background: rgba(44, 95, 45, 0.8);
    width: 56px;
    height: 56px;
    transition: all 0.3s ease;
  }

  span {
    position: relative;
    font-size: 16px;
    line-height: 18px;
    font-weight: 900;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    vertical-align: middle;
  }

  svg {
    position: relative;
    top: 0;
    margin-left: 10px;
    fill: none;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke: #333;
    stroke-width: 2;
    transform: translateX(-5px);
    transition: all 0.3s ease;
  }

  &:hover {
    &:before {
      width: 100%;
      background: ${(props) => props.theme.colors.highlight};
    }
    svg {
      transform: translateX(0);
    }
  }

  &:active {
    transform: scale(0.96);
  }
`;

const Button = ({ color = "0, 0, 0", primary = "0, 0, 0", onClick }) => {
  return (
    <CtaButton color={color} primary={primary} onClick={onClick}>
      <span>Click me</span>
      <svg width="13px" height="10px" viewBox="0 0 13 10">
        <path d="M1,5 L11,5"></path>
        <polyline points="8 1 12 5 8 9"></polyline>
      </svg>
    </CtaButton>
  );
};

export default Button;
