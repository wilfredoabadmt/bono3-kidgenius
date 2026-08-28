/**
 * KidGenius Tangram Dinosaur Game Engine
 * Children fit geometric pieces into the prehistoric dinosaur silhouette
 */

import { sounds } from '../audio.js';

export class TangramGame {
  constructor(containerEl, config, onComplete) {
    this.container = containerEl;
    this.config = config;
    this.onComplete = onComplete;
    this.placedPieces = 0;
    this.totalPieces = 4;
    this.activePiece = null;
    this.dragOffset = { x: 0, y: 0 };

    this.init();
  }

  init() {
    this.container.innerHTML = `
      <div class="flex flex-col items-center gap-4 w-full max-w-3xl mx-auto">
        <!-- Status Bar -->
        <div class="flex items-center justify-between w-full px-4 py-2 kg-glass-dark">
          <div class="flex items-center gap-2">
            <span class="text-2xl">📐🦕</span>
            <div>
              <h3 class="text-lg font-bold text-white leading-tight font-heading">Tangram Jurásico</h3>
              <p class="text-xs text-yellow-300 font-nunito font-semibold">Arrastra las formas geométricas y encájalas en la silueta</p>
            </div>
          </div>
          <div class="text-right">
            <span class="text-xs text-yellow-200 block font-nunito font-bold">Piezas Encajadas:</span>
            <span id="tangramCounter" class="text-base font-extrabold text-white font-heading">0 / 4</span>
          </div>
        </div>

        <!-- Tangram Workspace -->
        <div class="flex flex-col lg:flex-row items-center justify-center gap-6 w-full mt-2">
          <!-- Silhouette Target Board -->
          <div class="relative bg-purple-950/80 p-6 rounded-3xl border-4 border-yellow-400 shadow-2xl flex items-center justify-center" style="width: 340px; height: 340px;">
            <svg viewBox="0 0 300 300" width="100%" height="100%" class="opacity-60">
              <!-- Silhouette outline of dinosaur / star tangram -->
              <polygon points="150,30 250,130 150,130" fill="#4B2C99" stroke="#FFC928" stroke-width="3" stroke-dasharray="6"/>
              <polygon points="50,130 150,130 150,230" fill="#4B2C99" stroke="#FFC928" stroke-width="3" stroke-dasharray="6"/>
              <polygon points="150,130 250,130 250,230 150,230" fill="#4B2C99" stroke="#FFC928" stroke-width="3" stroke-dasharray="6"/>
              <polygon points="150,230 250,230 200,280" fill="#4B2C99" stroke="#FFC928" stroke-width="3" stroke-dasharray="6"/>
            </svg>

            <!-- Target Drop Zones -->
            <div id="dropZone_0" class="absolute border-2 border-dashed border-yellow-300/40 rounded-xl" style="width: 90px; height: 90px; top: 40px; left: 140px;" data-piece="0"></div>
            <div id="dropZone_1" class="absolute border-2 border-dashed border-yellow-300/40 rounded-xl" style="width: 90px; height: 90px; top: 120px; left: 50px;" data-piece="1"></div>
            <div id="dropZone_2" class="absolute border-2 border-dashed border-yellow-300/40 rounded-xl" style="width: 90px; height: 90px; top: 120px; left: 145px;" data-piece="2"></div>
            <div id="dropZone_3" class="absolute border-2 border-dashed border-yellow-300/40 rounded-xl" style="width: 90px; height: 70px; top: 220px; left: 150px;" data-piece="3"></div>
          </div>

          <!-- Loose Shapes Tray -->
          <div class="flex flex-col items-center flex-1 w-full max-w-sm">
            <div class="text-sm font-bold text-yellow-300 mb-2 font-heading">
              👇 Formas geométricas disponibles:
            </div>
            <div id="tangramTray" class="relative w-full h-[320px] bg-purple-950/60 rounded-3xl border-2 border-purple-400/40 p-4 flex flex-wrap gap-4 items-center justify-around">
              <!-- Shape 0: Green Triangle -->
              <div id="piece_0" class="tangram-shape cursor-grab touch-none" data-piece="0" style="width: 90px; height: 90px;">
                <svg viewBox="0 0 100 100" width="100%" height="100%">
                  <polygon points="0,0 100,100 0,100" fill="#7AC943" stroke="#4F9A25" stroke-width="4"/>
                </svg>
              </div>

              <!-- Shape 1: Blue Triangle -->
              <div id="piece_1" class="tangram-shape cursor-grab touch-none" data-piece="1" style="width: 90px; height: 90px;">
                <svg viewBox="0 0 100 100" width="100%" height="100%">
                  <polygon points="100,0 0,100 100,100" fill="#38A9E8" stroke="#2B78C5" stroke-width="4"/>
                </svg>
              </div>

              <!-- Shape 2: Orange Square -->
              <div id="piece_2" class="tangram-shape cursor-grab touch-none" data-piece="2" style="width: 85px; height: 85px;">
                <svg viewBox="0 0 100 100" width="100%" height="100%">
                  <rect width="90" height="90" rx="8" fill="#FF8A25" stroke="#D4660C" stroke-width="4"/>
                </svg>
              </div>

              <!-- Shape 3: Yellow Polygon -->
              <div id="piece_3" class="tangram-shape cursor-grab touch-none" data-piece="3" style="width: 90px; height: 65px;">
                <svg viewBox="0 0 100 70" width="100%" height="100%">
                  <polygon points="0,0 100,0 50,70" fill="#FFC928" stroke="#D9A00A" stroke-width="4"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    this.setupInteractions();
  }

  setupInteractions() {
    const shapes = this.container.querySelectorAll('.tangram-shape');
    shapes.forEach(shape => {
      shape.addEventListener('pointerdown', (e) => this.onPointerDown(e, shape));
    });

    window.addEventListener('pointermove', this.onPointerMove.bind(this));
    window.addEventListener('pointerup', this.onPointerUp.bind(this));
    window.addEventListener('pointercancel', this.onPointerUp.bind(this));
  }

  onPointerDown(e, shape) {
    if (shape.dataset.placed === 'true') return;
    e.preventDefault();
    sounds.playPop();

    const rect = shape.getBoundingClientRect();
    this.activePiece = {
      el: shape,
      pieceId: shape.dataset.piece,
      parent: shape.parentElement
    };

    this.dragOffset = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };

    shape.style.position = 'fixed';
    shape.style.zIndex = '1000';
    shape.style.left = `${e.clientX - this.dragOffset.x}px`;
    shape.style.top = `${e.clientY - this.dragOffset.y}px`;
    document.body.appendChild(shape);
  }

  onPointerMove(e) {
    if (!this.activePiece) return;
    this.activePiece.el.style.left = `${e.clientX - this.dragOffset.x}px`;
    this.activePiece.el.style.top = `${e.clientY - this.dragOffset.y}px`;
  }

  onPointerUp(e) {
    if (!this.activePiece) return;

    const piece = this.activePiece;
    const dropZone = this.container.querySelector(`#dropZone_${piece.pieceId}`);

    if (dropZone) {
      const dropRect = dropZone.getBoundingClientRect();
      const pieceRect = piece.el.getBoundingClientRect();

      const centerX = pieceRect.left + pieceRect.width / 2;
      const centerY = pieceRect.top + pieceRect.height / 2;
      const dropCenterX = dropRect.left + dropRect.width / 2;
      const dropCenterY = dropRect.top + dropRect.height / 2;

      const dist = Math.hypot(centerX - dropCenterX, centerY - dropCenterY);

      if (dist < 75) {
        // Snap!
        sounds.playSnap();
        piece.el.dataset.placed = 'true';
        piece.el.style.position = 'absolute';
        piece.el.style.left = '0px';
        piece.el.style.top = '0px';
        piece.el.style.zIndex = '10';
        piece.el.style.pointerEvents = 'none';
        dropZone.appendChild(piece.el);

        this.placedPieces++;
        const counter = this.container.querySelector('#tangramCounter');
        if (counter) counter.textContent = `${this.placedPieces} / ${this.totalPieces}`;

        if (this.placedPieces >= this.totalPieces) {
          setTimeout(() => {
            sounds.playVictory();
            if (this.onComplete) this.onComplete();
          }, 500);
        }
        this.activePiece = null;
        return;
      }
    }

    // Return to tray
    sounds.playClick();
    piece.el.style.position = 'relative';
    piece.el.style.left = 'auto';
    piece.el.style.top = 'auto';
    piece.el.style.zIndex = '1';
    piece.parent.appendChild(piece.el);

    this.activePiece = null;
  }

  destroy() {
    window.removeEventListener('pointermove', this.onPointerMove);
    window.removeEventListener('pointerup', this.onPointerUp);
    window.removeEventListener('pointercancel', this.onPointerUp);
  }
}
