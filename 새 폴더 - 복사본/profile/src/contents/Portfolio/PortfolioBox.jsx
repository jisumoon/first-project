import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faClover,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import styled from "styled-components";

const PortfolioBoxWrapper = styled.div`
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding-bottom: 20px;
  cursor: pointer;
  border: 1px solid #f00;

  @media (max-width: 1280px) {
    gap: 12px;
    padding-bottom: 18px;
  }

  @media (max-width: 768px) {
    width: 100%;
    gap: 10px;
    padding-bottom: 16px;
  }
`;

const PortfolioImg = styled.img`
  height: 200px;
  margin-bottom: 10px;
  border-radius: 4px 4px 0 0;

  @media (max-width: 1280px) {
    height: 180px;
  }

  @media (max-width: 768px) {
    height: 160px;
  }

  @media (max-width: 390px) {
    height: 140px;
  }
`;

const PortfolioInfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 20px;

  @media (max-width: 768px) {
    gap: 8px;
    padding: 0 16px;
  }

  @media (max-width: 390px) {
    gap: 6px;
    padding: 0 12px;
  }
`;

const PortFolioTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  padding-bottom: 10px;

  @media (max-width: 1280px) {
    font-size: 16px;
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 390px) {
    font-size: 12px;
  }
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

  @media (max-width: 1280px) {
    font-size: 13px;
  }

  @media (max-width: 768px) {
    font-size: 12px;
  }

  @media (max-width: 390px) {
    font-size: 11px;
  }
`;

const PortfolioTag = styled.ul`
  display: flex;
  gap: 10px;
  margin-top: 10px;

  @media (max-width: 768px) {
    gap: 8px;
  }

  @media (max-width: 390px) {
    gap: 6px;
  }
`;

const PortFolioTagInfo = styled.li`
  font-size: 14px;
  border-radius: 10px;

  @media (max-width: 1280px) {
    font-size: 13px;
  }

  @media (max-width: 768px) {
    font-size: 12px;
  }

  @media (max-width: 390px) {
    font-size: 11px;
  }
`;

const PortfolioBtn = styled.button`
  border-radius: 4px;
  padding: 10px 0;
  cursor: pointer;
  background: #fff;
  border: none;
  font-size: 14px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.secondary};
  transition: background 0.3s ease, transform 0.3s ease;

  &:hover {
    background: ${(props) => props.theme.colors.highlight};
    color: #fff;
    transform: translateY(-3px);
  }

  @media (max-width: 1280px) {
    font-size: 13px;
    padding: 8px 0;
  }

  @media (max-width: 768px) {
    font-size: 12px;
    padding: 6px 0;
  }

  @media (max-width: 390px) {
    font-size: 11px;
    padding: 4px 0;
  }
`;

const PortfolioBox = ({ item, onClick }) => (
  <PortfolioBoxWrapper>
    <PortfolioImg src={item.img} alt={item.title_kr} />
    <PortfolioInfoSection>
      <PortFolioTitle>{item.title_kr}</PortFolioTitle>
      <PortfolioInfo>{item.description}</PortfolioInfo>
      <PortfolioTag>
        {item.skill.map((skill, index) => (
          <PortFolioTagInfo key={index}>#{skill}</PortFolioTagInfo>
        ))}
      </PortfolioTag>
      <PortfolioBtn onClick={() => onClick(item)}>
        더 보기
        <FontAwesomeIcon icon={faArrowRight} style={{ marginLeft: "8px" }} />
      </PortfolioBtn>
    </PortfolioInfoSection>
  </PortfolioBoxWrapper>
);

export default PortfolioBox;
