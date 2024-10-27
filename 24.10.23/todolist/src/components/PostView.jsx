import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px;
`;

const Upper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  margin-bottom: 20px;
`;

const Back = styled.h2`
  width: 130px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
  border-radius: 20px;
  background: #3ac569;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    box-shadow: inset 0 0 10px;
  }
`;

const FormContainer = styled.div`
  width: 60%;
  height: 70vh;
  padding: 20px 40px;
  border-radius: 20px;
  background: #3ac569;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
  gap: 6px;
`;

const Label = styled.label`
  padding-left: 10px;
  width: 100%;
  font-size: 14px;
  color: #fff;
`;

const InputTitle = styled.input`
  width: 100%;
  border-radius: 14px;
  border: none;
  outline: none;
  padding: 16px;
  box-shadow: rgb(204, 219, 232) 3px 3px 6px 0px inset,
    rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;
`;

const InputContents = styled.textarea`
  width: 100%;
  height: 30vh;
  border-radius: 20px;
  padding: 16px;
  border: none;
  outline: none;
  box-shadow: rgb(204, 219, 232) 3px 3px 6px 0px inset,
    rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;
  resize: none;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  word-wrap: break-word;
  font-family: inherit;
`;

const NumberCharacters = styled.span`
  width: 100%;
  padding: 8px;
  text-align: right;
  font-size: 12px;
  color: ${({ $isLimit }) => ($isLimit ? "crimson" : "#fff")};
`;

const Submit = styled.input`
  width: 100%;
  padding: 20px 0;
  border-radius: 20px;
  border: none;
  background: #38b461;
  font-size: 18px;
  color: #fff;
  font-weight: 600;
  box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    box-shadow: inset 0 0 10px;
  }
`;

const PostView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const item = location.state ? location.state.item : null;

  // 글자수 제한
  const TITLE_LIMIT = 20;
  const CONTENTS_LIMIT = 100;

  // 아이템 제목과 내용을 상태로 설정
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  useEffect(() => {
    if (item) {
      setTitle(item.title);
      setContents(item.contents);
    } else {
      navigate("/"); // item이 없으면 홈으로 이동
    }
  }, [item, navigate]);

  // 이전 페이지로 이동
  const handleBack = () => navigate(-1);

  // 아이템 삭제 함수
  const handleDelete = () => {
    ["plannedItems", "workingItems", "doneItems"].forEach((list) => {
      const updatedItems = JSON.parse(
        localStorage.getItem(list) || "[]"
      ).filter((listItem) => listItem.id !== item.id);
      localStorage.setItem(list, JSON.stringify(updatedItems));
    });
    navigate("/"); // 홈으로 이동
  };

  // 아이템 이동 함수
  const handleMoveItem = (targetList) => {
    // 모든 리스트에서 해당 아이템 제거 후, targetList에 추가
    ["plannedItems", "workingItems", "doneItems"].forEach((list) => {
      const updatedItems = JSON.parse(
        localStorage.getItem(list) || "[]"
      ).filter((listItem) => listItem.id !== item.id);
      localStorage.setItem(list, JSON.stringify(updatedItems));
    });

    // 대상 리스트에 추가
    const targetItems = JSON.parse(localStorage.getItem(targetList) || "[]");
    localStorage.setItem(targetList, JSON.stringify([...targetItems, item]));

    navigate("/"); // 홈으로 이동
  };

  // 수정 함수
  const handleEdit = () => {
    const updatedItems = JSON.parse(
      localStorage.getItem("plannedItems") || "[]"
    ).map((plannedItem) =>
      plannedItem.id === item.id
        ? { ...plannedItem, title, contents }
        : plannedItem
    );
    localStorage.setItem("plannedItems", JSON.stringify(updatedItems));
    alert("수정되었습니다.");
    navigate(-1);
  };

  return (
    <Container>
      <Upper>
        <Back onClick={handleBack}>⬅️ Back</Back>
        <Back onClick={handleDelete}>🗑️ Delete</Back>
        <Back onClick={() => handleMoveItem("workingItems")}>✍️ Working</Back>
        <Back onClick={() => handleMoveItem("doneItems")}>😀 Done</Back>
      </Upper>
      <FormContainer>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            handleEdit();
          }}
        >
          <Label htmlFor="Title">Title</Label>
          <InputTitle
            type="text"
            name="Title"
            id="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <NumberCharacters $isLimit={title.length === TITLE_LIMIT}>
            {title.length}/{TITLE_LIMIT}
          </NumberCharacters>
          <Label htmlFor="Contents">Contents</Label>
          <InputContents
            name="Contents"
            id="Contents"
            value={contents}
            onChange={(e) => setContents(e.target.value)}
          />
          <NumberCharacters $isLimit={contents.length === CONTENTS_LIMIT}>
            {contents.length}/{CONTENTS_LIMIT}
          </NumberCharacters>
          <Submit type="submit" value="Edit" />
        </Form>
      </FormContainer>
    </Container>
  );
};

export default PostView;
