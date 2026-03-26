document.addEventListener('DOMContentLoaded', function () {

  /* ── Lesson data (badge, title, meta extracted from content) ── */
  var lessonMeta = [
    { badge:'📚 Lezione 01 · Fondamenti', title:'Introduzione a <span class="highlight">Tkinter</span>', meta:'~15 min · Principianti · Python 3.x' },
    { badge:'📐 Lezione 02 · Fondamenti', title:'La tua <span class="highlight">Prima Finestra</span>', meta:'~20 min · Principianti' },
    { badge:'🧩 Lezione 03 · Fondamenti', title:'I <span class="highlight">Widget</span> Principali', meta:'~30 min · Principianti' },
    { badge:'📏 Lezione 04 · Fondamenti', title:'Layout & <span class="highlight">Geometry Managers</span>', meta:'~25 min · Principianti' },
    { badge:'⚡ Lezione 05 · Intermedio', title:'Eventi & <span class="highlight">Comandi</span>', meta:'~25 min · Intermedio' },
    { badge:'🔗 Lezione 06 · Intermedio', title:'Variabili Tkinter & <span class="highlight">Binding</span>', meta:'~20 min · Intermedio' },
    { badge:'🪟 Lezione 07 · Intermedio', title:'Finestre Multiple & <span class="highlight">Menu</span>', meta:'~25 min · Intermedio' },
    { badge:'🎯 Lezione 08 · Progetto',   title:'Progetto: <span class="highlight">Calcolatrice</span> Completa', meta:'~45 min · Progetto Guidato' },
    { badge:'🎨 Lezione 09 · Avanzato',   title:'Stili <span class="highlight">ttk</span> — Widget Moderni', meta:'~25 min · Avanzato' },
    { badge:'🖼️ Lezione 10 · Avanzato',  title:'Canvas & <span class="highlight">Disegno Grafico</span>', meta:'~30 min · Avanzato' },
    { badge:'⏱️ Lezione 11 · Avanzato',  title:'Animazioni & <span class="highlight">after()</span>', meta:'~25 min · Avanzato' },
    { badge:'🗄️ Lezione 12 · Avanzato',  title:'Database <span class="highlight">SQLite</span> con GUI', meta:'~40 min · Avanzato' },
    { badge:'🖥️ Lezione 13 · Tkinter Pro', title:'Tkinter <span class="highlight">Avanzato</span> — Temi & Architettura', meta:'~50 min · Esperto' },
    { badge:'🗃️ Lezione 14 · SQL Server',  title:'<span class="highlight">SQL Server</span> con Python & Tkinter', meta:'~55 min · Esperto' }
  ];
  var lessonNames = [
    'Lezione 01 — Introduzione a Tkinter','Lezione 02 — Prima Finestra',
    'Lezione 03 — Widget Principali','Lezione 04 — Layout & Geometry',
    'Lezione 05 — Eventi & Comandi','Lezione 06 — Variabili & Binding',
    'Lezione 07 — Finestre & Menu','Lezione 08 — Calcolatrice',
    'Lezione 09 — Stili ttk','Lezione 10 — Canvas & Disegno',
    'Lezione 11 — Animazioni','Lezione 12 — SQLite con GUI',
    'Lezione 13 — Tkinter Avanzato','Lezione 14 — SQL Server con Python'
  ];

  /* ── State ── */
  var current = 0, total = 14;
  var completed = new Set();

  /* ── Elements ── */
  var hamburger   = document.getElementById('hamburger');
  var leftSidebar = document.getElementById('leftSidebar');
  var overlay     = document.getElementById('sidebarOverlay');
  var topTitle    = document.getElementById('topTitle');
  var lhTitle     = document.getElementById('lhTitle');
  var lessonCardTop = document.getElementById('lessonCardTop');
  var lessonBody    = document.getElementById('lessonBody');
  var lfLeft        = document.getElementById('lfLeft');

  /* Progress elements */
  var progressCircle     = document.getElementById('progressCircle');
  var progressPillLabel  = document.getElementById('progressPillLabel');
  var sidebarProgressBar = document.getElementById('sidebarProgressBar');
  var sidebarProgressLabel = document.getElementById('sidebarProgressLabel');
  var sidebarProgressPct   = document.getElementById('sidebarProgressPct');
  var statDone   = document.getElementById('statDone');
  var statPct    = document.getElementById('statPct');
  var rpRing     = document.getElementById('rpRing');
  var rpProgressBar   = document.getElementById('rpProgressBar');
  var rpProgressLabel = document.getElementById('rpProgressLabel');
  var rpCurrentLesson = document.getElementById('rpCurrentLesson');

  /* All lesson content containers (hidden, just data source) */
  var lessonEls = [];
  for (var i = 0; i < 12; i++) {
    var el = document.getElementById('lesson-' + i);
    if (el) lessonEls[i] = el;
  }

  /* ── Sidebar toggle ── */
  function isMobile() { return window.innerWidth <= 820; }
  function openSidebar() { leftSidebar.classList.add('open'); overlay.classList.add('show'); hamburger.classList.add('open'); }
  function closeSidebar() { leftSidebar.classList.remove('open'); overlay.classList.remove('show'); hamburger.classList.remove('open'); }
  function toggleSidebar() { leftSidebar.classList.contains('open') ? closeSidebar() : openSidebar(); }
  hamburger.addEventListener('click', toggleSidebar);
  overlay.addEventListener('click', closeSidebar);
  window.addEventListener('resize', function () { if (!isMobile()) closeSidebar(); });

  /* ── Render lesson into the card ── */
  function renderLesson(idx) {
    var meta = lessonMeta[idx];
    var src  = lessonEls[idx];
    if (!meta || !src) return;

    /* Top section: badge + h1 + meta */
    lessonCardTop.innerHTML =
      '<div class="lesson-badge">' + meta.badge + '</div>' +
      '<h1>' + meta.title + '</h1>' +
      '<div class="lesson-meta"><span>' + meta.meta.split(' · ').join('</span><span>') + '</span></div>';

    /* Body: clone lesson inner content, skip badge/h1/meta (first 3 elements) */
    var clone = src.cloneNode(true);
    clone.classList.remove('lesson','active');
    /* Remove the lesson-badge, h1, lesson-meta from top since we rendered them above */
    var toRemove = clone.querySelectorAll('.lesson-badge, .lesson-meta');
    toRemove.forEach(function(el){ el.remove(); });
    var h1 = clone.querySelector('h1');
    if (h1) h1.remove();

    /* Extract the prose div */
    var prose = clone.querySelector('.prose');
    lessonBody.innerHTML = prose ? prose.innerHTML : clone.innerHTML;
  }

  /* ── Navigation ── */
  function goTo(idx) {
    /* Deactivate current */
    var prevNav = document.getElementById('nav-' + current);
    if (prevNav) prevNav.classList.remove('active');

    current = idx;
    renderLesson(idx);

    /* Activate new nav */
    var nowNav = document.getElementById('nav-' + idx);
    if (nowNav) nowNav.classList.add('active');

    /* Update breadcrumb & header title */
    var num = String(idx + 1).padStart(2, '0');
    if (topTitle) topTitle.textContent = 'lezione-' + num;
    if (lhTitle)  lhTitle.textContent  = lessonNames[idx];
    if (lfLeft)   lfLeft.textContent   = 'Lezione ' + (idx + 1) + ' di 12';

    /* Buttons state */
    updateButtons();
    syncProgress();
    if (isMobile()) closeSidebar();
    window.scrollTo(0, 0);
  }

  function updateButtons() {
    var isLast = current === total - 1;
    ['btnPrev','btnPrev2','btnPrev3'].forEach(function(id){
      var b = document.getElementById(id);
      if (b) b.disabled = (current === 0);
    });
    ['btnNext','btnNext2','btnNext3'].forEach(function(id){
      var b = document.getElementById(id);
      if (b) b.textContent = isLast ? '🎓 Fine corso' : (id === 'btnNext3' ? 'Prossima lezione →' : (id === 'btnNext' ? 'Prossima →' : 'Avanti →'));
    });
  }

  function nextLesson() {
    completed.add(current);
    var navEl = document.getElementById('nav-' + current);
    if (navEl) navEl.classList.add('done');
    syncProgress();
    if (current < total - 1) goTo(current + 1);
  }
  function prevLesson() { if (current > 0) goTo(current - 1); }

  ['btnPrev','btnPrev2','btnPrev3'].forEach(function(id){
    var b = document.getElementById(id);
    if (b) b.addEventListener('click', prevLesson);
  });
  ['btnNext','btnNext2','btnNext3'].forEach(function(id){
    var b = document.getElementById(id);
    if (b) b.addEventListener('click', nextLesson);
  });

  /* ── Nav menu click ── */
  document.getElementById('leftSidebar').addEventListener('click', function(e){
    var item = e.target.closest('.nav-menu-item');
    if (!item || !item.id) return;
    var idx = parseInt(item.id.replace('nav-',''), 10);
    if (!isNaN(idx)) goTo(idx);
  });

  /* ── Progress sync ── */
  function syncProgress() {
    var n = completed.size;
    var pct = Math.round(n / total * 100);
    var pctStr = pct + '%';

    if (sidebarProgressBar)   sidebarProgressBar.style.width   = pctStr;
    if (sidebarProgressLabel) sidebarProgressLabel.textContent  = n + ' / ' + total + ' completate';
    if (sidebarProgressPct)   sidebarProgressPct.textContent    = pctStr;

    /* Top nav circle */
    var deg = pct * 3.6;
    if (progressCircle) {
      progressCircle.style.background = 'conic-gradient(rgba(255,255,255,.95) ' + deg + 'deg, rgba(255,255,255,.2) ' + deg + 'deg)';
      progressCircle.textContent = pctStr;
    }
    if (progressPillLabel) progressPillLabel.textContent = n + '/' + total;

    /* Right panel ring */
    if (rpRing) {
      rpRing.style.background = 'conic-gradient(var(--accent) ' + deg + 'deg, var(--border) ' + deg + 'deg)';
      rpRing.textContent = pctStr;
    }
    if (rpProgressBar)   rpProgressBar.style.width      = pctStr;
    if (rpProgressLabel) rpProgressLabel.textContent    = n + ' / ' + total + ' completate';
    if (rpCurrentLesson) rpCurrentLesson.textContent    = lessonNames[current];
  }

  /* ── Quiz (event delegation — data-correct) ── */
  document.addEventListener('click', function(e){
    var opt = e.target.closest('.quiz-opt');
    if (!opt) return;
    var opts = opt.closest('.quiz-options');
    if (!opts || opts.dataset.answered) return;
    opts.dataset.answered = '1';
    var correct = opt.getAttribute('data-correct') === 'true';
    opt.classList.add(correct ? 'correct' : 'wrong');
    opts.querySelectorAll('.quiz-opt[data-correct="true"]').forEach(function(o){ o.classList.add('correct'); });
    var qr = opt.closest('.quiz-box') ? opt.closest('.quiz-box').querySelector('.quiz-result') : null;
    if (qr) {
      qr.textContent = correct ? '✅ Esatto! Ottimo lavoro.' : '❌ Non corretto. La risposta in verde è quella giusta.';
      qr.classList.add('show');
      qr.style.color = correct ? 'var(--accent2)' : 'var(--accent3)';
    }
  });

  /* ── Widget card clicks (data-goto / data-anchor) ── */
  document.addEventListener('click', function(e){
    var card = e.target.closest('.widget-card[data-goto]');
    if (!card) return;
    var idx    = parseInt(card.getAttribute('data-goto'), 10);
    var anchor = card.getAttribute('data-anchor');
    if (isNaN(idx)) return;
    goTo(idx);
    if (anchor) {
      setTimeout(function(){
        var el = document.getElementById('anchor-' + anchor);
        if (el) el.scrollIntoView({ behavior:'smooth', block:'start' });
      }, 80);
    }
  });

  /* ── Copy code (event delegation) ── */
  document.addEventListener('click', function(e){
    var btn = e.target.closest('.code-copy');
    if (!btn) return;
    var pre = btn.closest('.code-block') ? btn.closest('.code-block').querySelector('pre') : null;
    if (!pre) return;
    navigator.clipboard.writeText(pre.innerText).then(function(){
      btn.textContent = '✓ copiato';
      setTimeout(function(){ btn.textContent = 'copia'; }, 2000);
    });
  });

  /* ── Search ── */
  var searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('keydown', function(e){
      if (e.key === 'Enter') {
        var q = searchInput.value.trim().toLowerCase();
        if (!q) return;
        for (var i = 0; i < 12; i++) {
          var el = lessonEls[i];
          if (el && el.textContent.toLowerCase().indexOf(q) !== -1) {
            goTo(i); searchInput.value = ''; break;
          }
        }
      }
    });
  }

  /* ── Init ── */
  goTo(0);
  syncProgress();
});
