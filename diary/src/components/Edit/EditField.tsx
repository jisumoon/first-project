import React, { useState } from "react";
import styled from "styled-components";

interface EditFieldProps {
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSave: (newText: string) => void;
  onCancel: () => void;
}

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TextArea = styled.textarea`
  margin-top: 10px;
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid ${({ theme }) => theme.secondary};
  border-radius: 8px;
  resize: none;
  outline: none;
  font-family: "HakgyoansimNadeuriTTF-B", sans-serif;

  &:focus {
    border-color: ${({ theme }) => theme.primary};
  }
`;

const CharCounter = styled.div`
  position: absolute;
  top: 69%;
  right: 100px;
  font-size: 12px;
  color: ${({ theme }) => theme.text || "#333"};
  opacity: 0.7;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`;

const EditButton = styled.button`
  padding: 5px 10px;
  font-size: 14px;
  background: ${({ theme }) => theme.primary};
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-family: "Ownglyph_ParkDaHyun";

  &:hover {
    background-color: #45a049;
  }
`;

const CancelButton = styled.button`
  padding: 5px 10px;
  font-size: 14px;
  background: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-family: "Ownglyph_ParkDaHyun";
  &:hover {
    background-color: #d32f2f;
  }
`;

const EditField: React.FC<EditFieldProps> = ({
  value: initialValue,
  onChange,
  onSave,
  onCancel,
}) => {
  const [text, setText] = useState(initialValue);

  const handleSave = () => {
    onSave(text);
  };

  return (
    <InputContainer>
      <TextArea
        rows={4}
        maxLength={25}
        placeholder="수정 내용을 입력하세요"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          onChange?.(e);
        }}
      />
      <CharCounter>{text.length}/25</CharCounter>
      <ButtonContainer>
        <EditButton onClick={handleSave}>저장</EditButton>{" "}
        <CancelButton onClick={onCancel}>취소</CancelButton>
      </ButtonContainer>
    </InputContainer>
  );
};

export default EditField;
