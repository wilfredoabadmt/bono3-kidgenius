/**
 * KidGenius Avatar Picker Modal
 * Allows switching the active companion mascot with voice greetings
 */

import { sounds } from '../audio.js';
import { store } from '../state.js';
import { CHARACTERS } from '../characters.js';

export class AvatarModal {
  constructor(containerEl, onComplete) {
    this.container = containerEl;
    this.onComplete = onComplete;
    this.init();
  }

  init() {
    const currentAvatar = store.state.profile.avatarId || 'geni';

    this.container.innerHTML = `
      <div id="avatarOverlay" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-purple-950/85 backdrop-blur-md">
        <div class="kg-glass max-w-2xl w-full p-6 sm:p-8 flex flex-col items-center text-center animate-pop relative border-4 border-yellow-300 shadow-2xl">
          <button id="btnCloseAvatar" class="absolute top-4 right-4 w-10 h-10 rounded-full bg-purple-200 text-purple-950 font-black flex items-center justify-center hover:bg-purple-300 transition-colors">
            ✕
          </button>

          <div class="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-yellow-300 text-purple-950 font-black text-xs uppercase tracking-widest font-heading mb-2">
            <span>✨</span> COMPAÑERO DE AVENTURAS
          </div>

          <h2 class="text-2xl sm:text-3xl font-black text-purple-950 font-heading mb-1">
            ¿Quién te acompañará hoy en <span class="text-green-600">KidGenius</span>? 🌟
          </h2>
          <p class="text-sm text-purple-800 font-bold font-nunito mb-6">
            Cada compañero tiene su propia voz, consejos y poderes prehistóricos.
          </p>

          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full" id="avatarGrid">
            ${CHARACTERS.map(c => `
              <div class="avatar-card flex flex-col items-center text-center ${c.id === currentAvatar ? 'selected' : ''}" data-id="${c.id}">
                <div class="w-20 h-20 mb-2">${c.avatarSvg}</div>
                <h4 class="text-base font-bold text-purple-950 font-heading leading-tight">${c.name}</h4>
                <span class="text-xs text-purple-600 font-nunito font-extrabold mb-2">${c.title}</span>
                <p class="text-xs text-gray-600 font-nunito italic line-clamp-2 px-1">"${c.greeting}"</p>
                <button class="btn-kg ${c.id === currentAvatar ? 'btn-kg-green' : 'btn-kg-blue'} text-xs py-1.5 px-4 mt-3 w-full">
                  ${c.id === currentAvatar ? '✓ Seleccionado' : 'Elegir'}
                </button>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    this.setupEvents();
  }

  setupEvents() {
    const overlay = this.container.querySelector('#avatarOverlay');
    const btnClose = this.container.querySelector('#btnCloseAvatar');
    const cards = this.container.querySelectorAll('.avatar-card');

    btnClose.addEventListener('click', () => {
      sounds.playClick();
      this.container.innerHTML = '';
      if (this.onComplete) this.onComplete();
    });

    cards.forEach(card => {
      card.addEventListener('click', () => {
        const id = card.dataset.id;
        sounds.playSnap();
        store.setAvatar(id);

        const char = CHARACTERS.find(c => c.id === id);
        if (char) {
          sounds.speak(char.greeting);
        }

        setTimeout(() => {
          this.container.innerHTML = '';
          if (this.onComplete) this.onComplete();
        }, 400);
      });
    });
  }
}
