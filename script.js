document.addEventListener("DOMContentLoaded", function() {
    const menuToggle = document.getElementById('menuToggle');
    const sidebarDrawer = document.getElementById('sidebarDrawer');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const sidebarClose = document.getElementById('sidebarClose');

    if (menuToggle && sidebarDrawer) {
        menuToggle.addEventListener('click', () => {
            sidebarDrawer.classList.add('active');
            if (sidebarOverlay) sidebarOverlay.classList.add('active');
        });
    }

    if (sidebarClose && sidebarDrawer) {
        sidebarClose.addEventListener('click', () => {
            sidebarDrawer.classList.remove('active');
            if (sidebarOverlay) sidebarOverlay.classList.remove('active');
        });
    }

    if (sidebarOverlay && sidebarDrawer) {
        sidebarOverlay.addEventListener('click', () => {
            sidebarDrawer.classList.remove('active');
            sidebarOverlay.classList.remove('active');
        });
    }
});



document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll(".promo-card");
    let currentIndex = 0;

    function showCard(index) {
        cards.forEach((card, i) => {
            if (i === index) {
                card.classList.add("active");
                card.style.display = "flex";
            } else {
                card.classList.remove("active");
                card.style.display = "none";
            }
        });
    }

    // Next button functionality
    const nextButtons = document.querySelectorAll("#nextBtn, #nextBtn2");
    nextButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            currentIndex = (currentIndex + 1) % cards.length;
            showCard(currentIndex);
        });
    });

    // Previous button functionality
    const prevButtons = document.querySelectorAll("#prevBtn, #prevBtn2");
    prevButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            currentIndex = (currentIndex - 1 + cards.length) % cards.length;
            showCard(currentIndex);
        });
    });
});