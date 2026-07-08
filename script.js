document.addEventListener('DOMContentLoaded', () => {
    
  // ==========================================
  // 1. Loading Screen Removal
  // ==========================================
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
      loader.style.opacity = '0';
      setTimeout(() => {
          loader.style.display = 'none';
      }, 500);
  });

  // ==========================================
  // 2. Custom Cursor Follow
  // ==========================================
  const cursor = document.querySelector('.cursor-glow');
  
  document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
  });

  // Cursor size change on interactive elements
  const interactives = document.querySelectorAll('a, button, .hover-lift');
  interactives.forEach(el => {
      el.addEventListener('mouseenter', () => {
          cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
          cursor.style.opacity = '0.3';
      });
      el.addEventListener('mouseleave', () => {
          cursor.style.transform = 'translate(-50%, -50%) scale(1)';
          cursor.style.opacity = '0.15';
      });
  });

  // ==========================================
  // 3. Theme Management System
  // ==========================================
  const htmlEl = document.documentElement;
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeSwitcherPanel = document.querySelector('.theme-switcher');
  const themeBtns = document.querySelectorAll('.theme-btn');

  // Load saved theme
  const savedTheme = localStorage.getItem('portfolio-theme') || 'light';
  htmlEl.setAttribute('data-theme', savedTheme);

  // Toggle panel visibility
  themeToggleBtn.addEventListener('click', () => {
      themeSwitcherPanel.classList.toggle('active');
  });

  // Close panel when clicking outside
  document.addEventListener('click', (e) => {
      if (!themeToggleBtn.contains(e.target) && !themeSwitcherPanel.contains(e.target)) {
          themeSwitcherPanel.classList.remove('active');
      }
  });

  // Apply specific theme
  themeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
          const theme = btn.getAttribute('data-set-theme');
          htmlEl.setAttribute('data-theme', theme);
          localStorage.setItem('portfolio-theme', theme);
          themeSwitcherPanel.classList.remove('active');
      });
  });

  // ==========================================
  // 4. Scroll Progress & Sticky Nav
  // ==========================================
  const navbar = document.getElementById('navbar');
  const progressBar = document.getElementById('myBar');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
      // Sticky Nav logic
      if (window.scrollY > 50) {
          navbar.classList.add('scrolled');
      } else {
          navbar.classList.remove('scrolled');
      }

      // Progress Bar logic
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      progressBar.style.width = scrolled + '%';

      // Back to Top Button logic
      if (window.scrollY > 500) {
          backToTopBtn.classList.add('visible');
      } else {
          backToTopBtn.classList.remove('visible');
      }
  });

  // Back to top scroll action
  backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
          top: 0,
          behavior: 'smooth'
      });
  });

  // ==========================================
  // 5. Scroll Reveal Animations
  // ==========================================
  const revealElements = document.querySelectorAll('.reveal');

  const revealOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // Only animate once
      });
  }, revealOptions);

  revealElements.forEach(el => {
      revealObserver.observe(el);
  });

  // ==========================================
  // 6. Active Navbar Highlighting
  // ==========================================
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(section => {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.clientHeight;
          if (scrollY >= (sectionTop - 200)) {
              current = section.getAttribute('id');
          }
      });

      navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href').includes(current)) {
              link.classList.add('active');
          }
      });
  });

  // ==========================================
  // 7. Typing Animation
  // ==========================================
  const typeWriterElement = document.getElementById('typewriter');
  const phrases = [
      "Content Creator for Healthcare & Digital Brands",
      "Medical Writer & Strategist",
      "Visual Storyteller"
  ];
  
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function type() {
      const currentPhrase = phrases[phraseIndex];
      
      if (isDeleting) {
          typeWriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
          charIndex--;
          typeSpeed = 50; // Faster delete
      } else {
          typeWriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
          charIndex++;
          typeSpeed = 100; // Normal typing
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
          isDeleting = true;
          typeSpeed = 2000; // Pause at end of phrase
      } else if (isDeleting && charIndex === 0) {
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          typeSpeed = 500; // Pause before new phrase
      }

      setTimeout(type, typeSpeed);
  }

  // Start typing animation slightly after load
  setTimeout(type, 1000);

});