/**
 * KidGenius Math Reveal Puzzle Engine
 * Children solve math operations to unlock and reveal the hidden dinosaur scene
 */

import { sounds } from '../audio.js';
import { SCENE_ILLUSTRATIONS, generateMathQuestions } from '../puzzles-data.js';

export class MathRevealGame {
  constructor(containerEl, config, onComplete) {
    this.container = containerEl;
    this.config = config; // { operationType: 'addition', grid: 3, sceneKey: 'bronto_lagoon' }
    this.onComplete = onComplete;
    this.grid = config.grid || 3;
    this.totalCells = this.grid * this.grid;
    this.sceneKey = config.sceneKey || 'bronto_lagoon';
    this.scene = SCENE_ILLUSTRATIONS[this.sceneKey] || SCENE_ILLUSTRATIONS.bronto_lagoon;
    this.questions = generateMathQuestions(config.operationType || 'addition', this.totalCells);
    this.currentQuestionIndex = 0;
    this.revealedCount = 0;
    this.boardSize = 360;
    this.cellSize = this.boardSize / this.grid;

    this.init();
  }

  init() {
    // Generate blob URL for background image slicing
    const svgBlob = new Blob([this.scene.svg], { type: 'image/svg+xml;charset=utf-8' });
    const URL = window.URL || window.webkitURL || window;
    this.blobURL = URL.createObjectURL(svgBlob);

    this.container.innerHTML = `
      <div class="flex flex-col items-center gap-4 w-full max-w-4xl mx-auto">
        <!-- Status Bar -->
        <div class="flex items-center justify-between w-full px-4 py-2 kg-glass-dark">
          <div class="flex items-center gap-2">
            <span class="text-2xl">🦖➕</span>
            <div>
              <h3 class="text-lg font-bold text-white leading-tight font-heading">Rompecabezas Matemático</h3>
              <p class="text-xs text-green-300 font-nunito font-semibold">Resuelve la operación para revelar la imagen misteriosa</p>
            </div>
          </div>
          <div class="text-right">
            <span class="text-xs text-yellow-200 block font-nunito font-bold">Progreso:</span>
            <span id="mathProgressText" class="text-base font-extrabold text-white font-heading">0 / ${this.totalCells}</span>
          </div>
        </div>

        <!-- Game Area -->
        <div class="flex flex-col lg:flex-row items-center justify-center gap-8 w-full mt-2">
          <!-- Mystery Image Grid -->
          <div class="flex flex-col items-center">
            <div id="mathBoard" class="relative rounded-3xl overflow-hidden border-4 border-purple-400/80 shadow-2xl bg-purple-950" style="width: ${this.boardSize}px; height: ${this.boardSize}px;">
              <div id="mathGridCells" class="grid w-full h-full" style="grid-template-columns: repeat(${this.grid}, 1fr); grid-template-rows: repeat(${this.grid}, 1fr);">
              </div>
            </div>
          </div>

          <!-- Active Question & Options Card -->
          <div class="flex flex-col items-center flex-1 w-full max-w-md">
            <div class="kg-glass p-6 w-full flex flex-col items-center text-center shadow-2xl border-4 border-yellow-300">
              <span class="text-xs uppercase tracking-wider font-extrabold text-purple-700 bg-yellow-200 px-3 py-1 rounded-full mb-3 font-heading">
                Pregunta <span id="qNumber">1</span> de ${this.totalCells}
              </span>
              
              <div id="qOperationText" class="text-4xl sm:text-5xl font-black text-purple-900 my-2 font-heading tracking-wide">
                ...
              </div>
              <p class="text-sm text-purple-600 font-bold font-nunito mb-6">¿Cuál es el resultado correcto?</p>

              <!-- Option Buttons -->
              <div id="qOptionsContainer" class="grid grid-cols-2 gap-4 w-full">
              </div>

              <div id="qFeedback" class="mt-4 min-h-[1.5rem] text-sm font-bold font-heading"></div>
            </div>
          </div>
        </div>
      </div>
    `;

    this.renderGrid();
    this.showQuestion();
  }

  renderGrid() {
    const gridContainer = this.container.querySelector('#mathGridCells');
    gridContainer.innerHTML = '';

    for (let i = 0; i < this.totalCells; i++) {
      const row = Math.floor(i / this.grid);
      const col = i % this.grid;

      const cell = document.createElement('div');
      cell.id = `mathCell_${i}`;
      cell.className = 'math-cell border border-purple-300/40 relative flex items-center justify-center';
      cell.style.backgroundImage = `url("${this.blobURL}")`;
      cell.style.backgroundSize = `${this.boardSize}px ${this.boardSize}px`;
      cell.style.backgroundPosition = `-${col * this.cellSize}px -${row * this.cellSize}px`;

      // Cover overlay (hidden until revealed)
      const cover = document.createElement('div');
      cover.className = 'cover-overlay absolute inset-0 bg-gradient-to-br from-purple-800 to-indigo-950 flex items-center justify-center text-white text-xl font-heading font-black shadow-inner transition-all duration-500 border border-purple-600/50';
      cover.innerHTML = `<span class="opacity-80 text-yellow-300">#${i + 1}</span>`;
      cell.appendChild(cover);

      gridContainer.appendChild(cell);
    }
  }

  showQuestion() {
    if (this.currentQuestionIndex >= this.totalCells) {
      setTimeout(() => {
        sounds.playVictory();
        if (this.onComplete) this.onComplete();
      }, 500);
      return;
    }

    const q = this.questions[this.currentQuestionIndex];
    const qNum = this.container.querySelector('#qNumber');
    const qText = this.container.querySelector('#qOperationText');
    const optsContainer = this.container.querySelector('#qOptionsContainer');
    const feedback = this.container.querySelector('#qFeedback');

    if (qNum) qNum.textContent = this.currentQuestionIndex + 1;
    if (qText) qText.textContent = `${q.text} = ?`;
    if (feedback) feedback.textContent = '';

    // Highlight the cell that is about to be unlocked
    const currentCell = this.container.querySelector(`#mathCell_${this.currentQuestionIndex} .cover-overlay`);
    if (currentCell) {
      currentCell.classList.add('bg-yellow-500', 'animate-pulse');
    }

    if (optsContainer) {
      optsContainer.innerHTML = '';
      q.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'math-option-card flex items-center justify-center';
        btn.textContent = opt;
        btn.addEventListener('click', () => this.handleAnswer(opt, q.answer, btn));
        optsContainer.appendChild(btn);
      });
    }
  }

  handleAnswer(selected, correct, btnEl) {
    const feedback = this.container.querySelector('#qFeedback');

    if (selected === correct) {
      sounds.playSnap();
      sounds.playStar();
      btnEl.classList.remove('border-[#BCA8F2]');
      btnEl.classList.add('bg-green-100', 'border-green-500', 'text-green-800');

      feedback.className = 'mt-4 min-h-[1.5rem] text-sm font-bold font-heading text-green-600 animate-bounce';
      feedback.textContent = '🌟 ¡Excelente! ¡Respuesta Correcta!';

      // Reveal the cell
      const cellCover = this.container.querySelector(`#mathCell_${this.currentQuestionIndex} .cover-overlay`);
      if (cellCover) {
        cellCover.style.opacity = '0';
        cellCover.style.transform = 'scale(0.3) rotate(20deg)';
        setTimeout(() => cellCover.remove(), 400);
      }

      this.revealedCount++;
      const progress = this.container.querySelector('#mathProgressText');
      if (progress) progress.textContent = `${this.revealedCount} / ${this.totalCells}`;

      this.currentQuestionIndex++;
      setTimeout(() => this.showQuestion(), 700);
    } else {
      sounds.playWrong();
      btnEl.classList.add('bg-red-100', 'border-red-500', 'text-red-700', 'animate-shake');
      feedback.className = 'mt-4 min-h-[1.5rem] text-sm font-bold font-heading text-orange-600';
      feedback.textContent = '🤔 ¡Casi! Inténtalo otra vez.';
      setTimeout(() => {
        btnEl.classList.remove('animate-shake');
      }, 500);
    }
  }
}
