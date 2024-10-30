import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  color: #f0768b;
`;

const Header = styled.div`
  font-size: 40px;
`;

const Contents = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  font-size: 30px;
  margin: 20px 0 10px;
`;

const LogoImg = styled.div`
  & > img {
    width: 350px;
    height: 350px;
  }
`;

const Desc = styled.div`
  margin: 10px 0;
  padding: 8px 14px;
  font-size: 24px;
  border-radius: 8px;
  color: #f0768b;
`;

const Button = styled.button`
  width: 300px;
  padding: 20px 0;
  margin-top: 10px;
  border: none;
  border-radius: 30px;
  font-size: 24px;
  color: #fff;
  background: #f0768b;
  transition: opacity 0.3s;
  &:hover {
    opacity: 0.4;
  }
`;

const Home = () => {
  const navigate = useNavigate();
  const handleClickButton = () => {
    navigate("/question");
  };
  return (
    <Wrapper>
      <Header>🩷티니핑 성격 판별기🩷</Header>
      <Desc>티니핑으로 알아보는 나의 성격은?</Desc>
      <Contents>
        <LogoImg>
          <img className="rounded-circle" src="../public/img/hacuhping.png" />
        </LogoImg>
        <Button onClick={handleClickButton}>테스트 시작하기</Button>
      </Contents>
    </Wrapper>
  );
};

export default Home;
