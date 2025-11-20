document.addEventListener('DOMContentLoaded', () => {
  // Datos de personas (mantengo el contenido original)
  const personas = [
    {
      nombre: "Laureee",
      descripcion: "Estudiante de la ETI. Toca la bateria y tambien toca menores",
      foto: "img/laure.jpg",
      instagram: "https://www.instagram.com/lauree.gavazza/"
    },
    {
      nombre: "Coco",
      descripcion: "No tiene laburo. Apasionado por el corsa y las gorditas.",
      foto: "img/coco.jpg",
      instagram: "https://www.instagram.com/saantibenitez__/"
    },
    {
      nombre: "Eze",
      descripcion: "Repartidor textil. toca la flauta con su nariz y juega basquet.",
      foto: "img/eze1.jpg",
      instagram: "https://instagram.com/eze"
    },
    {
      nombre: "Guido",
      descripcion: "Estudiante el secundario. amante del vaper y de culear.",
      foto: "https://randomuser.me/api/portraits/men/23.jpg",
      instagram: "https://www.instagram.com/guidoo.raimundo/"
    },
    {
      nombre: "Pota",
      descripcion: "Estudiando en la ETI. Le gustan las compus y las turras.",
      foto: "img/pota1.jpg",
      instagram: "https://instagram.com/pota"
    },
    {
      nombre: "Patri",
      descripcion: "Estudiante de abogacia. Le gusta dormir y las milipilis",
      foto: "img/patri.jpg",
      instagram: "https://www.instagram.com/patriherrera__/"
    },
  ];

  // Utilidades seguras para crear nodos con texto (evita innerHTML cuando es input de usuario)
  function createTextElement(tag, text, className) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    el.textContent = text;
    return el;
  }

  // Perfiles - lista de botones
  const profilesList = document.getElementById('profiles-list');
  if (profilesList) {
    profilesList.innerHTML = '';
    const personasOrdenadas = personas.slice().sort((a, b) => a.nombre.localeCompare(b.nombre));
    personasOrdenadas.forEach((persona, idx) => {
      const btn = document.createElement('button');
      btn.className = 'open-profile-btn';
      btn.type = 'button';
      btn.textContent = persona.nombre;
      btn.dataset.idx = idx;
      btn.addEventListener('click', () => openProfileModal(idx));
      profilesList.appendChild(btn);
    });
  }

  // Modal de perfil
  const modal = document.getElementById('profile-modal');
  function buildProfileCard(persona) {
    const card = document.createElement('div');
    card.className = 'profile-card';

    const img = document.createElement('img');
    img.className = 'profile-img';
    img.alt = `Foto de ${persona.nombre}`;
    img.src = persona.foto || '';
    card.appendChild(img);

    card.appendChild(createTextElement('h2', persona.nombre, 'profile-name'));
    card.appendChild(createTextElement('p', persona.descripcion, 'profile-desc'));

    const social = document.createElement('div');
    social.className = 'profile-social';
    const a = document.createElement('a');
    a.href = persona.instagram || '#';
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.title = 'Instagram';
    const icon = document.createElement('img');
    icon.src = 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg';
    icon.alt = 'Instagram';
    a.appendChild(icon);
    social.appendChild(a);
    card.appendChild(social);

    return card;
  }

  function openProfileModal(idx) {
    const persona = personas[idx];
    if (!persona) return;
    const modalProfile = document.getElementById('modal-profile-card');
    if (!modal || !modalProfile) return;
    modalProfile.innerHTML = '';
    modalProfile.appendChild(buildProfileCard(persona));
    modal.style.display = 'block';
    modal.setAttribute('aria-hidden', 'false');
    // focus management
    const closeBtn = modal.querySelector('.close-btn');
    if (closeBtn) closeBtn.focus();
  }

  // Cerrar modal y accesibilidad (Escape)
  if (modal) {
    const closeBtn = modal.querySelector('.close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
      });
    }
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
      }
    });
    window.addEventListener('click', (event) => {
      if (event.target === modal) {
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
      }
    });
  }

  // Galería - manejo seguro
  const galleryThumbs = document.querySelectorAll('.gallery-thumb');
  const galleryModal = document.getElementById('gallery-modal');
  const galleryModalImg = document.getElementById('gallery-modal-img');
  if (galleryThumbs && galleryModal && galleryModalImg) {
    galleryThumbs.forEach(thumb => {
      thumb.addEventListener('click', function () {
        galleryModalImg.src = this.src || '';
        galleryModal.style.display = 'block';
        galleryModal.setAttribute('aria-hidden', 'false');
      });
    });
    const closeGallery = galleryModal.querySelector('.close-btn');
    if (closeGallery) {
      closeGallery.addEventListener('click', () => {
        galleryModal.style.display = 'none';
        galleryModalImg.src = '';
        galleryModal.setAttribute('aria-hidden', 'true');
      });
    }
    window.addEventListener('click', (event) => {
      if (event.target === galleryModal) {
        galleryModal.style.display = 'none';
        galleryModalImg.src = '';
        galleryModal.setAttribute('aria-hidden', 'true');
      }
    });
  }

  // Muro - prevenir XSS usando textContent y creando elementos manualmente
  const muroForm = document.getElementById('muro-form');
  const muroNombre = document.getElementById('muro-nombre');
  const muroMensaje = document.getElementById('muro-mensaje');
  const muroLista = document.getElementById('muro-lista');

  if (muroForm && muroNombre && muroMensaje && muroLista) {
    muroForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const nombre = muroNombre.value.trim();
      const mensaje = muroMensaje.value.trim();
      if (nombre && mensaje) {
        const li = document.createElement('li');
        const strong = document.createElement('strong');
        strong.textContent = nombre + ': ';
        li.appendChild(strong);
        li.appendChild(document.createTextNode(mensaje));
        muroLista.prepend(li);
        muroNombre.value = '';
        muroMensaje.value = '';
        muroNombre.focus();
      }
    });
  }

  // Mostrar perfiles en la página principal (cards)
  const perfilesLista = document.getElementById('perfiles-lista');
  if (perfilesLista) {
    perfilesLista.innerHTML = '';
    personas.forEach(persona => {
      const card = document.createElement('div');
      card.className = 'perfil-card';

      const img = document.createElement('img');
      img.src = persona.foto || '';
      img.alt = persona.nombre;
      card.appendChild(img);

      const nombreDiv = document.createElement('div');
      nombreDiv.className = 'perfil-nombre';
      nombreDiv.textContent = persona.nombre;
      card.appendChild(nombreDiv);

      const descDiv = document.createElement('div');
      descDiv.className = 'perfil-desc';
      descDiv.textContent = persona.descripcion;
      card.appendChild(descDiv);

      const a = document.createElement('a');
      a.className = 'perfil-instagram';
      a.href = persona.instagram || '#';
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.title = 'Instagram';
      a.innerHTML = '<span style="font-size:1.3em;">&#x1F4F7;</span> Instagram';
      card.appendChild(a);

      perfilesLista.appendChild(card);
    });
  }
});