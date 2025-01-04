import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faList, faCalendar } from "@fortawesome/free-solid-svg-icons";
import ToggleButton from "./Toggle";
import { useTheme } from "../context/ThemePorvider";
import { useNavigate, useLocation } from "react-router-dom";

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
  padding: 15px 25px;
  background: ${({ theme }) => theme.background};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  margin: 10px 20px;
  position: sticky;
  top: 10px;
  z-index: 100;
  transition: background 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const UserWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  .username {
    font-size: 18px;

    color: ${({ theme }) => theme.text};
    transition: color 0.3s ease-in-out;
    cursor: pointer;

    &:hover {
      color: ${({ theme }) => theme.primary};
    }
  }

  .icon {
    background-color: ${({ theme }) => theme.primary};
    color: #fff;
    border-radius: 50%;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const DiaryLink = styled.div`
  font-size: 18px;
  transition: color 0.3s;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.secondary};
  }
`;

const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Header: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const isDiaryList = location.pathname === "/list";

  const username = "사용자";

  return (
    <HeaderWrapper>
      <UserWrapper>
        <FontAwesomeIcon icon={faUser} size="sm" color="#007bff" />
        <span className="username">{username}</span>
      </UserWrapper>
      <DiaryLink onClick={() => navigate(isDiaryList ? "/" : "/list")}>
        <FontAwesomeIcon
          icon={isDiaryList ? faCalendar : faList}
          style={{ marginRight: "8px" }}
        />
        {isDiaryList ? "캘린더 보기" : "일기 리스트"}
      </DiaryLink>
      <ToggleWrapper>
        <ToggleButton isDarkMode={isDarkMode} onToggle={toggleTheme} />
      </ToggleWrapper>
    </HeaderWrapper>
  );
};

export default Header;
