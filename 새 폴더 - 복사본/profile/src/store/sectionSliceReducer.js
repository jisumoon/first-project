// store/sectionSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPage: 1,
};

const sectionSlice = createSlice({
  name: "section",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export const { setPage } = sectionSlice.actions;
export default sectionSlice.reducer;
