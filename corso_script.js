document.addEventListener('DOMContentLoaded', function () {

  /* ══════════════════════════════════════════
     LESSON METADATA
  ══════════════════════════════════════════ */
  var lessonMeta = [
    { badge:'📚 Lezione 01 · Fondamenti',   title:'Introduzione a <span class="highlight">Tkinter</span>',           meta:'~15 min · Principianti · Python 3.x' },
    { badge:'📐 Lezione 02 · Fondamenti',   title:'La tua <span class="highlight">Prima Finestra</span>',            meta:'~20 min · Principianti' },
    { badge:'🧩 Lezione 03 · Fondamenti',   title:'I <span class="highlight">Widget</span> Principali',              meta:'~30 min · Principianti' },
    { badge:'📏 Lezione 04 · Fondamenti',   title:'Layout & <span class="highlight">Geometry Managers</span>',       meta:'~25 min · Principianti' },
    { badge:'⚡ Lezione 05 · Intermedio',   title:'Eventi & <span class="highlight">Comandi</span>',                  meta:'~25 min · Intermedio' },
    { badge:'🔗 Lezione 06 · Intermedio',   title:'Variabili Tkinter & <span class="highlight">Binding</span>',      meta:'~20 min · Intermedio' },
    { badge:'🪟 Lezione 07 · Intermedio',   title:'Finestre Multiple & <span class="highlight">Menu</span>',         meta:'~25 min · Intermedio' },
    { badge:'🎯 Lezione 08 · Progetto',     title:'Progetto: <span class="highlight">Calcolatrice</span> Completa',  meta:'~45 min · Progetto Guidato' },
    { badge:'🎨 Lezione 09 · Avanzato',     title:'Stili <span class="highlight">ttk</span> — Widget Moderni',       meta:'~25 min · Avanzato' },
    { badge:'🖼️ Lezione 10 · Avanzato',    title:'Canvas & <span class="highlight">Disegno Grafico</span>',          meta:'~30 min · Avanzato' },
    { badge:'⏱️ Lezione 11 · Avanzato',    title:'Animazioni & <span class="highlight">after()</span>',              meta:'~25 min · Avanzato' },
    { badge:'🗄️ Lezione 12 · Avanzato',    title:'Database <span class="highlight">SQLite</span> con GUI',           meta:'~40 min · Avanzato' },
    { badge:'🖥️ Lezione 13 · Tkinter Pro', title:'Tkinter <span class="highlight">Avanzato</span> — Temi & OOP',    meta:'~50 min · Esperto' },
    { badge:'🗃️ Lezione 14 · SQL Server',   title:'<span class="highlight">SQL Server</span> con Python & Tkinter',  meta:'~55 min · Esperto' },
    { badge:'📊 Lezione 15 · Grafica',       title:'Grafica & <span class="highlight">Matplotlib</span> con Tkinter',    meta:'~60 min · Esperto' }
  ];

  var lessonNames = [
    'Lezione 01 — Introduzione a Tkinter', 'Lezione 02 — Prima Finestra',
    'Lezione 03 — Widget Principali',      'Lezione 04 — Layout & Geometry',
    'Lezione 05 — Eventi & Comandi',       'Lezione 06 — Variabili & Binding',
    'Lezione 07 — Finestre & Menu',        'Lezione 08 — Calcolatrice',
    'Lezione 09 — Stili ttk',             'Lezione 10 — Canvas & Disegno',
    'Lezione 11 — Animazioni',             'Lezione 12 — SQLite con GUI',
    'Lezione 13 — Tkinter Avanzato',       'Lezione 14 — SQL Server con Python', 'Lezione 15 — Grafica & Matplotlib'
  ];

  /* ══════════════════════════════════════════
     STATE
  ══════════════════════════════════════════ */
  var current  = 0;
  var total    = 15;
  var completed = new Set();

  /* ══════════════════════════════════════════
     ELEMENT REFERENCES (all null-safe)
  ══════════════════════════════════════════ */
  function el(id) { return document.getElementById(id); }

  var hamburger          = el('hamburger');
  var leftSidebar        = el('leftSidebar');
  var overlay            = el('sidebarOverlay');
  var topTitle           = el('topTitle');
  var lhTitle            = el('lhTitle');
  var lessonCardTop      = el('lessonCardTop');
  var lessonBody         = el('lessonBody');
  var lfLeft             = el('lfLeft');
  var progressCircle     = el('progressCircle');
  var progressPillLabel  = el('progressPillLabel');
  var sidebarProgressBar = el('sidebarProgressBar');
  var sidebarProgressLbl = el('sidebarProgressLabel');
  var sidebarProgressPct = el('sidebarProgressPct');
  var rpRing             = el('rpRing');
  var rpProgressBar      = el('rpProgressBar');
  var rpProgressLabel    = el('rpProgressLabel');
  var rpCurrentLesson    = el('rpCurrentLesson');

  /* Collect lesson data elements */
  var lessonEls = [];
  for (var i = 0; i < total; i++) {
    var src = el('lesson-' + i);
    if (src) lessonEls[i] = src;
  }

  /* ══════════════════════════════════════════
     SIDEBAR
  ══════════════════════════════════════════ */
  function isMobile() { return window.innerWidth <= 820; }

  function openSidebar() {
    if (leftSidebar) { leftSidebar.classList.add('open'); leftSidebar.classList.remove('desktop-collapsed'); }
    if (overlay)     overlay.classList.add('show');
    if (hamburger)   hamburger.classList.add('open');
  }

  function closeSidebar() {
    if (leftSidebar) leftSidebar.classList.remove('open');
    if (overlay)     overlay.classList.remove('show');
    if (hamburger)   hamburger.classList.remove('open');
  }

  function toggleSidebar() {
    if (!leftSidebar) return;
    if (isMobile()) {
      leftSidebar.classList.contains('open') ? closeSidebar() : openSidebar();
    } else {
      var layout = document.querySelector('.layout');
      var isCollapsed = leftSidebar.classList.toggle('desktop-collapsed');
      if (layout) layout.classList.toggle('sidebar-collapsed', isCollapsed);
      if (hamburger) hamburger.classList.toggle('open', !isCollapsed);
    }
  }

  if (hamburger)  hamburger.addEventListener('click', toggleSidebar);
  if (overlay)    overlay.addEventListener('click', closeSidebar);

  window.addEventListener('resize', function () {
    if (!isMobile()) {
      if (leftSidebar) leftSidebar.classList.remove('open');
      if (overlay)     overlay.classList.remove('show');
    }
  });

  /* Nav item clicks via event delegation */
  if (leftSidebar) {
    leftSidebar.addEventListener('click', function (e) {
      var item = e.target.closest('.nav-menu-item');
      if (!item || !item.id) return;
      var idx = parseInt(item.id.replace('nav-', ''), 10);
      if (!isNaN(idx)) goTo(idx);
    });
  }

  /* ══════════════════════════════════════════
     RENDER LESSON
  ══════════════════════════════════════════ */
  function renderLesson(idx) {
    var meta = lessonMeta[idx];
    var src  = lessonEls[idx];
    if (!meta) return;

    /* ── Top section: badge + h1 + meta ── */
    if (lessonCardTop) {
      lessonCardTop.innerHTML =
        '<div class="lesson-badge">' + meta.badge + '</div>' +
        '<h1>' + meta.title + '</h1>' +
        '<div class="lesson-meta"><span>' +
          meta.meta.split(' · ').join('</span><span>') +
        '</span></div>';
    }

    /* ── Body: clone and strip the top parts ── */
    if (lessonBody) {
      if (!src) {
        lessonBody.innerHTML = '<p style="color:var(--muted);padding:20px;">Contenuto non disponibile.</p>';
        return;
      }
      var clone = src.cloneNode(true);
      clone.classList.remove('lesson', 'active');
      clone.querySelectorAll('.lesson-badge, .lesson-meta').forEach(function (n) { n.remove(); });
      var h1 = clone.querySelector('h1');
      if (h1) h1.remove();
      var prose = clone.querySelector('.prose');
      lessonBody.innerHTML = prose ? prose.innerHTML : clone.innerHTML;
    }
  }

  /* ══════════════════════════════════════════
     NAVIGATION
  ══════════════════════════════════════════ */
  function goTo(idx) {
    /* Deactivate previous nav item */
    var prevNav = el('nav-' + current);
    if (prevNav) prevNav.classList.remove('active');

    current = idx;
    renderLesson(idx);

    /* Activate new nav item */
    var nowNav = el('nav-' + idx);
    if (nowNav) nowNav.classList.add('active');

    /* Update header info */
    var num = String(idx + 1).padStart(2, '0');
    if (topTitle) topTitle.textContent = 'lezione-' + num;
    if (lhTitle)  lhTitle.textContent  = lessonNames[idx] || '';
    if (lfLeft)   lfLeft.textContent   = 'Lezione ' + (idx + 1) + ' di ' + total;

    updateButtons();
    syncProgress();
    if (isMobile()) closeSidebar();
    window.scrollTo(0, 0);
  }

  function updateButtons() {
    var isFirst = (current === 0);
    var isLast  = (current === total - 1);
    ['btnPrev', 'btnPrev2', 'btnPrev3'].forEach(function (id) {
      var b = el(id);
      if (b) b.disabled = isFirst;
    });
    ['btnNext', 'btnNext2', 'btnNext3'].forEach(function (id) {
      var b = el(id);
      if (!b) return;
      b.textContent = isLast
        ? '🎓 Fine corso'
        : (id === 'btnNext3' ? 'Prossima lezione →' : id === 'btnNext' ? 'Prossima →' : 'Avanti →');
    });
  }

  function nextLesson() {
    completed.add(current);
    var navEl = el('nav-' + current);
    if (navEl) navEl.classList.add('done');
    syncProgress();
    if (current < total - 1) goTo(current + 1);
  }

  function prevLesson() {
    if (current > 0) goTo(current - 1);
  }

  ['btnPrev', 'btnPrev2', 'btnPrev3'].forEach(function (id) {
    var b = el(id);
    if (b) b.addEventListener('click', prevLesson);
  });
  ['btnNext', 'btnNext2', 'btnNext3'].forEach(function (id) {
    var b = el(id);
    if (b) b.addEventListener('click', nextLesson);
  });

  /* ══════════════════════════════════════════
     PROGRESS SYNC
  ══════════════════════════════════════════ */
  function syncProgress() {
    var n   = completed.size;
    var pct = Math.round(n / total * 100);
    var pctStr = pct + '%';
    var labelStr = n + ' / ' + total + ' completate';

    /* Sidebar progress bar */
    if (sidebarProgressBar) sidebarProgressBar.style.width  = pctStr;
    if (sidebarProgressLbl) sidebarProgressLbl.textContent  = labelStr;
    if (sidebarProgressPct) sidebarProgressPct.textContent  = pctStr;

    /* Top nav progress circle */
    var deg = pct * 3.6;
    if (progressCircle) {
      progressCircle.style.background =
        'conic-gradient(rgba(255,255,255,.95) ' + deg + 'deg, rgba(255,255,255,.2) ' + deg + 'deg)';
      progressCircle.textContent = pctStr;
    }
    if (progressPillLabel) progressPillLabel.textContent = n + '/' + total;

    /* Right panel */
    if (rpRing) {
      rpRing.style.background =
        'conic-gradient(var(--accent) ' + deg + 'deg, var(--border) ' + deg + 'deg)';
      rpRing.textContent = pctStr;
    }
    if (rpProgressBar)   rpProgressBar.style.width   = pctStr;
    if (rpProgressLabel) rpProgressLabel.textContent = labelStr;
    if (rpCurrentLesson) rpCurrentLesson.textContent = lessonNames[current] || '';
  }

  /* ══════════════════════════════════════════
     QUIZ — event delegation
  ══════════════════════════════════════════ */
  document.addEventListener('click', function (e) {
    var opt = e.target.closest('.quiz-opt');
    if (!opt) return;
    var opts = opt.closest('.quiz-options');
    if (!opts || opts.dataset.answered) return;
    opts.dataset.answered = '1';

    var correct = opt.getAttribute('data-correct') === 'true';
    opt.classList.add(correct ? 'correct' : 'wrong');
    opts.querySelectorAll('.quiz-opt[data-correct="true"]').forEach(function (o) {
      o.classList.add('correct');
    });

    var qr = opt.closest('.quiz-box') ? opt.closest('.quiz-box').querySelector('.quiz-result') : null;
    if (qr) {
      qr.textContent = correct
        ? '✅ Esatto! Ottimo lavoro.'
        : '❌ Non corretto. La risposta corretta è evidenziata in verde.';
      qr.classList.add('show');
      qr.style.color = correct ? 'var(--accent2)' : 'var(--accent3)';
    }
  });

  /* ══════════════════════════════════════════
     WIDGET CARD CLICKS
  ══════════════════════════════════════════ */
  document.addEventListener('click', function (e) {
    var card = e.target.closest('.widget-card[data-goto]');
    if (!card) return;
    var idx    = parseInt(card.getAttribute('data-goto'), 10);
    var anchor = card.getAttribute('data-anchor');
    if (isNaN(idx)) return;
    goTo(idx);
    if (anchor) {
      setTimeout(function () {
        var anchorEl = el('anchor-' + anchor);
        if (anchorEl) anchorEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 80);
    }
  });

  /* ══════════════════════════════════════════
     COPY CODE — event delegation
  ══════════════════════════════════════════ */
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.code-copy');
    if (!btn) return;
    var block = btn.closest('.code-block');
    var pre = block ? block.querySelector('pre') : null;
    if (!pre) return;
    var text = pre.innerText || pre.textContent || '';
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        btn.textContent = '✓ copiato';
        setTimeout(function () { btn.textContent = 'copia'; }, 2000);
      }).catch(function () { fallbackCopy(btn, text); });
    } else {
      fallbackCopy(btn, text);
    }
  });

  function fallbackCopy(btn, text) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;top:-9999px;left:-9999px;opacity:0;';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      btn.textContent = '✓ copiato';
      setTimeout(function () { btn.textContent = 'copia'; }, 2000);
    } catch (err) {
      btn.textContent = 'errore';
    }
    document.body.removeChild(ta);
  }

  /* ══════════════════════════════════════════
     SEARCH
  ══════════════════════════════════════════ */
  var searchInput = el('searchInput');
  if (searchInput) {
    searchInput.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter') return;
      var q = searchInput.value.trim().toLowerCase();
      if (!q) return;
      for (var i = 0; i < total; i++) {
        var src = lessonEls[i];
        if (src && src.textContent.toLowerCase().indexOf(q) !== -1) {
          goTo(i);
          searchInput.value = '';
          break;
        }
      }
    });
  }

  /* ══════════════════════════════════════════
     THEME SWITCHER
  ══════════════════════════════════════════ */
  var themeToggleBtn = el('themeToggleBtn');
  var themeDropdown  = el('themeDropdown');
  var themeOpts      = document.querySelectorAll('.theme-opt');

  var THEMES = {
    light:    { label: 'Chiaro',  icon: '☀️' },
    dark:     { label: 'Scuro',   icon: '🌙' },
    midnight: { label: 'Notte',   icon: '🌌' },
    forest:   { label: 'Foresta', icon: '🌿' },
    sepia:    { label: 'Seppia',  icon: '📜' }
  };

  function applyTheme(name) {
    if (!THEMES[name]) name = 'light';
    document.documentElement.setAttribute('data-theme', name);
    themeOpts.forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-theme') === name);
    });
    try { localStorage.setItem('corso-theme', name); } catch (err) {}
    if (themeToggleBtn) {
      var t = THEMES[name];
      var span = themeToggleBtn.querySelector('span');
      if (span) span.textContent = t.icon + ' ' + t.label;
    }
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      if (themeDropdown) themeDropdown.classList.toggle('open');
    });
  }

  document.addEventListener('click', function (e) {
    if (!themeDropdown) return;
    var clickedInside = (themeDropdown.contains(e.target)) ||
                        (themeToggleBtn && themeToggleBtn.contains(e.target));
    if (!clickedInside) themeDropdown.classList.remove('open');
  });

  themeOpts.forEach(function (btn) {
    btn.addEventListener('click', function () {
      applyTheme(btn.getAttribute('data-theme'));
      if (themeDropdown) themeDropdown.classList.remove('open');
    });
  });

  /* Restore saved theme */
  var savedTheme = 'light';
  try { savedTheme = localStorage.getItem('corso-theme') || 'light'; } catch (err) {}
  applyTheme(savedTheme);

  /* ══════════════════════════════════════════
     INIT
  ══════════════════════════════════════════ */
  goTo(0);
  syncProgress();

}); /* end DOMContentLoaded */
