import { configureStore, combineReducers } from "@reduxjs/toolkit";
import modalReducer from "./modalReducer";
import sectionReducer from "./sectionSliceReducer";

const rootReducer = combineReducers({
  modal: modalReducer,
  section: sectionReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
