import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modalReducer";
import animationSliceReducer from "./animationSlics";
import sectionReducer from "./sectionSliceReducer";

const store = configureStore({
  reducer: {
    modal: modalReducer,
    animation: animationSliceReducer,
    section: sectionReducer,
  },
});

export default store;
