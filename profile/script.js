const loadingScreen = document.querySelector("#loading-screen");
const content = document.getElementById("content");

// loading
setTimeout(() => {
  loadingScreen.classList.add("slide-out");
}, 7000);

loadingScreen.addEventListener("transitionend", () => {
  loadingScreen.style.display = "none";
});
