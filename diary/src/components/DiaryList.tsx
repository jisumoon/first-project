import React, { useState } from "react";
import MyCalendar from "./MyCalendar";
import DiaryForm from "./DiaryForm";
import questions from "../data/questions.json"; // question.json 가져오기

const DiaryList: React.FC = () => {
  // 현재 날짜를 기본값으로 설정
  const getToday = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const [selectedDate, setSelectedDate] = useState<string>(getToday());

  // 날짜 클릭 시 포맷팅 및 저장
  const handleDateClick = (date: Date) => {
    const formattedDate = date.toISOString().split("T")[0];
    setSelectedDate(formattedDate);
  };

  // 선택된 날짜의 월-일 추출
  const getMonthDay = (date: string | null) => {
    if (!date) return null;
    const d = new Date(date);
    return { month: d.getMonth() + 1, day: d.getDate() };
  };

  const selectedMonthDay = getMonthDay(selectedDate);

  // question.json에서 질문
  const selectedQuestion =
    selectedMonthDay &&
    questions.find(
      (q) =>
        q.month === selectedMonthDay.month && q.day === selectedMonthDay.day
    );

  return (
    <div>
      <MyCalendar onDateClick={handleDateClick} />
      <DiaryForm
        question={
          selectedQuestion
            ? selectedQuestion.question
            : "선택하신 날짜에 질문이 없습니다."
        }
        answers={[]}
      />
    </div>
  );
};

export default DiaryList;
