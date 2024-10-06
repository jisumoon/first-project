let books = [];
let booksItem = [];
let currentSlide = 0;
let totalSlides = 0;
let autoSlideInterval;

// JSON 파일 가져오기
fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    books = data;
    renderBooks(books); // 책 목록 렌더링 함수 호출
  })
  .catch((error) => {
    console.error("Error fetching the JSON data:", error);
  });

// 메인 책 목록 보여주기
const renderBooks = (books) => {
  const bookBox = document.querySelector(".book-box");

  bookBox.innerHTML = ""; // 초기화

  books.forEach((book) => {
    const bookHTML = `
      <div class="book" data-id="${book.id}">
        <div class="book-img">
          <img src="${book.bookimg}" alt="${book.title}" />
        </div>
        <div class="book-info">
          <p>${book.title}</p>
          <p>${book.author}</p>
          <div class="star-score">
            <i class="fa-solid fa-star"></i>
            <p>${book.score}</p>
          </div>
          <p>${book.desc}</p>
          <span>담기</span>
        </div>
      </div>
    `;
    bookBox.innerHTML += bookHTML;
  });

  // 각 book-item에 클릭 이벤트 추가
  const bookItems = document.querySelectorAll(".book");
  bookItems.forEach((item) => {
    item.removeEventListener("click", changeImage); // 중복 제거
    item.addEventListener("click", (event) => {
      const bookId = event.currentTarget.getAttribute("data-id");
      changeImage(bookId); // 클릭 시 이미지 변경 함수 호출
    });
  });
};

// 클릭 시 배경화면 변경
const changeImage = (bookId) => {
  const selectedBook = books.find((book) => book.id == bookId);
  const mainImage = document.getElementById("mainImage");

  if (selectedBook) {
    mainImage.src = selectedBook.backgroundimg;
  }
};

// JSON 데이터 가져오기
fetch("book.json")
  .then((response) => response.json())
  .then((data) => {
    booksItem = data;
    renderBooksItem(booksItem);
    renderBooksList(booksItem);

    document.querySelector(".sort-date").addEventListener("click", () => {
      sortByDate();
    });

    document.querySelector(".sort-price").addEventListener("click", () => {
      sortByPrice();
    });

    document.querySelector(".sort-sales").addEventListener("click", () => {
      sortBySales();
    });
  })
  .catch((error) => {
    console.error("Error fetching the JSON data:", error);
  });

// 슬라이드 book 렌더링
const renderBooksItem = (booksItem) => {
  const slider = document.querySelector(".sec2-slider");
  slider.innerHTML = ""; // 슬라이드 초기화

  for (let i = 0; i < booksItem.length; i += 4) {
    const bookGroup = booksItem.slice(i, i + 4);
    let bookGroupHTML = `<div class="sec2-slide">`;

    bookGroup.forEach((book) => {
      bookGroupHTML += `
        <div class="book">
          <div class="bookimg">
            <img src="${book.img}" alt="${book.name}" />
          </div>
          <div class="bookinfo">
            <p class="book-title">${book.name}</p>
            <p class="author-name">${book.author}</p>
            <p class="book-price">₩${book.price.toLocaleString()}</p>
          </div>
        </div>
      `;
    });

    bookGroupHTML += `</div>`;
    slider.innerHTML += bookGroupHTML;
  }

  totalSlides = Math.ceil(booksItem.length / 4); // 총 슬라이드 수 계산
  updateSliderPosition(); // 초기 슬라이드 위치 설정
};

// 슬라이드 업데이트
const updateSliderPosition = () => {
  const slider = document.querySelector(".sec2-slider");
  const slideWidth = document.querySelector(".sec-slide-container").clientWidth;
  slider.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
};

// 좌우 슬라이드 버튼
document.querySelector(".left").addEventListener("click", () => {
  if (currentSlide > 0) {
    currentSlide--;
    updateSliderPosition();
  }
});

document.querySelector(".right").addEventListener("click", () => {
  if (currentSlide < totalSlides - 1) {
    currentSlide++;
    updateSliderPosition();
  }
});

// 구매 book 리스트 렌더링
const renderBooksList = (booksItem) => {
  const bookListBox = document.querySelector(".booklists");
  bookListBox.innerHTML = "";

  for (let i = 0; i < booksItem.length; i += 4) {
    const bookGroup = booksItem.slice(i, i + 4); // 4개의 book을 가져옴
    let bookListHTML = `<div class="booklist">`;

    bookGroup.forEach((book) => {
      bookListHTML += `
        <div class="book-item">
          <div class="book-image">
            <img src="${book.img}" alt="${book.name}" />
          </div>
          <div class="cart">
          <i class="fa-solid fa-cart-shopping"></i>
          </div>
          <div class="book-details">
            <p class="book-title">${book.name}</p>
            <p class="book-author">${book.author}</p>
            <p class="book-price">₩${book.price.toLocaleString()}</p>
          </div>
        </div>
      `;
    });

    bookListHTML += `</div>`;
    bookListBox.innerHTML += bookListHTML;
  }
};

// 최신등록순 정렬 함수
const sortByDate = () => {
  booksItem.sort((a, b) => new Date(b.date) - new Date(a.date));
  renderBooksList(booksItem); // 정렬 후 다시 렌더링
};

// 높은가격순 정렬 함수
const sortByPrice = () => {
  booksItem.sort((a, b) => b.price - a.price);
  renderBooksList(booksItem); // 정렬 후 다시 렌더링
};

// 판매량순 정렬 함수
const sortBySales = () => {
  booksItem.sort((a, b) => b.sales - a.sales);
  renderBooksList(booksItem); // 정렬 후 다시 렌더링
};
