/**
 * Cosmic Crew Hackathon - Canvas 2D Animation Engine
 * Starfield, Floating Among Us Astronauts, Asteroids & Radar HUD
 */

class CosmicSpaceEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.width = 0;
    this.height = 0;
    this.stars = [];
    this.shootingStars = [];
    this.asteroids = [];
    this.astronauts = [];
    this.radarAngle = 0;
    this.mouse = { x: -1000, y: -1000, isHovering: false };
    this.lastTime = 0;
    this.animId = null;
    this.activeSpeech = null;

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());
    window.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    this.canvas.addEventListener('click', (e) => this.handleClick(e));

    this.createStars(180);
    this.createAsteroids(12);
    this.createAstronauts(6);

    this.animate(0);
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width * window.devicePixelRatio;
    this.canvas.height = this.height * window.devicePixelRatio;
    this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;
  }

  handleMouseMove(e) {
    const rect = this.canvas.getBoundingClientRect();
    this.mouse.x = e.clientX - rect.left;
    this.mouse.y = e.clientY - rect.top;
  }

  handleClick(e) {
    const rect = this.canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    // Check if clicked an astronaut
    for (let astro of this.astronauts) {
      const dx = clickX - astro.x;
      const dy = clickY - astro.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < astro.size * 1.5) {
        astro.angularVel += (Math.random() - 0.5) * 0.2;
        astro.vx += (Math.random() - 0.5) * 2;
        astro.vy += (Math.random() - 0.5) * 2;
        
        const dialogues = [
          "I was doing wires in Admin!",
          "Red is acting mega SUS!",
          "Don't vote me, I have medbay scan!",
          "Where was the body?!",
          "I saw Cyan vent in Electrical!",
          "Emergency meeting called!",
          "30 Hours of pure hacking!",
          "Is that an Impostor?",
          "₹50,000 jackpot is mine!"
        ];
        const text = dialogues[Math.floor(Math.random() * dialogues.length)];
        this.triggerSpeechBubble(astro.x, astro.y, text, astro.color);
        if (window.cosmicAudio) {
          window.cosmicAudio.playBlip(600 + Math.random() * 400, 'triangle', 0.1);
        }
        break;
      }
    }
  }

  triggerSpeechBubble(x, y, text, color) {
    this.activeSpeech = {
      x, y, text, color,
      alpha: 1.0,
      createdAt: Date.now()
    };
  }

  createStars(count) {
    this.stars = [];
    const colors = ['#ffffff', '#00f0ff', '#ff007f', '#ffe600', '#a855f7', '#70ffe6'];
    for (let i = 0; i < count; i++) {
      this.stars.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        size: Math.random() * 2 + 0.5,
        speed: Math.random() * 0.3 + 0.05,
        twinkleSpeed: Math.random() * 0.03 + 0.01,
        twinklePhase: Math.random() * Math.PI * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        layer: Math.floor(Math.random() * 3) + 1
      });
    }
  }

  createAsteroids(count) {
    this.asteroids = [];
    for (let i = 0; i < count; i++) {
      this.asteroids.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        size: Math.random() * 14 + 6,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        angle: Math.random() * Math.PI * 2,
        angularVel: (Math.random() - 0.5) * 0.01,
        points: this.generateAsteroidPoints()
      });
    }
  }

  generateAsteroidPoints() {
    const pts = [];
    const numPoints = 7;
    for (let i = 0; i < numPoints; i++) {
      const a = (i / numPoints) * Math.PI * 2;
      const r = 0.7 + Math.random() * 0.5;
      pts.push({ a, r });
    }
    return pts;
  }

  createAstronauts(count) {
    const crewTypes = [
      { id: 'red', color: '#c51111', highlight: '#f62d31', shadow: '#7a0838', hat: 'devil-horns', name: 'Red' },
      { id: 'cyan', color: '#38fedc', highlight: '#70ffe6', shadow: '#24a89c', hat: 'plant', name: 'Cyan' },
      { id: 'lime', color: '#50ef39', highlight: '#8cfb7b', shadow: '#24941e', hat: 'egg', name: 'Lime' },
      { id: 'pink', color: '#ed54ba', highlight: '#f58ce0', shadow: '#ab2b84', hat: 'flower', name: 'Pink' },
      { id: 'yellow', color: '#f5f557', highlight: '#ffff99', shadow: '#c2bc16', hat: 'cheese', name: 'Yellow' },
      { id: 'purple', color: '#6b2fbb', highlight: '#9b5be8', shadow: '#3b1770', hat: 'mini-crew', name: 'Purple' }
    ];

    this.astronauts = [];
    for (let i = 0; i < count; i++) {
      const type = crewTypes[i % crewTypes.length];
      this.astronauts.push({
        ...type,
        x: Math.random() * (this.width - 100) + 50,
        y: Math.random() * (this.height - 100) + 50,
        size: 26 + Math.random() * 12,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        angle: Math.random() * Math.PI * 2,
        angularVel: (Math.random() - 0.5) * 0.015,
        impostor: i === 0, // First astronaut is secretly the Impostor
        flip: Math.random() > 0.5
      });
    }
  }

  spawnShootingStar() {
    if (Math.random() < 0.015 && this.shootingStars.length < 3) {
      this.shootingStars.push({
        x: Math.random() * this.width * 0.8,
        y: Math.random() * this.height * 0.4,
        length: Math.random() * 80 + 40,
        speed: Math.random() * 8 + 6,
        angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2,
        life: 1.0,
        decay: Math.random() * 0.03 + 0.015,
        color: Math.random() > 0.5 ? '#00f0ff' : '#ff007f'
      });
    }
  }

  animate(time) {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // 1. Draw Starfield
    this.drawStars();

    // 2. Draw Shooting Stars
    this.spawnShootingStar();
    this.drawShootingStars();

    // 3. Draw Asteroids
    this.drawAsteroids();

    // 4. Draw Floating Astronauts
    this.drawAstronauts();

    // 5. Draw Active Speech Bubble
    this.drawSpeechBubble();

    this.animId = requestAnimationFrame((t) => this.animate(t));
  }

  drawStars() {
    for (let star of this.stars) {
      star.y += star.speed;
      if (star.y > this.height) {
        star.y = 0;
        star.x = Math.random() * this.width;
      }

      star.twinklePhase += star.twinkleSpeed;
      const alpha = 0.4 + Math.sin(star.twinklePhase) * 0.5;

      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0.1, Math.min(1.0, alpha));
      this.ctx.fillStyle = star.color;
      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      this.ctx.fill();

      // Subtle glow for larger stars
      if (star.size > 1.8) {
        this.ctx.globalAlpha = alpha * 0.3;
        this.ctx.beginPath();
        this.ctx.arc(star.x, star.y, star.size * 2.5, 0, Math.PI * 2);
        this.ctx.fill();
      }
      this.ctx.restore();
    }
  }

  drawShootingStars() {
    for (let i = this.shootingStars.length - 1; i >= 0; i--) {
      const s = this.shootingStars[i];
      s.x += Math.cos(s.angle) * s.speed;
      s.y += Math.sin(s.angle) * s.speed;
      s.life -= s.decay;

      if (s.life <= 0 || s.x > this.width || s.y > this.height) {
        this.shootingStars.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.globalAlpha = s.life;
      const grad = this.ctx.createLinearGradient(
        s.x, s.y,
        s.x - Math.cos(s.angle) * s.length,
        s.y - Math.sin(s.angle) * s.length
      );
      grad.addColorStop(0, '#ffffff');
      grad.addColorStop(0.3, s.color);
      grad.addColorStop(1, 'transparent');

      this.ctx.strokeStyle = grad;
      this.ctx.lineWidth = 2.5;
      this.ctx.beginPath();
      this.ctx.moveTo(s.x, s.y);
      this.ctx.lineTo(
        s.x - Math.cos(s.angle) * s.length,
        s.y - Math.sin(s.angle) * s.length
      );
      this.ctx.stroke();
      this.ctx.restore();
    }
  }

  drawAsteroids() {
    for (let ast of this.asteroids) {
      ast.x += ast.vx;
      ast.y += ast.vy;
      ast.angle += ast.angularVel;

      // Wrap around bounds
      if (ast.x < -50) ast.x = this.width + 50;
      if (ast.x > this.width + 50) ast.x = -50;
      if (ast.y < -50) ast.y = this.height + 50;
      if (ast.y > this.height + 50) ast.y = -50;

      this.ctx.save();
      this.ctx.translate(ast.x, ast.y);
      this.ctx.rotate(ast.angle);

      this.ctx.fillStyle = '#1c2230';
      this.ctx.strokeStyle = '#2d3748';
      this.ctx.lineWidth = 1.5;

      this.ctx.beginPath();
      for (let i = 0; i < ast.points.length; i++) {
        const pt = ast.points[i];
        const px = Math.cos(pt.a) * (ast.size * pt.r);
        const py = Math.sin(pt.a) * (ast.size * pt.r);
        if (i === 0) this.ctx.moveTo(px, py);
        else this.ctx.lineTo(px, py);
      }
      this.ctx.closePath();
      this.ctx.fill();
      this.ctx.stroke();

      // Mini crater
      this.ctx.fillStyle = '#121721';
      this.ctx.beginPath();
      this.ctx.arc(ast.size * 0.2, -ast.size * 0.2, ast.size * 0.25, 0, Math.PI * 2);
      this.ctx.fill();

      this.ctx.restore();
    }
  }

  drawAstronauts() {
    for (let astro of this.astronauts) {
      astro.x += astro.vx;
      astro.y += astro.vy;
      astro.angle += astro.angularVel;

      // Wrap around screen
      if (astro.x < -80) astro.x = this.width + 80;
      if (astro.x > this.width + 80) astro.x = -80;
      if (astro.y < -80) astro.y = this.height + 80;
      if (astro.y > this.height + 80) astro.y = -80;

      this.ctx.save();
      this.ctx.translate(astro.x, astro.y);
      this.ctx.rotate(astro.angle);
      if (astro.flip) {
        this.ctx.scale(-1, 1);
      }

      this.drawSingleAmongUs(astro);
      this.ctx.restore();
    }
  }

  // Authentic Among Us Crewmate Vector Renderer
  drawSingleAmongUs(astro) {
    const s = astro.size / 30; // Base scale factor
    const ctx = this.ctx;

    ctx.save();
    ctx.scale(s, s);

    // Thick Black Outline
    ctx.strokeStyle = '#0a0a14';
    ctx.lineWidth = 3.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // 1. Backpack (Oxygen Tank)
    ctx.fillStyle = astro.shadow;
    ctx.beginPath();
    ctx.roundRect(-24, -12, 12, 26, [6, 0, 0, 6]);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = astro.color;
    ctx.beginPath();
    ctx.roundRect(-22, -10, 8, 22, [4, 0, 0, 4]);
    ctx.fill();

    // 2. Main Body (Bean shape + Legs)
    ctx.fillStyle = astro.color;
    ctx.beginPath();
    // Head / top curve
    ctx.arc(0, -14, 18, Math.PI, 0, false);
    // Right side
    ctx.lineTo(18, 14);
    // Right leg
    ctx.lineTo(18, 26);
    ctx.lineTo(7, 26);
    ctx.lineTo(7, 18);
    // Crotch
    ctx.lineTo(-7, 18);
    // Left leg
    ctx.lineTo(-7, 26);
    ctx.lineTo(-18, 26);
    ctx.lineTo(-18, 14);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Shadow on bottom/legs
    ctx.fillStyle = astro.shadow;
    ctx.beginPath();
    ctx.moveTo(-18, 10);
    ctx.bezierCurveTo(-10, 16, 10, 16, 18, 10);
    ctx.lineTo(18, 26);
    ctx.lineTo(7, 26);
    ctx.lineTo(7, 18);
    ctx.lineTo(-7, 18);
    ctx.lineTo(-7, 26);
    ctx.lineTo(-18, 26);
    ctx.closePath();
    ctx.fill();

    // 3. Visor Glass
    // Visor border
    ctx.fillStyle = '#0a0a14';
    ctx.beginPath();
    ctx.roundRect(0, -14, 22, 14, 7);
    ctx.fill();

    // Visor dark cyan base
    ctx.fillStyle = '#72a9be';
    ctx.beginPath();
    ctx.roundRect(2, -12, 18, 10, 5);
    ctx.fill();

    // Visor light reflection
    ctx.fillStyle = '#c5eaf8';
    ctx.beginPath();
    ctx.roundRect(4, -11, 12, 4, 2);
    ctx.fill();

    // White gloss dot
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(6, -9, 1.2, 0, Math.PI * 2);
    ctx.fill();

    // 4. Custom Hat Accessories
    this.drawHat(astro.hat, ctx);

    ctx.restore();
  }

  drawHat(hatType, ctx) {
    if (!hatType) return;

    if (hatType === 'plant') {
      // Green Sprout
      ctx.strokeStyle = '#228b22';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(0, -32);
      ctx.lineTo(0, -38);
      ctx.stroke();

      ctx.fillStyle = '#32cd32';
      ctx.beginPath();
      ctx.ellipse(-4, -40, 5, 2.5, -Math.PI / 4, 0, Math.PI * 2);
      ctx.ellipse(4, -40, 5, 2.5, Math.PI / 4, 0, Math.PI * 2);
      ctx.fill();
    } else if (hatType === 'devil-horns') {
      ctx.fillStyle = '#ff1111';
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(-10, -32);
      ctx.lineTo(-16, -42);
      ctx.lineTo(-6, -34);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(6, -34);
      ctx.lineTo(16, -42);
      ctx.lineTo(10, -32);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    } else if (hatType === 'cheese') {
      ctx.fillStyle = '#ffd700';
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(-10, -32);
      ctx.lineTo(12, -32);
      ctx.lineTo(8, -44);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      // Holes
      ctx.fillStyle = '#d4af37';
      ctx.beginPath();
      ctx.arc(-2, -36, 2, 0, Math.PI * 2);
      ctx.arc(4, -38, 1.5, 0, Math.PI * 2);
      ctx.fill();
    } else if (hatType === 'mini-crew') {
      // Mini purple crewmate on head
      ctx.fillStyle = '#9b5be8';
      ctx.beginPath();
      ctx.roundRect(-6, -44, 12, 12, 4);
      ctx.fill();
      ctx.fillStyle = '#72a9be';
      ctx.beginPath();
      ctx.roundRect(0, -42, 6, 4, 2);
      ctx.fill();
    }
  }

  drawSpeechBubble() {
    if (!this.activeSpeech) return;
    const s = this.activeSpeech;
    const elapsed = Date.now() - s.createdAt;
    if (elapsed > 3500) {
      this.activeSpeech = null;
      return;
    }

    const fade = elapsed > 2800 ? 1 - (elapsed - 2800) / 700 : 1;
    this.ctx.save();
    this.ctx.globalAlpha = Math.max(0, fade);

    this.ctx.font = 'bold 12px "VT323", "Courier New", monospace';
    const textWidth = this.ctx.measureText(s.text).width;
    const bubbleW = textWidth + 24;
    const bubbleH = 32;
    const bx = Math.min(this.width - bubbleW - 20, Math.max(20, s.x - bubbleW / 2));
    const by = s.y - 65;

    // Bubble Background
    this.ctx.fillStyle = '#0f172a';
    this.ctx.strokeStyle = '#00f0ff';
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.roundRect(bx, by, bubbleW, bubbleH, 6);
    this.ctx.fill();
    this.ctx.stroke();

    // Pointer beak
    this.ctx.beginPath();
    this.ctx.moveTo(s.x - 6, by + bubbleH);
    this.ctx.lineTo(s.x, by + bubbleH + 8);
    this.ctx.lineTo(s.x + 6, by + bubbleH);
    this.ctx.fillStyle = '#0f172a';
    this.ctx.fill();

    // Text
    this.ctx.fillStyle = '#00f0ff';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText(s.text, bx + bubbleW / 2, by + bubbleH / 2);

    this.ctx.restore();
  }
}

// Instantiate upon DOM load
window.addEventListener('DOMContentLoaded', () => {
  window.spaceEngine = new CosmicSpaceEngine('space-canvas');
});
