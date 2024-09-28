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
    .then((result) => {
      const user = result.user;
      console.log("Google 로그인 성공:", user);
    })
    .catch((error) => {
      console.error("Google 로그인 오류:", error);
    });
};

const googleBtn = document.querySelector(".google");
googleBtn.addEventListener("click", googleLogin);

//git
const githubLogin = () => {
  firebase
    .auth()
    .signInWithPopup(githubProvider)
    .then((result) => {
      const user = result.user;
      console.log("GitHub 로그인 성공:", user);
    })
    .catch((error) => {
      console.error("GitHub 로그인 오류:", error);
    });
};

const gitBtn = document.querySelector(".git");
gitBtn.addEventListener("click", githubLogin);
