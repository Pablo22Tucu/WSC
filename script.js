// script.js
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');
const sections = document.querySelectorAll('section, .section');
const navLinks = document.querySelectorAll('.navbar-menu a');
let navActivated = false;

// Toggle mobile menu visibility
mobileMenu.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    // Solo aplica si el menú móvil está abierto
    if (navMenu.classList.contains('active')) {
        // Si el clic NO es dentro del menú ni en el botón de toggle
        if (
            !navMenu.contains(event.target) &&
            !mobileMenu.contains(event.target)
        ) {
            navMenu.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    }
});

// Smooth scroll for anchor links
function activateNavLink() {
    let scrollPos = window.scrollY || window.pageYOffset;
    let offset = 200; // Ajusta según la altura de tu navbar
    let found = false;

    sections.forEach(section => {
        if (section.id) {
            const top = section.offsetTop - offset;
            const bottom = top + section.offsetHeight;
            if (scrollPos >= top && scrollPos < bottom) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + section.id) {
                        link.classList.add('active');
                        found = true;
                    }
                });
            }
        }
    });

    // Si no se encuentra ninguna sección visible, desactiva todos
    if (!found) {
        navLinks.forEach(link => link.classList.remove('active'));
    }
}

// Solo activa después de la primera interacción
function handleUserNavigation() {
    if (!navActivated) {
        window.addEventListener('scroll', activateNavLink);
        navLinks.forEach(link => {
            link.addEventListener('click', activateNavLink);
        });
        navActivated = true;
    }
}

window.addEventListener('scroll', handleUserNavigation, { once: true });
navLinks.forEach(link => {
    link.addEventListener('click', function () {
        // Cierra el menú móvil si está abierto
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
        handleUserNavigation(); // Mantén la activación del enlace
    });
});

// Botón volver arriba
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});


// Efecto de zoom en la imagen de fondo
window.addEventListener('scroll', function() {
    const scrolled = window.scrollY;
    const bg = document.querySelector('.background-image');
    // Calcula el factor de escala (ajusta 0.0005 para más o menos zoom)
    const scale = 1 + scrolled * 0.00001;
    bg.style.transform = `scale(${scale})`;
});

// Modal de galería
document.querySelectorAll('.zoom-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        const imgSrc = this.getAttribute('data-img');
        const modal = document.getElementById('gallery-modal');
        const modalImg = document.getElementById('modal-img');
        modalImg.src = imgSrc;
        modal.classList.add('show');
    });
});
document.querySelector('.close-modal').onclick = function() {
    document.getElementById('gallery-modal').classList.remove('show');
};
document.getElementById('gallery-modal').onclick = function(e) {
    if (e.target === this) this.classList.remove('show');
};