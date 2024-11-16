import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentSlide: 0,
  direction: "next",
};

const interviewSlice = createSlice({
  name: "interview",
  initialState,
  reducers: {
    nextSlide: (state) => {
      state.direction = "next";
      state.currentSlide = (state.currentSlide + 1) % 3;
    },
    prevSlide: (state) => {
      state.direction = "prev";
      state.currentSlide = (state.currentSlide - 1 + 3) % 3;
    },
  },
});

export const { nextSlide, prevSlide } = interviewSlice.actions;
export default interviewSlice.reducer;
