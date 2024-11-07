import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTree } from "@fortawesome/free-solid-svg-icons";
import { faBloggerB, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";

const Container = styled.header`
  width: 100%;
`;

const ToggleButton = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: #cfd69b;
  font-size: 20px;
  color: #fff;
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.colors.primary};
  }
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 150px;
`;

const List = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
  font-size: 22px;
  color: #fff;
`;

const ListName = styled.li`
  cursor: pointer;
  transition: color all 0.3s font-weight;
  &:hover {
    color: ${(props) => props.theme.colors.primary};
    font-weight: 600;
  }
`;

const Logo = styled.h2`
  font-size: 22px;
  color: #fff;
`;

const SlideList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 30px;
  font-size: 20px;
`;

const SlideContainer = styled.div``;

const Header = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };
  return (
    <Container $isHome={isHome}>
      {!isHome && (
        <ToggleButton onClick={toggleMenu} isHome={isHome}>
          <FontAwesomeIcon icon={faBars} size="lg" />
        </ToggleButton>
      )}

      {isHome && (
        <Nav>
          <List>
            <ListName>
              <FontAwesomeIcon icon={faGithub} />
            </ListName>
            <ListName>
              <FontAwesomeIcon icon={faBloggerB} />
            </ListName>
            <ListName>
              <FontAwesomeIcon icon={faEnvelope} />
            </ListName>
          </List>
          <Logo>
            <FontAwesomeIcon icon={faTree} />
          </Logo>
        </Nav>
      )}

      {menuVisible && (
        <SlideContainer isVisible={menuVisible}>
          <SlideList>
            <ListName>AboutMe</ListName>
            <ListName>Portfolio</ListName>
            <ListName>Contact</ListName>
            <ListName>Resume</ListName>
          </SlideList>
        </SlideContainer>
      )}
    </Container>
  );
};

export default Header;
