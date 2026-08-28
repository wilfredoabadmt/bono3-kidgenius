/**
 * KidGenius Official Diploma & Certificate Generator
 * Children can view, print, or download their official KidGenius Club diploma
 */

import { sounds } from '../audio.js';
import { store } from '../state.js';
import { CHARACTERS } from '../characters.js';
import { WORLDS_DATA } from '../puzzles-data.js';

export class DiplomaGenerator {
  constructor(containerEl, worldId = 'valle', onClose) {
    this.container = containerEl;
    this.worldId = worldId;
    this.onClose = onClose;
    this.world = WORLDS_DATA.find(w => w.id === worldId) || WORLDS_DATA[0];

    this.init();
  }

  init() {
    const avatarId = store.state.profile.avatarId || 'geni';
    const char = CHARACTERS.find(c => c.id === avatarId) || CHARACTERS[0];
    const childName = store.state.profile.firstName || 'Súper Campeón KidGenius';
    const today = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });

    this.container.innerHTML = `
      <div id="diplomaOverlay" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-purple-950/85 backdrop-blur-md overflow-y-auto">
        <div class="max-w-3xl w-full flex flex-col items-center gap-4 my-auto animate-pop">
          <!-- Action Buttons Bar -->
          <div class="flex items-center justify-between w-full px-4 py-2 kg-glass-dark">
            <h3 class="text-lg font-bold text-white font-heading">🎓 Diploma Oficial KidGenius</h3>
            <div class="flex items-center gap-3">
              <button id="btnPrintDiploma" class="btn-kg btn-kg-green text-sm py-1.5 px-4 shadow-md">
                <span>🖨️</span> Imprimir / PDF
              </button>
              <button id="btnCloseDiploma" class="btn-kg btn-kg-yellow text-sm py-1.5 px-4 shadow-md">
                <span>✕</span> Cerrar
              </button>
            </div>
          </div>

          <!-- Printable Diploma Canvas / Container -->
          <div id="printableCertificate" class="diploma-frame p-8 sm:p-12 w-full text-center relative flex flex-col items-center justify-between min-h-[480px]">
            <!-- Top Header -->
            <div class="flex flex-col items-center">
              <div class="flex items-center justify-center gap-3 mb-1">
                <span class="text-3xl">✨</span>
                <span class="text-xs sm:text-sm uppercase tracking-widest font-black text-amber-800 font-heading">
                  KIDGENIUS CLUB • CERTIFICADO DE EXCELENCIA
                </span>
                <span class="text-3xl">✨</span>
              </div>
              <h1 class="text-3xl sm:text-5xl font-black text-purple-950 font-heading tracking-wide mb-1">
                DIPLOMA DE HONOR
              </h1>
              <p class="text-sm sm:text-base text-amber-900 font-bold font-nunito italic">
                Se otorga con gran orgullo y admiración prehistórica a:
              </p>
            </div>

            <!-- Child Name Highlight -->
            <div class="my-6 border-b-4 border-amber-500/60 pb-2 px-8 inline-block max-w-xl">
              <h2 class="text-3xl sm:text-5xl font-black text-purple-900 font-heading">
                ${childName}
              </h2>
            </div>

            <!-- Accomplishment Text -->
            <p class="text-base sm:text-lg text-purple-950 font-nunito font-semibold max-w-lg leading-relaxed mb-6">
              Por haber demostrado asombrosa agilidad mental, lógica y perseverancia al conquistar los desafíos y rompecabezas del <strong class="text-green-700">${this.world.name}</strong> en el universo <strong class="text-purple-700">KidGenius Club</strong>.
            </p>

            <!-- Bottom Badges & Signatures -->
            <div class="flex items-center justify-between w-full pt-4 border-t-2 border-amber-300/80 mt-auto">
              <!-- Companion Badge -->
              <div class="flex items-center gap-2 text-left">
                <div class="w-12 h-12">${char.avatarSvg}</div>
                <div>
                  <span class="text-xs font-black text-purple-900 block font-heading">${char.name}</span>
                  <span class="text-[10px] text-amber-800 font-bold">Compañero Guía</span>
                </div>
              </div>

              <!-- Official Gold Seal -->
              <div class="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-500 via-yellow-300 to-amber-600 flex flex-col items-center justify-center text-purple-950 shadow-xl border-4 border-white">
                <span class="text-2xl">🏆</span>
                <span class="text-[8px] font-black tracking-tighter uppercase font-heading">OFICIAL</span>
              </div>

              <!-- Date & Signature -->
              <div class="text-right">
                <span class="text-xs font-bold text-amber-900 block font-nunito">${today}</span>
                <span class="text-xs font-black text-purple-900 font-heading block">Comité KidGenius</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    this.setupEvents();
  }

  setupEvents() {
    const btnPrint = this.container.querySelector('#btnPrintDiploma');
    const btnClose = this.container.querySelector('#btnCloseDiploma');

    btnPrint.addEventListener('click', () => {
      sounds.playClick();
      window.print();
    });

    btnClose.addEventListener('click', () => {
      sounds.playClick();
      this.container.innerHTML = '';
      if (this.onClose) this.onClose();
    });
  }
}
