//login

//

//sign up

const signBtn = document.querySelector(".left-main-btn");
const page = document.querySelector(".right-side");

signBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const signLeft = document.querySelector(".left-main");
  const right = document.querySelector(".right-main");
  const login = document.querySelector(".right-side-login");
  console.log(login);
  signLeft.classList.add("hide");
  page.classList.add("active");
  right.classList.add("active");
  login.classList.add("hide-login");

  const signNameEmail = document.querySelector(".right-contain");
  signNameEmail.innerHTML = `<div class="right-side-signUP">
  <p class="right-side-title-signUP">SIGN UP</p>
  <p class="right-side-intro-signUP">
    Sign up easily using your preferred<br />
    social media or email account.
  </p>
  <div class="right-side-simple-sginUp">
    <div class="simple-icon"><i class="fa-brands fa-github"></i></div>
    <div class="simple-icon">
      <i class="fa-brands fa-google"></i>
    </div>
    <div class="simple-icon">
      <i class="fa-brands fa-facebook-f"></i>
    </div>
  </div>
  <form
    class="right-side-form-signUp"
    action="http://127.0.0.1:14184/"
    method="post"
  >
    <div class="userName-box">
      <div class="box">
        <label for="signUp-userName">Name</label>
        <input
          type="text"
          name="signUp-userName"
          id="signUp-userName"
          placeholder="Name"
        />
      </div>
      <p class="userName-error">
        Please enter the username in English.
      </p>
    </div>
    <div class="userEmail-box">
      <div class="box">
        <label for="signUp-userEmail">Email</label>
        <input
          type="text"
          name="signUp-userEmail"
          id="signUp-userEmail"
          placeholder="Email"
        />
      </div>
      <p class="userName-error">Please enter a valid email format.</p>
    </div>
    <input type="submit" id="next" class="login-btn" value="Next" />
  </form>
</div> `;

  signNameEmail.classList.add("hide-signE");
});

const nextBtn = document.querySelector("#next");
