// ============================================================
// Study Vector - script.js
// Powers: hamburger menu / sidebar drawer, and the contact form.
// This file was missing from the site, which is why the ☰ menu
// button and the contact form did nothing.
// ============================================================

document.addEventListener('DOMContentLoaded', function () {

  // ---------- Sidebar drawer (hamburger menu) ----------
  const menuToggle = document.getElementById('menuToggle');
  const sidebarDrawer = document.getElementById('sidebarDrawer');
  const sidebarOverlay = document.getElementById('sidebarOverlay');
  const sidebarClose = document.getElementById('sidebarClose');

  function openSidebar() {
    if (sidebarDrawer) sidebarDrawer.classList.add('active');
    if (sidebarOverlay) sidebarOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar() {
    if (sidebarDrawer) sidebarDrawer.classList.remove('active');
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
  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeSidebar();
  });


  // ---------- Contact form ----------
  // NOTE: Fill in your Supabase project URL and public anon key below
  // to make this actually store messages. Get these from your Supabase
  // project dashboard -> Settings -> API.
  const SUPABASE_URL = "YOUR_SUPABASE_URL_HERE";
  const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY_HERE";

  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.textContent : '';

      if (!name || !email || !message) return;

      if (SUPABASE_URL === "YOUR_SUPABASE_URL_HERE") {
        alert("Contact form isn't connected to a database yet. Add your Supabase URL and key in script.js.");
        return;
      }

      try {
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = 'Sending...';
        }

        const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        const { error } = await client
          .from('contact_messages')
          .insert([{ name: name, email: email, message: message }]);

        if (error) throw error;

        contactForm.reset();
        if (submitBtn) submitBtn.textContent = 'Message sent!';
        setTimeout(() => {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
          }
        }, 2500);
      } catch (err) {
        console.error('Contact form error:', err);
        alert('Something went wrong sending your message. Please try again or message us on Telegram.');
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
        }
      }
    });
  }

});




import { createClient } from 'https://esm.sh/@supabase/supabase-js'

const supabaseUrl = 'https://vicky124833r-733...supabase.co' // Yahan apni project URL paste karein
const supabaseKey = 'Sb_publishable_lrvVlwmEK2o1W5DtKFylMw_tjgotu0-'

const supabase = createClient(supabaseUrl, supabaseKey)

// Form submit hone ka code kuch is tarah hona chahiye:
const contactForm = document.querySelector('#contactForm'); // Aapke form ki ID

if (contactForm) {
    contactForm.addEventListener('submit async', async (e) => {
        e.preventDefault(); // Page ko refresh hone se rokn ke liye

        // Yahan aapke inputs ki values hongi
        const name = document.querySelector('#name').value;
        const email = document.querySelector('#email').value;
        const message = document.querySelector('#message').value;

        // Supabase mein data bhejna
        const { data, error } = await supabase
            .from('messages') // Aapke table ka naam
            .insert([{ name: name, email: email, message: message }]);

        if (error) {
            alert('Error: ' + error.message);
        } else {
            // YAHAN SUCCESS MESSAGE DIKHANE KA CODE HAI
            alert('Message sent successfully!'); // Ya aap chahein toh kisi HTML element mein text dikha sakte hain
            contactForm.reset(); // Form clear karne ke liye
        }
    });
}


