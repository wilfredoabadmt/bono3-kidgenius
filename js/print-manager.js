/* KidGenius Club - Bono #3: Calendario de Aventuras
   Centro de Impresión y Generación de Plantillas PDF/Físicas de Alta Resolución */

class PrintManager {
  constructor() {
    this.printPreviewEl = document.getElementById('printable-calendar-element');
    this.printIsolatedEl = document.getElementById('print-isolated-calendar');
  }

  generateCalendarHTML(profile, missions) {
    return `
      <div class="printable-calendar-poster">
        <!-- Borde Decorativo Prehistórico -->
        <div class="poster-inner-frame">
          
          <!-- Encabezado del Póster -->
          <div class="poster-header">
            <div class="poster-brand">
              <div class="poster-logo-dino">🦖</div>
              <div class="poster-title-block">
                <h1 class="poster-main-title">KidGenius Club</h1>
                <h2 class="poster-sub-title">CALENDARIO DE AVENTURAS MATEMÁTICAS · 30 DÍAS</h2>
                <p class="poster-tagline">¡Supera tu misión diaria y pega un sticker o marca una ✖️ en cada casilla!</p>
              </div>
            </div>

            <!-- Leyenda de Semanas -->
            <div class="poster-weeks-legend">
              <span class="legend-pill leg-w1">🟢 Sem 1: Números (1-7)</span>
              <span class="legend-pill leg-w2">🔵 Sem 2: Cálculo Rápido (8-14)</span>
              <span class="legend-pill leg-w3">🟡 Sem 3: Geometría (15-21)</span>
              <span class="legend-pill leg-w4">🟠 Sem 4: Desafío Final (22-30)</span>
            </div>

            <!-- Datos del Niño / Meta -->
            <div class="poster-kid-info">
              <div class="poster-info-field">
                <span class="field-label">Explorador/a:</span>
                <span class="field-value">${profile.name || 'Pequeño Genio'}</span>
              </div>
              <div class="poster-badge-goal">
                🏆 Meta: 30 Días de Éxito
              </div>
            </div>
          </div>

          <!-- Rejilla de 30 Días (6 Columnas x 5 Filas) -->
          <div class="poster-grid-30">
            ${missions.map(m => {
              const isWeek1 = m.day <= 7;
              const isWeek2 = m.day >= 8 && m.day <= 14;
              const isWeek3 = m.day >= 15 && m.day <= 21;
              const isWeek4 = m.day >= 22 && m.day < 30;
              const isDay30 = m.day === 30;

              let weekClass = 'w1';
              if (isWeek2) weekClass = 'w2';
              else if (isWeek3) weekClass = 'w3';
              else if (isWeek4) weekClass = 'w4';
              else if (isDay30) weekClass = 'w-final';

              if (isDay30) {
                return `
                  <div class="poster-cell cell-${weekClass} cell-grand-30">
                    <div class="cell-top">
                      <span class="cell-day-num">DÍA 30</span>
                      <span class="cell-icon">👑</span>
                    </div>
                    <div class="cell-body">
                      <div class="cell-title">¡GRAN FINAL!</div>
                      <div class="cell-math-snip">${m.question}</div>
                    </div>
                    <div class="cell-bottom">
                      <div class="cell-sticker-circle final-circle">🏆 Sticker Maestro</div>
                    </div>
                  </div>
                `;
              }

              return `
                <div class="poster-cell cell-${weekClass}">
                  <div class="cell-top">
                    <span class="cell-day-num">DÍA ${m.day}</span>
                    <span class="cell-icon">${m.icon}</span>
                  </div>
                  <div class="cell-body">
                    <div class="cell-title">${m.title}</div>
                    <div class="cell-math-snip">${m.question}</div>
                  </div>
                  <div class="cell-bottom">
                    <div class="cell-sticker-circle">⭐ Sticker</div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>

          <!-- Pie de Página del Póster -->
          <div class="poster-footer">
            <div class="footer-left">
              <span>🌟 <strong>Bono #3 Exclusivo KidGenius Club</strong> · www.kidgeniusclub.com</span>
            </div>
            <div class="footer-center">
              <span>🎓 <em>Al completar los 30 días reclama tu Diploma Oficial de Maestro KidGenius</em></span>
            </div>
            <div class="footer-right">
              <span>Firma de los Papás: ______________________</span>
            </div>
          </div>

        </div>
      </div>
    `;
  }

  renderPrintTemplate() {
    const profile = window.appState.getCurrentProfile();
    const missions = window.MISSIONS_DATA;
    const html = this.generateCalendarHTML(profile, missions);

    if (this.printPreviewEl) {
      this.printPreviewEl.innerHTML = html;
    }
    if (this.printIsolatedEl) {
      this.printIsolatedEl.innerHTML = html;
    }
  }

  printCalendar() {
    this.renderPrintTemplate();
    window.soundEngine.playPop();

    document.body.classList.add('printing-calendar');
    document.body.classList.remove('printing-diploma');

    // Breve pausa para asegurar renderizado completo en DOM antes de invocar diálogo de impresión
    setTimeout(() => {
      window.print();
    }, 150);

    // Limpieza tras imprimir o cancelar
    window.addEventListener('afterprint', () => {
      document.body.classList.remove('printing-calendar');
    }, { once: true });

    setTimeout(() => {
      document.body.classList.remove('printing-calendar');
    }, 2000);
  }
}

window.printManager = new PrintManager();
