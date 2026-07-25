// 1. Sidebar Toggle Functionality
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

// 2. Promo Cards Slider Functionality
document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll(".promo-card");
    if (cards.length > 0) {
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

        const nextButtons = document.querySelectorAll("#nextBtn, #nextBtn2");
        nextButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                currentIndex = (currentIndex + 1) % cards.length;
                showCard(currentIndex);
            });
        });

        const prevButtons = document.querySelectorAll("#prevBtn, #prevBtn2");
        prevButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                currentIndex = (currentIndex - 1 + cards.length) % cards.length;
                showCard(currentIndex);
            });
        });
    }
});

// 1. Sidebar Toggle Functionality
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

// 2. Contact Form Submission (Direct Supabase REST API)
document.getElementById('contact-form')?.addEventListener('submit', async function (e) {
    e.preventDefault();

    const nameVal = document.getElementById('name').value.trim();
    const emailVal = document.getElementById('email').value.trim();
    const messageVal = document.getElementById('message').value.trim();

    if (!nameVal || !emailVal || !messageVal) {
        alert('Please fill in all fields.');
        return;
    }

    const supabaseUrl = 'https://gfvqaowjvjstgbptcjlh.supabase.co';
    const supabaseKey = 'sb_publishable_lrvVlwmEK2o1W5DtKFylMw_tjgotu0-';

    try {
        const response = await fetch(`${supabaseUrl}/rest/v1/contacts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': supabaseKey,
                'Authorization': `Bearer ${supabaseKey}`,
                'Prefer': 'return=minimal'
            },
            body: JSON.stringify({
                name: nameVal,
                email: emailVal,
                message: messageVal
            })
        });

        if (!response.ok) {
            const errText = await response.text();
            console.error('Supabase Error:', errText);
            alert('Database Error: ' + errText);
            return;
        }

        alert('Message sent successfully!');
        document.getElementById('contact-form').reset();
    } catch (err) {
        console.error('Network Error:', err);
        alert('Network error: ' + err.message);
    }
});


