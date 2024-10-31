import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { resultData } from "../assets/resultData";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  color: #fff;
`;

const Header = styled.div`
  margin-top: 20px;
  font-size: 40px;
  color: #f0768b;
`;

const Contents = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LogoImg = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  & > img {
    width: 300px;
    height: 300px;
  }
`;

const Title = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  font-size: 40px;
  color: #000;
`;

const Desc = styled.div``;

const Group = styled.div``;

const InfoGroup = styled.div`
  width: 400px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  margin-bottom: 30px;
  padding: 20px;
  border-radius: 20px;
  font-size: 18px;
  gap: 22px;
  color: #000;
  box-shadow: 5px 5px 20px
    hsl(350.00000000000006, 59.09090909090909%, 74.11764705882354%);
`;

const Button = styled.button`
  width: 150px;
  margin-bottom: 20px;
  padding: 20px 0;
  border: none;
  border-radius: 30px;
  font-size: 16px;
  color: #fff;
  background: #f0768b;
  transition: opacity 0.3s;
  &:hover {
    opacity: 0.4;
  }
`;

const Result = () => {
  const [ResultData, setResultData] = useState(null);
  const [searchParams] = useSearchParams();
  const mbti = searchParams.get("mbti");
  const navigate = useNavigate();

  const handleClickButton = () => {
    navigate("/");
  };

  useEffect(() => {
    const result = resultData.find((s) => s.mbti === mbti);
    setResultData(result);
  }, [mbti]);

  return (
    <Wrapper>
      <Header>💘내 친구 티니핑💘</Header>
      <Contents>
        <Group>
          {ResultData ? (
            <>
              <LogoImg>
                <img src={ResultData.img} alt={ResultData.name} />
              </LogoImg>
              <Title> {ResultData.name}</Title>
              <InfoGroup>
                <Desc>
                  내 친구 티니핑은 {ResultData.mbti}형 {ResultData.name}이야❣️
                </Desc>
                <Desc>{ResultData.description}</Desc>
                <Desc>
                  {`${ResultData.goodFriend.names.join(", ")}처럼 ${
                    ResultData.goodFriend.info
                  }`}
                </Desc>
                <Desc>
                  {`${ResultData.badFriend.names.join(", ")}처럼 ${
                    ResultData.badFriend.info
                  }`}
                </Desc>
              </InfoGroup>
            </>
          ) : (
            <p>결과를 불러오는 중입니다...</p>
          )}
        </Group>
        <Button onClick={handleClickButton}>테스트 다시 시작하기</Button>
      </Contents>
    </Wrapper>
  );
};

export default Result;
