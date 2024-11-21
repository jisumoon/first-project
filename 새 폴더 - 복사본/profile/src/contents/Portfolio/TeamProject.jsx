import React from "react";
import styled, { css } from "styled-components";
import Button from "../../components/Button";

const SiteSection = styled.main``;

const SiteSectionInner = styled.article`
  padding: 0 16px;

  @media (max-width: 768px) {
    padding: 0 8px;
  }
`;

const SiteTitle = styled.h1`
  position: sticky;
  top: 70px;
  left: 0;
  font-size: 40px;
  font-weight: bold;
  line-height: 1.3;
  color: #444;
  padding-left: 40px;

  @media (max-width: 768px) {
    font-size: 24px;
    padding-left: 10px;
  }
`;

const SiteSectionWrap = styled.div``;

const SiteItem = styled.div`
  margin-top: 40px;
  width: 100%;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: sticky;
  left: 0;
  border-radius: 80px 80px 0 0;

  &:nth-child(1) {
    top: 180px;
  }
  &:nth-child(2) {
    top: 200px;
  }
  &:nth-child(3) {
    top: 220px;
  }
  &:nth-child(4) {
    top: 240px;
  }

  @media (max-width: 768px) {
    height: auto;
    top: 100px;
    margin-bottom: 20px;
  }
`;

const SiteItemNum = styled.h4``;

const ItemWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const SiteImg = styled.div`
  min-height: 300px;
  background: #ddd;
  border-radius: 80px 0 0 0;
  flex: 1;

  @media (max-width: 768px) {
    border-radius: 20px;
    min-height: 200px;
    width: 90%;
  }
`;

const ItemSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  padding: 0 40px;
  gap: 40px;
  flex: 1;
  border-radius: 0 80px 0 0;

  /* 랜덤 배경색 적용 */
  ${({ bgColor }) => css`
    background: ${bgColor};
  `}

  @media (max-width: 768px) {
    border-radius: 20px;
    width: 90%;
    padding: 16px;
  }
`;

const SiteItemTitle = styled.h2`
  font-size: 36px;
  font-weight: bold;
  color: #2b2b2b;

  @media (max-width: 768px) {
    font-size: 22px;
  }
`;
const SiteItemInfo = styled.h3`
  font-size: 18px;
  line-height: 1.2;
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const SiteItemBtn = styled.div`
  margin-top: 20px;
`;

const TeamProject = ({ item, onClick }) => {
  const getRandomColor = () => {
    const colors = ["#F5F5F5", "#F2E8CF", "#E8E4D9"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <SiteSection>
      <SiteSectionInner>
        <SiteTitle>
          Roots and Branches: <br />
          Growing Through Life's Forest
        </SiteTitle>
        <SiteSectionWrap>
          {item.map((project, index) => (
            <SiteItem key={project.id}>
              <ItemWrapper>
                <SiteImg
                  style={{
                    backgroundImage: `url(${project.img})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <ItemSection bgColor={getRandomColor()}>
                  <SiteItemTitle>{project.title_kr}</SiteItemTitle>
                  <SiteItemInfo>{project.description}</SiteItemInfo>
                  <SiteItemBtn>
                    <Button onClick={() => onClick(project)} />
                  </SiteItemBtn>
                </ItemSection>
              </ItemWrapper>
            </SiteItem>
          ))}
        </SiteSectionWrap>
      </SiteSectionInner>
    </SiteSection>
  );
};

export default TeamProject;
