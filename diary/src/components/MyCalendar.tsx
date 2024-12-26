import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styles from "../styles/CustomCalendar.module.css";
import styled from "styled-components";

interface QAData {
  question: string;
  answers: {
    date: string;
    answer: string;
  }[];
}

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px auto;
  background-color: ${({ theme }) => theme.background};
  padding: 20px;
`;

const CalendarContainer = styled.div`
  margin-bottom: 20px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
`;

const Card = styled.div`
  width: 100%;
  max-width: 800px;
  padding: 20px 30px;
  color: ${({ theme }) => theme.text};

  border-radius: 12px;
`;

const Question = styled.h2`
  margin-bottom: 20px;
  font-size: 28px;
  text-align: center;
  font-weight: bold;
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
    margin: 0;
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

const koreanHolidays = [
  { date: "2025-01-01", name: "신정" },
  { date: "2025-01-28", name: "설날" },
  { date: "2025-01-29", name: "설날" },
  { date: "2025-01-30", name: "설날" },
  { date: "2025-03-01", name: "삼일절" },
  { date: "2025-05-05", name: "어린이날" },
  { date: "2025-05-15", name: "석가탄신" },
  { date: "2025-06-06", name: "현충일" },
  { date: "2025-08-15", name: "광복절" },
  { date: "2025-10-03", name: "개천절" },
  { date: "2025-10-06", name: "추석" },
  { date: "2025-10-07", name: "추석" },
  { date: "2025-10-08", name: "추석" },
  { date: "2025-10-09", name: "한글날" },
  { date: "2025-12-25", name: "크리스마스" },
];

// 날짜 포맷
const formatDate = (date: Date): string => {
  return date
    .toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\. /g, "-")
    .replace(/\.$/, "");
};

// 공휴일
const findHoliday = (formattedDate: string) => {
  return koreanHolidays.find((holiday) => holiday.date === formattedDate);
};

const MyCalendar: React.FC = () => {
  const [qaData] = useState<QAData>({
    question: "What are your goals?", // 질문
    answers: [
      {
        date: "2024-12-20",
        answer: "My goal is to learn React better.",
      },
      {
        date: "2025-12-20",
        answer: "I successfully completed my React project.",
      },
      {
        date: "2023-12-20",
        answer: "I started my journey in React.",
      },
    ],
  });

  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const handleDateClick = (date: Date) => {
    const formattedDate = formatDate(date);
    console.log("Formatted date:", formattedDate);
    setSelectedDate(formattedDate);
  };

  // 현재 선택된 날짜의 월-일
  const getMonthDay = (date: string) => {
    const [, month, day] = date.split("-");
    return `${month}-${day}`;
  };

  // 선택된 날짜의 월-일
  const selectedMonthDay = selectedDate ? getMonthDay(selectedDate) : null;

  // 날짜에 따라 답변 필터링
  const filteredAnswers = selectedMonthDay
    ? qaData.answers.filter((a) => getMonthDay(a.date) === selectedMonthDay)
    : qaData.answers;

  // 답변을 최신순으로 정렬
  const sortedAnswers = [...filteredAnswers].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <Container>
      <CalendarContainer>
        <Calendar
          locale="ko-KR"
          onClickDay={handleDateClick}
          tileClassName={({ date, view }) => {
            if (view === "month") {
              const formattedDate = formatDate(date);

              if (findHoliday(formattedDate)) {
                return styles["react-calendar__tile--holiday"];
              }
              const day = date.getDay();
              if (day === 0) {
                return styles["react-calendar__tile--sunday"];
              }
              if (day === 6) {
                return styles["react-calendar__tile--saturday"];
              }
              return styles["react-calendar__tile"];
            }
            return "";
          }}
          tileContent={({ date, view }) => {
            if (view === "month") {
              const formattedDate = formatDate(date);
              const holiday = findHoliday(formattedDate);

              if (holiday) {
                return (
                  <div
                    style={{
                      color: "crimson",
                      fontSize: "10px",
                    }}
                  >
                    {holiday.name}
                  </div>
                );
              }
            }
            return null;
          }}
          className={styles["react-calendar"]}
        />
      </CalendarContainer>

      <Card>
        <Question>Q: {qaData.question}</Question>

        <AnswerList>
          {sortedAnswers.length > 0 ? (
            sortedAnswers.map((item, index) => (
              <AnswerItem key={index}>
                <p>⭐ {item.date}</p>
                <p>{item.answer}</p>
              </AnswerItem>
            ))
          ) : (
            <p style={{ textAlign: "center", fontSize: "18px" }}>
              답변이 없습니다.
            </p>
          )}
        </AnswerList>
      </Card>
    </Container>
  );
};

export default MyCalendar;
