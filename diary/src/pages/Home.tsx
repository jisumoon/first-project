import React from "react";
import styled from "styled-components";
import DiaryList from "../components/DiaryList";

const Container = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Home: React.FC = () => {
  return (
    <Container>
      <DiaryList />
    </Container>
  );
};

export default Home;
