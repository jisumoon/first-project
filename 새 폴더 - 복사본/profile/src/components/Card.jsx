import React from "react";
import styled, { keyframes } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleDown } from "@fortawesome/free-solid-svg-icons";

// Animations
const floatingAnimation = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

// Styled Components
const AppWrapper = styled.div`
  width: 300px;
  height: 260px;
  border: 1px solid #f00;
  text-rendering: optimizeLegibility;
  color: white;
  background: #e6e5e1;
`;

const ScrollDownIcon = styled.div`
  position: absolute;
  bottom: 5%;
  left: 35%;
  width: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  padding: 10px 2px;
  font-size: 24px;
  z-index: 100;
  animation: ${floatingAnimation} 2s ease-in-out infinite;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Cards = styled.div`
  border: 1px solid #f00;
  position: relative;
  width: 500px;
  height: 200px;
  background-color: #fff;
  overflow: hidden;
  margin-bottom: 4px;

  &:before,
  &:after {
    content: "";
    z-index: 99;
    position: absolute;
    display: block;
    width: 16px;
    height: 16px;
    border-radius: 16px;
    background-color: #e6e5e1;
  }

  &:before {
    top: -10px;
    left: 32px;
  }

  &:after {
    bottom: -10px;
    left: 32px;
  }

  ul {
    z-index: 99;
    position: absolute;
    left: 39px;
    top: 5px;
    list-style-type: none;

    li {
      width: 2px;
      height: 2px;
      border-radius: 2px;
      margin: 6px 0;
      background-color: #e6e5e1;
    }
  }

  h2 {
    z-index: 99;
    font-family: "Poppins", sans-serif;
    position: absolute;
    bottom: 0;
    right: 130px;
    font-size: 60px;
    font-weight: 700;
    color: #fff;
  }

  .fa-arrow-right {
    z-index: 100;
    position: absolute;
    right: 75px;
    bottom: 25px;
    font-size: 40px;
    cursor: pointer;
  }

  p {
    z-index: 99;
    position: absolute;
    top: 20px;
    right: 70px;
    color: #333;
    opacity: 0.7;
    font-size: 12px;
    letter-spacing: 1px;
    writing-mode: vertical-lr;
    transition: all 0.2s ease;
  }

  .pic {
    z-index: 100;
    width: 400px;
    height: 200px;
    background-image: url("https://images.unsplash.com/photo-1525543907410-b2562b6796d6?ixlib=rb-0.3.5&s=9ff8e5e718a6a40cbd0e1471235912f4&auto=format&fit=crop&w=3452&q=80");
    background-size: 100% 100%;
    filter: grayscale(100%);
  }

  .social {
    position: absolute;
    left: 60px;
    top: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 180px;
    height: 64px;
    border-radius: 80px;
  }

  button {
    position: absolute;
    right: 14px;
    bottom: 14px;
    width: 30px;
    height: 30px;
    background-color: #da4d1d;
    border: none;
    border-radius: 30px;
    cursor: pointer;
    outline: none;
    transition: all 0.3s ease;
    mix-blend-mode: hard-light;

    i {
      font-size: 3rem;
    }
  }

  &:hover button {
    transform: scale(16.5);
  }

  &:hover p {
    color: #fff;
  }

  &:hover .pic {
    filter: grayscale(0);
  }

  &:hover i {
    opacity: 1;
    transform: scale(1);
  }
`;

const Card = () => {
  return (
    <AppWrapper>
      <div className="container">
        <Cards>
          <h2>North</h2>
          <FontAwesomeIcon icon={faAngleDoubleDown} />
          <p>a lonely trip.</p>
          <div className="pic"></div>
          <ul>
            {Array.from({ length: 21 }).map((_, index) => (
              <li key={index}></li>
            ))}
          </ul>
        </Cards>
      </div>
      <ScrollDownIcon>
        <FontAwesomeIcon icon={faAngleDoubleDown} />
      </ScrollDownIcon>
    </AppWrapper>
  );
};

export default Card;
