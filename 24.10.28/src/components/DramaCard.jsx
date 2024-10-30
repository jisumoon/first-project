import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Badge } from "react-bootstrap";

const Wrapper = styled.div`
  width: 300px;
  height: 200px;
  position: relative;
  cursor: pointer;
  &:hover .overlay {
    opacity: 1;
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: opacity 0.3s;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Title = styled.h1`
  width: 100%;
  position: absolute;
  top: 22px;
  left: 10px;
  font-size: 20px;
  color: white;
`;

const Genre = styled.div`
  display: flex;
  gap: 6px;
`;

const InfoGroup = styled.div`
  width: 100%;
  position: absolute;
  bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  gap: 20px;
`;

const Vote = styled.span``;

const DramaCard = ({ item }) => {
  const { genreList } = useSelector((state) => state.movie);
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Overlay className="overlay"></Overlay>
      <Img
        src={`https://media.themoviedb.org/t/p/original/${item.backdrop_path}`}
        alt={item.name}
      />
      <Title>{item.name || item.title || "오늘 하루 "}</Title>
      <InfoGroup>
        <Vote>
          ⭐{item.vote_average ? item.vote_average.toFixed(1) : "8.2"}
        </Vote>
      </InfoGroup>
    </Wrapper>
  );
};

export default DramaCard;
