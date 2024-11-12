import React from "react";
import { motion, useAnimation } from "framer-motion";
import styled from "styled-components";

const Container = styled.div`
  padding: 0 40px;
  height: 200vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TextWrapper = styled(motion.div)`
  font-size: 46px;
  font-weight: bold;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  overflow: hidden;
  color: #333;
`;

const Part = styled(motion.span)`
  display: inline-block;
  margin: 0 4px;
`;

const Section = styled(motion.div)`
  margin-top: 80px;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
`;

const Banner = () => {
  const controls = useAnimation();

  const textVariants = {
    hidden: { opacity: 0, x: 0 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 1, delay: i * 0.1 },
    }),
  };

  return (
    <Container>
      <TextWrapper
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
      >
        {[
          "Like",
          "a",
          "forest,",
          "grow",
          "with",
          "strength,",
          "adapt",
          "with",
          "resilience,",
          "and",
          "thrive",
          "with",
          "purpose.",
        ].map((word, index) => (
          <Part
            key={index}
            custom={index}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            whileInView={{
              x: index % 2 === 0 ? -20 : 20,
              opacity: 1,
            }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {word}
          </Part>
        ))}
      </TextWrapper>
      <Section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
      >
        <h2>New Content Section</h2>
      </Section>
    </Container>
  );
};

export default Banner;
