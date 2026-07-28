// ============================================================
// Study Vector - script.js (Direct REST API Integration)
// ============================================================

document.addEventListener('DOMContentLoaded', function () {

  // ---------- 1. Sidebar Drawer (Hamburger Menu) ----------
  const menuToggle = document.getElementById('menuToggle');
  const sidebarDrawer = document.getElementById('sidebarDrawer');
  const sidebarOverlay = document.getElementById('sidebarOverlay');
  const sidebarClose = document.getElementById('sidebarClose');

  function openSidebar() {
    if (sidebarDrawer) sidebarDrawer.classList.add('open', 'active');
    if (sidebarOverlay) sidebarOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar() {
    if (sidebarDrawer) sidebarDrawer.classList.remove('open', 'active');
    if (sidebarOverlay) sidebarOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', openSidebar);
  }
  if (sidebarClose) {
    sidebarClose.addEventListener('click', closeSidebar);
  }
  if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', closeSidebar);
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeSidebar();
  });


  // ---------- 2. Contact Form & Direct REST API Integration ----------
  const SUPABASE_URL = "https://vicky124833r-733.supabase.co"; 
  const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_lrvVlwmEK2o1W5DtKFylMw_tjgotu0-";

  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      const nameInput = document.querySelector('#name');
      const emailInput = document.querySelector('#email');
      const messageInput = document.querySelector('#message');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const message = messageInput ? messageInput.value.trim() : '';

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.textContent : '';

      if (!name || !email || !message) {
        alert('Please fill in all fields.');
        return;
      }

      try {
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = 'Sending...';
        }

        const response = await fetch(`${SUPABASE_URL}/rest/v1/contacts`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': SUPABASE_PUBLISHABLE_KEY,
            'Authorization': `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
            'Prefer': 'return=minimal'
          },
          body: JSON.stringify({ name: name, email: email, message: message })
        });

        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.message || 'Failed to send message.');
        }

        alert('Message sent successfully!');
        contactForm.reset();

        if (submitBtn) {
          submitBtn.textContent = 'Message sent!';
          setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
          }, 2500);
        }
      } catch (err) {
        console.error('Contact form error:', err);
        alert('Error: ' + (err.message || 'Something went wrong.'));
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
        }
      }
    });
  }

});
