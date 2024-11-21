import { faArrowRight, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";

const Card = styled.div`
  .card-inner {
    position: relative;
    width: 300px;
    height: 260px;
    border-radius: 14px;
    border-bottom-right-radius: 0;
    overflow: hidden;

    .box {
      border: 1px solid #f00;
      width: 100%;
      height: 100%;
      border-radius: 20px;
      overflow: hidden;

      .imgBox {
        position: absolute;
        inset: 0;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .icon {
        position: absolute;
        bottom: -6px;
        right: -6px;
        width: 96px;
        height: 96px;
        border-top-left-radius: 50%;
        background: ${(props) => props.theme.colors.mainbackgtound};

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
    padding: 15px 10px;

    h3 {
      font-size: 20px;
      font-weight: bold;
    }

    p {
      font-size: 14px;
      line-height: 1.2;
      color: #565656;
    }

    ul {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 10px;

      li {
        background: ${(props) => props.theme.colors.highlight};
        padding: 6px 10px;
        border-radius: 3px;
        color: #fff;
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
            <img src={item.img} alt={item.title_kr} />
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
            item.skill.map((skill, index) => <li key={index}>{skill}</li>)}
        </ul>
      </div>
    </Card>
  );
};

export default PortfolioBox;
