import { useState } from "react";
import styled from "styled-components";
import { createPost, updatePost, deletePost } from "../utils/postUtils";

interface QAProps {
  question: string;
  answers: { postId: string; date: string; answer: string }[];
  onSave: (newAnswer: { postId: string; date: string; answer: string }) => void;
  onDelete: (postId: string) => void;
  onEdit: (postId: string, updatedAnswer: string) => void;
  userId: string;
}

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 800px;
  padding: 20px 30px;
  color: ${({ theme }) => theme.text};
  border-radius: 12px;
`;

const Question = styled.h2`
  margin: 10px 0;
  font-size: 20px;
  text-align: center;
  letter-spacing: 1.5px;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  font-family: "HakgyoansimNadeuriTTF-B", sans-serif;
`;

const AnswerList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const AnswerItem = styled.li`
  width: 100%;
  padding: 20px;
  background-color: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.text};
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
  }

  p {
    font-size: 2px;
    line-height: 1.6;
    letter-spacing: 0.8px;
    font-family: "HakgyoansimNadeuriTTF-B", sans-serif;

    &:nth-child(1) {
      font-weight: bold;
      font-size: 14px;
    }

    &:nth-child(2) {
      font-size: 16px;
    }
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
`;

const CharCounter = styled.div`
  position: absolute;
  bottom: 50px;
  right: 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.text || "#333"};
  opacity: 0.7;
`;

const EditCharCounter = styled.div`
  position: absolute;
  bottom: -20px;
  right: 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.text || "#333"};
  opacity: 0.7;
`;

const InputField = styled.textarea`
  width: 100%;
  padding: 10px;
  font-size: 18px;
  border: 1px solid ${({ theme }) => theme.secondary};
  border-radius: 10px;
  resize: none;
  font-family: "Ownglyph_ParkDaHyun";
  &:hover {
    outline: none;
  }
`;

const SaveButton = styled.button`
  padding: 5px 10px;
  font-size: 16px;
  font-family: "Ownglyph_ParkDaHyun";
  color: #fff;
  background: ${({ theme }) => theme.primary};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    transform: translateY(-2px);
  }
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

const DiaryForm: React.FC<QAProps> = ({
  question,
  answers,
  onSave,
  onDelete,
  onEdit,
  userId,
}) => {
  const [newAnswer, setNewAnswer] = useState("");
  const [editingDate, setEditingDate] = useState<string | null>(null);
  const [editingText, setEditingText] = useState<string>("");

  //저장
  const handleSave = async () => {
    if (!userId) {
      alert("로그인이 필요합니다. 로그인 후 이용해주세요.");
      return;
    }

    if (newAnswer.trim() === "") {
      alert("답변을 적어주세요");
      return;
    }

    const currentDate = new Date().toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    try {
      const postId = await createPost(userId, `질문: ${question}`, newAnswer); // Firestore의 문서 ID 사용
      if (postId) {
        onSave({ postId, date: currentDate, answer: newAnswer }); // Firestore의 ID를 상태에 저장
        setNewAnswer("");
      }
    } catch (error) {
      console.error("Error saving post:", error);
    }
  };

  //수정
  const handleEdit = (postId: string) => {
    setEditingDate(postId); // 수정할 항목의 postId 설정
    const answerToEdit = answers.find((item) => item.postId === postId);
    setEditingText(answerToEdit?.answer || "");
  };

  //수정 후 저장
  const handleEditSave = async () => {
    if (!editingDate || editingText.trim() === "") {
      alert("수정할 내용을 적어주세요.");
      return;
    }

    if (editingText.length > 25) {
      alert("수정 내용은 25자 이내로 작성해주세요.");
      return;
    }

    try {
      const success = await updatePost(userId, editingDate, editingText);
      if (success) {
        console.log("Edit successful:", { editingDate, editingText });
        onEdit(editingDate, editingText);
        setEditingDate(null);
        setEditingText("");
      }
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  //삭제
  const handleDelete = async (postId: string) => {
    try {
      const success = await deletePost(userId, postId); // Firestore 문서 ID 사용
      if (success) onDelete(postId);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <Card>
      <Question>Q {question}</Question>
      <AnswerList>
        {answers.length > 0 ? (
          answers.map((item) => (
            <AnswerItem key={item.postId}>
              <p>⭐ {item.date}</p>
              {editingDate === item.postId ? (
                <>
                  <InputContainer>
                    <InputField
                      rows={4}
                      maxLength={25}
                      placeholder="답변을 적어주세요"
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                    />
                    <EditCharCounter>{editingText.length}/25</EditCharCounter>
                  </InputContainer>
                  <ButtonContainer>
                    <SaveButton onClick={handleEditSave}>저장</SaveButton>
                    <SaveButton onClick={() => setEditingDate(null)}>
                      취소
                    </SaveButton>
                  </ButtonContainer>
                </>
              ) : (
                <>
                  <p>{item.answer}</p>
                  <ButtonContainer>
                    <EditButton onClick={() => handleEdit(item.postId)}>
                      수정
                    </EditButton>
                    <DeleteButton onClick={() => handleDelete(item.postId)}>
                      삭제
                    </DeleteButton>
                  </ButtonContainer>
                </>
              )}
            </AnswerItem>
          ))
        ) : (
          <InputContainer>
            <InputField
              rows={4}
              maxLength={25}
              placeholder="답변을 적어주세요"
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
            ></InputField>
            <SaveButton onClick={handleSave}>저장</SaveButton>
            <CharCounter>{newAnswer.length}/25</CharCounter>
          </InputContainer>
        )}
      </AnswerList>
    </Card>
  );
};

export default DiaryForm;
