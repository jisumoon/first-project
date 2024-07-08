document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelectorAll(".slide");
    let currentIndex = 0; // 현재 보여지는 슬라이드 인덱스
    let isScrolling = false; // 스크롤 중 여부 확인 변수

    // 마우스 휠 이벤트 핸들러
    document.addEventListener("wheel", function (event) {
        event.preventDefault(); // 기본 스크롤 이벤트 막기

        if (!isScrolling) {
            isScrolling = true;

            let delta = event.deltaY || event.deltaX;

            // 양수인 경우 다음 슬라이드로 이동
            if (delta > 0) {
                currentIndex++;
                if (currentIndex >= slides.length) {
                    currentIndex = 0; // 처음 슬라이드로 돌아감
                }
            }
            // 음수인 경우 이전 슬라이드로 이동
            else if (delta < 0) {
                currentIndex--;
                if (currentIndex < 0) {
                    currentIndex = slides.length - 1;
                }
            }

            // 현재 인덱스에 해당하는 슬라이드로 이동
            slides[currentIndex].scrollIntoView({
                behavior: "smooth", // 부드러운 스크롤 적용
                block: "nearest", // 가장 가까운 부분에 맞추기
                inline: "start", // 시작 부분에 맞추기 (가로로 스크롤)
            });

            // 스크롤 완료 후 0.5초 후에 스크롤 중 여부 변수를 false로 설정하여 다시 스크롤 가능하게 함
            setTimeout(function () {
                isScrolling = false;
            }, 1000); // 1초(
        }
    });
});
