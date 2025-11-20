document.addEventListener('DOMContentLoaded', () => {
  // Lógica del Juego de Clics (mejorada)
  const juegoStartBtn = document.getElementById('juego-start-btn');
  const juegoClickBtn = document.getElementById('juego-click-btn');
  const juegoTiempoEl = document.getElementById('juego-tiempo');
  const juegoPuntajeEl = document.getElementById('juego-puntaje');
  const juegoResultadoEl = document.getElementById('juego-resultado');

  let puntaje = 0;
  let tiempoRestante = 0;
  let temporizador = null;

  function initUI() {
    if (juegoClickBtn) {
      juegoClickBtn.disabled = true;
      juegoClickBtn.style.display = 'none';
    }
    if (juegoResultadoEl) {
      juegoResultadoEl.style.display = 'none';
      juegoResultadoEl.textContent = '';
      juegoResultadoEl.setAttribute('aria-live', 'polite');
    }
    if (juegoPuntajeEl) juegoPuntajeEl.textContent = puntaje;
    if (juegoTiempoEl) juegoTiempoEl.textContent = tiempoRestante;
  }

  if (juegoStartBtn) {
    juegoStartBtn.addEventListener('click', iniciarJuego);
  }

  if (juegoClickBtn) {
    juegoClickBtn.addEventListener('click', () => {
      puntaje++;
      if (juegoPuntajeEl) juegoPuntajeEl.textContent = puntaje;
    });
  }

  function iniciarJuego() {
    if (temporizador) {
      clearInterval(temporizador);
      temporizador = null;
    }

    puntaje = 0;
    tiempoRestante = 10;
    if (juegoPuntajeEl) juegoPuntajeEl.textContent = puntaje;
    if (juegoTiempoEl) juegoTiempoEl.textContent = tiempoRestante;

    if (juegoStartBtn) juegoStartBtn.style.display = 'none';
    if (juegoResultadoEl) {
      juegoResultadoEl.style.display = 'none';
      juegoResultadoEl.textContent = '';
    }
    if (juegoClickBtn) {
      juegoClickBtn.style.display = 'inline-block';
      juegoClickBtn.disabled = false;
      juegoClickBtn.focus();
    }

    temporizador = setInterval(() => {
      tiempoRestante--;
      if (juegoTiempoEl) juegoTiempoEl.textContent = tiempoRestante;
      if (tiempoRestante <= 0) {
        finalizarJuego();
      }
    }, 1000);
  }

  function finalizarJuego() {
    if (temporizador) {
      clearInterval(temporizador);
      temporizador = null;
    }

    if (juegoClickBtn) {
      juegoClickBtn.disabled = true;
      juegoClickBtn.style.display = 'none';
    }
    if (juegoStartBtn) {
      juegoStartBtn.style.display = 'inline-block';
      juegoStartBtn.textContent = 'Jugar de Nuevo';
      juegoStartBtn.focus();
    }
    if (juegoTiempoEl) juegoTiempoEl.textContent = 0;
    if (juegoResultadoEl) {
      juegoResultadoEl.textContent = `¡Tu puntaje final es ${puntaje}!`;
      juegoResultadoEl.style.display = 'block';
    }
  }

  initUI();
});