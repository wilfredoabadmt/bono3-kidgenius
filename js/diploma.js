/* KidGenius Club - Bono #3: Calendario de Aventuras
   Módulo de Generación y Personalización del Diploma Oficial */

class DiplomaManager {
  constructor() {
    this.previewContainer = document.getElementById('diploma-preview-container');
    this.isolatedContainer = document.getElementById('print-isolated-diploma');
  }

  generateDiplomaHTML(profile, today) {
    return `
      <div class="diploma-container" style="display: block;">
        <div class="diploma-header">
          <div class="diploma-seal">🏅</div>
          <h1 class="diploma-title">Diploma de Honor KidGenius</h1>
          <p class="diploma-subtitle">Club Oficial de Aventuras Matemáticas</p>
        </div>

        <p class="diploma-awarded-to">Este reconocimiento se otorga con gran orgullo a:</p>
        <div class="diploma-kid-name">${profile.name || 'Pequeño Genio'}</div>

        <p class="diploma-text">
          Por haber demostrado gran valentía, constancia, curiosidad y destreza mental al completar con éxito los 
          <strong>30 Días del Reto de Aventuras Matemáticas</strong> junto a Geni y los Dinosaurios Exploradores.
        </p>

        <div class="diploma-signatures">
          <div class="diploma-sig">
            <div>🦖 Geni el Dinosaurio</div>
            <div style="font-size: 10px; color: #6b6280; margin-top: 2px;">Compañero y Guía de Aventuras</div>
          </div>
          <div class="diploma-sig">
            <div>📅 ${today}</div>
            <div style="font-size: 10px; color: #6b6280; margin-top: 2px;">Fecha Oficial de Superación</div>
          </div>
          <div class="diploma-sig">
            <div>✍️ Familia KidGenius</div>
            <div style="font-size: 10px; color: #6b6280; margin-top: 2px;">Firma de Acompañamiento</div>
          </div>
        </div>
      </div>
    `;
  }

  render() {
    const profile = window.appState.getCurrentProfile();
    const today = new Date().toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    const html = this.generateDiplomaHTML(profile, today);

    if (this.previewContainer) {
      this.previewContainer.innerHTML = html;
    }
    if (this.isolatedContainer) {
      this.isolatedContainer.innerHTML = html;
    }
  }

  printDiploma() {
    this.render();
    window.soundEngine.playSuccess();

    document.body.classList.add('printing-diploma');
    document.body.classList.remove('printing-calendar');

    setTimeout(() => {
      window.print();
    }, 150);

    window.addEventListener('afterprint', () => {
      document.body.classList.remove('printing-diploma');
    }, { once: true });

    setTimeout(() => {
      document.body.classList.remove('printing-diploma');
    }, 2000);
  }
}

window.diplomaManager = new DiplomaManager();
