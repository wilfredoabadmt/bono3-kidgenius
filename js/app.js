/* KidGenius Club - Bono #3: Calendario de Aventuras
   Controlador Principal de la Aplicación */

document.addEventListener('DOMContentLoaded', () => {
  // Inicialización de componentes
  window.calendarUI.render();
  window.diplomaManager.render();
  window.printManager.renderPrintTemplate();

  // Actualizar estado del botón de sonido
  const soundBtn = document.getElementById('sound-toggle-btn');
  if (soundBtn) {
    soundBtn.textContent = window.soundEngine.muted ? '🔇' : '🔊';
    soundBtn.title = window.soundEngine.muted ? 'Activar Sonido' : 'Silenciar Sonido';
  }

  // Navegación de Tabs
  const navTabs = document.querySelectorAll('.nav-tab-btn');
  navTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      const targetView = tab.getAttribute('data-tab');
      switchTab(targetView);
    });
  });
});

function switchTab(viewId) {
  window.soundEngine.playClick();

  // Actualizar botones de navegación
  document.querySelectorAll('.nav-tab-btn').forEach(btn => {
    if (btn.getAttribute('data-tab') === viewId) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Mostrar la vista correspondiente
  document.querySelectorAll('.tab-view').forEach(view => {
    if (view.id === `view-${viewId}`) {
      view.classList.add('active-view');
    } else {
      view.classList.remove('active-view');
    }
  });

  // Acciones secundarias por tab
  if (viewId === 'diploma') {
    window.diplomaManager.render();
  } else if (viewId === 'print') {
    window.printManager.renderPrintTemplate();
  } else if (viewId === 'calendar') {
    window.calendarUI.render();
  }
}

function toggleAudio() {
  const isMuted = window.soundEngine.toggleMute();
  const soundBtn = document.getElementById('sound-toggle-btn');
  if (soundBtn) {
    soundBtn.textContent = isMuted ? '🔇' : '🔊';
    soundBtn.title = isMuted ? 'Activar Sonido' : 'Silenciar Sonido';
  }
  showToast(isMuted ? 'Sonido desactivado' : 'Sonido activado 🔊');
}

function openProfileModal() {
  window.soundEngine.playPop();
  const profile = window.appState.getCurrentProfile();
  const modal = document.getElementById('profile-modal');
  const nameInput = document.getElementById('profile-name-input');
  
  if (nameInput) nameInput.value = profile.name;
  if (modal) modal.classList.add('active');
}

function closeProfileModal() {
  const modal = document.getElementById('profile-modal');
  if (modal) modal.classList.remove('active');
}

function saveProfile() {
  const nameInput = document.getElementById('profile-name-input');
  if (nameInput && nameInput.value.trim()) {
    window.appState.setProfileName(nameInput.value.trim());
    window.soundEngine.playSuccess();
    window.calendarUI.render();
    window.diplomaManager.render();
    window.printManager.renderPrintTemplate();
    closeProfileModal();
    showToast(`¡Perfil actualizado para ${nameInput.value.trim()}! 🦖`);
  }
}

function selectAvatar(avatarEmoji) {
  window.appState.setProfileAvatar(avatarEmoji);
  window.soundEngine.playPop();
  document.querySelectorAll('.avatar-option').forEach(el => {
    if (el.textContent === avatarEmoji) {
      el.classList.add('selected');
    } else {
      el.classList.remove('selected');
    }
  });
}

function openParentsModal() {
  window.soundEngine.playPop();
  const modal = document.getElementById('parents-modal');
  if (modal) modal.classList.add('active');
}

function closeParentsModal() {
  const modal = document.getElementById('parents-modal');
  if (modal) modal.classList.remove('active');
}

function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>🌟</span> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}
