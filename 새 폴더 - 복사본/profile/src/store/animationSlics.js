import { createSlice } from "@reduxjs/toolkit";

// sessionStorage 기본값 설정
const getSessionStorage = (key, defaultValue) => {
  const value = sessionStorage.getItem(key);
  return value === null ? defaultValue : value === "true";
};

// 초기 상태 정의
const initialState = {
  isInitialLoad: getSessionStorage("isInitialLoad", true), // 기본값은 true (애니메이션 실행)
  animationComplete: getSessionStorage("animationComplete", false), // 기본값은 false (애니메이션 미완료)
};

const animationSlice = createSlice({
  name: "animation",
  initialState,
  reducers: {
    // isInitialLoad 업데이트
    setInitialLoad: (state, action) => {
      state.isInitialLoad = action.payload;
      sessionStorage.setItem(
        "isInitialLoad",
        action.payload ? "true" : "false"
      );
    },
    // animationComplete 업데이트
    setAnimationComplete: (state, action) => {
      state.animationComplete = action.payload;
      sessionStorage.setItem(
        "animationComplete",
        action.payload ? "true" : "false"
      );
    },
  },
});

export const { setInitialLoad, setAnimationComplete } = animationSlice.actions;
export default animationSlice.reducer;
