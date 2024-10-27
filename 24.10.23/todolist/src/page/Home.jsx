import React from "react";
import PostWrite from "../components/PostWrite";
import styled from "styled-components";
import Nav from "../components/Nav";
import Planned from "../components/Planned";
import Working from "../components/Working";
import Done from "../components/Done";

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

const PostContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
`;

const PlannedContaniner = styled.div`
  flex: 1;
`;

const WorkingContainer = styled.div`
  flex: 1;
`;

const DoneContainer = styled.div`
  flex: 1;
`;

const Home = () => {
  const [plannedRef, setPlannedRef] = React.useState(null);

  const handleAddItemToPlanned = (item) => {
    if (plannedRef) {
      plannedRef(item);
    }
  };

  return (
    <Container>
      <Main>
        <Nav />
        <PostContainer>
          <PostWrite addItemToPlanned={handleAddItemToPlanned} />
          <PlannedContaniner>
            <Planned setAddItemToPlannedRef={setPlannedRef} />
          </PlannedContaniner>
          <WorkingContainer>
            <Working />
          </WorkingContainer>
          <DoneContainer>
            <Done />
          </DoneContainer>
        </PostContainer>
      </Main>
    </Container>
  );
};

export default Home;
