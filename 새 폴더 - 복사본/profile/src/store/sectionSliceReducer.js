// sectionSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentSection: "home",
  introSeen: false,
};

const sectionSlice = createSlice({
  name: "section",
  initialState,
  reducers: {
    setCurrentSection: (state, action) => {
      state.currentSection = action.payload;
    },
    markIntroSeen: (state) => {
      state.introSeen = true;
    },
  },
});

export const { setCurrentSection, markIntroSeen } = sectionSlice.actions;
export default sectionSlice.reducer;
