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

window.onload = function() {
	const profilesList = document.getElementById('profiles-list');
	profilesList.innerHTML = '';

	// Ordenar los perfiles alfabéticamente por nombre
	const personasOrdenadas = personas.sort((a, b) => a.nombre.localeCompare(b.nombre));

	personasOrdenadas.forEach((persona, idx) => {
		const btn = document.createElement('button');
		btn.className = 'open-profile-btn';
		btn.textContent = persona.nombre;
		btn.onclick = function() {
			openProfileModal(idx);
		};
		profilesList.appendChild(btn);
	});

	// Modal logic
	const modal = document.getElementById('profile-modal');
	const closeBtn = modal.querySelector('.close-btn');
	closeBtn.onclick = function() {
		modal.style.display = 'none';
	};
	window.onclick = function(event) {
		if (event.target === modal) {
			modal.style.display = 'none';
		}
	};
};

function openProfileModal(idx) {
	const persona = personas[idx];
	const modal = document.getElementById('profile-modal');
	const modalProfile = document.getElementById('modal-profile-card');
	modalProfile.innerHTML = `
		<div class="profile-card">
			<img src="${persona.foto}" alt="Foto de perfil" class="profile-img">
			<h2 class="profile-name">${persona.nombre}</h2>
			<p class="profile-desc">${persona.descripcion}</p>
			<div class="profile-social">
				<a href="${persona.instagram}" title="Instagram" target="_blank"><img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg" alt="Instagram"></a>
			</div>
		</div>
	`;
	modal.style.display = 'block';
}

// Galería de fotos interactiva
const galleryThumbs = document.querySelectorAll('.gallery-thumb');
const galleryModal = document.getElementById('gallery-modal');
const galleryModalImg = document.getElementById('gallery-modal-img');
if (galleryThumbs.length && galleryModal && galleryModalImg) {
    galleryThumbs.forEach(thumb => {
        thumb.addEventListener('click', function() {
            galleryModalImg.src = this.src;
            galleryModal.style.display = 'block';
        });
    });
    galleryModal.querySelector('.close-btn').onclick = function() {
        galleryModal.style.display = 'none';
        galleryModalImg.src = '';
    };
    window.addEventListener('click', function(event) {
        if (event.target === galleryModal) {
            galleryModal.style.display = 'none';
            galleryModalImg.src = '';
        }
    });
}

// Muro de mensajes
const muroForm = document.getElementById('muro-form');
const muroNombre = document.getElementById('muro-nombre');
const muroMensaje = document.getElementById('muro-mensaje');
const muroLista = document.getElementById('muro-lista');

if (muroForm && muroNombre && muroMensaje && muroLista) {
    muroForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const nombre = muroNombre.value.trim();
        const mensaje = muroMensaje.value.trim();
        if (nombre && mensaje) {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${nombre}:</strong> ${mensaje}`;
            muroLista.prepend(li);
            muroNombre.value = '';
            muroMensaje.value = '';
        }
    });
}

// Mostrar perfiles en la página principal
const perfilesLista = document.getElementById('perfiles-lista');
if (perfilesLista) {
    perfilesLista.innerHTML = '';
    personas.forEach(persona => {
        const card = document.createElement('div');
        card.className = 'perfil-card';
        card.innerHTML = `
            <img src="${persona.foto}" alt="${persona.nombre}">
            <div class="perfil-nombre">${persona.nombre}</div>
            <div class="perfil-desc">${persona.descripcion}</div>
            <a class="perfil-instagram" href="${persona.instagram}" target="_blank" title="Instagram"><span style="font-size:1.3em;">&#x1F4F7;</span> Instagram</a>
        `;
        perfilesLista.appendChild(card);
    });
}
