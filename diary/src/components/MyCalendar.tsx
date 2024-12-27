import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styled from "styled-components";
import styles from "../styles/CustomCalendar.module.css";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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

// 공휴일 찾기
const findHoliday = (formattedDate: string) => {
  return koreanHolidays.find((holiday) => holiday.date === formattedDate);
};

interface CalendarProps {
  onDateClick: (date: Date) => void;
}

const MyCalendar: React.FC<CalendarProps> = ({ onDateClick }) => {
  return (
    <Container>
      <Calendar
        locale="ko-KR"
        onClickDay={onDateClick}
        tileClassName={({ date, view, activeStartDate }) => {
          if (view === "month") {
            const tileMonth = date.getMonth();
            const calendarMonth = activeStartDate.getMonth();

            if (tileMonth !== calendarMonth) {
              return "";
            }

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
        tileContent={({ date, view, activeStartDate }) => {
          if (view === "month") {
            const tileMonth = date.getMonth();
            const calendarMonth = activeStartDate.getMonth();

            if (tileMonth !== calendarMonth) {
              return null;
            }

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
    </Container>
  );
};

export default MyCalendar;
