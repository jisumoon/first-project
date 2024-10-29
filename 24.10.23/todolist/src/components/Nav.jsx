import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  margin-top: 20px;
`;

const NavContainer = styled.div`
  width: 30vw;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 16px;
  padding: 10px;
  background: #fff;
  box-shadow: rgb(204, 219, 232) 3px 3px 6px 0px inset,
    rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Weather = styled.div``;

const TodayNumber = styled.p``;

const getWeatherEmoji = (description) => {
  const weatherMapping = {
    맑음: "☀️ 맑음",
    구름조금: "🌤️ 약간 흐림",
    구름많음: "🌥️ 구름 많음",
    튼구름: "🌤️ 구름 많음",
    흐림: "☁️ 흐림",
    실비: "🌧️ 가벼운 비",
    비: "🌧️ 비",
    소나기: "🌦️ 소나기",
    폭우: "🌧️ 폭우",
    약한눈: "🌨️ 가벼운 눈",
    눈: "❄️ 눈",
    폭설: "❄️ 폭설",
    진눈깨비: "🌨️ 진눈깨비",
    소낙눈: "🌨️ 소낙눈",
    뇌우: "⛈️ 뇌우",
    강한뇌우: "⛈️ 강한 뇌우",
    번개: "⚡ 번개",
    안개: "🌫️ 안개",
    황사: "🌫️ 황사",
    먼지: "🌫️ 먼지",
    연무: "🌫️ 연무",
    돌풍: "💨 돌풍",
    태풍: "🌀 태풍",
    허리케인: "🌀 허리케인",
    우박: "🌨️ 우박",
    한랭: "🥶 한랭",
    고온: "🥵 고온",
    가벼운바람: "🍃 약한 바람",
    부드러운바람: "🍃 부드러운 바람",
    중간바람: "🍃 중간 바람",
    신선한바람: "🍃 신선한 바람",
    센바람: "💨 센 바람",
    강한폭풍: "💨 강한 폭풍",
  };

  return weatherMapping[description] || description;
};

const Nav = () => {
  const today = new Date();
  const todayDate = today.toLocaleDateString(`ko-KR`, {
    year: `numeric`,
    month: `long`,
    day: `numeric`,
  });

  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_KEY = import.meta.env.VITE_WEATHER_KEY;

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=Seoul&units=metric&lang=kr&appid=${API_KEY}`
        );
        if (!response.ok) {
          throw new Error(`날씨 조회중입니다`);
        }
        const data = await response.json();
        setWeather(data);
        setLoading(false);
      } catch (error) {
        setError(error);
      }
    };
    fetchWeather();
  }, [API_KEY]);

  return (
    <Container>
      <NavContainer>
        <TodayNumber>🗓️ {todayDate}</TodayNumber>
        {loading ? (
          <Weather>날씨 조회 중 입니다.</Weather>
        ) : weather ? (
          <>
            <Weather>{getWeatherEmoji(weather.weather[0].description)}</Weather>
            <Weather>🌡️ {weather.main.temp.toFixed(1)}°C</Weather>
          </>
        ) : (
          <Weather>날씨 조회를 실패했습니다.</Weather>
        )}
      </NavContainer>
    </Container>
  );
};

export default Nav;
