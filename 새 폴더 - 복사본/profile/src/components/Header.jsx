import { faPagelines } from "@fortawesome/free-brands-svg-icons";
import { faBorderAll } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";

const HeaderSection = styled.div`
  width: 100%;
  padding: 20px 40px;
  padding-bottom: 0;

  ul {
    display: flex;
    justify-content: flex-end;
    font-size: 18px;
  }
`;
const Header = () => {
  return (
    <HeaderSection>
      <ul>
        <li>MOON JI SU</li>
      </ul>
    </HeaderSection>
  );
};

export default Header;
