import React from "react";
import styled from "styled-components";
import useIsMobile from "../../Hook/useIsMobile";
import Button from "../../components/Button";

const SiteSection = styled.main``;

const SiteSectionInner = styled.article`
  padding: 0 16px;
  padding-top: 40px;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    padding: 0 8px;
  }
`;

const SiteTitle = styled.h1`
  position: ${({ isMobile }) => (isMobile ? "relative" : "sticky")};
  top: 70px;
  font-size: 40px;
  font-weight: bold;
  line-height: 1.3;

  padding-left: 80px;

  @media (max-width: 768px) {
    font-size: 24px;
    padding-left: 10px;
    text-align: center;
    margin-bottom: 60px;
    padding-top: 40px;
  }
`;

const SiteSectionWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;

  @media (max-width: 768px) {
    gap: 20px;
  }
`;

const SiteItem = styled.div`
  width: 100%;
  height: ${({ isMobile }) => (isMobile ? "auto" : "70vh")};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: ${({ isMobile }) => (isMobile ? "relative" : "sticky")};
  left: 0;
  top: ${({ isMobile, index }) =>
    isMobile ? "auto" : `calc(180px + ${index * 20}px)`};
  margin-bottom: ${({ isMobile }) => (isMobile ? "20px" : "0")};

  @media (max-width: 768px) {
    position: relative;
  }
`;

const ItemWrapper = styled.div`
  width: 90%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: stretch;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const SiteImg = styled.div`
  flex: 2;
  min-height: 300px;
  background: #ddd;
  background-size: cover;
  background-position: center;

  @media (max-width: 768px) {
    border-radius: 20px;
    min-height: 200px;
    width: 90%;
    margin-bottom: 40px;
  }
`;

const ItemSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0 40px;
  gap: 16px;
  background: #fff;

  @media (max-width: 768px) {
    border-radius: 20px;
    width: 90%;
    padding: 16px;
    align-items: center;
    text-align: center;
  }
`;

const SiteItemTitle = styled.h2`
  position: absolute;
  bottom: 14%;
  right: 40%;
  font-size: 48px;
  font-weight: bold;
  color: #fff;

  @media (max-width: 1200px) {
    right: 50%;
    font-size: 36px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const SiteItemInfo = styled.h3`
  font-size: 18px;
  line-height: 1.5;
  color: #444;

  @media (max-width: 768px) {
    font-size: 16px;
    text-align: center;
  }
`;

const SiteItemBtn = styled.div`
  margin-top: 20px;

  @media (max-width: 768px) {
    margin-top: 10px;
  }
`;

const TeamProject = ({ item, onClick }) => {
  const isMobile = useIsMobile(); // 모바일 여부 판단

  return (
    <SiteSection>
      <SiteSectionInner>
        <SiteTitle>
          Roots and Branches: <br />
          Growing Through Life's Forest
        </SiteTitle>
        <SiteSectionWrap>
          {item.map((project, index) => (
            <SiteItem key={project.id} index={index} isMobile={isMobile}>
              <ItemWrapper>
                <SiteImg
                  style={{
                    backgroundImage: `url(${project.img})`,
                  }}
                />
                <SiteItemTitle>{project.title_kr}</SiteItemTitle>
                <ItemSection>
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
