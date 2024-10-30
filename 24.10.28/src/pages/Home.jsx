import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { movieAction } from "../redux/actions/movieAction";
import Banner from "../components/Banner";
import MovieSlide from "../components/MovieSlide";
import { ClipLoader } from "react-spinners";

const Wrapper = styled.main`
  width: 100%;
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  width: 300px;
  margin: 30px 5px;
  font-size: 24px;
  font-weight: bold;
`;

const Home = () => {
  const dispatch = useDispatch();
  const { popularMovie, topRatedMovie, upComingMovie, loading } = useSelector(
    (state) => state.movie
  );

  useEffect(() => {
    dispatch(movieAction.getMovies());
  }, []);

  if (loading) {
    return (
      <Wrapper>
        <ClipLoader color="#fff" loading={loading} size={150} />
      </Wrapper>
    );
  } else {
    return (
      <div>
        <Banner movie={popularMovie.results[0]} />
        <Title>📽️ 오늘의 인기 영화</Title>
        <MovieSlide movies={popularMovie} />
        <Title>👓 보고 또 봐도 좋은 명작</Title>
        <MovieSlide movies={topRatedMovie} />
        <Title>👏 평단의 찬사를 받은 영화</Title>
        <MovieSlide movies={upComingMovie} />
      </div>
    );
  }
};

export default Home;

// moviedetail 컴포넌트 -> 영화세부정보 ㅜㄹ력

// 우측상단, navigation
// 검색바
// 별도의 검색결과 페이지로 이동
// 현재 보여지고 있는 home 검색결과 영화 출력

// 로그인페이지, id와 pw입력
// 무비디테일 볼 수 있도록
