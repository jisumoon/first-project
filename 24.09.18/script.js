// 중첩 메뉴
const navItems = document.querySelectorAll(".nav-item");
navItems.forEach((item) => {
  item.addEventListener("mouseenter", () => {
    const subMenu = item.querySelector(".sub-menu");
    subMenu.style.display = "block";
  });

  item.addEventListener("mouseleave", () => {
    setTimeout(() => {
      const subMenu = item.querySelector(".sub-menu");
      subMenu.style.display = "none";
    }, 100);
  });
});

// 메인 슬라이드

const slider = document.querySelector(".slider");
const slides = document.querySelector(".slides");
const slide = document.querySelectorAll(".slide");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

// 첫 번째와 마지막 슬라이드 복제
const firstSlide = slide[0].cloneNode(true);
const lastSlide = slide[slide.length - 1].cloneNode(true);

// 슬라이드 복제본을 맨 앞과 맨 뒤에 추가
slides.appendChild(firstSlide);
slides.insertBefore(lastSlide, slides.firstChild);

let currentIdx = 1;
const slideCount = slide.length;
const slideWidth = slide[0].clientWidth;
slides.style.transform = `translateX(-${slideWidth}px)`;

// 슬라이드 이동 함수
function moveSlide(index) {
  slides.style.transition = "transform 0.5s ease-in-out";
  slides.style.transform = `translateX(-${slideWidth * index}px)`;
  currentIdx = index;
}

// 슬라이드 위치를 즉시 재조정하는 함수
function resetSlidePosition(index) {
  slides.style.transition = "none";
  slides.style.transform = `translateX(-${slideWidth * index}px)`;
  currentIdx = index;
  setTimeout(() => {
    slides.style.transition = "transform 0.5s ease-in-out";
  }, 50);
}

// 자동 슬라이드 기능
let autoSlide = setInterval(() => {
  moveSlide(currentIdx + 1);
  if (currentIdx >= slideCount + 1) {
    setTimeout(() => {
      resetSlidePosition(1);
    }, 500);
  }
}, 10000);

// 버튼 클릭 이벤트
nextBtn.addEventListener("click", () => {
  clearInterval(autoSlide);
  moveSlide(currentIdx + 1);
  if (currentIdx >= slideCount + 1) {
    setTimeout(() => {
      resetSlidePosition(1);
    }, 500);
  }
  autoSlide = setInterval(() => {
    moveSlide(currentIdx + 1);
    if (currentIdx >= slideCount + 1) {
      setTimeout(() => {
        resetSlidePosition(1);
      }, 500);
    }
  }, 10000);
});

prevBtn.addEventListener("click", () => {
  clearInterval(autoSlide);
  moveSlide(currentIdx - 1);
  if (currentIdx <= 0) {
    setTimeout(() => {
      resetSlidePosition(slideCount);
    }, 500);
  }
  autoSlide = setInterval(() => {
    moveSlide(currentIdx + 1);
    if (currentIdx >= slideCount + 1) {
      setTimeout(() => {
        resetSlidePosition(1);
      }, 500);
    }
  }, 10000);
});

// 데이터 - new item
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
 <article class="sec1-Btn" style="background: url('${
   selectedIcecream.bg
 }') center/cover no-repeat;">
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
    <article class="sec1-side">
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
let currentIndex = 0;
const changeImageAndBackground = () => {
  const imgElement = document.querySelector(".sec4-circle img");
  const backgroundElement = document.querySelector(".sec4-circle");
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
  const miniCircle = document.querySelector(".sec4-mini-circle");
  miniCircle.style.backgroundColor = miniBackgroundColors[currentMiniIndex];
  currentMiniIndex = (currentMiniIndex + 1) % miniBackgroundColors.length;
};

setInterval(changeMiniBackground, 2500);

// 배경화면

const background = document.querySelector(".background");
const colors = [
  "rgba(255, 183, 197, 0.7)",
  "rgba(255, 233, 197, 0.7)",
  "rgba(197, 233, 255, 0.7)",
];

for (let i = 0; i < 30; i++) {
  const dot = document.createElement("div");
  dot.classList.add("dot");

  const size = Math.random() * 30 + 10;
  dot.style.width = `${size}px`;
  dot.style.height = `${size}px`;

  const topMargin = 30;
  const leftMargin = 30;

  dot.style.top = `${
    Math.random() * (100 - (size / window.innerHeight) * 100) * 0.9 +
    (topMargin / window.innerHeight) * 100
  }vh`;

  dot.style.left = `${
    Math.random() * (100 - (size / window.innerWidth) * 100) * 0.9 +
    (leftMargin / window.innerWidth) * 100
  }vw`;

  const color = colors[Math.floor(Math.random() * colors.length)];
  dot.style.backgroundColor = color;

  const duration = Math.random() * 3 + 2;
  const delay = Math.random() * 2;
  dot.style.animationDuration = `${duration}s`;
  dot.style.animationDelay = `${delay}s`;

  background.appendChild(dot);
}

// 데이터 -best item

const fetchIceData = () => {
  fetch("./ice.json")
    .then((response) => response.json())
    .then((data) => {
      const containers = document.querySelectorAll(".sec3-side-con");

      let counter = 0;

      containers.forEach((container) => {
        for (let i = 0; i < 3; i++) {
          if (counter < data.icecreams.length) {
            const icecream = data.icecreams[counter];
            const iceDiv = document.createElement("div");
            iceDiv.classList.add("sec3-side");

            iceDiv.innerHTML = `
              <div class="sec3-ice">
                <img src="${icecream.image}" alt="${icecream.flavor}" />
              </div>
              <span class="sec3-desc">${icecream.flavor}</span>
            `;

            container.appendChild(iceDiv);
            counter++;
          }
        }
      });
    });
};

fetchIceData();

// modal 삭제
const modal1 = document.querySelector(".modal1");
const closeModal1Btn = document.querySelector(".modal1 .fa-xmark");

closeModal1Btn.addEventListener("click", () => {
  modal1.style.display = "none";
});

const modal2 = document.querySelector(".modal2");
const closeModal2Btn = document.querySelector(".modal2 .fa-xmark");

closeModal2Btn.addEventListener("click", () => {
  modal2.style.display = "none";
});

const toggleMobileMenu = () => {
  const mobileNav = document.querySelector(".mobile-nav .mobile-nav-container");
  mobileNav.classList.toggle("active");
};

const mobileMenuButton = document.querySelector(".mobile");
mobileMenuButton.addEventListener("click", toggleMobileMenu);
