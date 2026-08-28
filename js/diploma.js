/* KidGenius Club - Bono #3: Calendario de Aventuras
   Módulo de Generación y Personalización del Diploma Oficial */

class DiplomaManager {
  constructor() {
    this.previewContainer = document.getElementById('diploma-preview-container');
  }

  render() {
    if (!this.previewContainer) return;

    const profile = window.appState.getCurrentProfile();
    const today = new Date().toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    this.previewContainer.innerHTML = `
      <div class="diploma-container" style="display: block; margin-top: 20px;">
        <div class="diploma-header">
          <div class="diploma-seal">🏅</div>
          <h1 class="diploma-title">Diploma de Honor KidGenius</h1>
          <p class="diploma-subtitle">Club Oficial de Aventuras Matemáticas</p>
        </div>

        <p class="diploma-awarded-to">Este reconocimiento se otorga con gran orgullo a:</p>
        <div class="diploma-kid-name">${profile.name}</div>

        <p class="diploma-text">
          Por haber demostrado gran valentía, constancia, curiosidad y destreza mental al completar con éxito los 
          <strong>30 Días del Reto de Aventuras Matemáticas</strong> junto a Geni y los Dinosaurios Exploradores.
        </p>

        <div class="diploma-signatures">
          <div class="diploma-sig">
            <div>🦖 Geni el Dinosaurio</div>
            <div style="font-size: 11px; color: #6b6280; margin-top: 2px;">Compañero y Guía de Aventuras</div>
          </div>
          <div class="diploma-sig">
            <div>📅 ${today}</div>
            <div style="font-size: 11px; color: #6b6280; margin-top: 2px;">Fecha Oficial de Superación</div>
          </div>
          <div class="diploma-sig">
            <div>✍️ Familia KidGenius</div>
            <div style="font-size: 11px; color: #6b6280; margin-top: 2px;">Firma de Acompañamiento</div>
          </div>
        </div>
      </div>
    `;
  }

  printDiploma() {
    window.soundEngine.playSuccess();
    document.body.classList.add('printing-diploma');
    document.body.classList.remove('printing-calendar');

    window.print();

    setTimeout(() => {
      document.body.classList.remove('printing-diploma');
    }, 1000);
  }
}

window.diplomaManager = new DiplomaManager();
