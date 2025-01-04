import React, { useState } from "react";
import styled from "styled-components";
import AnswerList from "./Answer/AnswerList";
import InputField from "../components/Input/InputField";

interface QAProps {
  question: string;
  answers: { postId: string; date: string; answer: string }[];
  onSave: (newAnswer: { postId: string; date: string; answer: string }) => void;
  onDelete: (postId: string) => void;
  onEdit: (postId: string, updatedAnswer: string) => void;
  userId?: string;
}

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 800px;
  padding: 20px 30px;
  color: ${({ theme }) => theme.text};
  border-radius: 12px;
`;

const Question = styled.h2`
  font-size: 20px;
  text-align: center;
  letter-spacing: 1.5px;
  font-family: "HakgyoansimNadeuriTTF-B", sans-serif;
`;

const DiaryForm: React.FC<QAProps> = ({
  question,
  answers,
  onSave,
  onDelete,
  onEdit,
}) => {
  const [editingDate, setEditingDate] = useState<string | null>(null);
  const [editingText, setEditingText] = useState<string>("");

  const handleSave = (newAnswerText: string) => {
    const currentDate = new Date().toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    onSave({
      postId: `${Date.now()}`,
      date: currentDate,
      answer: newAnswerText,
    });
  };

  const handleEditSave = () => {
    if (editingDate) {
      onEdit(editingDate, editingText);
      setEditingDate(null);
      setEditingText("");
    }
  };

  return (
    <Card>
      <Question>Q {question}</Question>

      {answers.length > 0 ? (
        <AnswerList
          answers={answers}
          onEdit={(postId, updatedAnswer) => {
            setEditingDate(postId);
            setEditingText(updatedAnswer);
          }}
          onDelete={onDelete}
          editingDate={editingDate}
          editingText={editingText}
          onEditSave={handleEditSave}
          onCancelEdit={() => setEditingDate(null)}
        />
      ) : (
        <InputField onSave={handleSave} />
      )}
    </Card>
  );
};

export default DiaryForm;
