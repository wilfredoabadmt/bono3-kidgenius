/**
 * KidGenius State Store
 * Handles progress, user profiles, levels unlocked, stars, coins, and local persistence
 */

const STORAGE_KEY = 'kidgenius_bono2_progress';

const defaultState = {
  profile: {
    firstName: '',
    parentEmail: '',
    avatarId: 'geni',
    isRegistered: false
  },
  stats: {
    stars: 0,
    coins: 0,
    streakDays: 1,
    puzzlesSolved: 0,
    mathAnswered: 0
  },
  levels: {
    // world_mode_level: { completed: true, stars: 3, bestTime: 45 }
    'valle_jigsaw_1': { completed: false, stars: 0, unlocked: true },
    'valle_jigsaw_2': { completed: false, stars: 0, unlocked: false },
    'valle_math_1': { completed: false, stars: 0, unlocked: true },
    'valle_math_2': { completed: false, stars: 0, unlocked: false },
    'valle_slide_1': { completed: false, stars: 0, unlocked: true },
    'valle_tangram_1': { completed: false, stars: 0, unlocked: true },

    'selva_jigsaw_1': { completed: false, stars: 0, unlocked: false },
    'selva_math_1': { completed: false, stars: 0, unlocked: false },
    'selva_slide_1': { completed: false, stars: 0, unlocked: false },
    'selva_tangram_1': { completed: false, stars: 0, unlocked: false },

    'volcan_jigsaw_1': { completed: false, stars: 0, unlocked: false },
    'volcan_math_1': { completed: false, stars: 0, unlocked: false },
    'volcan_slide_1': { completed: false, stars: 0, unlocked: false },

    'diamante_jigsaw_1': { completed: false, stars: 0, unlocked: false },
    'diamante_math_1': { completed: false, stars: 0, unlocked: false }
  },
  diplomas: [],
  settings: {
    soundMuted: false,
    musicEnabled: true,
    difficulty: 'normal'
  }
};

class StateStore {
  constructor() {
    this.state = this.loadState();
    this.listeners = [];
  }

  loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...defaultState, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn('Could not read state from localStorage', e);
    }
    return JSON.parse(JSON.stringify(defaultState));
  }

  saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
      this.notify();
    } catch (e) {
      console.warn('Could not write state to localStorage', e);
    }
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach(fn => fn(this.state));
  }

  // --- Profile Actions ---
  setProfile(firstName, parentEmail, avatarId) {
    this.state.profile.firstName = firstName.trim();
    this.state.profile.parentEmail = parentEmail.trim();
    this.state.profile.avatarId = avatarId || 'geni';
    this.state.profile.isRegistered = true;
    this.saveState();
  }

  setAvatar(avatarId) {
    this.state.profile.avatarId = avatarId;
    this.saveState();
  }

  // --- Progress Actions ---
  completeLevel(levelKey, earnedStars = 3, earnedCoins = 50) {
    if (!this.state.levels[levelKey]) {
      this.state.levels[levelKey] = { completed: false, stars: 0, unlocked: true };
    }

    const current = this.state.levels[levelKey];
    if (!current.completed) {
      this.state.stats.puzzlesSolved += 1;
      this.state.stats.coins += earnedCoins;
      this.state.stats.stars += earnedStars;
      current.completed = true;
      current.stars = Math.max(current.stars, earnedStars);
    } else {
      if (earnedStars > current.stars) {
        this.state.stats.stars += (earnedStars - current.stars);
        current.stars = earnedStars;
      }
      this.state.stats.coins += Math.floor(earnedCoins / 2);
    }

    // Auto-unlock next levels
    this.unlockNextLevels(levelKey);
    this.saveState();
  }

  unlockNextLevels(currentKey) {
    const levelOrder = [
      'valle_jigsaw_1', 'valle_math_1', 'valle_slide_1', 'valle_tangram_1', 'valle_jigsaw_2', 'valle_math_2',
      'selva_jigsaw_1', 'selva_math_1', 'selva_slide_1', 'selva_tangram_1',
      'volcan_jigsaw_1', 'volcan_math_1', 'volcan_slide_1',
      'diamante_jigsaw_1', 'diamante_math_1'
    ];

    const idx = levelOrder.indexOf(currentKey);
    if (idx >= 0 && idx + 1 < levelOrder.length) {
      const nextKey = levelOrder[idx + 1];
      if (!this.state.levels[nextKey]) {
        this.state.levels[nextKey] = { completed: false, stars: 0, unlocked: true };
      } else {
        this.state.levels[nextKey].unlocked = true;
      }
    }
  }

  addMathAnswer(isCorrect) {
    if (isCorrect) {
      this.state.stats.mathAnswered += 1;
      this.state.stats.coins += 5;
      this.saveState();
    }
  }

  awardDiploma(worldName) {
    if (!this.state.diplomas.includes(worldName)) {
      this.state.diplomas.push(worldName);
      this.state.stats.coins += 100;
      this.saveState();
    }
  }

  resetProgress() {
    this.state = JSON.parse(JSON.stringify(defaultState));
    this.saveState();
  }
}

export const store = new StateStore();
