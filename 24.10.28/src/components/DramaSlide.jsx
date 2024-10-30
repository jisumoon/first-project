import React from "react";
import styled from "styled-components";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import DramaCard from "./DramaCard";

const Wrapper = styled.div`
  width: 100vw;
`;

const DramaSlide = ({ dramas }) => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <Wrapper>
      {dramas && (
        <Carousel responsive={responsive}>
          {dramas.results.map((item, index) => (
            <DramaCard key={index} item={item} />
          ))}
        </Carousel>
      )}
    </Wrapper>
  );
};

export default DramaSlide;
