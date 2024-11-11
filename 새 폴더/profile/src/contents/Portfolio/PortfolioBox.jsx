import React from "react";
import styled from "styled-components";

const PortfolioBoxWrapper = styled.div`
  height: 400px;
  display: flex;
  flex-direction: column;
  gap: 7px;
  cursor: pointer;
  @media (max-width: 1280px) {
    width: 40%;
    height: 300px;
  }

  @media (max-width: 820px) {
    width: 100%;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 400px;
    display: flex;
    flex-direction: column;
    gap: 7px;
  }
`;

const PortfolioImg = styled.div`
  width: 300px;
  height: 200px;
  border-radius: 8px;
  margin-bottom: 20px;
  border: 1px solid #f00;
  @media (max-width: 1280px) {
    width: 100%;
  }

  @media (max-width: 820px) {
    width: 100%;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 200px;
    border-radius: 8px;
    margin-bottom: 20px;
  }
`;

const PortFolioTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  padding-bottom: 10px;
  color: #fff;
  @media (max-width: 1280px) {
    font-size: 16px;
  }

  @media (max-width: 768px) {
    font-size: 18px;
    font-weight: bold;
    padding-bottom: 10px;
    color: #fff;
  }
`;

const PortfolioInfo = styled.h4`
  width: 300px;
  font-size: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.2;
  color: #fff;
  @media (max-width: 1280px) {
    width: 100%;
    font-size: 16px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    line-height: 1.2;
    color: #fff;
    font-size: 16px;
  }
  @media (max-width: 768px) {
    width: 100%;
    font-size: 18px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    line-height: 1.2;
    color: #fff;
  }
`;

const PortfolioTag = styled.ul`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const PortFolioTagInfo = styled.li`
  padding: 6px 20px;
  border-radius: 10px;
  background: ${(props) => props.theme.colors.background};
  font-size: 14px;
  color: ${(props) => props.theme.colors.primary};
  @media (max-width: 1280px) {
    padding: 4px 10px;
    font-size: 12px;
  }
  @media (max-width: 768px) {
    padding: 6px 20px;
    border-radius: 10px;
  }
`;

const PortfolioBox = ({ item, onClick }) => (
  <PortfolioBoxWrapper onClick={() => onClick(item)}>
    <PortfolioImg $img={item.img} />
    <PortFolioTitle>{item.title_kr}</PortFolioTitle>
    <PortfolioInfo>{item.description}</PortfolioInfo>
    <PortfolioTag>
      {item.skill.map((skill, index) => (
        <PortFolioTagInfo key={index}>{skill}</PortFolioTagInfo>
      ))}
    </PortfolioTag>
  </PortfolioBoxWrapper>
);

export default PortfolioBox;
