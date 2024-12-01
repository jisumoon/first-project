import { configureStore, combineReducers } from "@reduxjs/toolkit";
import modalReducer from "./modalReducer";

const rootReducer = combineReducers({
  modal: modalReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
