/* =========================================================
   Partha Sarathi Rautaray — Portfolio
   ========================================================= */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ---------------------------------------------------------
     1. Skills data — rendered here so hue, bar and count stay
        in sync. Each card's accent is hsl(hue, 70%, 50%) with
        the hue stepping 15deg per card, like the reference.
     --------------------------------------------------------- */
  var SKILLS = [
    // Frontend
    { name: "HTML5", pct: 95, cat: "frontend", icon: "fa-brands fa-html5", note: "Semantic, accessible markup" },
    { name: "CSS3 / SCSS", pct: 93, cat: "frontend", icon: "fa-brands fa-css3-alt", note: "Flexbox, Grid, animations" },
    { name: "JavaScript (ES6+)", pct: 92, cat: "frontend", icon: "fa-brands fa-js", note: "DOM, async, modules" },
    { name: "React", pct: 90, cat: "frontend", icon: "fa-brands fa-react", note: "Hooks, context, performance" },
    { name: "Next.js", pct: 84, cat: "frontend", icon: "fa-solid fa-n", note: "App Router, SSR/SSG, API routes" },
    { name: "Redux Toolkit", pct: 85, cat: "frontend", icon: "fa-solid fa-layer-group", note: "Slices, RTK Query" },
    { name: "Tailwind CSS", pct: 88, cat: "frontend", icon: "fa-solid fa-wind", note: "Utility-first design systems" },
    { name: "Bootstrap", pct: 86, cat: "frontend", icon: "fa-brands fa-bootstrap", note: "Rapid responsive layouts" },
    { name: "TypeScript", pct: 75, cat: "frontend", icon: "fa-solid fa-t", note: "Typed components and APIs" },

    // Backend
    { name: "Node.js", pct: 88, cat: "backend", icon: "fa-brands fa-node-js", note: "Event loop, streams, tooling" },
    { name: "Express.js", pct: 87, cat: "backend", icon: "fa-solid fa-server", note: "REST APIs, middleware" },
    { name: "PHP", pct: 80, cat: "backend", icon: "fa-brands fa-php", note: "OOP PHP, sessions, form handling" },
    { name: "Laravel", pct: 78, cat: "backend", icon: "fa-brands fa-laravel", note: "Eloquent, Blade, migrations, auth" },
    { name: "REST API Design", pct: 88, cat: "backend", icon: "fa-solid fa-plug", note: "Versioning, pagination, auth" },
    { name: "Socket.io", pct: 82, cat: "backend", icon: "fa-solid fa-tower-broadcast", note: "Real-time chat & presence" },
    { name: "JWT / Auth", pct: 85, cat: "backend", icon: "fa-solid fa-shield-halved", note: "Sessions, refresh tokens, RBAC" },

    // Database
    { name: "MongoDB", pct: 88, cat: "database", icon: "fa-solid fa-leaf", note: "Mongoose, aggregation pipelines" },
    { name: "MySQL", pct: 78, cat: "database", icon: "fa-solid fa-database", note: "Schema design, joins, indexes" },
    { name: "Redis", pct: 78, cat: "database", icon: "fa-solid fa-bolt", note: "Caching and rate limiting" },

    // Cloud & DevOps
    { name: "AWS", pct: 78, cat: "cloud", icon: "fa-brands fa-aws", note: "EC2, S3, IAM, Route 53" },
    { name: "Docker", pct: 82, cat: "cloud", icon: "fa-brands fa-docker", note: "Images, compose, multi-stage" },
    { name: "CI/CD Pipelines", pct: 76, cat: "cloud", icon: "fa-solid fa-arrows-rotate", note: "GitHub Actions, auto deploys" },
    { name: "Git & GitHub", pct: 90, cat: "cloud", icon: "fa-brands fa-git-alt", note: "Branching, PR review, rebase" },
    { name: "Linux / Nginx", pct: 76, cat: "cloud", icon: "fa-brands fa-linux", note: "Shell, reverse proxy, SSL" },

    // Languages
    { name: "Java", pct: 88, cat: "languages", icon: "fa-brands fa-java", note: "OOP and Android development" },
    { name: "Python", pct: 82, cat: "languages", icon: "fa-brands fa-python", note: "Scripting and data processing" },
    { name: "C++", pct: 85, cat: "languages", icon: "fa-solid fa-code", note: "DSA and systems programming" },
    { name: "Kotlin / Android", pct: 74, cat: "languages", icon: "fa-brands fa-android", note: "Material UI, Jetpack basics" },

    // Creative
    { name: "DaVinci Resolve", pct: 85, cat: "creative", icon: "fa-solid fa-clapperboard", note: "Editing and colour grading" },
    { name: "Adobe Premiere Pro", pct: 80, cat: "creative", icon: "fa-solid fa-film", note: "Cinematic edits and cuts" },
    { name: "After Effects", pct: 74, cat: "creative", icon: "fa-solid fa-wand-magic-sparkles", note: "Motion graphics and VFX" },
    { name: "Photoshop", pct: 82, cat: "creative", icon: "fa-solid fa-image", note: "Retouching and graphics" },
    { name: "Canva", pct: 92, cat: "creative", icon: "fa-solid fa-palette", note: "Thumbnails and social content" }
  ];

  function renderSkills() {
    var host = document.getElementById("skillCards");
    if (!host) return;

    var html = SKILLS.map(function (s, i) {
      var color = "hsl(" + ((i * 15) % 360) + ", 70%, 50%)";
      return (
        '<article class="skill-card" data-cat="' +
        s.cat +
        '" data-pct="' +
        s.pct +
        '" style="--hue-color:' +
        color +
        '">' +
        '<div class="skill-top">' +
        '<span class="skill-name"><i class="' +
        s.icon +
        '"></i>' +
        s.name +
        "</span>" +
        '<span class="skill-pct">0%</span>' +
        "</div>" +
        '<div class="skill-track"><div class="skill-fill"></div></div>' +
        '<p class="skill-note">' +
        s.note +
        "</p>" +
        "</article>"
      );
    }).join("");

    host.innerHTML = html;
  }

  /* Animate a card in: fade + scale, fill the bar, count the % up. */
  function animateSkillCard(card, index) {
    var delay = reduceMotion ? 0 : Math.min(index, 8) * 70;

    setTimeout(function () {
      card.classList.add("is-visible");

      var pct = Number(card.dataset.pct) || 0;
      var fill = card.querySelector(".skill-fill");
      var label = card.querySelector(".skill-pct");

      if (fill) fill.style.width = pct + "%";

      if (reduceMotion) {
        if (label) label.textContent = pct + "%";
        return;
      }

      var start = null;
      var duration = 1400;
      function step(ts) {
        if (start === null) start = ts;
        var p = Math.min((ts - start) / duration, 1);
        // ease-out
        var eased = 1 - Math.pow(1 - p, 3);
        if (label) label.textContent = Math.round(pct * eased) + "%";
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }, delay);
  }

  function observeSkills() {
    var cards = document.querySelectorAll(".skill-card");
    if (!("IntersectionObserver" in window)) {
      cards.forEach(function (c, i) {
        animateSkillCard(c, i);
      });
      return;
    }

    var io = new IntersectionObserver(
      function (entries) {
        var batch = 0;
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          animateSkillCard(entry.target, batch++);
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.25, rootMargin: "0px 0px -60px 0px" }
    );

    cards.forEach(function (c) {
      io.observe(c);
    });
  }

  function initSkillFilters() {
    var pills = document.querySelectorAll(".pill");
    pills.forEach(function (pill) {
      pill.addEventListener("click", function () {
        pills.forEach(function (p) {
          p.classList.remove("is-active");
        });
        pill.classList.add("is-active");

        var filter = pill.dataset.filter;
        document.querySelectorAll(".skill-card").forEach(function (card) {
          var match = filter === "all" || card.dataset.cat === filter;
          card.classList.toggle("is-hidden", !match);
          // Cards revealed by the filter may never have animated.
          if (match && !card.classList.contains("is-visible")) {
            animateSkillCard(card, 0);
          }
        });
      });
    });
  }

  /* ---------------------------------------------------------
     2. Generic reveal-on-scroll
     --------------------------------------------------------- */
  function initReveal() {
    var els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var delay = Number(entry.target.dataset.delay) || 0;
          setTimeout(function () {
            entry.target.classList.add("is-visible");
          }, reduceMotion ? 0 : delay);
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    els.forEach(function (el) {
      io.observe(el);
    });
  }

  /* ---------------------------------------------------------
     3. Hero typing effect
     --------------------------------------------------------- */
  function initTyped() {
    var el = document.getElementById("typed");
    if (!el) return;

    var words = [
      "Full Stack Developer",
      "MERN Stack Developer",
      "Android Developer",
      "Cloud & DevOps Enthusiast",
      "Video Editor",
      "Graphic Designer"
    ];

    if (reduceMotion) {
      el.textContent = words[0];
      return;
    }

    var w = 0;
    var c = 0;
    var deleting = false;

    function tick() {
      var word = words[w];
      c += deleting ? -1 : 1;
      el.textContent = word.slice(0, c);

      var delay = deleting ? 45 : 85;
      if (!deleting && c === word.length) {
        delay = 1600;
        deleting = true;
      } else if (deleting && c === 0) {
        deleting = false;
        w = (w + 1) % words.length;
        delay = 350;
      }
      setTimeout(tick, delay);
    }
    tick();
  }

  /* ---------------------------------------------------------
     4. Hero stat counters
     --------------------------------------------------------- */
  function initCounters() {
    var stats = document.querySelectorAll("[data-count]");
    if (!stats.length) return;

    function run(el) {
      var target = Number(el.dataset.count) || 0;
      if (reduceMotion) {
        el.textContent = target;
        return;
      }
      var start = null;
      function step(ts) {
        if (start === null) start = ts;
        var p = Math.min((ts - start) / 1200, 1);
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }

    if (!("IntersectionObserver" in window)) {
      stats.forEach(run);
      return;
    }
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          run(e.target);
          io.unobserve(e.target);
        });
      },
      { threshold: 0.6 }
    );
    stats.forEach(function (s) {
      io.observe(s);
    });
  }

  /* ---------------------------------------------------------
     5. Header: stuck state, active link, scroll progress, to-top
     --------------------------------------------------------- */
  function initHeader() {
    var header = document.getElementById("siteHeader");
    var progress = document.getElementById("scrollProgress");
    var toTop = document.getElementById("toTop");
    var sections = Array.prototype.slice.call(
      document.querySelectorAll("main section[id]")
    );
    var links = document.querySelectorAll(".nav-link");
    var ticking = false;

    function update() {
      var y = window.scrollY;

      if (header) header.classList.toggle("is-stuck", y > 8);
      if (toTop) toTop.classList.toggle("show", y > 600);

      if (progress) {
        var max = document.documentElement.scrollHeight - window.innerHeight;
        progress.style.width = (max > 0 ? (y / max) * 100 : 0) + "%";
      }

      var current = sections.length ? sections[0].id : "";
      sections.forEach(function (sec) {
        if (y >= sec.offsetTop - 140) current = sec.id;
      });
      links.forEach(function (link) {
        link.classList.toggle(
          "is-active",
          link.getAttribute("href") === "#" + current
        );
      });

      ticking = false;
    }

    window.addEventListener(
      "scroll",
      function () {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(update);
      },
      { passive: true }
    );
    update();
  }

  /* ---------------------------------------------------------
     6. Mobile menu
     --------------------------------------------------------- */
  function initMenu() {
    var btn = document.getElementById("menuToggle");
    var nav = document.getElementById("mobileNav");
    if (!btn || !nav) return;

    function close() {
      btn.classList.remove("is-open");
      nav.classList.remove("is-open");
      btn.setAttribute("aria-expanded", "false");
    }

    btn.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      btn.classList.toggle("is-open", open);
      btn.setAttribute("aria-expanded", String(open));
    });

    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", close);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });
  }

  /* ---------------------------------------------------------
     7. Theme toggle
     --------------------------------------------------------- */
  function initTheme() {
    var btn = document.getElementById("themeToggle");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var next =
        document.documentElement.getAttribute("data-theme") === "dark"
          ? "light"
          : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try {
        localStorage.setItem("theme", next);
      } catch (e) {
        /* storage blocked — theme still applies for this session */
      }
    });
  }

  /* ---------------------------------------------------------
     8. Contact form (Web3Forms) + toast
     --------------------------------------------------------- */
  function showToast(message, type) {
    var toast = document.createElement("div");
    toast.className = "toast " + type;
    toast.innerHTML =
      '<i class="fa-solid ' +
      (type === "success" ? "fa-circle-check" : "fa-circle-exclamation") +
      '"></i><span></span>';
    toast.querySelector("span").textContent = message;
    document.body.appendChild(toast);

    requestAnimationFrame(function () {
      toast.classList.add("show");
    });
    setTimeout(function () {
      toast.classList.remove("show");
      setTimeout(function () {
        toast.remove();
      }, 400);
    }, 3600);
  }

  function initForm() {
    var form = document.querySelector(".contact-form");
    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      var original = btn ? btn.innerHTML : "";
      if (btn) {
        btn.disabled = true;
        btn.innerHTML = 'Sending… <i class="fa-solid fa-spinner fa-spin"></i>';
      }

      fetch(form.action, { method: "POST", body: new FormData(form) })
        .then(function (res) {
          if (!res.ok) throw new Error("Request failed");
          showToast("Message sent — I'll get back to you soon!", "success");
          form.reset();
        })
        .catch(function () {
          showToast("Couldn't send that. Please try again.", "error");
        })
        .then(function () {
          if (btn) {
            btn.disabled = false;
            btn.innerHTML = original;
          }
        });
    });
  }

  /* ---------------------------------------------------------
     9. Decorative stars in the journey section
     --------------------------------------------------------- */
  function initStars() {
    var host = document.getElementById("stars");
    if (!host || reduceMotion) return;
    var frag = document.createDocumentFragment();
    for (var i = 0; i < 22; i++) {
      var s = document.createElement("i");
      var size = 1 + Math.random() * 3;
      s.style.cssText =
        "left:" +
        Math.random() * 100 +
        "%;top:" +
        Math.random() * 100 +
        "%;width:" +
        size +
        "px;height:" +
        size +
        "px;animation-delay:" +
        Math.random() * 4 +
        "s";
      frag.appendChild(s);
    }
    host.appendChild(frag);
  }

  /* ---------------------------------------------------------
     10. Image fallbacks + year
     --------------------------------------------------------- */
  function initMisc() {
    // Some project screenshots aren't committed to the repo; swap in a
    // branded placeholder rather than a broken image.
    document.querySelectorAll(".project-media img").forEach(function (img) {
      function placeholder() {
        var host = img.parentElement;
        if (!host || host.classList.contains("is-placeholder")) return;
        host.classList.add("is-placeholder");
        host.insertAdjacentHTML(
          "beforeend",
          '<i class="fa-solid fa-image ph-icon"></i>' +
            '<span class="ph-label"></span>'
        );
        host.querySelector(".ph-label").textContent = img.alt || "Preview";
      }
      img.addEventListener("error", placeholder);
      if (img.complete && img.naturalWidth === 0) placeholder();
    });

    var year = document.getElementById("year");
    if (year) year.textContent = new Date().getFullYear();
  }

  /* ---------------------------------------------------------
     Boot
     --------------------------------------------------------- */
  function init() {
    renderSkills();
    observeSkills();
    initSkillFilters();
    initReveal();
    initTyped();
    initCounters();
    initHeader();
    initMenu();
    initTheme();
    initForm();
    initStars();
    initMisc();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
