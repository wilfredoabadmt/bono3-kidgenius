/* KidGenius Club - Bono #3: Calendario de Aventuras
   Centro de Impresión y Generación de Plantillas PDF/Físicas */

class PrintManager {
  constructor() {
    this.printTemplateEl = document.getElementById('printable-calendar-element');
  }

  renderPrintTemplate() {
    if (!this.printTemplateEl) return;

    const profile = window.appState.getCurrentProfile();
    const missions = window.MISSIONS_DATA;

    let html = `
      <div class="print-template-header">
        <div class="print-brand-left">
          <div class="print-dino-logo">🦖</div>
          <div class="print-title-area">
            <h2>KidGenius Club — Calendario de Aventuras (30 Días)</h2>
            <p>Misiones Matemáticas Diarias · ¡Pega un sticker o marca una ✖️ en cada día completado!</p>
          </div>
        </div>
        <div class="print-kid-name-box">
          Explorador/a: <strong>${profile.name}</strong>
        </div>
      </div>

      <div class="print-grid-30">
        ${missions.map(m => `
          <div class="print-day-cell">
            <div class="print-day-top">
              <span class="print-day-num">${m.day}</span>
              <span class="print-day-icon">${m.icon}</span>
            </div>
            <div class="print-day-text">${m.title}</div>
            <div class="print-check-circle">⭕</div>
          </div>
        `).join('')}
      </div>

      <div class="print-template-footer">
        <div>🌟 Bono #3 Exclusivo KidGenius Club · www.kidgeniusclub.com</div>
        <div>🏆 Completa los 30 días y reclama tu Diploma Oficial de Maestro Matemático</div>
      </div>
    `;

    this.printTemplateEl.innerHTML = html;
  }

  printCalendar() {
    this.renderPrintTemplate();
    window.soundEngine.playPop();

    document.body.classList.add('printing-calendar');
    document.body.classList.remove('printing-diploma');

    window.print();

    setTimeout(() => {
      document.body.classList.remove('printing-calendar');
    }, 1000);
  }
}

window.printManager = new PrintManager();
