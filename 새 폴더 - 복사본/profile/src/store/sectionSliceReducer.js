// store/sectionSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentSection: "home",
};

const sectionSlice = createSlice({
  name: "section",
  initialState,
  reducers: {
    setCurrentSection: (state, action) => {
      state.currentSection = action.payload;
    },
  },
});

export const { setCurrentSection } = sectionSlice.actions;
export default sectionSlice.reducer;
