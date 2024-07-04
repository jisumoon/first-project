// 1. 컴퓨터에 top_navigation 인식

// 2. 상단 right_gnb에 마우스를 오버하면 이벤트 발생
// 2-1. 마우스를 오버하는 active 실행 -> text가 색이변하고, 두꺼워짐
// 2-2. 하단에 lnb가 opactity value가 1이되어야한다.
// 2-3. mouse out, mouse leave 기능 사용하며, 마우스가 옆에 있는 li태그로 이동을하면 기존에 이벤트는 제거
// 신규이벤트가 이전에 설정했던 기능을 그대로 구현!!!

const gnbLi = document.querySelectorAll(".gnb >li");
gnbLi.forEach((li) => {
  li.addEventListener("mouseover", () => {
    const lnb = li.querySelector(".lnb");
    const aTag = li.querySelector("a");
    if (lnb) {
      lnb.style.maxHeight = lnb.scrollHeight + "px";
      lnb.style.opacity = "1";
      aTag.classList.add("active");
    }
  });
  li.addEventListener("mouseout", () => {
    const lnb = li.querySelector(".lnb");
    const aTag = li.querySelector("a");
    if (lnb) {
      lnb.style.maxHeight = "0";
      lnb.style.opacity = "0";
      aTag.classList.remove("active");
    }
  });
});

//1. slide_card의 각 요소에 마우스를 오버하면, 각 card들이 왼쪽으로 이동한다.

//1.1. 웹 브라우저가 slide_card에 어떤 요소들이 있는지 알려줘야한다.

// 1_1_1.웹 브라우저는 DOM 객체 모델을 갖고 있으니까 해당 DOM에서 card_item들의 Node를 찾아와야 겠다

// 1_1_1_1.DOM에서 원하는 Node를 찾아오려면 querySelector() 혹은 getElementById()등의 함수를 사용할 수 있다

// 1_2.card_item이 1개 아니라, 총 3개이며, 이 3개 모두 동일한 패턴 및 형식의 동적인 이벤트 기능을 가져야 한다

// 2.만약 마우스가 A item 위에 있다가, B item로 이동을 하게 된다면, A item은 다시 원래의 위치로 돌아오게 하고 싶고, B item은 왼쪽으로 이동한다.

const items = document.querySelectorAll(".slide_card li");

items.forEach((item) => {
  item.addEventListener("mouseover", () => {
    item.style.transform = "translateX(-4px)";
    item.style.transition = "all 0.1s";
  });
  item.addEventListener("mouseout", () => {
    item.style.transform = "translateX(0)";
  });
});

// 이미지 변화
const bgImgs = ["Frame1.jpg", "Frame2.jpg", "Frame3.jpg"];

const bgImg = document.querySelector("#background_img");
console.log(bgImg);

const topContents = document.querySelector("#top_contents");
const contentTit = topContents.querySelector(".top_contents_title");
const contentDesc = topContents.querySelector(".top_contents_desc");

fetch("./data.json")
  .then((response) => response.json())
  .then((jsonData) => {
    const [firstData, ...otherData] = jsonData.data;
    bgImg.style.backgroundImage = `url(./img/${bgImgs[0]})`;
    contentTit.innerText = firstData.title;
    contentDesc.innerText = firstData.description;

    items.forEach((item, index) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        console.log("click");
        const { title, description } = jsonData.data[index];
        bgImg.style.backgroundImage = `url(./img/${bgImgs[index]})`;
        contentTit.innerText = title;
        contentDesc.innerText = description;
      });
    });
  });
