/* KidGenius Club - Bono #3: Calendario de Aventuras
   Módulo de Estado Global y Persistencia de Perfiles */

class AppState {
  constructor() {
    this.STORAGE_KEY = 'kidgenius_bono3_adventure_data';
    this.data = this.loadData();
  }

  getDefaultData() {
    return {
      currentProfileId: 'profile_default',
      profiles: [
        {
          id: 'profile_default',
          name: 'Pequeño Genio',
          avatar: '🦖',
          stars: 0,
          streak: 1,
          completedDays: [], // array de números [1, 2, 3...]
          unlockedStickers: [],
          lastCompletedDate: null,
          createdDate: new Date().toISOString()
        }
      ]
    };
  }

  loadData() {
    try {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading state from localStorage', e);
    }
    return this.getDefaultData();
  }

  saveData() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.data));
    } catch (e) {
      console.error('Error saving state to localStorage', e);
    }
  }

  getCurrentProfile() {
    let profile = this.data.profiles.find(p => p.id === this.data.currentProfileId);
    if (!profile) {
      profile = this.data.profiles[0];
      this.data.currentProfileId = profile.id;
      this.saveData();
    }
    return profile;
  }

  setProfileName(newName) {
    const profile = this.getCurrentProfile();
    profile.name = newName.trim() || 'Pequeño Genio';
    this.saveData();
  }

  setProfileAvatar(newAvatar) {
    const profile = this.getCurrentProfile();
    profile.avatar = newAvatar;
    this.saveData();
  }

  addProfile(name, avatar) {
    const id = 'profile_' + Date.now();
    const newProfile = {
      id,
      name: name || 'Pequeño Genio',
      avatar: avatar || '🦕',
      stars: 0,
      streak: 1,
      completedDays: [],
      unlockedStickers: [],
      lastCompletedDate: null,
      createdDate: new Date().toISOString()
    };
    this.data.profiles.push(newProfile);
    this.data.currentProfileId = id;
    this.saveData();
    return newProfile;
  }

  switchProfile(profileId) {
    if (this.data.profiles.some(p => p.id === profileId)) {
      this.data.currentProfileId = profileId;
      this.saveData();
    }
  }

  isDayCompleted(dayNumber) {
    const profile = this.getCurrentProfile();
    return profile.completedDays.includes(dayNumber);
  }

  completeDay(dayNumber, sticker) {
    const profile = this.getCurrentProfile();
    if (!profile.completedDays.includes(dayNumber)) {
      profile.completedDays.push(dayNumber);
      profile.stars += 3;

      if (sticker && !profile.unlockedStickers.includes(sticker)) {
        profile.unlockedStickers.push(sticker);
      }

      // Actualizar racha
      const todayStr = new Date().toDateString();
      if (profile.lastCompletedDate) {
        const lastDate = new Date(profile.lastCompletedDate);
        const diffDays = Math.floor((new Date(todayStr) - lastDate) / (1000 * 60 * 60 * 24));
        if (diffDays === 1) {
          profile.streak += 1;
        } else if (diffDays > 1) {
          profile.streak = 1;
        }
      } else {
        profile.streak = 1;
      }
      profile.lastCompletedDate = todayStr;

      this.saveData();
      return true;
    }
    return false;
  }

  getProgressPercentage() {
    const profile = this.getCurrentProfile();
    return Math.round((profile.completedDays.length / 30) * 100);
  }

  getNextActiveDay() {
    const profile = this.getCurrentProfile();
    for (let day = 1; day <= 30; day++) {
      if (!profile.completedDays.includes(day)) {
        return day;
      }
    }
    return 30;
  }

  resetProgress() {
    const profile = this.getCurrentProfile();
    profile.completedDays = [];
    profile.stars = 0;
    profile.streak = 1;
    profile.unlockedStickers = [];
    profile.lastCompletedDate = null;
    this.saveData();
  }
}

window.appState = new AppState();
