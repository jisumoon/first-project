import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { tvShowAction } from "../redux/actions/dramaAction"; // dramaAction 대신 tvShowAction 사용
import DramaSlide from "../components/DramaSlide";
import { ClipLoader } from "react-spinners";

const Wrapper = styled.main`
  width: 100%;
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  width: 500px;
  margin-top: 40px;
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
`;

const Movie = () => {
  const dispatch = useDispatch();
  const { popularTV, topRatedTV, onAirTV, loading } = useSelector(
    (state) => state.movie
  );

  useEffect(() => {
    dispatch(tvShowAction.getTVShows());
  }, [dispatch]);

  console.log("popularTV:", popularTV);
  console.log("topRatedTV:", topRatedTV);
  console.log("onAirTV:", onAirTV);
  console.log("loading:", loading);

  if (loading) {
    return (
      <Wrapper>
        <ClipLoader color="#fff" loading={loading} size={150} />
      </Wrapper>
    );
  } else {
    return (
      <div>
        <Title>🔥 오늘의 인기 프로그램</Title>
        <DramaSlide dramas={popularTV} />
        <Title>⭐ 에피소드가 많은 프로그램</Title>
        <DramaSlide dramas={topRatedTV} />
        <Title>👏 평단의 찬사를 받은 프로그램</Title>
        <DramaSlide dramas={onAirTV} />
      </div>
    );
  }
};

export default Movie;
