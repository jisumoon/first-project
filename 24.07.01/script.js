//카드 모달창//

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

//검색창 //

document.addEventListener("DOMContentLoaded", function () {
    const moonSearch = document.querySelector(".moon_search");
    const searchBox = document.querySelector(".search_box");

    moonSearch.addEventListener("click", function (event) {
        event.preventDefault();
        searchBox.style.display = searchBox.style.display === "block" ? "none" : "block";
    });
});
