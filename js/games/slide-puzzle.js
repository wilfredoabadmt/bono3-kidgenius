/**
 * KidGenius Dinosaur Slide Puzzle Engine
 * Interactive slide puzzle (8-puzzle / 15-puzzle) with dinosaur icons and numbers
 */

import { sounds } from '../audio.js';

export class SlidePuzzleGame {
  constructor(containerEl, config, onComplete) {
    this.container = containerEl;
    this.config = config; // { grid: 3|4 }
    this.onComplete = onComplete;
    this.grid = config.grid || 3;
    this.size = this.grid * this.grid;
    this.tiles = [];
    this.moves = 0;
    this.seconds = 0;
    this.timer = null;
    this.dinoIcons = ['🦖', '🦕', '🌿', '🌴', '🌋', '💎', '🌸', '✨', '⚡', '⭐', '🔥', '👑', '🦴', '🏆', '🎯'];

    this.init();
  }

  init() {
    this.moves = 0;
    this.seconds = 0;
    if (this.timer) clearInterval(this.timer);

    this.container.innerHTML = `
      <div class="flex flex-col items-center gap-4 w-full max-w-3xl mx-auto">
        <!-- Status Bar -->
        <div class="flex items-center justify-between w-full px-4 py-2 kg-glass-dark">
          <div class="flex items-center gap-2">
            <span class="text-2xl">🧩</span>
            <div>
              <h3 class="text-lg font-bold text-white leading-tight font-heading">Deslizador Jurásico</h3>
              <p class="text-xs text-yellow-300 font-nunito font-semibold">Ordena los números de menor a mayor deslizando las fichas</p>
            </div>
          </div>
          <div class="flex items-center gap-4">
            <div class="text-center">
              <span class="text-xs text-yellow-200 block font-nunito font-bold">Movimientos</span>
              <span id="slideMoveCounter" class="text-lg font-extrabold text-white font-heading">0</span>
            </div>
            <div class="text-center">
              <span class="text-xs text-yellow-200 block font-nunito font-bold">Tiempo</span>
              <span id="slideTimer" class="text-lg font-extrabold text-white font-heading">00:00</span>
            </div>
            <button id="btnShuffleSlide" class="btn-kg btn-kg-orange text-xs py-1 px-3">
              <span>🔀</span> Mezclar
            </button>
          </div>
        </div>

        <!-- Puzzle Grid Board -->
        <div class="p-4 kg-glass rounded-3xl shadow-2xl flex flex-col items-center mt-2">
          <div id="slideGridBoard" class="slide-grid" style="grid-template-columns: repeat(${this.grid}, 1fr); width: 340px; height: 340px;">
          </div>
        </div>
      </div>
    `;

    this.container.querySelector('#btnShuffleSlide').addEventListener('click', () => {
      sounds.playClick();
      this.shuffle();
    });

    this.startTimer();
    this.shuffle();
  }

  startTimer() {
    this.timer = setInterval(() => {
      this.seconds++;
      const mins = String(Math.floor(this.seconds / 60)).padStart(2, '0');
      const secs = String(this.seconds % 60).padStart(2, '0');
      const timerEl = this.container.querySelector('#slideTimer');
      if (timerEl) timerEl.textContent = `${mins}:${secs}`;
    }, 1000);
  }

  shuffle() {
    // Solvable permutation generator
    let arr = Array.from({ length: this.size - 1 }, (_, i) => i + 1);
    arr.push(null); // empty tile

    // Simulate random valid moves to ensure solvability
    for (let i = 0; i < 80; i++) {
      const emptyIdx = arr.indexOf(null);
      const row = Math.floor(emptyIdx / this.grid);
      const col = emptyIdx % this.grid;
      const validNeighbors = [];

      if (row > 0) validNeighbors.push(emptyIdx - this.grid);
      if (row < this.grid - 1) validNeighbors.push(emptyIdx + this.grid);
      if (col > 0) validNeighbors.push(emptyIdx - 1);
      if (col < this.grid - 1) validNeighbors.push(emptyIdx + 1);

      const chosen = validNeighbors[Math.floor(Math.random() * validNeighbors.length)];
      arr[emptyIdx] = arr[chosen];
      arr[chosen] = null;
    }

    this.tiles = arr;
    this.moves = 0;
    const moveEl = this.container.querySelector('#slideMoveCounter');
    if (moveEl) moveEl.textContent = '0';
    this.renderBoard();
  }

  renderBoard() {
    const board = this.container.querySelector('#slideGridBoard');
    if (!board) return;
    board.innerHTML = '';

    this.tiles.forEach((val, idx) => {
      const tileEl = document.createElement('div');
      if (val === null) {
        tileEl.className = 'slide-tile empty';
      } else {
        tileEl.className = 'slide-tile';
        const icon = this.dinoIcons[(val - 1) % this.dinoIcons.length];
        tileEl.innerHTML = `
          <div class="flex flex-col items-center justify-center pointer-events-none">
            <span class="text-xl sm:text-2xl">${icon}</span>
            <span class="text-sm font-extrabold text-purple-900">${val}</span>
          </div>
        `;
        tileEl.addEventListener('click', () => this.tryMoveTile(idx));
      }
      board.appendChild(tileEl);
    });
  }

  tryMoveTile(index) {
    const emptyIdx = this.tiles.indexOf(null);
    const row = Math.floor(index / this.grid);
    const col = index % this.grid;
    const emptyRow = Math.floor(emptyIdx / this.grid);
    const emptyCol = emptyIdx % this.grid;

    // Check adjacency
    const isAdjacent = (Math.abs(row - emptyRow) + Math.abs(col - emptyCol)) === 1;

    if (isAdjacent) {
      sounds.playPop();
      this.tiles[emptyIdx] = this.tiles[index];
      this.tiles[index] = null;
      this.moves++;

      const moveEl = this.container.querySelector('#slideMoveCounter');
      if (moveEl) moveEl.textContent = this.moves;

      this.renderBoard();
      this.checkWin();
    } else {
      sounds.playWrong();
    }
  }

  checkWin() {
    for (let i = 0; i < this.size - 1; i++) {
      if (this.tiles[i] !== i + 1) return false;
    }
    if (this.tiles[this.size - 1] !== null) return false;

    // Won!
    if (this.timer) clearInterval(this.timer);
    sounds.playVictory();
    setTimeout(() => {
      if (this.onComplete) this.onComplete();
    }, 600);
    return true;
  }

  destroy() {
    if (this.timer) clearInterval(this.timer);
  }
}
