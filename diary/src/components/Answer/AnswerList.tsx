import React from "react";
import styled from "styled-components";
import AnswerItem from "./AnswerItem";

interface AnswerListProps {
  answers: { postId: string; date: string; answer: string }[];
  onEdit: (postId: string, updatedAnswer: string) => void;
  onDelete: (postId: string) => void;
  editingDate: string | null;
  editingText: string;
  onEditSave: () => void;
  onCancelEdit: () => void;
}

const AnswerListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const AnswerList: React.FC<AnswerListProps> = ({
  answers,
  onEdit,
  onDelete,
  editingDate,
  editingText,
  onEditSave,
  onCancelEdit,
}) => {
  return (
    <AnswerListContainer>
      {answers.map((item) => (
        <AnswerItem
          key={item.postId}
          answer={item}
          isEditing={editingDate === item.postId}
          editingText={editingText}
          onEdit={(updatedAnswer) => onEdit(item.postId, updatedAnswer)}
          onDelete={() => onDelete(item.postId)}
          onEditSave={onEditSave}
          onCancelEdit={onCancelEdit}
        />
      ))}
    </AnswerListContainer>
  );
};

export default AnswerList;
