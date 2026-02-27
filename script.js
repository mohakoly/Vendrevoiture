/* ========================================
   AutoMoto Pro - JavaScript
======================================== */

// Vehicle Data
const vehicles = [
    {
        id: 1,
        name: "BMW Série 5",
        category: "car",
        type: "used",
        price: 38900,
        year: 2021,
        mileage: 35000,
        fuel: "Diesel",
        image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&h=400&fit=crop",
        description: "Magnifique BMW Série 5 Diesel en excellent état. Entretien régulier chez concessionnaire. Options:导航, cuir, caméra de recul.",
        specs: { year: 2021, mileage: "35 000 km", fuel: "Diesel" }
    },
    {
        id: 2,
        name: "Mercedes-Benz C-Class",
        category: "car",
        type: "new",
        price: 45900,
        year: 2024,
        mileage: 0,
        fuel: "Essence",
        image: "https://images.unsplash.com/photo-1616422285623-13ff0162193c?w=600&h=400&fit=crop",
        description: "Mercedes-Benz C 200 Essence neuve. Package AMG, intérieur cuir, système MBUX, jantes 19 pouces.",
        specs: { year: 2024, mileage: "0 km", fuel: "Essence" }
    },
    {
        id: 3,
        name: "Audi A4 Avant",
        category: "car",
        type: "used",
        price: 32900,
        year: 2020,
        mileage: 58000,
        fuel: "Diesel",
        image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&h=400&fit=crop",
        description: "Audi A4 Avant Business S-line. Très bien entretenue, contrôle technique à jour.声音系统 Audi Sound.",
        specs: { year: 2020, mileage: "58 000 km", fuel: "Diesel" }
    },
    {
        id: 4,
        name: "Yamaha MT-07",
        category: "motorcycle",
        type: "used",
        price: 7290,
        year: 2021,
        mileage: 12500,
        engine: "689 cc",
        image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=600&h=400&fit=crop",
        description: "Yamaha MT-07 en excellent état. Préparée, échappement Akrapovič, крышка selle confort.Permis A2 disponible.",
        specs: { year: 2021, mileage: "12 500 km", engine: "689 cc" }
    },
    {
        id: 5,
        name: "Honda CB1000R",
        category: "motorcycle",
        type: "new",
        price: 14490,
        year: 2024,
        mileage: 0,
        engine: "998 cc",
        image: "https://images.unsplash.com/photo-1558981806-ec527fa84c3d?w=600&h=400&fit=crop",
        description: "Honda CB1000R Black Edition 2024. Design Naked Bike moderne, moteur puissant, équipements haut de gamme.",
        specs: { year: 2024, mileage: "0 km", engine: "998 cc" }
    },
    {
        id: 6,
        name: "Kawasaki Z900",
        category: "motorcycle",
        type: "used",
        price: 8990,
        year: 2022,
        mileage: 8900,
        engine: "948 cc",
        image: "https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?w=600&h=400&fit=crop",
        description: "Kawasaki Z900 parfaitement entretenue. Version Performance avec индексs complète. Pneus neufs.",
        specs: { year: 2022, mileage: "8 900 km", engine: "948 cc" }
    }
];

// DOM Elements
const vehiclesGrid = document.getElementById('vehiclesGrid');
const tabBtns = document.querySelectorAll('.tab-btn');
const modal = document.getElementById('vehicleModal');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const modalBody = document.getElementById('modalBody');
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const header = document.getElementById('header');
const navLinks = document.getElementById('navLinks');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderVehicles('all');
    setupEventListeners();
    setupScrollAnimations();
    setupHeaderScroll();
});

// Render Vehicles
function renderVehicles(category) {
    const filteredVehicles = category === 'all' 
        ? vehicles 
        : vehicles.filter(v => v.category === category);
    
    vehiclesGrid.innerHTML = filteredVehicles.map(vehicle => createVehicleCard(vehicle)).join('');
    
    // Add click events to cards
    document.querySelectorAll('.vehicle-card').forEach(card => {
        card.addEventListener('click', () => {
            const vehicleId = parseInt(card.dataset.id);
            openModal(vehicleId);
        });
    });
    
    // Re-trigger animations
    setupScrollAnimations();
}

// Create Vehicle Card HTML
function createVehicleCard(vehicle) {
    const typeLabel = vehicle.type === 'new' ? 'Neuf' : 'Occasion';
    const categoryLabel = vehicle.category === 'car' ? 'Voiture' : 'Moto';
    const priceFormatted = vehicle.price.toLocaleString('fr-FR') + ' €';
    
    const specsHTML = vehicle.category === 'car' 
        ? `
            <div class="card-spec">
                <span class="card-spec-icon">📅</span>
                <span>${vehicle.specs.year}</span>
            </div>
            <div class="card-spec">
                <span class="card-spec-icon">🛣️</span>
                <span>${vehicle.specs.mileage}</span>
            </div>
            <div class="card-spec">
                <span class="card-spec-icon">⛽</span>
                <span>${vehicle.specs.fuel}</span>
            </div>
        `
        : `
            <div class="card-spec">
                <span class="card-spec-icon">📅</span>
                <span>${vehicle.specs.year}</span>
            </div>
            <div class="card-spec">
                <span class="card-spec-icon">🛣️</span>
                <span>${vehicle.specs.mileage}</span>
            </div>
            <div class="card-spec">
                <span class="card-spec-icon">⚙️</span>
                <span>${vehicle.specs.engine}</span>
            </div>
        `;
    
    return `
        <div class="vehicle-card reveal" data-id="${vehicle.id}">
            <div class="card-image">
                <img src="${vehicle.image}" alt="${vehicle.name}" onerror="this.style.display='none'">
                <div class="card-badges">
                    <span class="card-badge ${vehicle.type}">${typeLabel}</span>
                    <span class="card-badge type">${categoryLabel}</span>
                </div>
                <button class="card-favorite" aria-label="Ajouter aux favoris">❤️</button>
            </div>
            <div class="card-content">
                <h3 class="card-title">${vehicle.name}</h3>
                <div class="card-price">${priceFormatted}</div>
                <div class="card-specs">
                    ${specsHTML}
                </div>
                <div class="card-action">
                    <button class="btn btn-primary">Voir les détails</button>
                </div>
            </div>
        </div>
    `;
}

// Category Filter
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const category = btn.dataset.category;
        renderVehicles(category);
    });
});

// Modal Functions
function openModal(vehicleId) {
    const vehicle = vehicles.find(v => v.id === vehicleId);
    if (!vehicle) return;
    
    const typeLabel = vehicle.type === 'new' ? 'Neuf' : 'Occasion';
    const categoryLabel = vehicle.category === 'car' ? 'Voiture' : 'Moto';
    const priceFormatted = vehicle.price.toLocaleString('fr-FR') + ' €';
    
    const specsHTML = vehicle.category === 'car'
        ? `
            <div class="modal-spec-item">
                <span>📅</span>
                <label>Année</label>
                <div>${vehicle.specs.year}</div>
            </div>
            <div class="modal-spec-item">
                <span>🛣️</span>
                <label>Kilométrage</label>
                <div>${vehicle.specs.mileage}</div>
            </div>
            <div class="modal-spec-item">
                <span>⛽</span>
                <label>Carburant</label>
                <div>${vehicle.specs.fuel}</div>
            </div>
            <div class="modal-spec-item">
                <span>🏷️</span>
                <label>Type</label>
                <div>${typeLabel}</div>
            </div>
        `
        : `
            <div class="modal-spec-item">
                <span>📅</span>
                <label>Année</label>
                <div>${vehicle.specs.year}</div>
            </div>
            <div class="modal-spec-item">
                <span>🛣️</span>
                <label>Kilométrage</label>
                <div>${vehicle.specs.mileage}</div>
            </div>
            <div class="modal-spec-item">
                <span>⚙️</span>
                <label>Cylindrée</label>
                <div>${vehicle.specs.engine}</div>
            </div>
            <div class="modal-spec-item">
                <span>🏷️</span>
                <label>Type</label>
                <div>${typeLabel}</div>
            </div>
        `;
    
    modalBody.innerHTML = `
        <img src="${vehicle.image}" alt="${vehicle.name}" class="modal-image" onerror="this.style.display='none'">
        <div class="card-badges" style="position: relative; margin-bottom: 15px;">
            <span class="card-badge ${vehicle.type}">${typeLabel}</span>
            <span class="card-badge type">${categoryLabel}</span>
        </div>
        <h2 class="modal-title">${vehicle.name}</h2>
        <div class="modal-price">${priceFormatted}</div>
        <div class="modal-specs">
            ${specsHTML}
        </div>
        <p class="modal-description">${vehicle.description}</p>
        <div class="modal-actions">
            <a href="#contact" class="btn btn-primary" onclick="closeModal()">Contacter pour ce véhicule</a>
            <button class="btn btn-outline" onclick="closeModal()">Fermer</button>
        </div>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

// Form Validation & Submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Reset errors
    document.querySelectorAll('.form-error').forEach(el => el.textContent = '');
    formSuccess.classList.remove('show');
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();
    
    let isValid = true;
    
    // Validate name
    if (name.length < 2) {
        document.getElementById('nameError').textContent = 'Veuillez entrer votre nom complet';
        isValid = false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        document.getElementById('emailError').textContent = 'Veuillez entrer une adresse email valide';
        isValid = false;
    }
    
    // Validate message
    if (message.length < 10) {
        document.getElementById('messageError').textContent = 'Veuillez entrer un message d\'au moins 10 caractères';
        isValid = false;
    }
    
    if (isValid) {
        // Show success message
        formSuccess.classList.add('show');
        contactForm.reset();
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            formSuccess.classList.remove('show');
        }, 5000);
    }
});

// Mobile Menu
mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
    });
});

// Header Scroll Effect
function setupHeaderScroll() {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Scroll Reveal Animations
function setupScrollAnimations() {
    const reveals = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
        reveals.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const revealPoint = 100;
            
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });
    };
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Navbar active state on scroll
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + sectionId) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNav);
