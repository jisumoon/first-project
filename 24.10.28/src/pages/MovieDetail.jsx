// MovieDetail.jsx
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";

const DetailWrapper = styled.div`
  padding: 60px;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const Poster = styled.img`
  width: 300px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(255, 255, 255, 0.2);
`;

const Title = styled.h1`
  font-size: 28px;
  text-align: center;
`;

const Overview = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  line-height: 1.6;
  max-width: 600px;
`;

const InfoGroup = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 40px;
  max-width: 600px;
  font-size: 18px;
  margin-top: 20px;
  margin-bottom: 30px;
`;

const Result = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  font-size: 20px;
`;

const Button = styled.button`
  border: none;
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 30px;
  background: none;
  color: #fff;
  transition: border 0.3s color 0.3s;
  &:hover {
    color: #ccc;
  }
`;

const ButtonS = styled.button`
  margin-top: 30px;
  padding: 16px 90px;
  border: none;
  background: none;
  border: 1px solid #fff;
  color: #fff;
  transition: border 0.3s color 0.3s;
  &:hover {
    border: 1px solid #ccc;
    color: #ccc;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
`;

const MovieDetail = () => {
  const { id } = useParams();
  const movies = useSelector((state) => state.movie);
  const navigate = useNavigate();

  // 이전 페이지로 이동
  const handleBack = () => navigate(-1);

  const handleClick = () => {
    alert("준비중인 기능입니다.");
  };

  const movieList = [
    ...(movies.popularMovie?.results || []),
    ...(movies.topRatedMovie?.results || []),
    ...(movies.upComingMovie?.results || []),
  ];

  const movie = movieList.find((item) => item.id === parseInt(id));

  if (!movie) return <Result>영화 정보를 불러오고 있습니다</Result>;
  return (
    <DetailWrapper>
      <Button onClick={handleBack}>×</Button>
      <Poster
        src={`https://media.themoviedb.org/t/p/original/${movie.poster_path}`}
        alt={movie.title}
      />
      <Title>📍{movie.title}</Title>
      <InfoGroup>
        <span>⭐평점: {Math.floor(movie.vote_average)}</span>
        <span>
          🕒상영 시간: {movie.runtime ? `${movie.runtime}분` : "70분"}
        </span>
        <span>🎎등급: {movie.adult ? "성인" : "전체 관람"}</span>
      </InfoGroup>
      <Overview>{movie.overview}</Overview>
      <ButtonGroup>
        <ButtonS onClick={handleClick}>▶️ 지금 시청하기</ButtonS>
        <ButtonS onClick={handleBack}>➡️ 뒤로 돌아가기</ButtonS>
      </ButtonGroup>
    </DetailWrapper>
  );
};

export default MovieDetail;
