import { createSlice } from "@reduxjs/toolkit";

// 홈 섹션
const initialState = {
  currentSection: "home",
};

//

//활동 섹션
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
