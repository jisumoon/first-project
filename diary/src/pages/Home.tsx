import React from "react";
import MyCalendar from "../components/MyCalendar";
import styled from "styled-components";

const Container = styled.div``;

const Home: React.FC = () => {
  return (
    <Container>
      <MyCalendar />
    </Container>
  );
};

export default Home;
