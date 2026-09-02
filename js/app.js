/**
 * Cosmic Crew Hackathon - Main Controller
 * Handles UI interactions, countdown timer, filters, modals, and airlock entry
 */

document.addEventListener('DOMContentLoaded', () => {
  initAirlock();
  initCountdown();
  initStats();
  initTasks();
  initTimeline();
  initPrizes();
  initSponsors();
  initGallery();
  initFAQs();
  initCommsForm();
  initNavigation();
  initAudioControls();
});

// ==========================================
// 1. AIRLOCK ENTRY GATE
// ==========================================
function initAirlock() {
  const airlockGate = document.getElementById('airlock-gate');
  const enterBtn = document.getElementById('btn-enter-airlock');
  const crewSelectBtns = document.querySelectorAll('.airlock-crew-btn');
  const airlockPreviewSvg = document.getElementById('airlock-crew-preview');
  const mainContent = document.getElementById('main-ship-content');

  // Crewmate Selection in Airlock
  crewSelectBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      crewSelectBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const color = btn.dataset.color;
      const shadow = btn.dataset.shadow;
      const name = btn.dataset.name;

      if (window.cosmicAudio) {
        window.cosmicAudio.playBlip(520, 'sine', 0.08);
      }

      // Update avatar color
      if (airlockPreviewSvg) {
        const bodyPaths = airlockPreviewSvg.querySelectorAll('.crew-body-fill');
        const shadowPaths = airlockPreviewSvg.querySelectorAll('.crew-shadow-fill');
        bodyPaths.forEach(p => p.setAttribute('fill', color));
        shadowPaths.forEach(p => p.setAttribute('fill', shadow));
      }

      const label = document.getElementById('selected-crew-name');
      if (label) label.textContent = `${name.toUpperCase()} CREWMATE`;
    });
  });

  // Enter Button Transition
  if (enterBtn && airlockGate) {
    enterBtn.addEventListener('click', () => {
      if (window.cosmicAudio) {
        window.cosmicAudio.playAirlockEnter();
        window.cosmicAudio.startAmbient();
      }

      enterBtn.innerHTML = `
        <span class="pulse-text">DEPRESSURIZING AIRLOCK...</span>
      `;
      enterBtn.disabled = true;

      // Add airlock opening class
      airlockGate.classList.add('airlock-doors-opening');

      setTimeout(() => {
        airlockGate.classList.add('airlock-hidden');
        if (mainContent) {
          mainContent.classList.remove('ship-sealed');
          mainContent.classList.add('ship-active');
        }
        // Trigger smooth reveal of hero
        const heroSection = document.getElementById('hero');
        if (heroSection) heroSection.scrollIntoView({ behavior: 'smooth' });
      }, 1200);
    });
  }
}

// ==========================================
// 2. LIVE COUNTDOWN SCOREBOARD
// ==========================================
function initCountdown() {
  const daysEl = document.getElementById('cd-days');
  const hoursEl = document.getElementById('cd-hours');
  const minutesEl = document.getElementById('cd-minutes');
  const secondsEl = document.getElementById('cd-seconds');

  // Set target date 2 days, 10 hours, 59 minutes from current time (or customized)
  const targetDate = new Date(Date.now() + (2 * 24 * 60 * 60 + 10 * 60 * 60 + 59 * 60 + 19) * 1000).getTime();

  function updateTimer() {
    const now = Date.now();
    const diff = targetDate - now;

    if (diff <= 0) {
      if (daysEl) daysEl.textContent = '00';
      if (hoursEl) hoursEl.textContent = '00';
      if (minutesEl) minutesEl.textContent = '00';
      if (secondsEl) secondsEl.textContent = '00';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
    if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

// ==========================================
// 3. STATS STRIP
// ==========================================
function initStats() {
  const statsContainer = document.getElementById('stats-grid-container');
  if (!statsContainer || !window.COSMIC_DATA) return;

  statsContainer.innerHTML = window.COSMIC_DATA.hackathon.stats.map(stat => `
    <div class="stat-card">
      <div class="stat-card-header">
        <span class="stat-tag">// ${stat.id.toUpperCase()}_MODULE</span>
        <div class="stat-dots">
          <span class="dot dot-cyan"></span>
          <span class="dot dot-yellow"></span>
          <span class="dot dot-pink"></span>
        </div>
      </div>
      <div class="stat-card-body">
        <div class="stat-value-wrap">
          <span class="stat-val glow-text">${stat.value}</span>
        </div>
        <div class="stat-labels">
          <span class="stat-label-main">${stat.label}</span>
          <span class="stat-label-sub">${stat.subtext}</span>
        </div>
      </div>
    </div>
  `).join('');
}

// ==========================================
// 4. PROBLEM STATEMENTS / SHIP TASKS
// ==========================================
function initTasks() {
  const taskGrid = document.getElementById('tasks-grid');
  const taskFilters = document.querySelectorAll('.task-filter-btn');
  const modal = document.getElementById('task-modal');
  const modalBody = document.getElementById('task-modal-body');
  const modalClose = document.getElementById('close-task-modal');

  if (!taskGrid || !window.COSMIC_DATA) return;

  function renderTasks(filterCategory = 'ALL') {
    const tasks = window.COSMIC_DATA.tasks;
    const filtered = filterCategory === 'ALL'
      ? tasks
      : tasks.filter(t => t.category.toLowerCase().includes(filterCategory.toLowerCase()) || t.difficulty.toLowerCase().includes(filterCategory.toLowerCase()));

    taskGrid.innerHTML = filtered.map(t => `
      <div class="task-card" data-task-id="${t.id}">
        <div class="task-card-top">
          <div class="task-badge-pill" style="border-color: ${t.color}; color: ${t.color}">
            <span class="task-num">${t.number}</span>
            <span class="task-diff-tag">${t.difficulty}</span>
          </div>
          <div class="task-pts-tag">+${t.points} PTS</div>
        </div>

        <h3 class="task-title" style="color: ${t.color}">${t.title}</h3>
        <span class="task-track-name">${t.category}</span>
        
        <p class="task-short-desc">${t.shortDescription}</p>

        <div class="task-tags-row">
          ${t.tags.map(tag => `<span class="task-tag-badge">${tag}</span>`).join('')}
        </div>

        <div class="task-card-footer">
          <button class="btn-arcade-outline btn-inspect-task" onclick="window.inspectTask('${t.id}')">
            INSPECT BRIEF // [>]
          </button>
        </div>
      </div>
    `).join('');
  }

  // Filter click events
  taskFilters.forEach(btn => {
    btn.addEventListener('click', () => {
      taskFilters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      if (window.cosmicAudio) window.cosmicAudio.playBlip(620, 'square', 0.05);
      renderTasks(btn.dataset.filter);
    });
  });

  renderTasks('ALL');

  // Global Task Inspect Handler
  window.inspectTask = (taskId) => {
    const task = window.COSMIC_DATA.tasks.find(t => t.id === taskId);
    if (!task || !modal || !modalBody) return;

    if (window.cosmicAudio) window.cosmicAudio.playBlip(750, 'triangle', 0.08);

    modalBody.innerHTML = `
      <div class="task-modal-header" style="border-bottom: 2px solid ${task.color}">
        <div class="modal-task-badge" style="background: ${task.color}22; color: ${task.color}; border: 1px solid ${task.color}">
          ${task.number} // ${task.difficulty}
        </div>
        <h2 class="modal-task-title" style="color: ${task.color}">${task.title}</h2>
        <span class="modal-task-track">${task.category} &bull; Reward: ${task.points} Bounty XP</span>
      </div>

      <div class="task-modal-content-inner">
        <div class="modal-sec">
          <h4 class="modal-sec-title">// MISSION OBJECTIVE</h4>
          <p class="modal-sec-desc">${task.fullDescription}</p>
        </div>

        <div class="modal-sec">
          <h4 class="modal-sec-title">// SAMPLE PROBLEM VECTORS</h4>
          <ul class="modal-ideas-list">
            ${task.sampleIdeas.map(idea => `
              <li>
                <span class="idea-bullet" style="color: ${task.color}">[+]</span>
                <span>${idea}</span>
              </li>
            `).join('')}
          </ul>
        </div>

        <div class="modal-sec">
          <h4 class="modal-sec-title">// RECOMMENDED STACK & TECH</h4>
          <div class="modal-tags-wrap">
            ${task.tags.map(tag => `<span class="task-tag-badge active-tag">${tag}</span>`).join('')}
          </div>
        </div>
      </div>

      <div class="task-modal-footer">
        <button class="btn-arcade" onclick="document.getElementById('task-modal').classList.remove('active')">
          [ ACCEPT MISSION ]
        </button>
      </div>
    `;

    modal.classList.add('active');
  };

  if (modalClose) {
    modalClose.addEventListener('click', () => {
      if (modal) modal.classList.remove('active');
    });
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });
  }
}

// ==========================================
// 5. GAMING TIMELINE (LEVEL PROGRESSION)
// ==========================================
function initTimeline() {
  const timelineContainer = document.getElementById('timeline-levels-container');
  if (!timelineContainer || !window.COSMIC_DATA) return;

  timelineContainer.innerHTML = window.COSMIC_DATA.timeline.map((lvl, index) => {
    const isCompleted = lvl.status === 'COMPLETED';
    const isActive = lvl.status === 'ACTIVE';
    const statusClass = isCompleted ? 'node-completed' : (isActive ? 'node-active' : 'node-locked');

    return `
      <div class="timeline-level-card ${statusClass}">
        <div class="level-indicator-col">
          <div class="level-node-circle">
            <span class="node-num">${index}</span>
            <div class="node-pulse"></div>
          </div>
          ${index < window.COSMIC_DATA.timeline.length - 1 ? '<div class="conduit-line"></div>' : ''}
        </div>

        <div class="level-content-box">
          <div class="level-meta-row">
            <div class="level-pill-wrap">
              <span class="level-badge">${lvl.level}</span>
              <span class="level-stage">${lvl.stage}</span>
            </div>
            <span class="level-status-tag ${lvl.status.toLowerCase()}">${lvl.status}</span>
          </div>

          <h3 class="level-title">${lvl.name}</h3>
          <div class="level-time-chip">${lvl.date} // ${lvl.time}</div>
          
          <p class="level-desc">${lvl.description}</p>

          <div class="level-highlights-box">
            <span class="hl-label">// LEVEL OBJECTIVES:</span>
            <div class="hl-chips">
              ${lvl.highlights.map(h => `<span class="hl-chip">&bull; ${h}</span>`).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// ==========================================
// 6. REWARD VAULT (PRIZE POOL)
// ==========================================
function initPrizes() {
  const topPrizesContainer = document.getElementById('top-prizes-grid');
  const bountiesContainer = document.getElementById('bounties-grid');
  const vaultChest = document.getElementById('interactive-vault-chest');
  const currencyToggleBtn = document.getElementById('btn-currency-toggle');

  if (!topPrizesContainer || !window.COSMIC_DATA) return;

  let currentCurrency = 'INR';

  function renderPrizes() {
    const data = window.COSMIC_DATA.prizes;

    topPrizesContainer.innerHTML = data.top5.map((p, idx) => {
      const isFirst = idx === 0;
      let displayAmount = p.amount;
      if (currentCurrency === 'USD') {
        const usdVal = Math.round(parseInt(p.amount.replace(/[^0-9]/g, '')) / 85);
        displayAmount = `$${usdVal.toLocaleString()}`;
      } else if (currentCurrency === 'CREDITS') {
        const credVal = parseInt(p.amount.replace(/[^0-9]/g, '')) * 10;
        displayAmount = `${credVal.toLocaleString()} ⯎`;
      }

      return `
        <div class="prize-card ${isFirst ? 'winner-gold-card' : ''}" style="--rank-color: ${p.color}">
          <div class="prize-rank-ribbon" style="background: ${p.color}">
            ${p.rank}
          </div>

          <div class="prize-visor-trophy">
            <svg viewBox="0 0 100 100" class="trophy-svg">
              <path d="M25,20 L75,20 L70,55 C65,70 35,70 30,55 Z" fill="${p.color}22" stroke="${p.color}" stroke-width="4"/>
              <rect x="35" y="30" width="30" height="16" rx="8" fill="#72a9be"/>
              <path d="M25,25 L10,35 C10,48 22,50 28,45" fill="none" stroke="${p.color}" stroke-width="4"/>
              <path d="M75,25 L90,35 C90,48 78,50 72,45" fill="none" stroke="${p.color}" stroke-width="4"/>
              <rect x="44" y="65" width="12" height="15" fill="${p.color}"/>
              <rect x="25" y="80" width="50" height="10" rx="3" fill="#1e293b" stroke="${p.color}" stroke-width="3"/>
            </svg>
          </div>

          <div class="prize-amount-wrap">
            <span class="prize-cash glow-text" style="color: ${p.color}">${displayAmount}</span>
            <span class="prize-badge-title">${p.title}</span>
          </div>

          <div class="prize-perks-list">
            ${p.perks.map(perk => `
              <div class="prize-perk-item">
                <span class="perk-star" style="color: ${p.color}">★</span>
                <span>${perk}</span>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }).join('');

    if (bountiesContainer) {
      bountiesContainer.innerHTML = data.bounties.map(b => `
        <div class="bounty-card">
          <div class="bounty-top">
            <span class="bounty-cat">// ${b.category}</span>
            <span class="bounty-prize">${currentCurrency === 'USD' ? '$60' : b.prize}</span>
          </div>
          <h4 class="bounty-title">${b.title}</h4>
        </div>
      `).join('');
    }
  }

  renderPrizes();

  if (currencyToggleBtn) {
    currencyToggleBtn.addEventListener('click', () => {
      if (currentCurrency === 'INR') currentCurrency = 'USD';
      else if (currentCurrency === 'USD') currentCurrency = 'CREDITS';
      else currentCurrency = 'INR';

      currencyToggleBtn.textContent = `CURRENCY: [ ${currentCurrency} ]`;
      if (window.cosmicAudio) window.cosmicAudio.playBlip(800, 'sine', 0.08);
      renderPrizes();
    });
  }

  // Interactive Vault Click
  if (vaultChest) {
    vaultChest.addEventListener('click', () => {
      vaultChest.classList.toggle('vault-unlocked');
      if (window.cosmicAudio) {
        window.cosmicAudio.playVictoryFanfare();
      }
    });
  }
}

// ==========================================
// 7. SPONSORS FLEET
// ==========================================
function initSponsors() {
  const sponsorsContainer = document.getElementById('sponsors-fleet-container');
  if (!sponsorsContainer || !window.COSMIC_DATA) return;

  sponsorsContainer.innerHTML = window.COSMIC_DATA.sponsors.map(tier => `
    <div class="sponsor-tier-block">
      <div class="tier-heading-row">
        <span class="tier-badge">// ${tier.tier}</span>
        <div class="tier-line"></div>
      </div>

      <div class="sponsor-cards-grid">
        ${tier.companies.map(c => `
          <div class="sponsor-card">
            <div class="sponsor-card-inner">
              <div class="sponsor-logo-box">
                <span class="sponsor-icon-art">⯎</span>
                <span class="sponsor-company-name">${c.name}</span>
              </div>
              <span class="sponsor-role-tag">${c.role}</span>
              <p class="sponsor-perk">${c.perk}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

// ==========================================
// 8. CREW HOLO-ARCHIVE (GALLERY)
// ==========================================
function initGallery() {
  const galleryGrid = document.getElementById('gallery-grid');
  const galleryModal = document.getElementById('gallery-lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-image');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('close-gallery-modal');

  if (!galleryGrid || !window.COSMIC_DATA) return;

  galleryGrid.innerHTML = window.COSMIC_DATA.gallery.map(item => `
    <div class="gallery-holo-card" onclick="window.openMemory('${item.id}')">
      <div class="gallery-photo-frame">
        <img src="assets/images/${item.image}" alt="${item.title}" class="gallery-photo-img" loading="lazy" />
        <div class="gallery-holo-scanline"></div>
      </div>
      <div class="gallery-card-body">
        <div class="gallery-tag-row">
          <span class="gallery-tag">// ${item.tag}</span>
          <span class="gallery-year">${item.year}</span>
        </div>
        <h4 class="gallery-title">${item.title}</h4>
        <p class="gallery-caption">${item.caption}</p>
      </div>
    </div>
  `).join('');

  window.openMemory = (memId) => {
    const item = window.COSMIC_DATA.gallery.find(g => g.id === memId);
    if (!item || !galleryModal) return;

    if (window.cosmicAudio) window.cosmicAudio.playBlip(680, 'triangle', 0.08);

    if (lightboxImg) lightboxImg.src = `assets/images/${item.image}`;
    if (lightboxTitle) lightboxTitle.textContent = `${item.title} // ${item.year}`;
    if (lightboxCaption) lightboxCaption.textContent = item.caption;

    galleryModal.classList.add('active');
  };

  if (lightboxClose) {
    lightboxClose.addEventListener('click', () => {
      if (galleryModal) galleryModal.classList.remove('active');
    });
  }

  if (galleryModal) {
    galleryModal.addEventListener('click', (e) => {
      if (e.target === galleryModal) galleryModal.classList.remove('active');
    });
  }
}

// ==========================================
// 9. HOLOGRAPHIC FAQ ACCORDION
// ==========================================
function initFAQs() {
  const faqContainer = document.getElementById('faq-accordion-container');
  const faqSearch = document.getElementById('faq-search-input');

  if (!faqContainer || !window.COSMIC_DATA) return;

  function renderFaqs(query = '') {
    const list = window.COSMIC_DATA.faqs;
    const filtered = query.trim() === ''
      ? list
      : list.filter(f => f.q.toLowerCase().includes(query.toLowerCase()) || f.a.toLowerCase().includes(query.toLowerCase()));

    if (filtered.length === 0) {
      faqContainer.innerHTML = `
        <div class="faq-empty-state">
          <p>// NO MATCHING PROTOCOL TRANSMISSIONS FOUND</p>
        </div>
      `;
      return;
    }

    faqContainer.innerHTML = filtered.map((faq, idx) => `
      <div class="faq-item ${idx === 0 ? 'expanded' : ''}">
        <button class="faq-question-btn" onclick="window.toggleFaq(this)">
          <span class="faq-icon-prefix">[?]</span>
          <span class="faq-q-text">${faq.q}</span>
          <span class="faq-toggle-arrow">${idx === 0 ? '▼' : '▶'}</span>
        </button>
        <div class="faq-answer-panel" style="${idx === 0 ? 'display: block;' : 'display: none;'}">
          <p class="faq-a-text">${faq.a}</p>
        </div>
      </div>
    `).join('');
  }

  window.toggleFaq = (btn) => {
    const item = btn.parentElement;
    const panel = item.querySelector('.faq-answer-panel');
    const arrow = btn.querySelector('.faq-toggle-arrow');
    const isExpanded = item.classList.contains('expanded');

    if (isExpanded) {
      item.classList.remove('expanded');
      panel.style.display = 'none';
      arrow.textContent = '▶';
    } else {
      item.classList.add('expanded');
      panel.style.display = 'block';
      arrow.textContent = '▼';
      if (window.cosmicAudio) window.cosmicAudio.playBlip(550, 'sine', 0.05);
    }
  };

  if (faqSearch) {
    faqSearch.addEventListener('input', (e) => {
      renderFaqs(e.target.value);
    });
  }

  renderFaqs();
}

// ==========================================
// 10. EMERGENCY COMMS (SOS TRANSMISSION FORM)
// ==========================================
function initCommsForm() {
  const form = document.getElementById('comms-sos-form');
  const consoleOutput = document.getElementById('transmission-console-log');

  if (!form || !consoleOutput) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const callsign = document.getElementById('comms-callsign').value;
    const frequency = document.getElementById('comms-email').value;
    const message = document.getElementById('comms-message').value;

    if (window.cosmicAudio) {
      window.cosmicAudio.playWireConnect(true);
    }

    consoleOutput.innerHTML = `
      <div class="console-line text-cyan">&gt; ENCRYPTING FREQUENCY [${frequency}]...</div>
      <div class="console-line text-yellow">&gt; TRANSMITTING SOS PACKET FROM CREWMATE [${callsign}]...</div>
      <div class="console-line text-green">&gt; STATUS 200: TRANSMISSION DELIVERED TO COMMAND DECK!</div>
      <div class="console-line text-pink">&gt; EXPECT RESPONSE WITHIN 1 ORBIT CYCLE.</div>
    `;

    form.reset();
  });
}

// ==========================================
// 11. NAVIGATION & SCROLL REVEALS
// ==========================================
function initNavigation() {
  const nav = document.getElementById('main-navbar');
  const mobileToggle = document.getElementById('mobile-nav-toggle');
  const mobileDrawer = document.getElementById('mobile-nav-drawer');
  const navLinks = document.querySelectorAll('.nav-link, .drawer-link');

  // Scroll header styling
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      if (nav) nav.classList.add('nav-scrolled');
    } else {
      if (nav) nav.classList.remove('nav-scrolled');
    }
  });

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.toggle('active');
      mobileToggle.classList.toggle('open');
      if (window.cosmicAudio) window.cosmicAudio.playBlip(480, 'square', 0.05);
    });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileDrawer) mobileDrawer.classList.remove('active');
      if (mobileToggle) mobileToggle.classList.remove('open');
      if (window.cosmicAudio) window.cosmicAudio.playBlip(500, 'square', 0.04);
    });
  });
}

// ==========================================
// 12. AUDIO & SCANLINE CONTROLS
// ==========================================
function initAudioControls() {
  const audioBtn = document.getElementById('btn-audio-toggle');
  const crtBtn = document.getElementById('btn-crt-toggle');
  const crtOverlay = document.getElementById('crt-overlay');

  if (audioBtn) {
    audioBtn.addEventListener('click', () => {
      if (window.cosmicAudio) {
        const isMuted = window.cosmicAudio.toggleMute();
        audioBtn.innerHTML = isMuted
          ? `<span>🔇 SOUND: OFF</span>`
          : `<span>🔊 SOUND: ON</span>`;
        audioBtn.classList.toggle('sound-muted', isMuted);
      }
    });
  }

  if (crtBtn && crtOverlay) {
    crtBtn.addEventListener('click', () => {
      crtOverlay.classList.toggle('crt-disabled');
      const isDisabled = crtOverlay.classList.contains('crt-disabled');
      crtBtn.innerHTML = isDisabled
        ? `<span>📺 CRT: OFF</span>`
        : `<span>📺 CRT: ON</span>`;
      if (window.cosmicAudio) window.cosmicAudio.playBlip(700, 'sine', 0.05);
    });
  }
}
