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


document.getElementById('contact-form').addEventListener('submit', async function(e) {
  e.preventDefault(); // Page refresh hone se rokenge

  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    message: document.getElementById('message').value
  };

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    const result = await response.json();
    
    if (result.success) {
      alert('Message successfully database mein save ho gaya!');
      document.getElementById('contact-form').reset(); // Form clear kar dega
    } else {
      alert('Kuch error aa gayi: ' + result.error);
    }
  } catch (err) {
    console.error('Error:', err);
    alert('Server se connect nahi ho paya.');
  }
});
