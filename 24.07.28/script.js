// 자동슬라이드

const sliderWrap = document.querySelector(".inner");
const sliderInner = document.querySelector(".my_slide");
const slider = document.querySelectorAll(".about_content");

let currentIndex = 0;
const sliderCount = slider.length;
const sliderInterval = 90000;
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

window.addEventListener("scroll", () => {
  let scroll = window.scrollY;
  const header = document.querySelector("header");
  if (scroll > 50) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
});

// 토글버튼
const trigger = document.querySelector(".trigger");
const gnb = document.querySelector(".gnb");
const gnbLinks = gnb.querySelectorAll("a");

trigger.addEventListener("click", function () {
  this.classList.toggle("active");
  gnb.classList.toggle("active");
});

gnbLinks.forEach((link) => {
  link.addEventListener("click", () => {
    trigger.classList.remove("active");
    gnb.classList.remove("active");
  });
});
