/**
 * KidGenius Auth & Registration Modal
 * Parent/Tutor Gate & Child Profile Setup
 */

import { sounds } from '../audio.js';
import { store } from '../state.js';
import { CHARACTERS } from '../characters.js';

export class AuthModal {
  constructor(containerEl, onComplete) {
    this.container = containerEl;
    this.onComplete = onComplete;
    this.selectedAvatar = 'geni';
    this.init();
  }

  init() {
    this.container.innerHTML = `
      <div id="authOverlay" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-purple-950/85 backdrop-blur-md">
        <div class="kg-glass max-w-lg w-full p-6 sm:p-8 flex flex-col items-center text-center animate-pop relative border-4 border-yellow-300 shadow-2xl">
          <!-- Top KidGenius Badge -->
          <div class="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 text-purple-950 font-black text-xs uppercase tracking-widest font-heading mb-3 shadow-md">
            <span>✨</span> KIDGENIUS CLUB • BONO 2 <span>✨</span>
          </div>

          <h2 class="text-2xl sm:text-3xl font-black text-purple-950 font-heading mb-1">
            ¡Bienvenido a <span class="text-green-600">Dino Puzzles</span>! 🦖
          </h2>
          <p class="text-sm text-purple-800/90 font-bold font-nunito mb-6">
            Ingresa los datos para guardar los logros, estrellas y diplomas oficiales de tu campeón.
          </p>

          <form id="authForm" class="w-full flex flex-col gap-4 text-left">
            <!-- Child Name -->
            <div>
              <label class="block text-xs font-black uppercase text-purple-900 font-heading mb-1">
                ⭐ Nombre del Niño o Niña:
              </label>
              <input type="text" id="inputChildName" required placeholder="Ej. Mateo, Sofía, Lucas..." 
                class="w-full px-4 py-3 rounded-2xl border-3 border-purple-300 focus:border-green-500 focus:outline-none font-bold text-purple-950 bg-white shadow-inner text-base font-nunito"/>
            </div>

            <!-- Parent Email -->
            <div>
              <label class="block text-xs font-black uppercase text-purple-900 font-heading mb-1">
                📧 Correo del Padre o Tutor:
              </label>
              <input type="email" id="inputParentEmail" required placeholder="correo@ejemplo.com" 
                class="w-full px-4 py-3 rounded-2xl border-3 border-purple-300 focus:border-green-500 focus:outline-none font-bold text-purple-950 bg-white shadow-inner text-base font-nunito"/>
            </div>

            <!-- Avatar Quick Selection -->
            <div>
              <label class="block text-xs font-black uppercase text-purple-900 font-heading mb-2">
                🌟 Elige tu Mascota Favorita:
              </label>
              <div class="grid grid-cols-5 gap-2" id="authAvatarPicker">
                ${CHARACTERS.map(c => `
                  <button type="button" class="avatar-mini-btn p-1.5 rounded-2xl border-2 transition-all flex flex-col items-center ${c.id === 'geni' ? 'border-yellow-400 bg-yellow-100 scale-105' : 'border-purple-200 bg-white/80'}" data-id="${c.id}">
                    <div class="w-10 h-10">${c.avatarSvg}</div>
                    <span class="text-[10px] font-extrabold text-purple-900 font-heading truncate w-full text-center mt-1">${c.name.split(' ')[0]}</span>
                  </button>
                `).join('')}
              </div>
            </div>

            <!-- Submit Button -->
            <button type="submit" class="btn-kg btn-kg-green text-lg py-3.5 mt-4 w-full shadow-lg">
              <span>🚀</span> ¡Comenzar Aventura Jurásica!
            </button>
          </form>
        </div>
      </div>
    `;

    this.setupEvents();
  }

  setupEvents() {
    const form = this.container.querySelector('#authForm');
    const avatarBtns = this.container.querySelectorAll('.avatar-mini-btn');

    avatarBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        sounds.playPop();
        avatarBtns.forEach(b => {
          b.classList.remove('border-yellow-400', 'bg-yellow-100', 'scale-105');
          b.classList.add('border-purple-200', 'bg-white/80');
        });
        btn.classList.remove('border-purple-200', 'bg-white/80');
        btn.classList.add('border-yellow-400', 'bg-yellow-100', 'scale-105');
        this.selectedAvatar = btn.dataset.id;
      });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const childName = this.container.querySelector('#inputChildName').value;
      const parentEmail = this.container.querySelector('#inputParentEmail').value;

      if (!childName.trim()) return;

      sounds.playVictory();
      store.setProfile(childName, parentEmail, this.selectedAvatar);
      
      const char = CHARACTERS.find(c => c.id === this.selectedAvatar) || CHARACTERS[0];
      sounds.speak(`¡Hola, ${childName}! Bienvenido a KidGenius Club. ¡Vamos a jugar!`);

      this.container.innerHTML = '';
      if (this.onComplete) this.onComplete();
    });
  }
}
