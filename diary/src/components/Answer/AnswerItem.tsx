import React from "react";
import styled from "styled-components";
import EditField from "../Edit/EditField";

const AnswerItemContainer = styled.div`
  margin-top: 10px;
  width: 100%;
  padding: 20px;
  background-color: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.text};
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
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

const Answer = styled.p`
  margin-top: 5px;
`;

const DeleteButton = styled.button`
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

interface AnswerItemProps {
  answer: { postId: string; date: string; answer: string };
  isEditing: boolean;
  editingText: string;
  onEdit: (postId: string) => void;
  onDelete: (postId: string) => void;
  onEditSave: (updatedAnswer: string) => void;
  onCancelEdit: () => void;
}

const AnswerItem: React.FC<AnswerItemProps> = ({
  answer,
  isEditing,
  editingText,
  onEdit,
  onDelete,
  onEditSave,
  onCancelEdit,
}) => {
  const handleEditSave = () => {
    onEditSave(editingText);
  };

  return (
    <AnswerItemContainer>
      <p>⭐ {answer.date}</p>
      {isEditing ? (
        <EditField
          value={editingText}
          onSave={handleEditSave}
          onCancel={onCancelEdit}
        />
      ) : (
        <>
          <Answer>{answer.answer}</Answer>
          <ButtonContainer>
            <EditButton onClick={() => onEdit(answer.postId)}>수정</EditButton>
            <DeleteButton onClick={() => onDelete(answer.postId)}>
              삭제
            </DeleteButton>
          </ButtonContainer>
        </>
      )}
    </AnswerItemContainer>
  );
};

export default AnswerItem;
