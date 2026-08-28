/* KidGenius Club - Bono #3: Calendario de Aventuras
   Renderizador del Tablero y Calendario de 30 Días */

class CalendarUI {
  constructor() {
    this.container = document.getElementById('calendar-view-container');
  }

  render() {
    if (!this.container) return;

    const profile = window.appState.getCurrentProfile();
    const completedDays = profile.completedDays || [];
    const activeDay = window.appState.getNextActiveDay();
    const progressPct = window.appState.getProgressPercentage();

    // Actualizar barra de estadísticas superiores
    const streakEl = document.getElementById('hero-streak-count');
    const starsEl = document.getElementById('hero-stars-count');
    const daysEl = document.getElementById('hero-days-count');
    const avatarIcon = document.getElementById('header-avatar-icon');
    const avatarName = document.getElementById('header-profile-name');
    const geniQuoteEl = document.getElementById('geni-hero-quote');

    if (streakEl) streakEl.textContent = `${profile.streak} ${profile.streak === 1 ? 'día' : 'días'}`;
    if (starsEl) starsEl.textContent = `${profile.stars} ⭐`;
    if (daysEl) daysEl.textContent = `${completedDays.length} / 30`;
    if (avatarIcon) avatarIcon.textContent = profile.avatar;
    if (avatarName) avatarName.textContent = profile.name;

    // Cita dinámica de Geni
    if (geniQuoteEl) {
      if (completedDays.length === 0) {
        geniQuoteEl.textContent = "¡Bienvenido explorador! Toca el Día 1 para comenzar tu gran aventura matemática.";
      } else if (completedDays.length < 7) {
        geniQuoteEl.textContent = `¡Gran inicio, ${profile.name}! Llevas ${completedDays.length} misiones superadas. ¡Sigue así!`;
      } else if (completedDays.length < 14) {
        geniQuoteEl.textContent = `¡Semana 2 en marcha! Tu cerebro de dinosaurio está cada día más veloz.`;
      } else if (completedDays.length < 21) {
        geniQuoteEl.textContent = `¡Mitad de aventura conquistada! La geometría y los patrones son pan comido para ti.`;
      } else if (completedDays.length < 30) {
        geniQuoteEl.textContent = `¡Casi llegamos a la meta! Solo faltan ${30 - completedDays.length} días para tu Diploma de Maestro.`;
      } else {
        geniQuoteEl.textContent = `🎉 ¡INCREÍBLE! Completaste los 30 días de la Aventura KidGenius. ¡Eres un auténtico genio!`;
      }
    }

    // Definición de las 4 semanas
    const weeks = [
      {
        num: 1,
        title: "Semana 1: Exploradores de Números",
        subtitle: "Conteo, sumas divertidas y secuencias mágicas",
        days: window.MISSIONS_DATA.filter(m => m.week === 1)
      },
      {
        num: 2,
        title: "Semana 2: Maestros del Cálculo Rápido",
        subtitle: "Decenas completas, restas prehistóricas y dobles",
        days: window.MISSIONS_DATA.filter(m => m.week === 2)
      },
      {
        num: 3,
        title: "Semana 3: Guardianes de la Geometría y Patrones",
        subtitle: "Figuras, fracciones de dinosaurio y lectura del tiempo",
        days: window.MISSIONS_DATA.filter(m => m.week === 3)
      },
      {
        num: 4,
        title: "Semana 4: Campeones KidGenius y Gran Desafío",
        subtitle: "Desafíos combinados, multiplicación inicial y el Gran Día 30",
        days: window.MISSIONS_DATA.filter(m => m.week === 4)
      }
    ];

    let html = `
      <!-- Tarjeta de Progreso Global -->
      <div class="challenge-progress-card">
        <div class="progress-header">
          <div class="progress-title">
            <span class="trophy-icon">🏆</span>
            <span>Progreso del Reto de 30 Días</span>
          </div>
          <div class="progress-percentage">${progressPct}% Completado</div>
        </div>
        <div class="progress-bar-container">
          <div class="progress-bar-fill" style="width: ${progressPct}%;"></div>
        </div>
      </div>
    `;

    // Renderizar cada semana
    weeks.forEach(w => {
      const weekCompletedCount = w.days.filter(d => completedDays.includes(d.day)).length;
      const isWeekFull = weekCompletedCount === w.days.length;

      html += `
        <div class="week-container week-${w.num}">
          <div class="week-header">
            <div class="week-info">
              <span class="week-badge">Semana ${w.num}</span>
              <div>
                <h3 class="week-title">${w.title}</h3>
                <span class="week-subtitle">${w.subtitle}</span>
              </div>
            </div>
            <div class="week-badge-status">
              ${isWeekFull ? '🌟 ¡Semana Dominada!' : `${weekCompletedCount} de ${w.days.length} misiones`}
            </div>
          </div>

          <div class="days-grid">
            ${w.days.map(mission => {
              const isCompleted = completedDays.includes(mission.day);
              const isToday = mission.day === activeDay && !isCompleted;
              const isFinale = mission.day === 30;

              let cardClass = 'day-card';
              if (isCompleted) cardClass += ' completed';
              else if (isToday) cardClass += ' today';
              else cardClass += ' locked';

              if (isFinale) cardClass += ' grand-finale';

              if (isFinale) {
                return `
                  <div class="${cardClass}" onclick="window.missionRunner.openMission(${mission.day})">
                    <div class="finale-left">
                      <div class="day-number-badge">30</div>
                      <div style="font-size: 40px;">👑</div>
                      <div style="text-align: left;">
                        <h4 style="font-size: 18px; color: var(--kg-morado); margin-bottom: 4px;">${mission.title}</h4>
                        <p style="font-size: 13px; color: var(--kg-gray); font-weight: 700;">¡El desafío definitivo para graduarte como Maestro KidGenius!</p>
                      </div>
                    </div>
                    <div class="finale-right">
                      <span class="day-status-pill">
                        ${isCompleted ? '🏆 ¡Maestro Graduado!' : '🚀 ¡Misión Final!'}
                      </span>
                    </div>
                  </div>
                `;
              }

              return `
                <div class="${cardClass}" onclick="window.missionRunner.openMission(${mission.day})">
                  <div class="day-number-badge">${mission.day}</div>
                  <div class="day-icon">${mission.icon}</div>
                  <div class="day-title">${mission.title}</div>
                  <div class="day-status-pill">
                    ${isCompleted ? '✅ Hecho' : (isToday ? '⚡ ¡Hoy!' : '🔒 Abrir')}
                  </div>
                  ${isCompleted ? `<div class="day-stamp">${mission.reward.sticker}</div>` : ''}
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    });

    this.container.innerHTML = html;
  }
}

window.calendarUI = new CalendarUI();
