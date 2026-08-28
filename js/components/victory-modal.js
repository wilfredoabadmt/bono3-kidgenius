/**
 * KidGenius Victory Celebration Modal
 * Confetti bursts, star ratings, coin animations and voice congratulations
 */

import { sounds } from '../audio.js';
import { store } from '../state.js';
import { CHARACTERS } from '../characters.js';

export class VictoryModal {
  constructor(containerEl, levelInfo, onNext, onMap) {
    this.container = containerEl;
    this.levelInfo = levelInfo;
    this.onNext = onNext;
    this.onMap = onMap;
    this.earnedStars = 3;
    this.earnedCoins = 50;

    this.init();
  }

  init() {
    const avatarId = store.state.profile.avatarId || 'geni';
    const char = CHARACTERS.find(c => c.id === avatarId) || CHARACTERS[0];
    const childName = store.state.profile.firstName || 'Campeón';

    this.container.innerHTML = `
      <div id="victoryOverlay" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-purple-950/85 backdrop-blur-md">
        <!-- Confetti Canvas -->
        <canvas id="confettiCanvas" class="absolute inset-0 pointer-events-none z-10 w-full h-full"></canvas>

        <div class="kg-glass max-w-lg w-full p-6 sm:p-8 flex flex-col items-center text-center animate-pop relative border-4 border-yellow-300 shadow-2xl z-20">
          <!-- Mascot Floating Top Badge -->
          <div class="w-24 h-24 mb-1 animate-bounce-soft">
            ${char.avatarSvg}
          </div>

          <div class="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-yellow-300 text-purple-950 font-black text-xs uppercase tracking-widest font-heading mb-2">
            <span>🎉</span> ¡NIVEL COMPLETADO CON ÉXITO! <span>🎉</span>
          </div>

          <h2 class="text-3xl sm:text-4xl font-black text-purple-950 font-heading mb-1">
            ¡Felicitaciones, ${childName}! 🌟
          </h2>
          <p class="text-sm text-purple-800 font-bold font-nunito mb-4">
            "${char.victory}"
          </p>

          <!-- 3 Stars Animation -->
          <div class="flex items-center justify-center gap-3 my-2">
            <span class="text-5xl text-yellow-400 drop-shadow-md animate-bounce" style="animation-delay: 0.1s">⭐</span>
            <span class="text-6xl text-yellow-400 drop-shadow-lg animate-bounce" style="animation-delay: 0.25s">⭐</span>
            <span class="text-5xl text-yellow-400 drop-shadow-md animate-bounce" style="animation-delay: 0.4s">⭐</span>
          </div>

          <!-- Reward Box -->
          <div class="flex items-center justify-center gap-6 my-4 py-3 px-6 bg-purple-100 rounded-2xl w-full border-2 border-purple-200">
            <div class="flex items-center gap-2">
              <span class="text-2xl">⭐</span>
              <div class="text-left">
                <span class="text-xs text-purple-600 font-bold block">Estrellas</span>
                <span class="text-lg font-black text-purple-950 font-heading">+${this.earnedStars}</span>
              </div>
            </div>
            <div class="h-8 w-px bg-purple-300"></div>
            <div class="flex items-center gap-2">
              <span class="text-2xl">🪙</span>
              <div class="text-left">
                <span class="text-xs text-purple-600 font-bold block">Monedas Dino</span>
                <span class="text-lg font-black text-purple-950 font-heading">+${this.earnedCoins}</span>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-col sm:flex-row items-center gap-3 w-full mt-2">
            <button id="btnVictoryNext" class="btn-kg btn-kg-green text-base py-3 px-6 w-full shadow-lg flex-1">
              <span>🚀</span> ¡Siguiente Reto!
            </button>
            <button id="btnVictoryMap" class="btn-kg btn-kg-yellow text-base py-3 px-6 w-full sm:w-auto shadow-md">
              <span>🗺️</span> Mapa
            </button>
          </div>
        </div>
      </div>
    `;

    sounds.speak(`¡Excelente trabajo, ${childName}! Has ganado tres estrellas brillantes.`);
    this.launchConfetti();
    this.setupEvents();
  }

  setupEvents() {
    const btnNext = this.container.querySelector('#btnVictoryNext');
    const btnMap = this.container.querySelector('#btnVictoryMap');

    btnNext.addEventListener('click', () => {
      sounds.playClick();
      this.container.innerHTML = '';
      if (this.onNext) this.onNext();
    });

    btnMap.addEventListener('click', () => {
      sounds.playClick();
      this.container.innerHTML = '';
      if (this.onMap) this.onMap();
    });
  }

  launchConfetti() {
    const canvas = this.container.querySelector('#confettiCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const colors = ['#7AC943', '#38A9E8', '#FF8A25', '#FFC928', '#FF5E8E', '#FFFFFF'];

    for (let i = 0; i < 100; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: (Math.random() - 0.5) * 16,
        vy: (Math.random() - 0.8) * 16,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        vr: (Math.random() - 0.5) * 10
      });
    }

    let frame = 0;
    const animate = () => {
      if (frame > 90) return;
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.35; // gravity
        p.rotation += p.vr;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      });

      requestAnimationFrame(animate);
    };

    animate();
  }
}
