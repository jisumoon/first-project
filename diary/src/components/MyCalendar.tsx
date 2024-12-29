import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styled from "styled-components";
import styles from "../styles/CustomCalendar.module.css";
import solarlunar from "solarlunar";

interface Holiday {
  date: string;
  name: string;
}

interface LunarHoliday {
  lunarMonth: number;
  lunarDay: number;
  name: string;
}

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const fixedHolidays: Holiday[] = [
  { date: "01-01", name: "신정" },
  { date: "03-01", name: "삼일절" },
  { date: "05-05", name: "어린이날" },
  { date: "06-06", name: "현충일" },
  { date: "08-15", name: "광복절" },
  { date: "10-03", name: "개천절" },
  { date: "10-09", name: "한글날" },
  { date: "12-25", name: "크리스마스" },
];

const lunarHolidays: LunarHoliday[] = [
  { lunarMonth: 1, lunarDay: 1, name: "설날" },
  { lunarMonth: 1, lunarDay: 2, name: "설날" },
  { lunarMonth: 1, lunarDay: 3, name: "설날" },
  { lunarMonth: 8, lunarDay: 15, name: "추석" },
  { lunarMonth: 8, lunarDay: 16, name: "추석" },
  { lunarMonth: 8, lunarDay: 17, name: "추석" },
];

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

const getKoreanHolidays = (year: number): Holiday[] => {
  const holidays = fixedHolidays.map((holiday) => ({
    date: `${year}-${holiday.date}`,
    name: holiday.name,
  }));

  lunarHolidays.forEach((lunarHoliday) => {
    const solarDate = solarlunar.lunar2solar(
      year,
      lunarHoliday.lunarMonth,
      lunarHoliday.lunarDay,
      false
    );

    // 변환된 날짜를 Date 객체로 생성
    const solarDateObj = new Date(
      solarDate.solarYear,
      solarDate.solarMonth - 1,
      solarDate.solarDay
    );

    const correctedDate = new Date(solarDateObj.getTime() + 9 * 60 * 60 * 1000);

    holidays.push({
      date: `${correctedDate.getFullYear()}-${String(
        correctedDate.getMonth() + 1
      ).padStart(2, "0")}-${String(correctedDate.getDate()).padStart(2, "0")}`,
      name: lunarHoliday.name,
    });
  });

  return holidays;
};

interface CalendarProps {
  onDateClick: (date: Date) => void;
}

const MyCalendar: React.FC<CalendarProps> = ({ onDateClick }) => {
  const [activeYear, setActiveYear] = useState<number>(
    new Date().getFullYear()
  );
  const koreanHolidays = getKoreanHolidays(activeYear);

  const findHoliday = (formattedDate: string): Holiday | undefined => {
    return koreanHolidays.find((holiday) => holiday.date === formattedDate);
  };

  return (
    <Container>
      <Calendar
        locale="ko-KR"
        onClickDay={onDateClick}
        onActiveStartDateChange={({ activeStartDate }) => {
          const newYear = activeStartDate?.getFullYear();
          if (newYear && newYear !== activeYear) {
            setActiveYear(newYear);
          }
        }}
        tileClassName={({ date, view }) => {
          if (view === "month") {
            const formattedDate = formatDate(date);
            if (findHoliday(formattedDate)) {
              return styles["react-calendar__tile--holiday"];
            }
            const day = date.getDay();
            if (day === 0) return styles["react-calendar__tile--sunday"];
            if (day === 6) return styles["react-calendar__tile--saturday"];
          }
          return "";
        }}
        tileContent={({ date, view }) => {
          if (view === "month") {
            const formattedDate = formatDate(date);
            const holiday = findHoliday(formattedDate);
            if (holiday) {
              return (
                <div style={{ color: "crimson", fontSize: "10px" }}>
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
