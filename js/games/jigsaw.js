/**
 * KidGenius Jigsaw Puzzle Engine
 * Supports SVG slicing, touch/mouse drag & drop, snap tolerance & completion
 */

import { sounds } from '../audio.js';
import { SCENE_ILLUSTRATIONS } from '../puzzles-data.js';

export class JigsawGame {
  constructor(containerEl, config, onComplete) {
    this.container = containerEl;
    this.config = config; // { grid: 2|3|4, sceneKey: 'rexy_valley' }
    this.onComplete = onComplete;
    this.grid = config.grid || 2;
    this.sceneKey = config.sceneKey || 'rexy_valley';
    this.scene = SCENE_ILLUSTRATIONS[this.sceneKey] || SCENE_ILLUSTRATIONS.rexy_valley;
    this.pieces = [];
    this.placedCount = 0;
    this.totalPieces = this.grid * this.grid;
    this.boardSize = 360;
    this.pieceSize = this.boardSize / this.grid;
    this.activePiece = null;
    this.dragOffset = { x: 0, y: 0 };
    this.showPreview = false;

    this.init();
  }

  init() {
    this.container.innerHTML = `
      <div class="flex flex-col items-center gap-4 w-full max-w-4xl mx-auto">
        <!-- Controls Bar -->
        <div class="flex items-center justify-between w-full px-4 py-2 kg-glass-dark">
          <div class="flex items-center gap-2">
            <span class="text-2xl">🧩</span>
            <div>
              <h3 class="text-lg font-bold text-white leading-tight font-heading">${this.scene.title}</h3>
              <p class="text-xs text-yellow-300 font-nunito font-semibold">Piezas colocadas: <span id="placedCounter">0</span> / ${this.totalPieces}</p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <button id="btnPreviewGuide" class="btn-kg btn-kg-blue text-sm py-1.5 px-3">
              <span>👁️</span> <span class="hidden sm:inline">Ver Guía</span>
            </button>
            <button id="btnRestartPuzzle" class="btn-kg btn-kg-orange text-sm py-1.5 px-3">
              <span>🔄</span> <span class="hidden sm:inline">Reiniciar</span>
            </button>
          </div>
        </div>

        <!-- Puzzle Workspace -->
        <div class="flex flex-col lg:flex-row items-center justify-center gap-6 w-full mt-2">
          <!-- Snap Target Board -->
          <div class="flex flex-col items-center">
            <div id="jigsawBoard" class="puzzle-board relative" style="width: ${this.boardSize}px; height: ${this.boardSize}px;">
              <!-- Background Ghost / Preview -->
              <div id="ghostPreview" class="absolute inset-0 opacity-20 pointer-events-none transition-opacity duration-300">
                ${this.scene.svg}
              </div>
              <!-- Grid Snap Guidelines -->
              <div class="absolute inset-0 grid" style="grid-template-columns: repeat(${this.grid}, 1fr); grid-template-rows: repeat(${this.grid}, 1fr); pointer-events: none;">
                ${Array(this.totalPieces).fill(0).map((_, i) => `<div class="border border-purple-400 border-dashed opacity-40"></div>`).join('')}
              </div>
              <!-- Placed Pieces Container -->
              <div id="placedPiecesContainer" class="absolute inset-0 pointer-events-none"></div>
            </div>
          </div>

          <!-- Tray of Loose Pieces -->
          <div class="flex flex-col items-center flex-1 w-full max-w-md">
            <div class="text-sm font-bold text-yellow-300 mb-2 font-heading flex items-center gap-2">
              <span>👇</span> Arrastra las piezas al tablero:
            </div>
            <div id="piecesTray" class="relative w-full h-[380px] bg-purple-950/60 rounded-3xl border-2 border-purple-400/40 p-3 overflow-hidden shadow-inner flex flex-wrap gap-2 items-center justify-center">
            </div>
          </div>
        </div>
      </div>
    `;

    this.setupEventListeners();
    this.createPieces();
  }

  setupEventListeners() {
    const btnPreview = this.container.querySelector('#btnPreviewGuide');
    const ghost = this.container.querySelector('#ghostPreview');
    const btnRestart = this.container.querySelector('#btnRestartPuzzle');

    btnPreview.addEventListener('click', () => {
      sounds.playClick();
      this.showPreview = !this.showPreview;
      ghost.classList.toggle('opacity-20', !this.showPreview);
      ghost.classList.toggle('opacity-80', this.showPreview);
      btnPreview.classList.toggle('btn-kg-green', this.showPreview);
      btnPreview.classList.toggle('btn-kg-blue', !this.showPreview);
    });

    btnRestart.addEventListener('click', () => {
      sounds.playClick();
      this.init();
    });

    // Global mouse/touch move & up
    window.addEventListener('pointermove', this.onPointerMove.bind(this));
    window.addEventListener('pointerup', this.onPointerUp.bind(this));
    window.addEventListener('pointercancel', this.onPointerUp.bind(this));
  }

  createPieces() {
    const tray = this.container.querySelector('#piecesTray');
    this.pieces = [];
    this.placedCount = 0;

    // Convert SVG to dataURL image to slice cleanly in CSS
    const svgBlob = new Blob([this.scene.svg], { type: 'image/svg+xml;charset=utf-8' });
    const URL = window.URL || window.webkitURL || window;
    const blobURL = URL.createObjectURL(svgBlob);

    const pieceIndices = Array.from({ length: this.totalPieces }, (_, i) => i);
    // Shuffle pieces
    pieceIndices.sort(() => Math.random() - 0.5);

    pieceIndices.forEach((idx, trayPos) => {
      const row = Math.floor(idx / this.grid);
      const col = idx % this.grid;

      const pieceEl = document.createElement('div');
      pieceEl.className = 'puzzle-piece';
      pieceEl.dataset.index = idx;
      pieceEl.dataset.correctRow = row;
      pieceEl.dataset.correctCol = col;

      pieceEl.style.width = `${this.pieceSize}px`;
      pieceEl.style.height = `${this.pieceSize}px`;
      pieceEl.style.backgroundImage = `url("${blobURL}")`;
      pieceEl.style.backgroundSize = `${this.boardSize}px ${this.boardSize}px`;
      pieceEl.style.backgroundPosition = `-${col * this.pieceSize}px -${row * this.pieceSize}px`;
      pieceEl.style.borderRadius = '12px';
      pieceEl.style.border = '2px solid rgba(255, 255, 255, 0.8)';
      pieceEl.style.boxShadow = '0 6px 12px rgba(0,0,0,0.35)';

      // Initial random scattering in tray
      const trayWidth = tray.clientWidth || 320;
      const trayHeight = tray.clientHeight || 340;
      const maxLeft = Math.max(10, trayWidth - this.pieceSize - 20);
      const maxTop = Math.max(10, trayHeight - this.pieceSize - 20);

      const randomLeft = Math.random() * maxLeft;
      const randomTop = Math.random() * maxTop;

      pieceEl.style.left = `${randomLeft}px`;
      pieceEl.style.top = `${randomTop}px`;

      pieceEl.addEventListener('pointerdown', (e) => this.onPiecePointerDown(e, pieceEl, idx, row, col));

      tray.appendChild(pieceEl);
      this.pieces.push({ el: pieceEl, index: idx, row, col, placed: false });
    });
  }

  onPiecePointerDown(e, pieceEl, idx, row, col) {
    if (pieceEl.classList.contains('placed')) return;
    e.preventDefault();
    sounds.playPop();

    this.activePiece = {
      el: pieceEl,
      idx,
      row,
      col,
      startX: e.clientX,
      startY: e.clientY
    };

    pieceEl.classList.add('dragging');
    // Bring piece to document root / high z-index overlay while dragging
    const rect = pieceEl.getBoundingClientRect();
    this.dragOffset = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };

    document.body.appendChild(pieceEl);
    pieceEl.style.position = 'fixed';
    pieceEl.style.left = `${e.clientX - this.dragOffset.x}px`;
    pieceEl.style.top = `${e.clientY - this.dragOffset.y}px`;
  }

  onPointerMove(e) {
    if (!this.activePiece) return;
    this.activePiece.el.style.left = `${e.clientX - this.dragOffset.x}px`;
    this.activePiece.el.style.top = `${e.clientY - this.dragOffset.y}px`;
  }

  onPointerUp(e) {
    if (!this.activePiece) return;

    const piece = this.activePiece;
    const board = this.container.querySelector('#jigsawBoard');
    const boardRect = board.getBoundingClientRect();
    const pieceRect = piece.el.getBoundingClientRect();

    // Check target position on board
    const targetLeft = boardRect.left + piece.col * this.pieceSize;
    const targetTop = boardRect.top + piece.row * this.pieceSize;

    // Center distance calculation
    const currentCenterX = pieceRect.left + pieceRect.width / 2;
    const currentCenterY = pieceRect.top + pieceRect.height / 2;
    const targetCenterX = targetLeft + this.pieceSize / 2;
    const targetCenterY = targetTop + this.pieceSize / 2;

    const distance = Math.hypot(currentCenterX - targetCenterX, currentCenterY - targetCenterY);
    const snapTolerance = this.pieceSize * 0.55;

    if (distance < snapTolerance) {
      // Correct Snap!
      sounds.playSnap();
      piece.el.classList.remove('dragging');
      piece.el.classList.add('placed');
      piece.el.style.position = 'absolute';
      piece.el.style.left = `${piece.col * this.pieceSize}px`;
      piece.el.style.top = `${piece.row * this.pieceSize}px`;
      piece.el.style.border = 'none';
      piece.el.style.borderRadius = '0';
      piece.el.style.boxShadow = 'none';

      const placedContainer = this.container.querySelector('#placedPiecesContainer');
      placedContainer.appendChild(piece.el);

      this.placedCount++;
      const counterEl = this.container.querySelector('#placedCounter');
      if (counterEl) counterEl.textContent = this.placedCount;

      if (this.placedCount >= this.totalPieces) {
        setTimeout(() => {
          sounds.playVictory();
          if (this.onComplete) this.onComplete();
        }, 500);
      }
    } else {
      // Return to tray
      sounds.playClick();
      piece.el.classList.remove('dragging');
      piece.el.style.position = 'absolute';
      const tray = this.container.querySelector('#piecesTray');
      const trayRect = tray.getBoundingClientRect();

      let returnX = pieceRect.left - trayRect.left;
      let returnY = pieceRect.top - trayRect.top;

      returnX = Math.max(10, Math.min(trayRect.width - this.pieceSize - 10, returnX));
      returnY = Math.max(10, Math.min(trayRect.height - this.pieceSize - 10, returnY));

      piece.el.style.left = `${returnX}px`;
      piece.el.style.top = `${returnY}px`;
      tray.appendChild(piece.el);
    }

    this.activePiece = null;
  }

  destroy() {
    window.removeEventListener('pointermove', this.onPointerMove);
    window.removeEventListener('pointerup', this.onPointerUp);
    window.removeEventListener('pointercancel', this.onPointerUp);
  }
}
