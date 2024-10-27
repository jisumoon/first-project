import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  margin-top: 10px;
  cursor: pointer;
`;

const ItemPage = styled.div`
  width: 100%;
  border-radius: 16px;
  padding: 30px;
  background: #fff;
`;

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 20px;
`;

const ItemTitle = styled.p``;

const ItemDate = styled.p`
  font-size: 14px;
  color: #5f5f5f;
`;

const ItemContent = styled.p`
  font-size: 14px;
  color: #5f5f5f;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  word-wrap: break-word;
`;

const truncateText = (text, limit) => {
  if (!text) return "";
  if (text.length > limit) {
    return text.slice(0, limit) + "...";
  }
  return text;
};

const ToDoItem = ({ title, content, date }) => {
  return (
    <Container>
      <ItemPage>
        <Item>
          <ItemTitle>{title}</ItemTitle>
          <ItemDate>{date}</ItemDate>
        </Item>
        <ItemContent>{truncateText(content, 20)}</ItemContent>
      </ItemPage>
    </Container>
  );
};

export default ToDoItem;
