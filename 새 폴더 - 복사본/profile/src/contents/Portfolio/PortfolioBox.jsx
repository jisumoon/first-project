import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClover, faPlay } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import styled from "styled-components";

const PortfolioBoxWrapper = styled.div`
  border-radius: 8px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding-bottom: 20px;
  margin-bottom: 90px;
  cursor: pointer;
  color: #000;
  background: ${(props) => props.theme.colors.mainbackgtound};
`;

const PortfolioImg = styled.img`
  height: 200px;
  margin-bottom: 10px;
  border-radius: 8px 8px 0 0;
`;

const PortfolioInfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-left: 20px;
`;

const PortFolioTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  padding-bottom: 10px;
`;

const PortfolioInfo = styled.h4`
  width: 280px;
  padding-right: 10px;
  font-size: 14px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.2;
`;

const PortfolioTag = styled.ul`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const PortFolioTagInfo = styled.li`
  font-size: 14px;
  border-radius: 10px;
`;

const PortfolioBtn = styled.button`
  position: absolute;
  bottom: 34%;
  right: 6%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  border: none;
  background: #fff;
  font-size: 20px;
  color: ${(props) => props.theme.colors.secondary};
  transition: background 0.3s ease, transform 0.3s ease;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.3);
  &:hover {
    background: ${(props) => props.theme.colors.secondary};
    color: #fff;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.3);
    transform: translateY(-3px);
  }
`;

const PortfolioBox = ({ item, onClick }) => (
  <PortfolioBoxWrapper>
    <PortfolioImg src="/img/tree1.jpg" alt="Tree image" />
    <PortfolioBtn onClick={() => onClick(item)}>
      <FontAwesomeIcon icon={faClover} />
    </PortfolioBtn>
    <PortfolioInfoSection>
      <PortFolioTitle>{item.title_kr}</PortFolioTitle>
      <PortfolioInfo>{item.description}</PortfolioInfo>
      <PortfolioTag>
        {item.skill.map((skill, index) => (
          <PortFolioTagInfo key={index}>#{skill}</PortFolioTagInfo>
        ))}
      </PortfolioTag>
    </PortfolioInfoSection>
  </PortfolioBoxWrapper>
);

export default PortfolioBox;
