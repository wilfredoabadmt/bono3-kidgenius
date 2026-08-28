/* KidGenius Club - Bono #3: Calendario de Aventuras
   Motor Interactivo de Ejecución y Validación de Misiones Diarias */

class MissionRunner {
  constructor() {
    this.currentMission = null;
    this.canvas = document.getElementById('confetti-canvas');
    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
    this.confettiParticles = [];
    this.confettiAnimationId = null;
    this.initCanvas();
  }

  initCanvas() {
    if (!this.canvas) return;
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());
  }

  resizeCanvas() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  openMission(dayNumber) {
    const mission = window.MISSIONS_DATA.find(m => m.day === dayNumber);
    if (!mission) return;

    this.currentMission = mission;
    window.soundEngine.playPop();

    const modal = document.getElementById('mission-modal');
    const content = document.getElementById('mission-modal-body');
    const isCompleted = window.appState.isDayCompleted(dayNumber);

    content.innerHTML = `
      <div class="mission-modal-header">
        <span class="mission-day-tag">
          ${mission.icon} DÍA ${mission.day} de 30 · Semana ${mission.week}
        </span>
        <h2 class="mission-title">${mission.title}</h2>
      </div>

      <div class="mission-story-box">
        <div class="mission-geni-mini">🦖</div>
        <div class="mission-story-text">${mission.story}</div>
      </div>

      <div class="mission-game-arena">
        <div class="visual-items-container">
          ${mission.visuals.map(v => `<span class="visual-item">${v}</span>`).join('')}
        </div>
        <div class="math-question-large">${mission.question}</div>
        
        <div class="options-grid" id="options-container">
          ${mission.options.map(opt => `
            <button class="option-btn" onclick="window.missionRunner.checkAnswer('${opt}', this)">
              ${opt}
            </button>
          `).join('')}
        </div>
      </div>

      ${isCompleted ? `
        <div style="text-align: center; color: var(--kg-verde-dark); font-weight: 800; margin-top: 10px;">
          ✅ ¡Ya superaste esta misión anteriormente! Puedes volver a practicarla.
        </div>
      ` : ''}
    `;

    modal.classList.add('active');
  }

  checkAnswer(selectedOption, buttonEl) {
    if (!this.currentMission) return;

    const isCorrect = selectedOption.trim() === this.currentMission.correct.trim();

    if (isCorrect) {
      buttonEl.classList.add('correct');
      window.soundEngine.playSuccess();
      this.triggerConfetti();

      // Completar en el estado
      const isNewCompletion = window.appState.completeDay(
        this.currentMission.day,
        this.currentMission.reward.sticker
      );

      setTimeout(() => {
        this.showVictoryScreen(isNewCompletion);
      }, 700);

    } else {
      buttonEl.classList.add('wrong');
      window.soundEngine.playWrong();
      
      setTimeout(() => {
        buttonEl.classList.remove('wrong');
      }, 600);
    }
  }

  showVictoryScreen(isNew) {
    const mission = this.currentMission;
    const content = document.getElementById('mission-modal-body');
    window.soundEngine.playFanfare();

    content.innerHTML = `
      <div class="victory-screen">
        <div class="victory-badge-dino">${mission.reward.sticker || '🦖'}</div>
        <h2 class="victory-title">¡MISIÓN CUMPLIDA!</h2>
        <p style="font-size: 16px; font-weight: 700; color: var(--kg-gray);">
          ¡Excelente trabajo, Pequeño Genio! Has dominado el desafío del Día ${mission.day}.
        </p>

        <div class="victory-reward-box">
          <span class="reward-sticker">${mission.reward.sticker}</span>
          <div class="reward-details">
            <div class="reward-label">🏆 Recompensa Desbloqueada</div>
            <div class="reward-name">${mission.reward.name} (+3 ⭐)</div>
          </div>
        </div>

        <div style="display: flex; gap: 12px; width: 100%; max-width: 400px; margin-top: 12px;">
          <button class="btn-kg btn-kg-primary" style="flex: 1;" onclick="window.missionRunner.closeMission()">
            Continuar Aventura 🚀
          </button>
        </div>
      </div>
    `;

    // Actualizar UI
    if (window.calendarUI) {
      window.calendarUI.render();
    }
  }

  closeMission() {
    const modal = document.getElementById('mission-modal');
    if (modal) {
      modal.classList.remove('active');
    }
    this.currentMission = null;
  }

  triggerConfetti() {
    if (!this.canvas || !this.ctx) return;
    this.resizeCanvas();

    this.confettiParticles = [];
    const colors = ['#7AC943', '#FFC928', '#38A9E8', '#FF8A25', '#35206F', '#FF4757'];

    for (let i = 0; i < 90; i++) {
      this.confettiParticles.push({
        x: this.canvas.width / 2 + (Math.random() * 200 - 100),
        y: this.canvas.height / 2 + (Math.random() * 100 - 50),
        r: Math.random() * 8 + 4,
        d: Math.random() * 90,
        color: colors[Math.floor(Math.random() * colors.length)],
        tilt: Math.floor(Math.random() * 10) - 10,
        tiltAngleIncremental: Math.random() * 0.07 + 0.05,
        tiltAngle: 0,
        vx: (Math.random() - 0.5) * 14,
        vy: Math.random() * -12 - 4
      });
    }

    if (this.confettiAnimationId) {
      cancelAnimationFrame(this.confettiAnimationId);
    }
    this.animateConfetti();
  }

  animateConfetti() {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    let stillActive = false;
    this.confettiParticles.forEach(p => {
      p.tiltAngle += p.tiltAngleIncremental;
      p.y += (Math.cos(p.d) + 3 + p.r / 2) / 2;
      p.x += Math.sin(p.d);
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.35; // Gravedad
      p.tilt = Math.sin(p.tiltAngle) * 15;

      if (p.y < this.canvas.height) {
        stillActive = true;
      }

      this.ctx.beginPath();
      this.ctx.lineWidth = p.r / 2;
      this.ctx.strokeStyle = p.color;
      this.ctx.moveTo(p.x + p.tilt + p.r / 4, p.y);
      this.ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 4);
      this.ctx.stroke();
    });

    if (stillActive) {
      this.confettiAnimationId = requestAnimationFrame(() => this.animateConfetti());
    } else {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }
}

window.missionRunner = new MissionRunner();
