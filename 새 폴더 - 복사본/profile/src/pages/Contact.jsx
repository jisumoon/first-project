import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Matter from "matter-js";

// Styled Components
const Main = styled.main`
  margin: 0;
  padding: 0;
  color: transparent;
  height: 100vh;
  overflow: hidden;
  position: relative;
`;

const StyledLink = styled.a`
  text-decoration: none;
  color: black;
  display: block;
  padding: 1rem;
`;

const Word = styled.span`
  position: absolute;
  cursor: grab;
  font-size: 30px;
  color: ${(props) =>
    props.$highlighted ? "black" : "#ffeb3b"}; /* $로 변경 */
  font-weight: ${(props) =>
    props.$highlighted ? "bold" : "normal"}; /* $로 변경 */
`;

const Contact = () => {
  const [words, setWords] = useState([]); // 단어를 상태로 관리
  const containerRef = useRef(null); // 렌더링 컨테이너 Ref
  const observerRef = useRef(null); // Intersection Observer 감지용 Ref

  useEffect(() => {
    // Split words into spans
    const splitWords = () => {
      const text =
        "software developer with over 9 years of experience, I have developed a strong foundation in crafting innovative and efficient technology solutions. My passion for technology and entrepreneurship led me to co-found Mythrill, where I currently serve as the CTO. I am proud to be recognized as one of the '30under30' Armenians in Tech and am constantly driven to push boundaries and make a positive impact in the industry. When I'm not coding, I enjoy exploring my creative side through art, music, and nature.";
      const wordsArray = text.split(" ").map((word, index) => ({
        text: word,
        highlighted:
          word.startsWith("30under30") ||
          word.startsWith("CTO") ||
          word.startsWith("Mythrill"),
        key: index,
      }));
      setWords(wordsArray);
    };

    // Matter.js rendering
    const renderCanvas = () => {
      const Engine = Matter.Engine;
      const Render = Matter.Render;
      const World = Matter.World;
      const Bodies = Matter.Bodies;
      const Runner = Matter.Runner;
      const Mouse = Matter.Mouse;
      const MouseConstraint = Matter.MouseConstraint;

      const canvasSize = {
        width: window.innerWidth,
        height: window.innerHeight,
      };

      const engine = Engine.create({});
      const render = Render.create({
        element: containerRef.current, // 렌더링할 DOM 요소 설정
        engine: engine,
        options: {
          width: canvasSize.width,
          height: canvasSize.height,
          background: "transparent",
          wireframes: false,
        },
      });

      const params = {
        isStatic: true,
        render: { fillStyle: "transparent" },
      };

      const floor = Bodies.rectangle(
        canvasSize.width / 2,
        canvasSize.height,
        canvasSize.width,
        50,
        params
      );
      const wall1 = Bodies.rectangle(
        0,
        canvasSize.height / 2,
        50,
        canvasSize.height,
        params
      );
      const wall2 = Bodies.rectangle(
        canvasSize.width,
        canvasSize.height / 2,
        50,
        canvasSize.height,
        params
      );
      const top = Bodies.rectangle(
        canvasSize.width / 2,
        0,
        canvasSize.width,
        50,
        params
      );

      const wordElements = document.querySelectorAll(".word");
      const wordBodies = [...wordElements].map((elemRef, index) => {
        const width = elemRef.offsetWidth;
        const height = elemRef.offsetHeight;

        return {
          body: Bodies.rectangle(canvasSize.width / 2, 0, width, height, {
            render: { fillStyle: "transparent" },
          }),
          elem: elemRef,
          render() {
            const { x, y } = this.body.position;
            elemRef.style.top = `${y - 20}px`;
            elemRef.style.left = `${x - width / 2}px`;
            elemRef.style.transform = `rotate(${this.body.angle}rad)`;
          },
        };
      });

      const mouse = Mouse.create(containerRef.current); // 마우스 이벤트
      const mouseConstraint = MouseConstraint.create(engine, {
        mouse,
        constraint: {
          stiffness: 0.2,
          render: { visible: false },
        },
      });

      World.add(engine.world, [
        floor,
        wall1,
        wall2,
        top,
        ...wordBodies.map((box) => box.body),
        mouseConstraint,
      ]);
      render.mouse = mouse;

      Runner.run(engine);
      Render.run(render);

      (function rerender() {
        wordBodies.forEach((element) => {
          element.render();
        });
        Matter.Engine.update(engine);
        requestAnimationFrame(rerender);
      })();
    };

    // Intersection Observer 설정
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // 뷰포인트에 들어올 때 렌더링
          splitWords();
          renderCanvas();
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null, // 뷰포인트 기준: 브라우저 전체
      threshold: 0.5, // 50%가 보일 때 작동
    });

    if (observerRef.current) {
      observer.observe(observerRef.current); // 대상 요소 관찰 시작
    }

    return () => {
      observer.disconnect(); // 컴포넌트 언마운트 시 Observer 해제
    };
  }, []);

  return (
    <Main ref={observerRef}>
      <StyledLink href="https://gayane.dev/" target="_blank" rel="noreferrer">
        From My Personal Website
      </StyledLink>
      <div ref={containerRef}>
        {words.map((word) => (
          <Word
            key={word.key}
            className="word"
            $highlighted={word.highlighted} /* $ 접두사 사용 */
            style={{
              position: "absolute",
              top: "50%",
              left: `${Math.random() * 100}%`,
            }}
          >
            {word.text}
          </Word>
        ))}
      </div>
    </Main>
  );
};

export default Contact;
