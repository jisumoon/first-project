const signBtn = document.querySelector(".left-main-btn");
const page = document.querySelector(".right-side");
console.log(page);

signBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const signLeft = document.querySelector(".left-main");
  const right = document.querySelector(".right-main");
  signLeft.style = "opacity:0";
  page.classList.add("active");
  right.classList.add("active");
});
