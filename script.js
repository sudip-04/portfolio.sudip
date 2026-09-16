/* =========================================================
   SUDIP TIMALSINA — BUILT ENVIRONMENT PORTFOLIO
   script.js — organised into small, focused modules.
   Edit the PROJECTS array below to update Selected Work.
   ========================================================= */

(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* =======================================================
     DATA — edit here to change project content / images
     ======================================================= */
  var PROJECTS = [
    {
      id: 'qantas',
      num: '01',
      title: 'Qantas Maintenance Hangar',
      categoryLabel: 'Load Path / Structure',
      tags: ['structure', 'analysis'],
      tools: 'Revit / AutoCAD / Analysis',
      images: ['assets/qantas.jpg', 'assets/qantas-02.jpg', 'assets/qantas-03.jpg'],
      description: 'Curved primary steel roof frame, bracing, columns and slab/apron analysis.',
      learned: 'Placeholder — replace with a short reflection on what analysing this structure taught you about load paths and structural decision-making.',
      why: 'Placeholder — replace with a note on why this study matters to your development as a construction management student.'
    },
    {
      id: 'canberra-houses',
      num: '02',
      title: 'Canberra Houses',
      categoryLabel: 'AutoCAD / Technical Drawing',
      tags: ['autocad', 'presentation'],
      tools: 'AutoCAD / Technical Documentation',
      images: ['assets/canberra-houses.jpg', 'assets/canberra-houses-02.jpg'],
      description: 'Plans, sections, elevations, levels, furniture and material information.',
      learned: 'Placeholder — replace with a short reflection on what producing these technical drawings taught you.',
      why: 'Placeholder — replace with a note on why this study matters to your development.'
    },
    {
      id: 'revit',
      num: '03',
      title: 'Revit Studies',
      categoryLabel: 'BIM / Building Model',
      tags: ['revit', 'technology'],
      tools: 'Revit / BIM',
      images: ['assets/revit.jpg', 'assets/revit-02.jpg'],
      description: 'Building elements, grids, levels, structural relationships and digital modelling.',
      learned: 'Placeholder — replace with a short reflection on what this modelling exercise taught you about digital construction.',
      why: 'Placeholder — replace with a note on why this study matters to your development.'
    },
    {
      id: 'westfield',
      num: '04',
      title: 'Westfield Belconnen',
      categoryLabel: 'Built Environment Analysis',
      tags: ['technology', 'analysis', 'presentation'],
      tools: 'Site Analysis / Presentation',
      images: ['assets/westfield.jpg', 'assets/westfield-02.jpg'],
      description: 'Exploring building technology and communicating analysis through presentation.',
      learned: 'Placeholder — replace with a short reflection on what this analysis taught you about built environment technology.',
      why: 'Placeholder — replace with a note on why this study matters to your development.'
    }
  ];

  var DISCIPLINE_NODES = [
    'Building', 'Construction', 'BIM', 'Project Management',
    'Procurement', 'Contracts', 'Digital Technology', 'Sustainability'
  ];

  /* =======================================================
     UTIL
     ======================================================= */
  function qs(sel, ctx) { return (ctx || document).querySelector(sel); }
  function qsa(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  /* =======================================================
     CUSTOM CURSOR
     ======================================================= */
  function initCursor() {
    var cursor = qs('#cursor');
    var label = qs('#cursorLabel');
    if (!cursor || window.matchMedia('(hover:none), (pointer:coarse)').matches) return;

    var targetX = -999, targetY = -999, curX = -999, curY = -999;

    window.addEventListener('mousemove', function (e) {
      targetX = e.clientX; targetY = e.clientY;
    }, { passive: true });

    function raf() {
      curX += (targetX - curX) * 0.22;
      curY += (targetY - curY) * 0.22;
      cursor.style.transform = 'translate(' + curX + 'px,' + curY + 'px)';
      requestAnimationFrame(raf);
    }
    raf();

    qsa('[data-cursor]').forEach(function (el) {
      el.addEventListener('mouseenter', function () {
        cursor.classList.add('is-active');
        label.textContent = el.getAttribute('data-cursor') || '';
      });
      el.addEventListener('mouseleave', function () {
        cursor.classList.remove('is-active');
      });
    });

    qsa('.orbit-node, .project-card').forEach(function (el) {
      if (el.hasAttribute('data-cursor')) return;
      var text = el.classList.contains('project-card') ? 'VIEW' : 'OPEN';
      el.addEventListener('mouseenter', function () {
        cursor.classList.add('is-active');
        label.textContent = text;
      });
      el.addEventListener('mouseleave', function () {
        cursor.classList.remove('is-active');
      });
    });
  }

  /* =======================================================
     MENU PANEL
     ======================================================= */
  function initMenu() {
    var toggle = qs('#menuToggle');
    var panel = qs('#menuPanel');
    if (!toggle || !panel) return;

    function open() {
      panel.classList.add('is-open');
      panel.setAttribute('aria-hidden', 'false');
      toggle.setAttribute('aria-expanded', 'true');
      var first = qs('a', panel);
      if (first) first.focus();
    }
    function close() {
      panel.classList.remove('is-open');
      panel.setAttribute('aria-hidden', 'true');
      toggle.setAttribute('aria-expanded', 'false');
    }
    toggle.addEventListener('click', function () {
      panel.classList.contains('is-open') ? close() : open();
    });
    qsa('a', panel).forEach(function (a) {
      a.addEventListener('click', close);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && panel.classList.contains('is-open')) close();
    });
  }

  /* =======================================================
     SMOOTH SCROLL for all in-page nav links (respects
     reduced motion via CSS scroll-behavior override)
     ======================================================= */
  function initNavLinks() {
    qsa('[data-nav-link]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var href = a.getAttribute('href');
        if (!href || href.charAt(0) !== '#') return;
        var target = qs(href);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
        history.pushState(null, '', href);
      });
    });
  }

  /* =======================================================
     SCROLL PROGRESS BAR
     ======================================================= */
  function initScrollProgress() {
    var bar = qs('#scrollProgressBar');
    if (!bar) return;
    function update() {
      var h = document.documentElement;
      var scrolled = h.scrollTop;
      var height = h.scrollHeight - h.clientHeight;
      var pct = height > 0 ? (scrolled / height) * 100 : 0;
      bar.style.width = pct + '%';
    }
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  /* =======================================================
     ACTIVE SECTION SPY — updates header label + orbit node
     ======================================================= */
  function initSectionSpy() {
    var sections = qsa('.section[data-section-label]');
    var label = qs('#activeSectionLabel');
    if (!sections.length || !label) return;

    var orbitNodes = qsa('.orbit-node');

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var text = entry.target.getAttribute('data-section-label');
          label.textContent = text;
          var id = entry.target.id;
          orbitNodes.forEach(function (n) {
            n.classList.toggle('is-current', n.getAttribute('href') === '#' + id);
          });
        }
      });
    }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });

    sections.forEach(function (s) { observer.observe(s); });
  }

  /* =======================================================
     SCROLL REVEAL
     ======================================================= */
  function initReveal() {
    var items = qsa('.reveal');
    if (!items.length) return;
    if (prefersReducedMotion) {
      items.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 });
    items.forEach(function (el) { observer.observe(el); });
  }

  /* =======================================================
     ORBIT — hover reveals info in the central image caption
     ======================================================= */
  function initOrbit() {
    var nodes = qsa('.orbit-node');
    var captionNum = qs('#orbitCaptionNum');
    var captionText = qs('#orbitCaptionText');
    var img = qs('#heroImage');
    if (!nodes.length || !captionText) return;

    var defaultNum = '00', defaultText = 'Hover a node to preview';

    nodes.forEach(function (node) {
      var strong = qs('.node-info strong', node);
      var em = qs('.node-info em', node);
      var num = qs('.node-num', node);

      function reveal() {
        captionNum.textContent = num ? num.textContent : '';
        captionText.textContent = (strong ? strong.textContent : '') + (em ? ' — ' + em.textContent : '');
        if (img && !prefersReducedMotion) img.style.transform = 'scale(1.04)';
      }
      function reset() {
        captionNum.textContent = defaultNum;
        captionText.textContent = defaultText;
        if (img) img.style.transform = 'scale(1)';
      }
      node.addEventListener('mouseenter', reveal);
      node.addEventListener('focus', reveal);
      node.addEventListener('mouseleave', reset);
      node.addEventListener('blur', reset);
    });

    // gentle image error fallback (keeps layout intact)
    if (img) {
      img.addEventListener('error', function () {
        img.style.display = 'none';
        img.parentElement.style.background =
          'repeating-linear-gradient(45deg, var(--beige), var(--beige) 10px, var(--paper-dim) 10px, var(--paper-dim) 20px)';
      });
    }
  }

  /* =======================================================
     SKILLS — accordion list synced with radial diagram
     ======================================================= */
  function initSkills() {
    var items = qsa('.skill-item');
    if (!items.length) return;

    function setActive(index) {
      items.forEach(function (it, i) {
        var active = i === index;
        it.classList.toggle('is-active', active);
        it.setAttribute('aria-expanded', active ? 'true' : 'false');
      });
      for (var i = 0; i < items.length; i++) {
        var line = qs('#srLine' + i);
        var node = qs('#srNode' + i);
        if (line) line.classList.toggle('is-active', i === index);
        if (node) node.classList.toggle('is-active', i === index);
      }
    }

    items.forEach(function (item, i) {
      item.addEventListener('click', function () { setActive(i); });
      item.addEventListener('mouseenter', function () { setActive(i); });
    });
  }

  /* =======================================================
     DISCIPLINE MAP — build radial svg diagram from data
     ======================================================= */
  function initDisciplineMap() {
    var linesG = qs('#dmLines');
    var nodesG = qs('#dmNodes');
    if (!linesG || !nodesG) return;

    var cx = 240, cy = 240, hubR = 54, nodeR = 46, radius = 168;
    var count = DISCIPLINE_NODES.length;

    // hub
    var hub = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    hub.setAttribute('class', 'dm-node is-hub');
    hub.innerHTML =
      '<circle class="dm-node-circle" cx="' + cx + '" cy="' + cy + '" r="' + hubR + '"></circle>' +
      '<text class="dm-node-text" x="' + cx + '" y="' + (cy - 4) + '">MY</text>' +
      '<text class="dm-node-text" x="' + cx + '" y="' + (cy + 12) + '">DIRECTION</text>';
    nodesG.appendChild(hub);

    DISCIPLINE_NODES.forEach(function (name, i) {
      var angle = (i / count) * Math.PI * 2 - Math.PI / 2;
      var x = cx + radius * Math.cos(angle);
      var y = cy + radius * Math.sin(angle);

      var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('class', 'dm-line');
      line.setAttribute('x1', cx); line.setAttribute('y1', cy);
      line.setAttribute('x2', x); line.setAttribute('y2', y);
      linesG.appendChild(line);

      var words = name.split(' ');
      var g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      g.setAttribute('class', 'dm-node');
      var textEls = '';
      if (words.length > 1) {
        textEls =
          '<text class="dm-node-text" x="' + x + '" y="' + (y - 3) + '">' + words[0] + '</text>' +
          '<text class="dm-node-text" x="' + x + '" y="' + (y + 12) + '">' + words.slice(1).join(' ') + '</text>';
      } else {
        textEls = '<text class="dm-node-text" x="' + x + '" y="' + (y + 4) + '">' + words[0] + '</text>';
      }
      g.innerHTML = '<circle class="dm-node-circle" cx="' + x + '" cy="' + y + '" r="' + nodeR + '"></circle>' + textEls;
      nodesG.appendChild(g);
    });
  }

  /* =======================================================
     PROJECT GRID — render cards + filter
     ======================================================= */
  function renderProjects() {
    var grid = qs('#projectGrid');
    if (!grid) return;
    grid.innerHTML = PROJECTS.map(function (p) {
      return (
        '<article class="project-card" data-id="' + p.id + '" data-tags="' + p.tags.join(' ') + '" tabindex="0" role="button" aria-haspopup="dialog" aria-label="Open project detail: ' + p.title + '">' +
          '<div class="pc-frame">' +
            '<span class="pc-num">' + p.num + '</span>' +
            '<img src="' + p.images[0] + '" alt="' + p.title + ' — project image" loading="lazy" onerror="this.closest(\'.pc-frame\').style.background=\'repeating-linear-gradient(45deg, var(--beige), var(--beige) 10px, var(--paper-dim) 10px, var(--paper-dim) 20px)\'; this.style.display=\'none\';">' +
          '</div>' +
          '<div class="pc-meta">' +
            '<h3 class="pc-title">' + p.title + '</h3>' +
            '<span class="pc-category">' + p.categoryLabel + '</span>' +
          '</div>' +
          '<p class="pc-desc">' + p.description + '</p>' +
        '</article>'
      );
    }).join('');

    qsa('.project-card', grid).forEach(function (card) {
      card.addEventListener('click', function () { openModal(card.getAttribute('data-id')); });
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(card.getAttribute('data-id')); }
      });
    });
  }

  function initFilters() {
    var bar = qs('#filterBar');
    if (!bar) return;
    var chips = qsa('.filter-chip', bar);
    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        chips.forEach(function (c) { c.classList.remove('is-active'); });
        chip.classList.add('is-active');
        var filter = chip.getAttribute('data-filter');
        qsa('.project-card').forEach(function (card) {
          var tags = (card.getAttribute('data-tags') || '').split(' ');
          var show = filter === 'all' || tags.indexOf(filter) !== -1;
          card.classList.toggle('is-hidden', !show);
        });
      });
    });
  }

  /* =======================================================
     PROJECT MODAL
     ======================================================= */
  var lastFocusedEl = null;

  function openModal(id) {
    var project = PROJECTS.filter(function (p) { return p.id === id; })[0];
    if (!project) return;
    var modal = qs('#projectModal');
    lastFocusedEl = document.activeElement;

    qs('#modalNum').textContent = project.num;
    qs('#modalTitle').textContent = project.title;
    qs('#modalCategory').textContent = project.categoryLabel;
    qs('#modalTools').textContent = project.tools;
    qs('#modalDescription').textContent = project.description;
    qs('#modalLearned').textContent = project.learned;
    qs('#modalWhy').textContent = project.why;

    var imagesHTML = project.images.map(function (src, i) {
      return '<img src="' + src + '" alt="' + project.title + ' — image ' + (i + 1) + '" loading="lazy" onerror="this.style.background=\'repeating-linear-gradient(45deg, var(--beige), var(--beige) 10px, var(--paper-dim) 10px, var(--paper-dim) 20px)\'; this.removeAttribute(\'src\');">';
    }).join('');
    qs('#modalImages').innerHTML = imagesHTML;

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    qs('#modalClose').focus();
  }

  function closeModal() {
    var modal = qs('#projectModal');
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocusedEl) lastFocusedEl.focus();
  }

  function initModal() {
    var modal = qs('#projectModal');
    if (!modal) return;
    qs('#modalClose').addEventListener('click', closeModal);
    qs('#modalOverlay').addEventListener('click', closeModal);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
    });
  }

  /* =======================================================
     HEADER — hide-on-scroll-down / show-on-scroll-up (subtle)
     ======================================================= */
  function initHeaderBehaviour() {
    var header = qs('#siteHeader');
    if (!header) return;
    var lastY = window.scrollY;
    window.addEventListener('scroll', function () {
      var y = window.scrollY;
      if (Math.abs(y - lastY) > 6) {
        header.style.transform = (y > lastY && y > 200) ? 'translateY(-110%)' : 'translateY(0)';
        header.style.transition = 'transform 320ms ease';
        lastY = y;
      }
    }, { passive: true });
  }

  /* =======================================================
     INIT
     ======================================================= */
  document.addEventListener('DOMContentLoaded', function () {
    initCursor();
    initMenu();
    initNavLinks();
    initScrollProgress();
    initSectionSpy();
    initReveal();
    initOrbit();
    initSkills();
    initDisciplineMap();
    renderProjects();
    initFilters();
    initModal();
    initHeaderBehaviour();
  });
})();
