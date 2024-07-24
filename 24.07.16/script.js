//1. 오류메세지
//2. 인증번호
//3. 인증시간 및 완료

//2. 휴대폰번호 & 인증

const tokenButton = document.querySelector("#token_button");
const tokenNumber = document.querySelector("#token");
const tokenTimer = document.querySelector("#token_timer");
const tokenConfirmButton = document.querySelector("#token_timer_confirmBtn");
const signupButton = document.querySelector("#signup_button");

const changePhone1 = () => {
  const phone1 = document.querySelector("#phone1").value;
  if (phone1.length === 3) {
    document.querySelector("#phone2").focus();
  }
};

const changePhone2 = () => {
  const phone2 = document.querySelector("#phone2").value;
  if (phone2.length === 4) {
    document.querySelector("#phone3").focus();
  }
};

const changePhone3 = () => {
  const phone1 = document.querySelector("#phone1").value;
  const phone2 = document.querySelector("#phone2").value;
  const phone3 = document.querySelector("#phone3").value;

  if (phone1.length === 3 && phone2.length === 4 && phone3.length === 4) {
    tokenButton.style =
      "background-color: #fff; color: #0068ff; cursor: pointer";
    tokenButton.removeAttribute("disabled");
  }
};

let interval;

const getTokenTimer = () => {
  let timer = 180;
  interval = setInterval(() => {
    if (timer >= 0) {
      const minutes = Math.floor(timer / 60);
      const seconds = timer % 60;
      tokenTimer.innerText = minutes + ":" + String(seconds).padStart(2, "0");
      timer -= 1;
    } else {
      tokenNumber.innerText = "000000";
      tokenButton.style = "";
      tokenButton.setAttribute("disabled", "true");

      tokenTimer.innerText = "3:00";
      tokenConfirmButton.style = "";
      tokenConfirmButton.setAttribute("disabled", "true");

      clearInterval(interval);
    }
  }, 1000);
};

tokenButton.addEventListener("click", (e) => {
  e.preventDefault();
  const token = String(Math.floor(Math.random() * 1000000)).padStart(6, "0");
  tokenNumber.innerText = token;

  tokenConfirmButton.style =
    "background-color: #0068ff; color: #fff; cursor: pointer";
  tokenConfirmButton.removeAttribute("disabled", "true");
  getTokenTimer();
});

tokenConfirmButton.addEventListener("click", function (e) {
  e.preventDefault();
  clearInterval(interval);
  this.style = "background-color: #fff";
  this.setAttribute("disabled", "true");
  this.innerText = "인증완료";
  alert("인증이 완료되었습니다 :D");

  signupButton.style =
    "background-color: #fff; color: #0068ff; border: 1px solid #0068ff; cursor: pointer";
  signupButton.removeAttribute("disabled");
});

//1. 오류메세지

signupButton.addEventListener("click", (e) => {
  e.preventDefault();
  const id = document.querySelector("#id").value;
  const password1 = document.querySelector("#password1").value;
  const password2 = document.querySelector("#password2").value;
  const name = document.querySelector("#name").value;
  const date = document.querySelector("#date").value;
  const checkbox1 = document.querySelector("#checkbox1").checked;
  const checkbox2 = document.querySelector("#checkbox2").checked;
  const checkbox3 = document.querySelector("#checkbox3").checked;
  const checkbox4 = document.querySelector("#checkbox4").checked;
  const phonehome = document.querySelector("#phone_home");

  let isVaild = true;

  if (id === "") {
    document.querySelector("#error_id").innerText = "아이디를 입력해주세요!";
    isValid = false;
  } else {
    document.querySelector("#error_id").innerText = "";
  }

  if (password1 === "") {
    document.querySelector("#error_password1").innerText =
      "비밀번호를 입력해주세요!";
    isValid = false;
  } else {
    document.querySelector("#error_password1").innerText = "";
  }

  if (password2 === "") {
    document.querySelector("#error_password2").innerText =
      "비밀번호를 입력해주세요!";
    isValid = false;
  } else {
    document.querySelector("#error_password2").innerText = "";
  }

  if (password1 !== password2) {
    document.querySelector("#error_password1").innerText =
      "비밀번호가 일치하지 않습니다.";
    document.querySelector("#error_password2").innerText =
      "비밀번호가 일치하지 않습니다.";
    isValid = false;
  }

  if (name === "") {
    document.querySelector("#error_name").innerText = "이름을 입력해주세요!";
    isValid = false;
  } else {
    document.querySelector("#error_name").innerText = "";
  }

  if (date === "") {
    document.querySelector("#error_birth").innerText =
      "생년월일을 입력해주세요!";
    isValid = false;
  } else {
    document.querySelector("#error_birth").innerText = "";
  }

  if (checkbox1 === false && checkbox2 === false) {
    document.querySelector("#error_checkbox").innerText =
      "성별을 선택해주세요.";
    isValid = false;
  } else {
    document.querySelector("#error_checkbox").innerText = "";
  }

  if (checkbox3 === false && checkbox4 === false) {
    document.querySelector("#error_checkbox").innerText =
      "신분을 선택해주세요.";
    isValid = false;
  } else {
    document.querySelector("#error_checkbox").innerText = "";
  }

  if (
    phonehome !== "SKT" &&
    phonehome !== "KT" &&
    phonehome !== "LG U+" &&
    phonehome !== "알뜰폰 SKT" &&
    phonehome !== "알뜰폰 KT" &&
    phonehome !== "알뜰폰 LG U+"
  ) {
    document.querySelector("#error_phone_home").innerText =
      "통신사를 선택해주세요";
    isValid = false;
  } else {
    document.querySelector("#error_phone_home").innerText = "";
  }

  if (isValid === true) {
    alert("회원가입을 축하합니다.");
  }
});
