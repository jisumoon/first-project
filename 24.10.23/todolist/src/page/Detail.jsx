import React from "react";
import styled from "styled-components";
import PostView from "../components/PostView";

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
  padding: 0 20px;
  background: #eff1f1;
  border-radius: 20px;
`;

const Detail = () => {
  return (
    <Container>
      <Main>
        <PostView />
      </Main>
    </Container>
  );
};

export default Detail;
