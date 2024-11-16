import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modalReducer";
import sectionReducer from "./sectionReducer";
import interviewReducer from "./interviewSlice";

const store = configureStore({
  reducer: {
    modal: modalReducer,
    section: sectionReducer,
    interview: interviewReducer,
  },
});

export default store;
