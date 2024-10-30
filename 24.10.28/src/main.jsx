import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.js";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
// 어떤 기준으로 component를 나누는 가?
// 실무에서는
// 당연히 기능적인 요소가 1차적
// 기능적인 요소란 ? 프로그래밍 언어의 CRUD
// 콘텐츠를 생성하는 요소와 삭제하는 요소 ; 독립
// 최적화 => 컴포넌트 (*Rerendering)
//
