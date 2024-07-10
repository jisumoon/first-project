//1. card를 눌렀을 때, 모달창이 나온다
//2. 모달창의 닫기 버튼을 누루면 모달창이 꺼진다.
//3. 각 카드별로 다른 모달창이 나온다.

document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll(".card");
    const modals = document.querySelectorAll(".modal_content");
    const modalBox = document.getElementById("modal_box");

    cards.forEach((card) => {
        card.addEventListener("click", () => {
            const cardNumber = card.getAttribute("data-card");
            modals.forEach((modal) => {
                if (modal.getAttribute("data-modal") === cardNumber) {
                    modal.style.display = "block";
                    modalBox.style.display = "flex";
                } else {
                    modal.style.display = "none";
                }
            });
        });
    });

    modalBox.addEventListener("click", (event) => {
        if (event.target === modalBox) {
            modalBox.style.display = "none";
            modals.forEach((modal) => (modal.style.display = "none"));
        }
    });

    modals.forEach((modal) => {
        const closeButton = modal.querySelector(".close");
        closeButton.addEventListener("click", (event) => {
            event.stopPropagation(); // 이벤트 버블링 막기
            modalBox.style.display = "none";
            modals.forEach((m) => (m.style.display = "none"));
        });
    });
});
