import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modalReducer";
import sectionReducer from "./sectionReducer";
import animationSliceReducer from "./animationSlics";

const store = configureStore({
  reducer: {
    modal: modalReducer,
    section: sectionReducer,
    animation: animationSliceReducer,
  },
});

export default store;
