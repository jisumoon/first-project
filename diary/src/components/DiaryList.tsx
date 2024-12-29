import React, { useState } from "react";
import MyCalendar from "./MyCalendar";
import DiaryForm from "./DiaryForm";
import questions from "../data/questions.json";

interface Answer {
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
      (q) =>
        Number(q.month) === selectedMonthDay.month &&
        Number(q.day) === selectedMonthDay.day
    );

  const handleSaveAnswer = (newAnswer: Answer) => {
    setAnswers((prev) => {
      const currentAnswers = prev[selectedDate] || [];
      return {
        ...prev,
        [selectedDate]: [...currentAnswers, newAnswer],
      };
    });
  };

  return (
    <div>
      <MyCalendar onDateClick={handleDateClick} />
      <DiaryForm
        question={selectedQuestion?.question || "질문이 없습니다."}
        answers={answers[selectedDate] || []}
        onSave={handleSaveAnswer}
      />
    </div>
  );
};

export default DiaryList;
