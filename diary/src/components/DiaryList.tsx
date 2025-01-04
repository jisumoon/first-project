import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../utils/firebase";
import { collection, getDocs } from "firebase/firestore";
import MyCalendar from "./MyCalendar";
import DiaryForm from "./DiaryForm";
import questions from "../data/questions.json";
import styled from "styled-components";
import { createPost, updatePost, deletePost } from "../utils/postUtils";

interface Question {
  month: number;
  day: number;
  question: string;
}

interface Answer {
  postId: string;
  date: string;
  answer: string;
  title: string;
}

const LoginAlert = styled.p`
  text-align: center;
  font-size: 20px;
`;

const DiaryList: React.FC = () => {
  const getToday = () => {
    const today = new Date();
    return today
      .toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\. /g, "-")
      .replace(/\./g, "");
  };

  const [selectedDate, setSelectedDate] = useState<string>(getToday());
  const [answers, setAnswers] = useState<{ [key: string]: Answer[] }>({});
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  // 사용자 인증 상태 감지 및 데이터 로드
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUserId(user.uid);

        const userPostsRef = collection(db, `users/${user.uid}/posts`);
        const snapshot = await getDocs(userPostsRef);
        const loadedAnswers: { [key: string]: Answer[] } = {};

        snapshot.docs.forEach((doc) => {
          const data = doc.data() as Answer;
          const dateKey = data.title; // Firestore에서 저장된 날짜 필드 사용
          if (!loadedAnswers[dateKey]) {
            loadedAnswers[dateKey] = [];
          }
          loadedAnswers[dateKey].push({ ...data, postId: doc.id });
        });

        setAnswers(loadedAnswers);
      } else {
        setCurrentUserId(null);
        setAnswers({});
      }
    });

    return () => unsubscribe();
  }, []);

  // 날짜 선택 핸들러
  const handleDateClick = (date: Date) => {
    const formattedDate = date
      .toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\. /g, "-")
      .replace(/\./g, "");
    setSelectedDate(formattedDate);
  };

  // 답변 저장
  const handleSaveAnswer = async (newAnswer: Answer) => {
    if (!currentUserId) return;

    const postId = await createPost(
      currentUserId,
      selectedDate,
      newAnswer.answer
    );

    if (postId) {
      setAnswers((prev) => {
        const currentAnswers = prev[selectedDate] || [];
        return {
          ...prev,
          [selectedDate]: [
            ...currentAnswers,
            { ...newAnswer, postId, title: selectedDate },
          ],
        };
      });
    }
  };

  // 답변 삭제
  const handleDeleteAnswer = async (postId: string) => {
    if (!currentUserId) return;

    const success = await deletePost(currentUserId, postId);
    if (success) {
      setAnswers((prev) => {
        const currentAnswers = prev[selectedDate] || [];
        return {
          ...prev,
          [selectedDate]: currentAnswers.filter(
            (item) => item.postId !== postId
          ),
        };
      });
    }
  };

  // 답변 수정
  const handleEditAnswer = async (postId: string, updatedAnswer: string) => {
    if (!currentUserId) return;

    const success = await updatePost(currentUserId, postId, updatedAnswer);
    if (success) {
      setAnswers((prev) => {
        const currentAnswers = prev[selectedDate] || [];
        return {
          ...prev,
          [selectedDate]: currentAnswers.map((item) =>
            item.postId === postId ? { ...item, answer: updatedAnswer } : item
          ),
        };
      });
    }
  };

  const getMonthDay = (date: string | null) => {
    if (!date) return null;
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) return null;
    return {
      month: parsedDate.getMonth() + 1,
      day: parsedDate.getDate(),
    };
  };

  const selectedMonthDay = getMonthDay(selectedDate);

  const selectedQuestion =
    selectedMonthDay &&
    questions.find(
      (q: Question) =>
        Number(q.month) === selectedMonthDay.month &&
        Number(q.day) === selectedMonthDay.day
    );

  return (
    <div>
      <MyCalendar onDateClick={handleDateClick} />
      {currentUserId ? (
        <DiaryForm
          question={selectedQuestion?.question || "질문이 없습니다."}
          answers={answers[selectedDate] || []}
          onSave={(newAnswer) =>
            handleSaveAnswer({ ...newAnswer, title: selectedDate })
          }
          onDelete={handleDeleteAnswer}
          onEdit={handleEditAnswer}
          userId={currentUserId}
        />
      ) : (
        <LoginAlert>로그인이 필요합니다. 로그인 후 이용해주세요.</LoginAlert>
      )}
    </div>
  );
};

export default DiaryList;
