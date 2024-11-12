export const lineVariants = {
  hidden: { width: 0 },
  visible: {
    width: "100%",
    transition: { duration: 4 },
  },
};

export const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.5 },
  },
};

export const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 2 } },
};

export const fadeInWithDelayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 6, delay: 1.5 } },
};
