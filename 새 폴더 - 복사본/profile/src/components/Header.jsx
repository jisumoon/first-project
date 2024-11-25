import { faBorderAll } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import styled from "styled-components";

const HeaderSection = styled.div`
  width: 100%;
  padding: 20px 40px;
  padding-bottom: 0;

  ul {
    display: flex;
    justify-content: space-between;
    font-size: 18px;
  }
`;
const Header = () => {
  return (
    <HeaderSection>
      <ul>
        <li>X PORTOFOLIO</li>
        <li>MOON JI SU</li>
      </ul>
    </HeaderSection>
  );
};

export default Header;
