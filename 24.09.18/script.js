const slides = document.querySelector(".slides");
const slide = document.querySelectorAll(".slide");
let currentIndex = 0;
let slideInterval;
let isTransitioning = false;

// 슬라이드를 복제
const firstSlideClone = slide[0].cloneNode(true);
slides.appendChild(firstSlideClone);

// 1. 슬라이드를 자동으로 전환
function startSlide() {
  slideInterval = setInterval(() => {
    moveToNextSlide();
  }, 15000);
}

// 2. 슬라이드를 다음으로 전환하는 함수
function moveToNextSlide() {
  if (isTransitioning) return;
  isTransitioning = true;

  currentIndex++;
  updateSlidePosition();

  // 3. 마지막 슬라이드에 도달하면 첫 번째 슬라이드로 빠르게 이동
  if (currentIndex === slide.length) {
    setTimeout(() => {
      slides.style.transition = "none";
      currentIndex = 0;
      updateSlidePosition();
      setTimeout(() => {
        slides.style.transition = "transform 0.5s ease-in-out";
        isTransitioning = false;
      }, 50);
    }, 500);
  } else {
    setTimeout(() => {
      isTransitioning = false;
    }, 500);
  }
}

// 4. 슬라이드를 이전으로 전환하는 함수
function moveToPrevSlide() {
  if (isTransitioning) return;
  isTransitioning = true;

  if (currentIndex === 0) {
    currentIndex = slide.length;
    slides.style.transition = "none";
    updateSlidePosition();
    setTimeout(() => {
      slides.style.transition = "transform 0.5s ease-in-out";
      currentIndex--;
      updateSlidePosition();
      isTransitioning = false;
    }, 50);
  } else {
    currentIndex--;
    updateSlidePosition();
    setTimeout(() => {
      isTransitioning = false;
    }, 500);
  }
}

// 5. 슬라이드 위치를 업데이트하는 함수
function updateSlidePosition() {
  slides.style.transform = `translateX(-${currentIndex * 100}%)`;
}

// 6. 마우스 오버 시 슬라이드 멈추고 커서 변경
document.querySelector(".slider").addEventListener("mouseover", () => {
  clearInterval(slideInterval);
  document.querySelectorAll(".slide").forEach((s) => {
    s.style.cursor = "pointer";
  });
});

// 7. 마우스 오버 해제 시 슬라이드 다시 시작
document.querySelector(".slider").addEventListener("mouseout", startSlide);

// 8. 화살표 클릭 시 슬라이드 수동 전환 (이전 슬라이드)
document.querySelector(".prev").addEventListener("click", moveToPrevSlide);

// 9. 화살표 클릭 시 슬라이드 수동 전환 (다음 슬라이드)
document.querySelector(".next").addEventListener("click", moveToNextSlide);

// 10. 슬라이드 자동 시작
startSlide();
