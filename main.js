/* ============================================
   WeThru Business Profile Landing Page
   Main JavaScript
   ============================================ */

(function () {
  'use strict';

  /* --- Navigation: sticky + hamburger + section highlight --- */
  function initNav() {
    var nav = document.getElementById('nav');
    var hamburger = document.getElementById('navHamburger');
    var mobileMenu = document.getElementById('navMobileMenu');
    var navLinks = document.querySelectorAll('.nav__link');
    var mobileLinks = document.querySelectorAll('.nav__mobile-link');

    if (!nav) return;

    // Sticky scroll
    window.addEventListener('scroll', function () {
      nav.classList.toggle('is-scrolled', window.scrollY > 20);
    }, { passive: true });

    // Hamburger toggle
    if (hamburger && mobileMenu) {
      hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('is-open');
        mobileMenu.classList.toggle('is-open');
        hamburger.setAttribute('aria-label',
          hamburger.classList.contains('is-open') ? '메뉴 닫기' : '메뉴 열기');
      });
    }

    // Close mobile menu on link click
    mobileLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        if (hamburger) hamburger.classList.remove('is-open');
        if (mobileMenu) mobileMenu.classList.remove('is-open');
      });
    });

    // Section highlight via IntersectionObserver
    var sections = document.querySelectorAll('section[id]');
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute('id');
          navLinks.forEach(function (link) {
            link.classList.toggle('is-active', link.getAttribute('href') === '#' + id);
          });
          mobileLinks.forEach(function (link) {
            link.classList.toggle('is-active', link.getAttribute('href') === '#' + id);
          });
        }
      });
    }, { threshold: 0.4, rootMargin: '-64px 0px 0px 0px' });

    sections.forEach(function (section) { sectionObserver.observe(section); });
  }

  /* --- Hero: Mouse-reactive gradient --- */
  function initHeroGradient() {
    const bg = document.querySelector('.hero__bg');
    if (!bg) return;

    document.addEventListener('mousemove', function (e) {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      bg.style.setProperty('--mouse-x', x.toFixed(3));
      bg.style.setProperty('--mouse-y', y.toFixed(3));

      const orb = bg.querySelector('.hero__bg-orb');
      if (orb) {
        orb.style.transform =
          'translate(' + (x * 30 - 15) + 'px, ' + (y * 30 - 15) + 'px)';
      }
    });
  }

  /* --- Hero: Word-by-word animation --- */
  function initHeroWords() {
    var headline = document.querySelector('.hero__headline');
    if (!headline) return;

    var html = headline.innerHTML;
    var lines = html.split('<br>');
    var result = '';
    var wordIndex = 0;

    lines.forEach(function (line, li) {
      var words = line.trim().split(/\s+/);
      words.forEach(function (word) {
        if (word) {
          result +=
            '<span class="word" style="animation-delay:' +
            (wordIndex * 0.1 + 0.2) +
            's">' +
            word +
            '</span> ';
          wordIndex++;
        }
      });
      if (li < lines.length - 1) result += '<br>';
    });

    headline.innerHTML = result;
  }

  /* --- IntersectionObserver: Reveal animations --- */
  function initRevealObserver() {
    var els = document.querySelectorAll(
      '.reveal, .reveal-left, .reveal-right, .reveal-scale'
    );
    if (!els.length) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    els.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* --- Stagger children animation --- */
  function initStaggerObserver() {
    var groups = document.querySelectorAll('[data-stagger]');
    if (!groups.length) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var children = entry.target.querySelectorAll('.stagger-item');
            children.forEach(function (child, i) {
              child.style.transitionDelay = i * 0.15 + 's';
              child.classList.add('is-visible');
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    groups.forEach(function (group) {
      observer.observe(group);
    });
  }

  /* --- Count-up animation --- */
  function initCountUp() {
    var numbers = document.querySelectorAll('[data-count]');
    if (!numbers.length) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var el = entry.target;
            var target = parseInt(el.getAttribute('data-count'), 10);
            var suffix = el.getAttribute('data-suffix') || '';
            var prefix = target >= 100 ? '' : '';
            var duration = 1500;
            var start = performance.now();

            function update(now) {
              var elapsed = now - start;
              var progress = Math.min(elapsed / duration, 1);
              // Ease out cubic
              var eased = 1 - Math.pow(1 - progress, 3);
              var current = Math.floor(eased * target);

              if (target >= 1000) {
                el.textContent = current.toLocaleString() + '만+';
              } else if (suffix === '%') {
                el.textContent = current + suffix;
              } else {
                el.textContent = current + '만+';
              }

              if (progress < 1) {
                requestAnimationFrame(update);
              }
            }

            requestAnimationFrame(update);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.3 }
    );

    numbers.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* --- Showcase tab switching --- */
  function initShowcase() {
    var tabs = document.querySelectorAll('.showcase__tab');
    var slides = document.querySelectorAll('.showcase__slide');
    var tagGroups = document.querySelectorAll('.showcase__tags-group');
    var urlEl = document.getElementById('showcaseUrl');
    var urls = ['profile.wethru.co.kr', 'startup.wethru.co.kr', 'minimal.wethru.co.kr'];

    if (!tabs.length) return;

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var idx = parseInt(tab.getAttribute('data-tab'), 10);

        tabs.forEach(function (t) { t.classList.remove('is-active'); });
        slides.forEach(function (s) { s.classList.remove('is-active'); });
        tagGroups.forEach(function (g) { g.classList.remove('is-active'); });

        tab.classList.add('is-active');
        slides[idx].classList.add('is-active');
        if (tagGroups[idx]) tagGroups[idx].classList.add('is-active');
        if (urlEl) urlEl.textContent = urls[idx];
      });
    });
  }

  /* --- Testimonials Carousel --- */
  function initTestimonials() {
    var track = document.getElementById('testimonialTrack');
    var prevBtn = document.getElementById('testimonialPrev');
    var nextBtn = document.getElementById('testimonialNext');
    var dotsContainer = document.getElementById('testimonialDots');
    if (!track || !prevBtn || !nextBtn) return;

    var cards = track.querySelectorAll('.testimonials__card');
    var dots = dotsContainer ? dotsContainer.querySelectorAll('.testimonials__dot') : [];
    var current = 0;
    var totalSlides = cards.length - 1; // show 2 at once on desktop
    var autoTimer;

    function getMaxSlide() {
      if (window.innerWidth <= 767) return cards.length - 1;
      return Math.max(0, cards.length - 2);
    }

    function updateSlide() {
      var cardWidth = cards[0].offsetWidth + 24; // gap
      track.style.transform = 'translateX(-' + (current * cardWidth) + 'px)';
      dots.forEach(function (d, i) {
        d.classList.toggle('is-active', i === current);
      });
    }

    function goNext() {
      current = current >= getMaxSlide() ? 0 : current + 1;
      updateSlide();
    }

    function goPrev() {
      current = current <= 0 ? getMaxSlide() : current - 1;
      updateSlide();
    }

    nextBtn.addEventListener('click', function () {
      goNext();
      resetAuto();
    });

    prevBtn.addEventListener('click', function () {
      goPrev();
      resetAuto();
    });

    dots.forEach(function (dot) {
      dot.addEventListener('click', function () {
        current = parseInt(dot.getAttribute('data-dot'), 10);
        updateSlide();
        resetAuto();
      });
    });

    function resetAuto() {
      clearInterval(autoTimer);
      autoTimer = setInterval(goNext, 4000);
    }

    autoTimer = setInterval(goNext, 4000);
    window.addEventListener('resize', updateSlide);
  }

  /* --- CTA headline word animation --- */
  function initCtaWords() {
    var headline = document.getElementById('ctaHeadline');
    if (!headline) return;

    var html = headline.innerHTML;
    var lines = html.split('<br>');
    var result = '';
    var wordIndex = 0;

    lines.forEach(function (line, li) {
      var words = line.trim().split(/\s+/);
      words.forEach(function (word) {
        if (word) {
          result +=
            '<span class="word" style="animation-delay:' +
            (wordIndex * 0.1) +
            's">' +
            word +
            '</span> ';
          wordIndex++;
        }
      });
      if (li < lines.length - 1) result += '<br>';
    });

    headline.innerHTML = result;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            headline.classList.add('is-animated');
            observer.unobserve(headline);
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(headline);
  }

  /* --- Testimonials: sequential star fill animation --- */
  function initStarRating() {
    var carousel = document.querySelector('.testimonials__carousel');
    if (!carousel) return;

    var cards = document.querySelectorAll('.testimonials__card');
    if (!cards.length) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            cards.forEach(function (card) {
              card.classList.add('is-star-animated');
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(carousel);
  }

  /* --- Init --- */
  document.addEventListener('DOMContentLoaded', function () {
    initNav();
    initHeroWords();
    initHeroGradient();
    initRevealObserver();
    initStaggerObserver();
    initCountUp();
    initShowcase();
    initTestimonials();
    initCtaWords();
    initStarRating();
  });
})();
