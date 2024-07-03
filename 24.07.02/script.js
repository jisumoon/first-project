// 1. 컴퓨터에 top_navigation 인식

// 2. 상단 right_gnb에 마우스를 오버하면 이벤트 발생
// 2-1. 마우스를 오버하는 active 실행 -> text가 색이변하고, 두꺼워짐
// 2-2. 하단에 lnb가 opactity value가 1이되어야한다.
// 2-3. mouse out, mouse leave 기능 사용하며, 마우스가 옆에 있는 li태그로 이동을하면 기존에 이벤트는 제거
// 신규이벤트가 이전에 설정했던 기능을 그대로 구현!!!

const gnbLi = document.querySelectorAll(".gnb >li");
gnbLi.forEach((li) => {
  li.addEventListener("mouseover", () => {
    const lnb = li.querySelector(".lnb");
    const aTag = li.querySelector("a");
    if (lnb) {
      lnb.style.maxHeight = lnb.scrollHeight + "px";
      lnb.style.opacity = "1";
      aTag.classList.add("active");
    }
  });
  li.addEventListener("mouseout", () => {
    const lnb = li.querySelector(".lnb");
    const aTag = li.querySelector("a");
    if (lnb) {
      lnb.style.maxHeight = "0";
      lnb.style.opacity = "0";
      aTag.classList.remove("active");
    }
  });
});
