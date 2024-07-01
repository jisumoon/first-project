// 1.컴퓨터에게 상단 span ul & li 태그를 인지시켜줘야 한다.

// 2.상단 span요소에게 마우스를 오버하면 이벤트가 실행된다.

// 2_1.active 가상클래스가 실행 (*텍스트가 검정색 & 두꺼워진다)

// 2_2.하단에 lnb요소의 opactity value 1이되어야 한다.

// 3.mouseleave || mouseout 기능을 활용해서 마우스가 옆에 있는 li태그로 이동을하면 기존에 이벤트는 제거 // 신규이벤트가 이전에 설정했던 기능을 그대로 구현!!!

const gnbLi = document.querySelectorAll(".topNav > li");
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
