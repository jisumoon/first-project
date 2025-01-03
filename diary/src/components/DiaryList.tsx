import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import MyCalendar from "./MyCalendar";
import DiaryForm from "./DiaryForm";
import questions from "../data/questions.json";

interface Question {
  month: number;
  day: number;
  question: string;
}

interface Answer {
  postId: string;
  date: string;
  answer: string;
}

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

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUserId(user ? user.uid : null);
    });
    return () => unsubscribe();
  }, []);

  // 사용자가 클릭한 날짜 변경
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

  //새로운 답변을 현재 선택된 날짜의 답변 목록에 추가
  const handleSaveAnswer = (newAnswer: Answer) => {
    setAnswers((prev) => {
      const currentAnswers = prev[selectedDate] || [];
      return {
        ...prev,
        [selectedDate]: [...currentAnswers, newAnswer], // Firestore ID 포함
      };
    });
  };

  const handleDeleteAnswer = (postId: string) => {
    setAnswers((prev) => {
      const currentAnswers = prev[selectedDate] || [];
      return {
        ...prev,
        [selectedDate]: currentAnswers.filter((item) => item.postId !== postId),
      };
    });
  };

  const handleEditAnswer = (postId: string, updatedAnswer: string) => {
    setAnswers((prev) => {
      const currentAnswers = prev[selectedDate] || [];
      return {
        ...prev,
        [selectedDate]: currentAnswers.map((item) =>
          item.postId === postId ? { ...item, answer: updatedAnswer } : item
        ),
      };
    });
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
          onSave={handleSaveAnswer} // Firestore ID를 받아 처리
          onDelete={handleDeleteAnswer}
          onEdit={handleEditAnswer}
          userId={currentUserId}
        />
      ) : (
        <p>로그인이 필요합니다. 로그인 후 이용해주세요.</p>
      )}
    </div>
  );
};

export default DiaryList;
