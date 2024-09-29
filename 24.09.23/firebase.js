// Firebase 구성 정보
const firebaseConfig = {
  apiKey: "AIzaSyAozdOr_ckfNhT07WFwkzYYNN_ZVmiDP0s",
  authDomain: "login-0928.firebaseapp.com",
  projectId: "login-0928",
  storageBucket: "login-0928.appspot.com",
  messagingSenderId: "592294937563",
  appId: "1:592294937563:web:51cedcac86675dc8261dfe",
};

// Firebase 초기화
firebase.initializeApp(firebaseConfig);

// Firebase 인증 객체 가져오기
const googleProvider = new firebase.auth.GoogleAuthProvider();
const githubProvider = new firebase.auth.GithubAuthProvider();
const auth = firebase.auth();

// Google
const googleLogin = () => {
  auth
    .signInWithPopup(googleProvider)
    .then(() => {
      alert("You have successfully logged in.");

      document.querySelector(".right-main").classList.remove("hide");
      document.querySelector(".right-side").classList.remove("active");
    })
    .catch(() => {
      alert("There was an error during login. Please try again.");
    });
};

// Github
const githubLogin = () => {
  auth
    .signInWithPopup(githubProvider)
    .then(() => {
      alert("You have successfully logged in.");

      document.querySelector(".right-main").classList.remove("hide");
      document.querySelector(".right-side").classList.remove("active");
    })
    .catch(() => {
      alert("There was an error during login. Please try again.");
    });
};

const googleBtn = document.querySelector(".google");
const gitBtn = document.querySelector(".git");

if (googleBtn) {
  googleBtn.addEventListener("click", googleLogin);
}

if (gitBtn) {
  gitBtn.addEventListener("click", githubLogin);
}
