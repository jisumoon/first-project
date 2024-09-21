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
  }, 1500);
}

// 2. 슬라이드를 다음으로 전환
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

// 4. 슬라이드를 이전으로 전환
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

// 5. 슬라이드 위치를 업데이트
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

// json data
const fetchIcecreamData = () => {
  fetch("./data.json")
    .then((response) => response.json())
    .then((data) => {
      window.icecreamData = data.data;
      changeIcecream(1);
    });
};

const changeIcecream = (id) => {
  const selectedIcecream = window.icecreamData.find(
    (icecream) => icecream.id === id
  );

  const container = document.querySelector(".sec1-container");

  // html
  container.innerHTML = `
    <article class="sec1-Btn"  >
          <p class="sec1-title">New, ITEM</p>
          <div class="ice-set">
            <div class="ice-1">
              <img src="./img/icecream/icecream1.png" alt="icecream1" onclick="changeIcecream(1)" />
            </div>
            <div class="ice-2">
              <img src="./img/icecream/icecream2.png" alt="icecream2" onclick="changeIcecream(2)" />
            </div>
            <div class="ice-3">
              <img src="./img/icecream/icecream3.png" alt="icecream3"  onclick="changeIcecream(3)"/>
            </div>
          </div>
        </article>
    <figure class="main-icecream">
      <img class="main-icecream-img" src="${selectedIcecream.image}" alt="${
    selectedIcecream.title
  }" />
    </figure>
    <article class="sec1-side" >
      <div class="sec1-side-contain">
        <p class="sec1-side-title">${selectedIcecream.title}</p>
        <p class="sec1-side-desc">${selectedIcecream.description}</p>
      </div>
      <hr />
      <div class="sec1-side-ing-contain">
        <div class="ice-ing">
          ${selectedIcecream.ingredients
            .map(
              (ingredient) => `
            <div class="ice-ing-main">
                 <div class="ice-ing-1">
              <img src="${ingredient.image}" alt="${ingredient.name}" />
              </div>
              <span class="ice-ing-desc">${ingredient.name}</span>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
    </article>
  `;
};

window.changeIcecream = (id) => changeIcecream(id);

fetchIcecreamData();

// 날짜 및 금액

const animateValue = (selector, start, end, duration) => {
  let startTimestamp = null;
  const element = document.querySelector(selector);

  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const currentValue = Math.floor(progress * (end - start) + start);

    element.innerText = currentValue.toLocaleString() + " ₩";

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  };

  requestAnimationFrame(step);
};

animateValue(".donation-amount", 0, 2221986, 100000);

const updateDonationDate = () => {
  const dateElement = document.querySelector("#donation-date");
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  const formattedDate = `${year}년 ${month}월 ${day}일 기준`;
  dateElement.innerText = formattedDate;
};

updateDonationDate();

//이미지

const images = [
  "./img/intro/intro1.png",
  "./img/intro/intro2.png",
  "./img/intro/intro3.png",
];

const backgroundColors = ["#ffb38e", "#FFF3C7", "#FFB0B0"];

const changeImageAndBackground = () => {
  const imgElement = document.querySelector(".sec3-circle img");
  const backgroundElement = document.querySelector(".sec3-circle");
  currentIndex = (currentIndex + 1) % images.length;
  imgElement.src = images[currentIndex];
  backgroundElement.style.backgroundColor = backgroundColors[currentIndex];
};

setInterval(changeImageAndBackground, 2000);

// mini 공
const miniBackgroundColors = [
  "#EF9595",
  "#EFB495",
  "#EFD595",
  "#EBEF95",
  "FFE5E5",
];

let currentMiniIndex = 0;

const changeMiniBackground = () => {
  const miniCircle = document.querySelector(".sec3-mini-circle");
  miniCircle.style.backgroundColor = miniBackgroundColors[currentMiniIndex];
  currentMiniIndex = (currentMiniIndex + 1) % miniBackgroundColors.length;
};

setInterval(changeMiniBackground, 2500);
