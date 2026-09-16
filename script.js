/* =========================================================
   SUDIP TIMALSINA — PORTFOLIO SCRIPT
   Updated Projects & Dynamic Map
   ========================================================= */

(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* PROJECTS DATA - REPLACED ACCORDING TO SPECIFICATION */
  var PROJECTS = [
    {
      id: 'study-table',
      num: '01',
      title: 'Study Table Design',
      categoryLabel: 'Physical Design & Fabrication',
      tags: ['physical'],
      tools: 'Timber Craft / Ergonomic Design / Joinery',
      images: ['assets/hero.jpg'],
      description: 'Designed and constructed a customized personal study table in 9th grade, focusing on structural stability, joinery, and functional spatial layout.',
      learned: 'Gained early practical understanding of structural ergonomics, load support, and turning raw ideas into tangible, functional furniture.',
      why: 'Marked my initial realization that design is an intentional process connecting human scale, utility, and structural assembly.'
    },
    {
      id: 'buddha-air',
      num: '02',
      title: 'Buddha Air Aircraft Scale Model',
      categoryLabel: 'Physical Model Craft',
      tags: ['physical'],
      tools: 'Hand Craft / Scale Modeling / Aerodynamic Geometry',
      images: ['assets/hero.jpg'],
      description: 'Crafted a detailed physical scale replica of a local Buddha Air aircraft from Nepal, exploring structural balance and fine model craft.',
      learned: 'Developed strong spatial awareness, attention to detailed geometry, and patience in precision component assembly.',
      why: 'Fostered a deep appreciation for precise physical representation and precision modeling.'
    },
    {
      id: 'truss-bridge',
      num: '03',
      title: 'Belconnen Inspired Truss Bridge',
      categoryLabel: 'Structural Engineering Model',
      tags: ['physical', 'analysis'],
      tools: 'Physical Prototyping / Structural Load Mechanics',
      images: ['assets/hero.jpg'],
      description: 'Engineered a physical model bridge inspired by the architectural walking bridge in Belconnen, testing structural load transfer and member efficiency.',
      learned: 'Understood the fundamental principles of truss distribution, member tension/compression, and structural efficiency.',
      why: 'Connected local architectural observation in Canberra with physical structural engineering principles.'
    },
    {
      id: 'structural-analysis',
      num: '04',
      title: 'Westfield & Qantas Hangar Structural Analysis',
      categoryLabel: 'Built Environment Case Study',
      tags: ['analysis'],
      tools: 'Structural Mapping / Site Analysis / Diagrammatic Modeling',
      images: ['assets/qantas.jpg', 'assets/westfield.jpg'],
      description: 'Detailed structural analysis examining load paths and framing systems of the Westfield Belconnen carpark and the Qantas Maintenance Hangar at Canberra Airport.',
      learned: 'Analyzed how long-span steel trusses and concrete parking frames handle dynamic loads, environmental stress, and open spatial planning.',
      why: 'Anchored theoretical structural knowledge in real-world commercial and aviation infrastructure.'
    },
    {
      id: 'autocad-houses',
      num: '05',
      title: 'Canberra 400 Series AutoCAD Plans',
      categoryLabel: 'AutoCAD Technical Drafting',
      tags: ['autocad'],
      tools: 'AutoCAD / Technical Documentation / Architectural Floor Plans',
      images: ['assets/canberra-houses.jpg'],
      description: 'Drafted complete architectural drawings, floor plans, sections, and structural elevations based on Canberra 400 series residential architecture.',
      learned: 'Mastered precise CAD drafting standards, architectural linework hierarchy, dimensioning, and spatial coordination.',
      why: 'Established a professional technical drafting foundation essential for construction documentation.'
    },
    {
      id: 'revit-skyscraper',
      num: '06',
      title: '3D Skyscraper BIM Model (In Progress)',
      categoryLabel: 'Revit 3D Building Information Modeling',
      tags: ['revit'],
      tools: 'Revit / BIM / Parametric Modeling',
      images: ['assets/revit.jpg'],
      description: 'Currently modeling a high-rise 3D skyscraper, exploring parametric components, vertical core organization, and curtain wall facade systems.',
      learned: 'Developing capabilities in 3D Building Information Modeling (BIM), multi-story level coordination, and parametric modeling workflows.',
      why: 'Represents my current growth phase toward modern digital building modeling and smart construction practices.'
    }
  ];

  var DISCIPLINE_NODES = [
    'Construction Management', '3D Revit Modeling', 'AutoCAD Drafting',
    'Structural Analysis', 'Heritage Conservation', 'Procurement & Contracts',
    'Bridge Engineering', 'Site Planning'
  ];

  function qs(sel, ctx) { return (ctx || document).querySelector(sel); }
  function qsa(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

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

    if (img) {
      img.addEventListener('error', function () {
        img.style.display = 'none';
        img.parentElement.style.background = 'var(--paper-dim)';
      });
    }
  }

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

  function initDisciplineMap() {
    var linesG = qs('#dmLines');
    var nodesG = qs('#dmNodes');
    if (!linesG || !nodesG) return;

    var cx = 240, cy = 240, hubR = 54, nodeR = 46, radius = 168;
    var count = DISCIPLINE_NODES.length;

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

  function renderProjects() {
    var grid = qs('#projectGrid');
    if (!grid) return;
    grid.innerHTML = PROJECTS.map(function (p) {
      return (
        '<article class="project-card" data-id="' + p.id + '" data-tags="' + p.tags.join(' ') + '" tabindex="0" role="button" aria-haspopup="dialog" aria-label="Open project detail: ' + p.title + '">' +
          '<div class="pc-frame">' +
            '<span class="pc-num">' + p.num + '</span>' +
            '<img src="' + p.images[0] + '" alt="' + p.title + '" loading="lazy" onerror="this.closest(\'.pc-frame\').style.background=\'var(--paper-dim)\'; this.style.display=\'none\';">' +
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
      return '<img src="' + src + '" alt="' + project.title + ' — image ' + (i + 1) + '" loading="lazy" onerror="this.style.background=\'var(--paper-dim)\'; this.removeAttribute(\'src\');">';
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
