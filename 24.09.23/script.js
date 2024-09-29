// appVerifier를 전역 변수로 선언
let appVerifier;

const container = document.querySelector(".container");
const pageBox = document.querySelector(".right-side"); // 폼양식 페이지
const pageContain = document.querySelector(".right-contain"); // innerHTML 작성란
const signInfo = document.querySelector(".left-main"); // 회원가입 안내
const loginInfo = document.querySelector(".right-main"); // 로그인 안내

// 회원가입 버튼 클릭 시
container.addEventListener("click", (e) => {
  if (e.target.classList.contains("left-main-btn")) {
    e.preventDefault();

    pageBox.classList.remove("hide");
    pageBox.classList.add("active");

    signInfo.classList.add("hide");
    loginInfo.classList.add("active");

    // 회원가입 폼 생성
    pageContain.innerHTML = `
      <div class="right-side-signUp">
        <p class="right-side-title-signUp">SIGN UP</p>
        <p class="right-side-intro-signUp">
          Sign up easily using your preferred<br />
          social media or email account.
        </p>
        <form class="right-side-form-signUp">
          <div class="userName-box">
            <div class="box">
              <label for="signUp-userName">Name</label>
              <input type="text" id="signUp-userName" placeholder="Name" />
            </div>
            <p class="userName-error">Please enter the username in English.</p>
          </div>
          <div class="userEmail-box">
            <div class="box">
              <label for="signUp-userEmail">Email</label>
              <input type="text" id="signUp-userEmail" placeholder="Email" />
            </div>
            <p class="userEmail-error">Please enter a valid email format.</p>
          </div>
          <input type="submit" id="next" class="login-btn" value="Next" />
        </form>
      </div>`;

    const userNameInput = document.querySelector("#signUp-userName");
    const userEmailInput = document.querySelector("#signUp-userEmail");
    const nextBtn = document.querySelector("#next");
    const nameError = document.querySelector(".userName-error");
    const emailError = document.querySelector(".userEmail-error");

    // 유효성 검사 함수
    const validateInputs = () => {
      const userName = userNameInput.value;
      const userEmail = userEmailInput.value;
      let valid = true;

      // 이름 유효성 검사: 영어 알파벳만 허용
      if (!/^[a-zA-Z\s]+$/.test(userName)) {
        nameError.classList.add("active");
        valid = false;
      } else {
        nameError.classList.remove("active");
      }

      // 이메일 유효성 검사: 이메일 형식 확인
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userEmail)) {
        emailError.classList.add("active");
        valid = false;
      } else {
        emailError.classList.remove("active");
      }

      nextBtn.disabled = !valid; // 유효할 때만 버튼 활성화
      return valid;
    };

    userNameInput.addEventListener("input", validateInputs);
    userEmailInput.addEventListener("input", validateInputs);

    nextBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (validateInputs()) {
        showPasswordForm(); // 유효성 검사 통과 시 비밀번호 폼 표시
      }
    });

    const showPasswordForm = () => {
      pageContain.innerHTML = `
        <div class="right-side-signUP_pW">
          <p class="right-side-title-signUP">SIGN UP</p>
          <p class="right-side-intro-signUP_pW">
            Sign up now and experience a variety of <br />personalized services!
          </p>
          <form class="right-side-form-signUp_pW">
            <div class="userPw-box">
              <div class="box">
                <label for="signUp-userPw">Password</label>
                <input type="password" id="signUp-userPw" placeholder="Password" />
              </div>
              <p class="userPw-error">
                Password must be 8+ characters with numbers, uppercase, lowercase, and special characters.
              </p>
            </div>
            <div class="userCPw-box">
              <div class="box">
                <label for="signUp-userCPw">Confirm Password</label>
                <input type="password" id="signUp-userCPw" placeholder="Confirm Password" />
              </div>
              <p class="userCPw-error">Passwords do not match. Please check again.</p>
            </div>
            <div class="user-phone-box">
              <div class="box">
                <label for="signUp-userPhoneNum">Phone Number</label>
                <div class="signUp-userphn">
                  <input type="text" id="signUp-userPhoneNum" placeholder="Phone Number" />
                  <input type="button" id="code" value="Code" />
                </div>
                <p class="userphone-error">Please enter a valid phone number.</p>
                <div id="recaptcha-container"></div>

                <label for="UserCode">User Code</label>
                <input type="text" id="UserCode" placeholder="User Code" />
              </div>
            </div>
            <input type="submit" id="next-signup" class="next-signup" value="Sign up" />
          </form>
        </div>`;

      const passwordInput = document.querySelector("#signUp-userPw");
      const confirmPasswordInput = document.querySelector("#signUp-userCPw");
      const phoneNumberInput = document.querySelector("#signUp-userPhoneNum");
      const codeBtn = document.querySelector("#code");
      const userCodeInput = document.querySelector("#UserCode");
      const passwordError = document.querySelector(".userPw-error");
      const confirmPasswordError = document.querySelector(".userCPw-error");

      // 비밀번호 유효성 검사 및 확인 비밀번호 일치 여부 확인
      const validatePasswords = () => {
        const password = passwordInput ? passwordInput.value : "";
        const confirmPassword = confirmPasswordInput
          ? confirmPasswordInput.value
          : "";
        let valid = true;

        // 비밀번호 유효성 검사
        if (
          password.length < 8 ||
          !/[A-Z]/.test(password) ||
          !/[a-z]/.test(password) ||
          !/[0-9]/.test(password) ||
          !/[\W]/.test(password)
        ) {
          passwordError.classList.add("active");
          valid = false;
        } else {
          passwordError.classList.remove("active");
        }

        // 비밀번호 일치 여부 검사
        if (password !== confirmPassword) {
          confirmPasswordError.classList.add("active");
          valid = false;
        } else {
          confirmPasswordError.classList.remove("active");
        }

        return valid;
      };

      passwordInput.addEventListener("input", validatePasswords);
      confirmPasswordInput.addEventListener("input", validatePasswords);

      // Firebase로 휴대폰 인증 코드 전송
      if (!appVerifier) {
        appVerifier = new firebase.auth.RecaptchaVerifier(
          "recaptcha-container",
          {
            size: "invisible",
          }
        );
      }

      codeBtn.addEventListener("click", () => {
        const phoneNumber = phoneNumberInput.value.trim();

        // 전화번호 형식 확인 (E.164 형식 사용)
        if (!/^\+[1-9]\d{1,14}$/.test(phoneNumber)) {
          alert(
            "Please enter a valid phone number in E.164 format (e.g., +11234567890)."
          );
          return;
        }

        firebase
          .auth()
          .signInWithPhoneNumber(phoneNumber, appVerifier)
          .then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
            alert("Verification code sent to your phone");
          })
          .catch(() => {
            alert("Failed to send verification code. Try again.");
          });
      });

      // 인증 코드로 확인 후 회원 가입
      const signupBtn = document.querySelector("#next-signup");
      signupBtn.addEventListener("click", async (e) => {
        e.preventDefault();

        // 인증 코드 입력
        const verificationCode = userCodeInput.value.trim();

        if (!verificationCode) {
          alert("Please enter the verification code.");
          return;
        }
        if (!window.confirmationResult) {
          alert("Please request the verification code first.");
          return;
        }

        // 인증 코드 확인
        window.confirmationResult
          .confirm(verificationCode)
          .then(async (result) => {
            const user = result.user;
            alert("Phone number verified successfully!");

            // Firestore에 사용자 정보 저장
            const userCredential = await firebase
              .auth()
              .createUserWithEmailAndPassword(
                userEmailInput.value,
                passwordInput.value
              );
            const newUser = userCredential.user;

            await db.collection("users").doc(newUser.uid).set({
              uid: newUser.uid,
              name: userNameInput.value,
              email: userEmailInput.value,
            });

            alert("Sign-up completed successfully!");
          })
          .catch(() => {
            alert("Invalid verification code. Please try again.");
          });
      });
    };
  }
});

// 로그인 버튼 클릭 시 로직
container.addEventListener("click", (e) => {
  if (e.target.classList.contains("right-main-btn")) {
    e.preventDefault();

    pageBox.classList.remove("active");
    pageBox.classList.add("hide");

    signInfo.classList.remove("hide");
    loginInfo.classList.remove("active");

    // 로그인 폼 생성
    pageContain.innerHTML = `
      <div class="right-side-login">
        <p class="right-side-title">LOG IN</p>
        <p class="right-side-intro">Log in easily using your preferred<br />social media or email account.</p>
        <form class="right-side-form" id="loginForm">
          <div class="email-box">
            <div class="box">
              <label for="email">Email</label>
              <input type="text" id="email" placeholder="Email" />
            </div>
            <p class="email-error">Please enter a valid email format.</p>
          </div>
          <div class="password-box">
            <div class="box">
              <label for="password">Password</label>
              <input type="password" id="password" placeholder="Password" />
            </div>
            <p class="password-error">Please check your password again.</p>
          </div>
          <input type="submit" class="login-btn" value="Login" />
        </form>
      </div>`;

    // 로그인 유효성 검사 및 Firebase 로그인 처리
    const loginForm = document.querySelector("#loginForm");
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const emailInput = document.querySelector("#email").value;
      const passwordInput = document.querySelector("#password").value;
      const emailError = document.querySelector(".email-error");
      const passwordError = document.querySelector(".password-error");

      let valid = true;

      // 이메일 유효성 검사
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInput)) {
        emailError.classList.add("active");
        valid = false;
      } else {
        emailError.classList.remove("active");
      }

      // 비밀번호 길이 검사
      if (passwordInput.length < 6) {
        passwordError.classList.add("active");
        valid = false;
      } else {
        passwordError.classList.remove("active");
      }

      // 유효성 검사 통과 시 Firebase 로그인 시도
      if (valid) {
        try {
          const userCredential = await firebase
            .auth()
            .signInWithEmailAndPassword(emailInput, passwordInput);
          const user = userCredential.user;
          alert("Login successful!");
        } catch {
          alert("Login failed. Please check your credentials.");
        }
      }
    });
  }
});
