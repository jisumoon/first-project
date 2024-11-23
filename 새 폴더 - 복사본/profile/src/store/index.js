import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import modalReducer from "./modalReducer";
import sectionReducer from "./sectionSliceReducer";
import { positionReducer } from "./positionSliceReducer";

const rootReducer = combineReducers({
  modal: modalReducer,
  section: sectionReducer,
  position: positionReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export default store;
