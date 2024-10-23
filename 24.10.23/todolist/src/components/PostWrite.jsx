import React from "react";
import styled from "styled-components";
import GreenHouse from "../assets/GreenHouse.svg";

const Container = styled.div``;

const Title = styled.h1`
  margin-top: 30px;
  font-size: 30px;
  font-family: "Paperlogy-8ExtraBold";
  color: #3ac569;
`;

const Logo = styled.div`
  display: flex;
  justify-content: center;
`;

const PostWrite = () => {
  return (
    <Container>
      <Logo>
        <Title>To Do List</Title>
        <img src={GreenHouse} style={{ width: "80px" }} />{" "}
      </Logo>
    </Container>
  );
};

export default PostWrite;
