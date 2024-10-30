import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Container, Button, Nav, Form } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../redux/api";

const Wrapper = styled.div`
  .inner-item {
    padding: 0 40px;
  }
`;

const Logo = styled.img`
  width: 100px;
`;

const BtnItem = styled.span`
  color: #fff;
  transition: color 0.3s;
  &:hover {
    color: #dc143c;
  }
`;

const Navigation = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = async (event) => {
    event.preventDefault();

    try {
      const response = await api.get(
        `/search/multi?api_key=${
          import.meta.env.VITE_API_KEY
        }&query=${query}&language=ko-KR`
      );

      const results = response.data.results;
      if (results && results.length > 0) {
        const firstMatch = results[0];
        navigate(`/program/${firstMatch.id}`);
        setQuery("");
      } else {
        alert("결과가 없습니다.");
      }
    } catch (error) {}
  };
  return (
    <Wrapper>
      <Navbar bg="dark" variant="dark">
        <Container fluid className="inner-item">
          <Navbar.Brand href="#">
            <Link to={"/"}>
              <Logo
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1024px-Netflix_2015_logo.svg.png"
                alt="logo"
              />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="/">
                <BtnItem>홈</BtnItem>
              </Nav.Link>
              <Nav.Link href="/program">
                <BtnItem>프로그램</BtnItem>
              </Nav.Link>
            </Nav>
            <Form className="d-flex" onSubmit={handleSearch}>
              <Form.Control
                type="search"
                placeholder="검색어를 입력해주세요"
                className="me-2"
                aria-label="검색🔍"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />

              <Button variant="outline-danger" type="submit">
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Wrapper>
  );
};

export default Navigation;
