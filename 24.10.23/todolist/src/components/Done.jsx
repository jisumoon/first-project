import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ToDoItem from "./ToDoItem";

const TitleGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px 0;

  gap: 10px;
`;

const Label = styled.h2`
  font-size: 16px;
`;

const CircleNumber = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  color: #fff;
  border-radius: 50%;
  background: rgba(56, 180, 97, 0.8);
`;

const Result = styled.p`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Done = () => {
  const [doneItems, setDoneItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("doneItems")) || [];
    setDoneItems(storedItems);
  }, []);

  // 상세페이지 이동
  const handleItemClick = (item) => {
    navigate(`/detail/${item.id}`, { state: { item } });
  };

  return (
    <>
      <TitleGroup>
        <Label>😀 Done</Label>
        <CircleNumber>{doneItems.length}</CircleNumber>
      </TitleGroup>
      {doneItems.length === 0 ? (
        <Result>일정이 없습니다.</Result>
      ) : (
        doneItems.map((item, index) => (
          <div key={item.id || index} onClick={() => handleItemClick(item)}>
            <ToDoItem
              title={item.title}
              date={item.date}
              content={item.contents}
            />
          </div>
        ))
      )}
    </>
  );
};

export default Done;
