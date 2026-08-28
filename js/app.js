/**
 * KidGenius Club — Bono 2: Rompecabezas & Puzzles Didácticos
 * Main Application Controller & Router
 */

import { sounds } from './audio.js';
import { store } from './state.js';
import { CHARACTERS } from './characters.js';
import { WORLDS_DATA } from './puzzles-data.js';

import { AuthModal } from './components/auth-modal.js';
import { AvatarModal } from './components/avatar-modal.js';
import { WorldMap } from './components/world-map.js';
import { VictoryModal } from './components/victory-modal.js';
import { DiplomaGenerator } from './components/diploma.js';

import { JigsawGame } from './games/jigsaw.js';
import { MathRevealGame } from './games/math-reveal.js';
import { SlidePuzzleGame } from './games/slide-puzzle.js';
import { TangramGame } from './games/tangram.js';

class App {
  constructor() {
    this.currentView = 'map'; // 'map' | 'game'
    this.activeGameInstance = null;
    this.activeLevelId = null;

    this.init();
  }

  init() {
    this.setupNavBar();
    this.updateHeaderStats();

    // Subscribe to state updates
    store.subscribe(() => {
      this.updateHeaderStats();
    });

    // Check if user has registered profile
    if (!store.state.profile.isRegistered || !store.state.profile.firstName) {
      new AuthModal(document.getElementById('modalContainer'), () => {
        this.renderWorldMap();
      });
    } else {
      this.renderWorldMap();
    }
  }

  setupNavBar() {
    const btnSound = document.getElementById('btnToggleSound');
    const btnMusic = document.getElementById('btnToggleMusic');
    const btnAvatar = document.getElementById('btnOpenAvatar');
    const btnHome = document.getElementById('btnHomeMap');

    if (btnSound) {
      btnSound.addEventListener('click', () => {
        const active = sounds.toggleSound();
        btnSound.querySelector('.icon').textContent = active ? '🔊' : '🔇';
      });
    }

    if (btnMusic) {
      btnMusic.addEventListener('click', () => {
        const active = sounds.toggleMusic();
        btnMusic.querySelector('.icon').textContent = active ? '🎵' : '🎶';
      });
    }

    if (btnAvatar) {
      btnAvatar.addEventListener('click', () => {
        sounds.playClick();
        new AvatarModal(document.getElementById('modalContainer'), () => {
          this.updateHeaderStats();
        });
      });
    }

    if (btnHome) {
      btnHome.addEventListener('click', () => {
        sounds.playClick();
        this.renderWorldMap();
      });
    }
  }

  updateHeaderStats() {
    const stats = store.state.stats;
    const profile = store.state.profile;
    const char = CHARACTERS.find(c => c.id === profile.avatarId) || CHARACTERS[0];

    const starEl = document.getElementById('headerStars');
    const coinEl = document.getElementById('headerCoins');
    const nameEl = document.getElementById('headerChildName');
    const avatarEl = document.getElementById('headerAvatarIcon');

    if (starEl) starEl.textContent = stats.stars;
    if (coinEl) coinEl.textContent = stats.coins;
    if (nameEl) nameEl.textContent = profile.firstName || 'Explorador';
    if (avatarEl) avatarEl.innerHTML = `<div class="w-8 h-8">${char.avatarSvg}</div>`;
  }

  renderWorldMap() {
    this.currentView = 'map';
    if (this.activeGameInstance && this.activeGameInstance.destroy) {
      this.activeGameInstance.destroy();
    }
    this.activeGameInstance = null;

    const mainContainer = document.getElementById('appMainView');
    new WorldMap(
      mainContainer,
      (levelId) => this.startLevel(levelId),
      (worldId) => this.showDiploma(worldId)
    );
  }

  startLevel(levelId) {
    this.currentView = 'game';
    this.activeLevelId = levelId;
    const mainContainer = document.getElementById('appMainView');

    // Find level metadata across worlds
    let levelConfig = null;
    let worldFound = null;

    for (const w of WORLDS_DATA) {
      const found = w.levels.find(l => l.id === levelId);
      if (found) {
        levelConfig = found;
        worldFound = w;
        break;
      }
    }

    if (!levelConfig) return;

    mainContainer.innerHTML = '';

    const onComplete = () => {
      store.completeLevel(levelId, 3, 50);
      new VictoryModal(
        document.getElementById('modalContainer'),
        levelConfig,
        () => {
          // Play next or go back
          const allLevels = worldFound.levels;
          const currentIdx = allLevels.findIndex(l => l.id === levelId);
          if (currentIdx + 1 < allLevels.length) {
            this.startLevel(allLevels[currentIdx + 1].id);
          } else {
            this.renderWorldMap();
          }
        },
        () => this.renderWorldMap()
      );
    };

    if (levelConfig.type === 'jigsaw') {
      let sceneKey = 'rexy_valley';
      if (levelConfig.id.includes('selva')) sceneKey = 'ptero_sky';
      else if (levelConfig.id.includes('volcan')) sceneKey = 'volcano_party';
      else if (levelConfig.id.includes('bronto')) sceneKey = 'bronto_lagoon';

      this.activeGameInstance = new JigsawGame(
        mainContainer,
        { grid: levelConfig.grid || 3, sceneKey },
        onComplete
      );
    } else if (levelConfig.type === 'math') {
      let sceneKey = 'bronto_lagoon';
      if (levelConfig.id.includes('selva')) sceneKey = 'ptero_sky';
      else if (levelConfig.id.includes('volcan') || levelConfig.id.includes('diamante')) sceneKey = 'volcano_party';

      this.activeGameInstance = new MathRevealGame(
        mainContainer,
        { grid: levelConfig.grid || 3, operationType: levelConfig.operationType || 'addition', sceneKey },
        onComplete
      );
    } else if (levelConfig.type === 'slide') {
      this.activeGameInstance = new SlidePuzzleGame(
        mainContainer,
        { grid: levelConfig.grid || 3 },
        onComplete
      );
    } else if (levelConfig.type === 'tangram') {
      this.activeGameInstance = new TangramGame(
        mainContainer,
        {},
        onComplete
      );
    }
  }

  showDiploma(worldId) {
    new DiplomaGenerator(
      document.getElementById('modalContainer'),
      worldId,
      () => {}
    );
  }
}

// Bootstrap on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.KidGeniusApp = new App();
});
