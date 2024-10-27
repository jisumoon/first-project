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

const Planned = ({ setAddItemToPlannedRef }) => {
  const [plannedItems, setPlannedItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // 로컬스토리지에서 데이터 가져오기
    const storedItems = JSON.parse(localStorage.getItem("plannedItems")) || [];
    setPlannedItems(storedItems);

    // addItemToPlanned 함수를 부모 컴포넌트에 전달
    setAddItemToPlannedRef(() => addItemToPlanned);
  }, [setAddItemToPlannedRef]);

  const addItemToPlanned = (item) => {
    const date = new Date().toLocaleDateString("ko-KR", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    });

    const newItem = { ...item, date, id: Date.now() };

    //로컬스토리지 업데이트
    setPlannedItems((prevItems) => {
      const updatedItems = [newItem, ...prevItems];
      localStorage.setItem("plannedItems", JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  // 상세페이지 이동
  const handleItemClick = (item) => {
    navigate(`/detail/${item.id}`, { state: { item } });
  };

  return (
    <>
      <TitleGroup>
        <Label>📑 Planned</Label>
        <CircleNumber>{plannedItems.length}</CircleNumber>
      </TitleGroup>
      {plannedItems.length === 0 ? (
        <Result>일정이 없습니다.</Result>
      ) : (
        plannedItems.map((item, index) => (
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

export default Planned;
