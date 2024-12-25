import { faArrowRight, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";

const Card = styled.div`
  width: 400px;
  height: 420px;
  @media (max-width: 768px) {
    width: 200px;
    height: 380px;
  }
  .card-inner {
    position: relative;
    width: 100%;
    height: 260px;
    overflow: hidden;

    @media (max-width: 768px) {
      width: 200px;
      height: 200px;
    }

    .box {
      width: 100%;
      height: 100%;
      overflow: hidden;

      .imgBox {
        position: absolute;
        width: 100%;
        height: 100%;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top;
        }
      }

      .icon {
        position: absolute;
        bottom: -4px;
        right: -3px;
        width: 96px;
        height: 96px;
        border-top-left-radius: 50%;

        &:hover .iconBox {
          transform: scale(1.1);
        }

        .iconBox {
          display: flex;
          justify-content: center;
          align-items: center;
          position: absolute;
          inset: 10px;
          background: #fff;
          border: none;
          border-radius: 50%;
          transition: 0.3s;
          cursor: pointer;
          font-size: 20px;
          color: ${(props) => props.theme.colors.secondary};
        }
      }
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px 0;
    h3 {
      font-size: 20px;
      font-weight: bold;
    }

    p {
      font-size: 14px;
      line-height: 1.4;
      color: #565656;
    }

    ul {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 10px;

      li {
        color: rgba(44, 95, 45, 0.8);
        font-size: 13px;
      }
    }
  }
`;

const PortfolioBox = ({ item, onClick }) => {
  return (
    <Card>
      <div className="card-inner">
        <div className="box">
          <div className="imgBox">
            <img src={item.screen} alt={item.title_kr} />
          </div>
          <div className="icon">
            <button className="iconBox" onClick={() => onClick(item)}>
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
        </div>
      </div>
      <div className="content">
        <h3>{item.title_kr}</h3>
        <p>{item.description}</p>
        <ul>
          {item.skill &&
            item.skill.map((skill, index) => <li key={index}>#{skill}</li>)}
        </ul>
      </div>
    </Card>
  );
};

export default PortfolioBox;
