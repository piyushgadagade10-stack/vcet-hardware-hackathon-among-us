/**
 * Cosmic Crew Hackathon - Interactive Mini-Games & Easter Eggs
 * 1. "Fix Wiring" Ship Task Mini-Game
 * 2. "Emergency Meeting" Voting & Ejection Simulator
 */

class CosmicMinigames {
  constructor() {
    this.wiringColors = ['#ff2a2a', '#00f0ff', '#ffe600', '#ed54ba'];
    this.leftWires = [];
    this.rightWires = [];
    this.connectedWires = {};
    this.activeWire = null;
    this.init();
  }

  init() {
    this.setupEmergencyMeeting();
    this.setupWiringGame();
  }

  // ==========================================
  // 1. EMERGENCY MEETING & EJECTION SIMULATOR
  // ==========================================
  setupEmergencyMeeting() {
    const triggerBtns = document.querySelectorAll('.btn-emergency-trigger');
    const modal = document.getElementById('emergency-modal');
    const closeBtn = document.getElementById('close-emergency-modal');

    triggerBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.openEmergencyMeeting();
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        if (modal) modal.classList.remove('active');
      });
    }

    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
      });
    }
  }

  openEmergencyMeeting() {
    const modal = document.getElementById('emergency-modal');
    const content = document.getElementById('emergency-modal-content');
    if (!modal || !content) return;

    if (window.cosmicAudio) {
      window.cosmicAudio.playEmergencyAlarm();
    }

    // Flash emergency warning overlay
    document.body.classList.add('emergency-siren-active');
    setTimeout(() => document.body.classList.remove('emergency-siren-active'), 1800);

    const crewList = window.COSMIC_DATA ? window.COSMIC_DATA.crewmates : [];
    
    content.innerHTML = `
      <div class="emergency-header">
        <div class="emergency-title-box">
          <span class="emergency-badge">EMERGENCY PROTOCOL</span>
          <h2 class="emergency-title">EMERGENCY MEETING CALLED</h2>
          <p class="emergency-subtitle">Who is the Impostor attempting to sabotage the hackathon?</p>
        </div>
      </div>

      <div class="crew-vote-grid">
        ${crewList.map(crew => `
          <div class="crew-vote-card" data-crew-id="${crew.id}" data-crew-name="${crew.name}">
            <div class="crew-avatar-frame" style="border-color: ${crew.color}">
              <svg viewBox="0 0 100 120" class="crew-svg-avatar">
                <!-- Backpack -->
                <rect x="15" y="40" width="20" height="50" rx="8" fill="${crew.shadow}" stroke="#000" stroke-width="4" />
                <rect x="18" y="44" width="14" height="42" rx="6" fill="${crew.color}" />
                <!-- Body -->
                <path d="M40,25 C60,25 75,35 75,60 L75,95 L60,95 L60,82 L45,82 L45,95 L30,95 L30,60 C30,35 40,25 40,25 Z" fill="${crew.color}" stroke="#000" stroke-width="4" />
                <path d="M30,75 C45,85 65,85 75,75 L75,95 L60,95 L60,82 L45,82 L45,95 L30,95 Z" fill="${crew.shadow}" />
                <!-- Visor -->
                <rect x="52" y="38" width="36" height="22" rx="10" fill="#000" />
                <rect x="54" y="40" width="32" height="18" rx="8" fill="#72a9be" />
                <rect x="58" y="43" width="18" height="6" rx="3" fill="#c5eaf8" />
              </svg>
            </div>
            <div class="crew-info">
              <span class="crew-name" style="color: ${crew.color}">${crew.name}</span>
              <span class="crew-role">${crew.role}</span>
            </div>
            <button class="btn-vote-crew" onclick="window.cosmicMinigames.voteEject('${crew.name}', '${crew.id === 'red'}')">
              VOTE SUS
            </button>
          </div>
        `).join('')}
      </div>

      <div class="emergency-footer">
        <button class="btn-arcade btn-skip-vote" onclick="window.cosmicMinigames.skipVote()">
          [ SKIP VOTE ]
        </button>
      </div>
    `;

    modal.classList.add('active');
  }

  voteEject(crewName, isImpostor) {
    const modal = document.getElementById('emergency-modal');
    const content = document.getElementById('emergency-modal-content');
    if (!content) return;

    if (window.cosmicAudio) {
      window.cosmicAudio.playBlip(200, 'sawtooth', 0.2);
    }

    content.innerHTML = `
      <div class="ejection-screen">
        <div class="ejection-stars"></div>
        <div class="ejected-crewmate-anim">
          <svg viewBox="0 0 100 120" class="floating-ejected-svg">
            <rect x="15" y="40" width="20" height="50" rx="8" fill="#555" stroke="#000" stroke-width="4" />
            <path d="M40,25 C60,25 75,35 75,60 L75,95 L60,95 L60,82 L45,82 L45,95 L30,95 L30,60 C30,35 40,25 40,25 Z" fill="#c51111" stroke="#000" stroke-width="4" />
            <rect x="54" y="40" width="32" height="18" rx="8" fill="#72a9be" />
          </svg>
        </div>
        <div class="ejection-text-container">
          <h2 class="ejection-text typewriter">${crewName} was ${isImpostor ? 'An Impostor.' : 'not An Impostor.'}</h2>
          <p class="ejection-subtext">${isImpostor ? '0 Impostors remain. THE HACKATHON IS SAFE!' : '1 Impostor remains among the crew.'}</p>
        </div>
        <button class="btn-arcade mt-6" onclick="document.getElementById('emergency-modal').classList.remove('active')">
          RETURN TO MOTHERSHIP
        </button>
      </div>
    `;

    if (isImpostor && window.cosmicAudio) {
      setTimeout(() => window.cosmicAudio.playVictoryFanfare(), 600);
    }
  }

  skipVote() {
    const content = document.getElementById('emergency-modal-content');
    if (!content) return;

    content.innerHTML = `
      <div class="ejection-screen">
        <div class="ejection-text-container">
          <h2 class="ejection-text typewriter">No one was ejected. (Skipped)</h2>
          <p class="ejection-subtext">1 Impostor remains among us. Stay alert!</p>
        </div>
        <button class="btn-arcade mt-6" onclick="document.getElementById('emergency-modal').classList.remove('active')">
          RETURN TO WORK
        </button>
      </div>
    `;
  }

  // ==========================================
  // 2. FIX WIRING INTERACTIVE MINI-GAME
  // ==========================================
  setupWiringGame() {
    const startBtn = document.getElementById('btn-start-wiring-task');
    const modal = document.getElementById('wiring-modal');
    const closeBtn = document.getElementById('close-wiring-modal');

    if (startBtn) {
      startBtn.addEventListener('click', () => {
        this.openWiringGame();
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        if (modal) modal.classList.remove('active');
      });
    }

    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
      });
    }
  }

  openWiringGame() {
    const modal = document.getElementById('wiring-modal');
    const container = document.getElementById('wiring-game-container');
    if (!modal || !container) return;

    this.connectedWires = {};
    const colors = ['#ff2a2a', '#00f0ff', '#ffe600', '#ed54ba'];
    const shuffledRight = [...colors].sort(() => Math.random() - 0.5);

    container.innerHTML = `
      <div class="wiring-box">
        <div class="wiring-header">
          <span class="wiring-title">// ELECTRICAL: FIX WIRING</span>
          <span id="wires-connected-count" class="wiring-status">0/4 WIRES</span>
        </div>

        <div class="wiring-board" id="wiring-board">
          <svg class="wiring-svg-layer" id="wiring-svg-layer"></svg>

          <div class="wire-column left-wires">
            ${colors.map((c, i) => `
              <div class="wire-node-wrap left-node" data-color="${c}" data-index="${i}">
                <div class="wire-terminal" style="background-color: ${c}; box-shadow: 0 0 10px ${c};"></div>
                <div class="wire-pin left-pin" data-color="${c}" id="left-pin-${i}"></div>
              </div>
            `).join('')}
          </div>

          <div class="wire-column right-wires">
            ${shuffledRight.map((c, i) => `
              <div class="wire-node-wrap right-node" data-color="${c}" data-index="${i}">
                <div class="wire-pin right-pin" data-color="${c}" id="right-pin-${i}"></div>
                <div class="wire-terminal" style="background-color: ${c}; box-shadow: 0 0 10px ${c};"></div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="wiring-footer">
          <p class="wiring-instruction">DRAG FROM LEFT WIRE TERMINAL TO MATCHING RIGHT COLOR</p>
        </div>
      </div>
    `;

    modal.classList.add('active');
    this.attachWiringEvents();
  }

  attachWiringEvents() {
    const board = document.getElementById('wiring-board');
    const svg = document.getElementById('wiring-svg-layer');
    const leftPins = document.querySelectorAll('.left-pin');
    const rightPins = document.querySelectorAll('.right-pin');

    let currentLine = null;
    let activeStartPin = null;
    let currentColor = null;

    leftPins.forEach(pin => {
      const startDrag = (e) => {
        if (this.connectedWires[pin.dataset.color]) return; // Already connected

        activeStartPin = pin;
        currentColor = pin.dataset.color;

        const boardRect = board.getBoundingClientRect();
        const pinRect = pin.getBoundingClientRect();
        const startX = pinRect.left + pinRect.width / 2 - boardRect.left;
        const startY = pinRect.top + pinRect.height / 2 - boardRect.top;

        currentLine = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        currentLine.setAttribute('stroke', currentColor);
        currentLine.setAttribute('stroke-width', '8');
        currentLine.setAttribute('fill', 'none');
        currentLine.setAttribute('stroke-linecap', 'round');
        currentLine.setAttribute('filter', 'drop-shadow(0 0 6px ' + currentColor + ')');
        svg.appendChild(currentLine);

        if (window.cosmicAudio) {
          window.cosmicAudio.playBlip(500, 'triangle', 0.05);
        }

        const moveDrag = (ev) => {
          if (!currentLine) return;
          const clientX = ev.clientX || (ev.touches && ev.touches[0].clientX);
          const clientY = ev.clientY || (ev.touches && ev.touches[0].clientY);
          const curX = clientX - boardRect.left;
          const curY = clientY - boardRect.top;

          // Smooth curve path
          const dx = (curX - startX) * 0.5;
          const d = `M ${startX} ${startY} C ${startX + dx} ${startY}, ${curX - dx} ${curY}, ${curX} ${curY}`;
          currentLine.setAttribute('d', d);
        };

        const endDrag = (ev) => {
          document.removeEventListener('mousemove', moveDrag);
          document.removeEventListener('mouseup', endDrag);
          document.removeEventListener('touchmove', moveDrag);
          document.removeEventListener('touchend', endDrag);

          if (!currentLine) return;

          // Check if released over matching right pin
          const clientX = ev.clientX || (ev.changedTouches && ev.changedTouches[0].clientX);
          const clientY = ev.clientY || (ev.changedTouches && ev.changedTouches[0].clientY);

          let matched = false;
          rightPins.forEach(rPin => {
            const rRect = rPin.getBoundingClientRect();
            if (
              clientX >= rRect.left - 15 && clientX <= rRect.right + 15 &&
              clientY >= rRect.top - 15 && clientY <= rRect.bottom + 15
            ) {
              if (rPin.dataset.color === currentColor) {
                // SUCCESS MATCH!
                matched = true;
                this.connectedWires[currentColor] = true;
                const endX = rRect.left + rRect.width / 2 - boardRect.left;
                const endY = rRect.top + rRect.height / 2 - boardRect.top;
                const dx = (endX - startX) * 0.5;
                currentLine.setAttribute('d', `M ${startX} ${startY} C ${startX + dx} ${startY}, ${endX - dx} ${endY}, ${endX} ${endY}`);

                if (window.cosmicAudio) {
                  window.cosmicAudio.playWireConnect(true);
                }
                this.checkWiringCompletion();
              }
            }
          });

          if (!matched) {
            svg.removeChild(currentLine);
            if (window.cosmicAudio) {
              window.cosmicAudio.playWireConnect(false);
            }
          }

          currentLine = null;
          activeStartPin = null;
        };

        document.addEventListener('mousemove', moveDrag);
        document.addEventListener('mouseup', endDrag);
        document.addEventListener('touchmove', moveDrag);
        document.addEventListener('touchend', endDrag);
      };

      pin.addEventListener('mousedown', startDrag);
      pin.addEventListener('touchstart', startDrag);
    });
  }

  checkWiringCompletion() {
    const count = Object.keys(this.connectedWires).length;
    const statusElem = document.getElementById('wires-connected-count');
    if (statusElem) statusElem.textContent = `${count}/4 WIRES`;

    if (count === 4) {
      if (window.cosmicAudio) {
        setTimeout(() => window.cosmicAudio.playTaskCompleted(), 300);
      }

      const board = document.getElementById('wiring-board');
      if (board) {
        const badge = document.createElement('div');
        badge.className = 'task-completed-stamp';
        badge.innerHTML = `
          <div class="stamp-glow">
            <h3>TASK COMPLETED!</h3>
            <p>ELECTRICAL CIRCUITS RESTORED</p>
            <span class="xp-gain">+500 CREW EXP</span>
          </div>
        `;
        board.appendChild(badge);
      }
    }
  }
}

// Global instance
window.addEventListener('DOMContentLoaded', () => {
  window.cosmicMinigames = new CosmicMinigames();
});
