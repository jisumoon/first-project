// 자동슬라이드

const sliderWrap = document.querySelector(".inner");
const sliderInner = document.querySelector(".my_slide");
const slider = document.querySelectorAll(".about_content");

let currentIndex = 0;
const sliderCount = slider.length;
const sliderInterval = 7000;
const sliderWidth = slider[0].clientWidth;
const sliderClone = sliderInner.firstElementChild.cloneNode(true);

sliderInner.appendChild(sliderClone);

const sliderEffect = () => {
  currentIndex++;

  if (currentIndex > sliderCount) {
    sliderInner.style.transition = "none";
    sliderInner.style.transform = `translateX(0px)`;
    currentIndex = 1;
    setTimeout(() => {
      sliderInner.style.transition = "all 0.6s ease";
      sliderInner.style.transform = `translateX(-${
        sliderWidth * currentIndex
      }px)`;
    }, 0);
  } else {
    sliderInner.style.transition = "all 0.6s ease in out";
    sliderInner.style.transform = `translateX(-${
      sliderWidth * currentIndex
    }px)`;
  }
};

setInterval(sliderEffect, sliderInterval);

// 베너 색상 변화

// 토글버튼
