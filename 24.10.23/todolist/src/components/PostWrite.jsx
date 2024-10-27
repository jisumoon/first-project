import React, { useState } from "react";
import styled from "styled-components";
import GreenHouse from "../assets/GreenHouse.svg";

const Container = styled.div`
  display: flex;
  margin: 0 auto;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Title = styled.h1`
  margin-top: 30px;
  font-size: 30px;
  font-family: "Paperlogy-8ExtraBold";
  color: #3ac569;
`;

const Logo = styled.div`
  display: flex;
  justify-content: center;
`;

const Post = styled.div`
  flex: 1;
`;

const FormContainer = styled.div`
  width: 100%;
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
  font-size: 14px;
  color: #fff;
  font-weight: 600;
  box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    box-shadow: inset 0 0 10px;
  }
`;

const PostWrite = ({ addItemToPlanned }) => {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  //글자수 제한
  const TITLE_LIMIT = 20;
  const CONTENTS_LIMIT = 100;

  const handleTitle = (e) => {
    if (e.target.value.length <= 20) {
      setTitle(e.target.value);
    }
  };

  const handleContents = (e) => {
    if (e.target.value.length <= 100) {
      setContents(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && contents) {
      const newItem = { title, contents };
      addItemToPlanned(newItem);
      setTitle("");
      setContents("");
    }
  };

  return (
    <Container>
      <Post>
        <Logo>
          <Title>To Do List</Title>
          <img src={GreenHouse} style={{ width: "80px" }} />{" "}
        </Logo>
        <FormContainer>
          <Form onSubmit={handleSubmit}>
            <Label htmlFor="Title">Title</Label>
            <InputTitle
              type="text"
              name="Title"
              id="Title"
              value={title}
              onChange={handleTitle}
            />
            <NumberCharacters $isLimit={title.length === TITLE_LIMIT}>
              {title.length}/{TITLE_LIMIT}
            </NumberCharacters>
            <Label htmlFor="Contents">Contents</Label>
            <InputContents
              name="Contents"
              id="Contents"
              value={contents}
              onChange={handleContents}
            />
            <NumberCharacters $isLimit={contents.length === CONTENTS_LIMIT}>
              {contents.length}/{CONTENTS_LIMIT}
            </NumberCharacters>
            <Submit type="submit" value="Add" />
          </Form>
        </FormContainer>
      </Post>
    </Container>
  );
};

export default PostWrite;
