import React, { useState, useEffect } from "react";
import PortfolioBox from "./PortfolioBox";
import styled from "styled-components";

const PortfolioContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  padding: 20px;
`;

const PortfolioList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/portfolio.json");
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        // console.error("데이터가 찾아오지 못하고 있어요");
      }
    };
    fetchData();
  }, []);

  const handleBoxClick = (item) => {
    // console.log("클릭");
  };

  return (
    <PortfolioContainer>
      {projects.map((item) => (
        <PortfolioBox key={item.id} item={item} onClick={handleBoxClick} />
      ))}
    </PortfolioContainer>
  );
};

export default PortfolioList;
