import React from "react";
import PostWrite from "../components/PostWrite";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Main = styled.div`
  width: 90vw;
  height: 90vh;
  margin: 0 auto;
  background: #eff1f1;
  border-radius: 20px;
`;

const Home = () => {
  return (
    <Container>
      <Main>
        <PostWrite />
      </Main>
    </Container>
  );
};

export default Home;
