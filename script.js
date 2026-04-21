// Smooth scrolling para los enlaces de navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Manejo del formulario de contacto
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        
        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const mensaje = document.getElementById('mensaje').value;
        
        // Validación básica
        if (nombre && email && mensaje) {
            // Mostrar mensaje de éxito
            alert('¡Gracias por tu mensaje! Te contactaré pronto.');
            
            // Limpiar formulario
            contactForm.reset();
        } else {
            alert('Por favor completa todos los campos.');
        }
    });
}

// Efecto de fade-in en las tarjetas cuando se cargan
window.addEventListener('load', function () {
    const cards = document.querySelectorAll('.project-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.animation = `fadeIn 0.6s ease forwards ${index * 0.1}s`;
    });
});

// Agregar keyframe para fadeIn
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Resaltar el enlace de navegación activo
window.addEventListener('scroll', function () {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.style.color = 'white';
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = '#3498db';
            link.style.fontWeight = 'bold';
        }
    });
});

// MODO OSCURO
const themeToggle = document.getElementById('themeToggle');
const currentTheme = localStorage.getItem('theme') || 'light';

if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggle.textContent = '☀️';
}

themeToggle.addEventListener('click', () => {
    const theme = document.documentElement.getAttribute('data-theme');
    if (theme === 'dark') {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        themeToggle.textContent = '🌙';
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeToggle.textContent = '☀️';
    }
});

// BARRA DE PROGRESO
const progressBar = document.createElement('div');
progressBar.className = 'progress-bar';
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
});

// CONTADORES DE ESTADÍSTICAS
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.stat-number');
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                let current = 0;
                const increment = target / 50;
                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        counter.textContent = Math.ceil(current);
                        setTimeout(updateCounter, 20);
                    } else {
                        counter.textContent = target;
                    }
                };
                updateCounter();
            });
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const statsSection = document.querySelector('#estadisticas');
if (statsSection) {
    observer.observe(statsSection);
}

// ANIMACIONES AL SCROLL
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.project-card, .skill-group, .testimonial-card, .stat-card');
    
    elements.forEach(el => {
        el.classList.add('scroll-animate');
        const elementTop = el.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            el.classList.add('visible');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// FILTRO DE PROYECTOS
const filterProjects = (technology) => {
    const projects = document.querySelectorAll('.project-card');
    projects.forEach(project => {
        const techs = project.querySelectorAll('.tech-list li');
        const techTexts = Array.from(techs).map(tech => tech.textContent);
        
        if (technology === 'all' || techTexts.includes(technology)) {
            project.style.display = 'block';
            setTimeout(() => {
                project.style.opacity = '1';
                project.style.transform = 'scale(1)';
            }, 10);
        } else {
            project.style.opacity = '0';
            project.style.transform = 'scale(0.8)';
            setTimeout(() => {
                project.style.display = 'none';
            }, 300);
        }
    });
};

// Agregar botones de filtro
const projectsSection = document.querySelector('#proyectos .container');
const filterHTML = `
    <div class="filter-buttons">
        <button class="filter-btn active" data-filter="all">Todos</button>
        <button class="filter-btn" data-filter="JavaScript">JavaScript</button>
        <button class="filter-btn" data-filter="React">React</button>
        <button class="filter-btn" data-filter="Node.js">Node.js</button>
        <button class="filter-btn" data-filter="HTML5">HTML/CSS</button>
    </div>
`;

if (projectsSection) {
    const projectsGrid = document.querySelector('.projects-grid');
    projectsSection.insertBefore(createElementFromHTML(filterHTML), projectsGrid);
    
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');
            filterProjects(filter);
        });
    });
}

function createElementFromHTML(htmlString) {
    const div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.firstChild;
}

// MEJORA DEL FORMULARIO DE CONTACTO
const contactFormImproved = document.getElementById('contactForm');
if (contactFormImproved) {
    const inputs = contactFormImproved.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (input.value.trim() === '') {
                input.style.borderColor = '#e74c3c';
            } else {
                input.style.borderColor = '#27ae60';
            }
        });
        
        input.addEventListener('focus', () => {
            input.style.borderColor = 'var(--primary-color)';
        });
    });
    
    contactFormImproved.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim();
        const mensaje = document.getElementById('mensaje').value.trim();
        
        if (!nombre || !email || !mensaje) {
            showNotification('Por favor completa todos los campos', 'error');
            return;
        }
        
        if (!email.includes('@') || !email.includes('.')) {
            showNotification('Por favor ingresa un email válido', 'error');
            return;
        }
        
        // Simular envío
        const submitBtn = contactFormImproved.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;
        
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        showNotification('¡Mensaje enviado con éxito! Te contactaré pronto.', 'success');
        contactFormImproved.reset();
        
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Resetear bordes
        inputs.forEach(input => {
            input.style.borderColor = '#ddd';
        });
    });
}

// FUNCIÓN DE NOTIFICACIONES
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? '#27ae60' : '#e74c3c'};
        color: white;
        border-radius: 5px;
        z-index: 1000;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Agregar animaciones para notificaciones
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyles);

// DESCARGAR CV
const addCVButton = () => {
    const contactoSection = document.querySelector('#contacto .contact-content');
    if (contactoSection && !document.querySelector('.cv-download')) {
        const cvHTML = `
            <div class="cv-download">
                <a href="#" id="downloadCV" class="btn btn-primary">📄 Descargar CV</a>
            </div>
        `;
        contactoSection.insertAdjacentHTML('beforeend', cvHTML);
        
        document.getElementById('downloadCV')?.addEventListener('click', (e) => {
            e.preventDefault();
            showNotification('CV descargado (demo)', 'success');
            // Aquí iría la URL real del CV
            // window.open('ruta/a/tu-cv.pdf', '_blank');
        });
    }
};

window.addEventListener('load', addCVButton);