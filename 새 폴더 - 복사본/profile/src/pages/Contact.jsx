import React, { useRef } from "react";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RippleEffectComponent from "../components/RippleEffectContainer";
import { motion } from "framer-motion";

const ContactContainer = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 100vh;
  background: ${(props) => props.theme.colors.primary};
  padding: 0 20px;

  @media (max-width: 1000px) {
    text-align: center;
  }
`;

const Contain = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 20px;

  @media (max-width: 1280px) {
  }
  @media (max-width: 1000px) {
    padding: 0;
  }
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }

  @media (max-width: 400px) {
    padding: 20px;
    padding-top: 20px;
  }
`;

const MainTitle = styled(motion.div)`
  margin-top: 10px;
  width: 100%;
  display: flex;
  justify-content: space-between;

  color: ${(props) => props.theme.colors.mainbackgtound};
  font-size: 120px;
  font-weight: bold;
  line-height: 1.1;
  letter-spacing: 4px;
  z-index: 3;

  @media (max-width: 1290px) {
    font-size: 100px;
  }

  @media (max-width: 1000px) {
    margin-top: 0;
  }

  @media (max-width: 768px) {
    font-size: 70px;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  @media (max-width: 400px) {
    font-size: 40px;
  }
  @media (max-width: 400px) {
    margin-top: 20px;
  }
`;

const BottomTItle = styled(motion.p)`
  width: 100%;
  text-align: right;
  font-size: 22px;
  color: ${(props) => props.theme.colors.mainbackgtound};
  padding-right: 5px;
  @media (max-width: 768px) {
    text-align: center;
    font-size: 18px;
  }
`;

const Img = styled(motion.div)`
  img {
    z-index: 3;
    margin-bottom: 40px;
    width: 400px;
    height: 440px;

    &:hover img {
      transform: scale(1.05);
    }
  }

  @media (max-width: 1290px) {
    img {
      width: 440px;
      height: 520px;
    }
  }

  @media (max-width: 768px) {
    img {
      width: 300px;
      height: 380px;
      margin: 0 auto;
    }
  }
`;

const BottomSection = styled.div`
  display: flex;
  justify-content: space-between;
  padding-right: 20px;
  color: ${(props) => props.theme.colors.mainbackgtound};

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

const RightInfo = styled(motion.p)`
  font-size: 17px;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 15px;
  }

  @media (max-width: 400px) {
    font-size: 14px;
  }
`;

const RightDownSection = styled(motion.ul)`
  display: flex;
  gap: 40px;
  margin-top: 10px;
  font-family: ${(props) => props.theme.fonts.four};
  z-index: 3;

  li {
    font-size: 20px;
    cursor: pointer;
    transition: transform 0.3s ease;
    color: #fff;
    cursor: pointer;
    transition: scale 0.5s;

    &:hover {
      scale: 1.1;
    }

    @media (max-width: 768px) {
      flex-wrap: wrap;
      gap: 20px;
      li {
        font-size: 18px;
      }
    }

    @media (max-width: 400px) {
      margin-top: 20px;
      font-size: 16px;
    }
  }
`;

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text);
  toast.success("📞 전화번호가 복사되었습니다!", {
    style: { backgroundColor: "#FBF7E3", color: "#333", fontSize: "14px" },
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

const showToastAndRedirect = (message, url) => {
  toast.info(message, {
    style: { backgroundColor: "#FBF7E3", color: "#333", fontSize: "14px" },
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    onClose: () => {
      window.open(url, "_blank");
    },
  });
};

const goToGithub = () => {
  showToastAndRedirect("🔗 GitHub로 이동합니다", "https://github.com/jisumoon");
};

const goToNotion = () => {
  showToastAndRedirect(
    "🔗 Notion으로 이동합니다",
    "https://www.notion.so/13336341b0a781f39a6cc6964f762ec9?v=13336341b0a7814a9a18000cd4f71d3c"
  );
};

// Variants
const titleVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1, ease: "easeInOut", staggerChildren: 0.5 },
  },
};

const wordVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1, ease: "easeInOut" },
  },
};

const imgVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1, ease: "easeInOut" },
  },
};

const textVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1, ease: "easeInOut" },
  },
};

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1, ease: "easeInOut", staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1, ease: "easeInOut" },
  },
};

const Contact = () => {
  const containerRef = useRef(null);

  return (
    <ContactContainer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      <RippleEffectComponent ref={containerRef} />
      <Contain>
        <MainTitle
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={wordVariants}>LINK</motion.div>
          <motion.div variants={wordVariants}>/MESSAGE</motion.div>
        </MainTitle>
        <BottomTItle variants={wordVariants}>Planting My Future</BottomTItle>
        <Img
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={imgVariants}
        >
          <img src="/img/codingForest.jpg" alt="codingForest" />
        </Img>
        <BottomSection>
          <RightInfo
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={textVariants}
          >
            Just as a small seed grows into a lush forest,
            <br /> I strive to learn, grow, and create better experiences each
            day.
          </RightInfo>
          <RightDownSection
            variants={listVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.li
              variants={itemVariants}
              onClick={() => copyToClipboard("010-2862-4628")}
            >
              PHONE
            </motion.li>
            <motion.li variants={itemVariants}>
              <a href="mailto:jjisu97@naver.com">EMAIL</a>
            </motion.li>
            <motion.li variants={itemVariants} onClick={goToGithub}>
              GITHUB
            </motion.li>
            <motion.li variants={itemVariants} onClick={goToNotion}>
              NOTION
            </motion.li>
          </RightDownSection>
        </BottomSection>
      </Contain>
      <ToastContainer />
    </ContactContainer>
  );
};

export default Contact;
