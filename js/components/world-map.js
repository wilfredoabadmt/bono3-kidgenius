/**
 * KidGenius World Map & Level Selector
 * Visual prehistoric islands with levels, star ratings and progress
 */

import { sounds } from '../audio.js';
import { store } from '../state.js';
import { WORLDS_DATA } from '../puzzles-data.js';

export class WorldMap {
  constructor(containerEl, onSelectLevel, onViewDiploma) {
    this.container = containerEl;
    this.onSelectLevel = onSelectLevel;
    this.onViewDiploma = onViewDiploma;
    this.activeWorldId = 'valle';

    this.init();
  }

  init() {
    this.render();
  }

  render() {
    const userLevels = store.state.levels || {};
    const currentWorld = WORLDS_DATA.find(w => w.id === this.activeWorldId) || WORLDS_DATA[0];

    this.container.innerHTML = `
      <div class="flex flex-col items-center gap-6 w-full max-w-5xl mx-auto px-4">
        <!-- Worlds Navigation Tabs -->
        <div class="flex flex-wrap items-center justify-center gap-3 w-full">
          ${WORLDS_DATA.map(w => `
            <button class="world-tab-btn btn-kg ${w.id === this.activeWorldId ? 'btn-kg-yellow scale-105' : 'btn-kg-purple'} text-sm py-2 px-4 shadow-md flex items-center gap-2" data-world="${w.id}">
              <span class="text-xl">${w.icon}</span>
              <span>${w.name}</span>
            </button>
          `).join('')}
        </div>

        <!-- Selected Island Panel -->
        <div class="kg-glass p-6 sm:p-8 w-full flex flex-col items-center relative overflow-hidden shadow-2xl border-4 border-yellow-300">
          <!-- Header of World -->
          <div class="flex flex-col sm:flex-row items-center justify-between w-full border-b-2 border-purple-200/80 pb-4 mb-6 gap-4">
            <div class="flex items-center gap-3">
              <span class="text-4xl p-3 bg-purple-100 rounded-3xl shadow-inner">${currentWorld.icon}</span>
              <div>
                <h2 class="text-2xl sm:text-3xl font-black text-purple-950 font-heading leading-tight">${currentWorld.name}</h2>
                <p class="text-xs sm:text-sm text-purple-700 font-bold font-nunito">${currentWorld.subtitle}</p>
              </div>
            </div>

            <!-- Claim Diploma Button -->
            <button id="btnClaimDiploma" class="btn-kg btn-kg-orange text-sm py-2 px-4 shadow-md flex items-center gap-2">
              <span>🎓</span> Ver Diploma Oficial
            </button>
          </div>

          <!-- Level Nodes Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
            ${currentWorld.levels.map((lvl, index) => {
              const lvlState = userLevels[lvl.id] || { unlocked: index === 0, completed: false, stars: 0 };
              const isUnlocked = lvlState.unlocked || index === 0;
              const isCompleted = lvlState.completed;
              const stars = lvlState.stars || 0;

              return `
                <div class="level-card relative p-5 rounded-3xl transition-all duration-300 flex flex-col items-center text-center ${isUnlocked ? 'bg-white shadow-xl hover:-translate-y-2 border-3 border-purple-200 cursor-pointer' : 'bg-purple-950/20 border-2 border-dashed border-purple-300/40 opacity-70 cursor-not-allowed'}" data-level-id="${lvl.id}" data-unlocked="${isUnlocked}">
                  <!-- Node Icon & Level Number -->
                  <div class="level-node ${isCompleted ? 'level-completed' : (isUnlocked ? 'level-unlocked' : 'level-locked')} mb-3">
                    <span class="text-xl">${lvl.icon}</span>
                    <span class="text-[10px] font-bold mt-[-4px]">#${index + 1}</span>
                  </div>

                  <h4 class="text-base font-bold text-purple-950 font-heading mb-1">${lvl.title}</h4>
                  <span class="text-xs text-purple-600 font-bold font-nunito bg-purple-50 px-2.5 py-0.5 rounded-full mb-3">
                    ${lvl.type === 'jigsaw' ? '🧩 Rompecabezas' : (lvl.type === 'math' ? '🦖➕ Reto Matemático' : (lvl.type === 'slide' ? '🧩 Deslizador' : '📐 Tangram'))}
                  </span>

                  <!-- Stars Rating Display -->
                  <div class="flex items-center gap-1 mb-3">
                    ${[1, 2, 3].map(s => `
                      <span class="text-lg ${s <= stars ? 'text-yellow-400 drop-shadow-sm' : 'text-gray-300'}">★</span>
                    `).join('')}
                  </div>

                  <!-- Action Button -->
                  <button class="btn-kg ${isCompleted ? 'btn-kg-green' : (isUnlocked ? 'btn-kg-yellow' : 'btn-kg-purple opacity-50')} text-xs py-1.5 px-4 w-full" ${!isUnlocked ? 'disabled' : ''}>
                    ${isCompleted ? '⭐ ¡Jugar de Nuevo!' : (isUnlocked ? '🚀 ¡Comenzar!' : '🔒 Bloqueado')}
                  </button>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;

    this.setupEvents();
  }

  setupEvents() {
    const tabs = this.container.querySelectorAll('.world-tab-btn');
    const cards = this.container.querySelectorAll('.level-card');
    const btnDiploma = this.container.querySelector('#btnClaimDiploma');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        sounds.playPop();
        this.activeWorldId = tab.dataset.world;
        this.render();
      });
    });

    cards.forEach(card => {
      card.addEventListener('click', () => {
        const isUnlocked = card.dataset.unlocked === 'true';
        const levelId = card.dataset.levelId;

        if (isUnlocked) {
          sounds.playPop();
          if (this.onSelectLevel) this.onSelectLevel(levelId);
        } else {
          sounds.playWrong();
        }
      });
    });

    if (btnDiploma) {
      btnDiploma.addEventListener('click', () => {
        sounds.playClick();
        if (this.onViewDiploma) this.onViewDiploma(this.activeWorldId);
      });
    }
  }
}
