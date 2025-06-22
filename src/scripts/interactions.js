// Efectos interactivos para LiraLatente

// Animación de aparición progresiva de elementos
const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
        }
    });
}, observerOptions);

// Observar elementos con la clase fade-in-section
document.addEventListener("DOMContentLoaded", () => {
    const fadeElements = document.querySelectorAll(".fade-in-section");
    fadeElements.forEach((el) => fadeInObserver.observe(el));
});

// Efecto de parallax sutil en el hero
document.addEventListener("DOMContentLoaded", () => {
    const heroSection = document.querySelector(".hero-section");
    if (heroSection) {
        window.addEventListener("scroll", () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroSection.style.transform = `translateY(${rate}px)`;
        });
    }
});

// Efecto de typing para títulos especiales
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = "";

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Aplicar efecto de escritura a títulos principales en la página de inicio
document.addEventListener("DOMContentLoaded", () => {
    const mainTitle = document.querySelector(".main-title");
    if (mainTitle && window.location.pathname === "/") {
        const originalText = mainTitle.textContent;
        mainTitle.style.opacity = "0";

        setTimeout(() => {
            mainTitle.style.opacity = "1";
            typeWriter(mainTitle, originalText, 150);
        }, 500);
    }
});

// Smooth scroll para enlaces internos
document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = link.getAttribute("href");
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }
        });
    });
});

// Efecto de cursor personalizado para áreas poéticas
document.addEventListener("DOMContentLoaded", () => {
    const poetryAreas = document.querySelectorAll(
        ".poetry-content, .poem-content"
    );

    poetryAreas.forEach((area) => {
        area.addEventListener("mouseenter", () => {
            document.body.style.cursor = "text";
        });

        area.addEventListener("mouseleave", () => {
            document.body.style.cursor = "default";
        });
    });
});

// Animación de conteo para estadísticas
function animateCounter(element, start, end, duration = 2000) {
    const range = end - start;
    const stepTime = Math.abs(Math.floor(duration / range));
    let current = start;

    const timer = setInterval(() => {
        current += 1;
        element.textContent = current;

        if (current === end) {
            clearInterval(timer);
        }
    }, stepTime);
}

// Aplicar animación de conteo a números estadísticos
document.addEventListener("DOMContentLoaded", () => {
    const statNumbers = document.querySelectorAll(".stat-number");

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const finalNumber = parseInt(element.textContent);

                if (finalNumber && !element.dataset.animated) {
                    element.dataset.animated = "true";
                    animateCounter(element, 0, finalNumber, 2000);
                }
            }
        });
    }, observerOptions);

    statNumbers.forEach((stat) => statsObserver.observe(stat));
});

// Efecto de lectura progresiva
document.addEventListener("DOMContentLoaded", () => {
    const readingBar = document.createElement("div");
    readingBar.id = "reading-progress";
    readingBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #81b29a, #9cc5a1);
        z-index: 9999;
        transition: width 0.3s ease;
    `;

    document.body.appendChild(readingBar);

    window.addEventListener("scroll", () => {
        const scrollTop = window.pageYOffset;
        const docHeight =
            document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;

        readingBar.style.width = scrollPercent + "%";
    });
});

// Efecto de hover para navegación
document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach((link) => {
        link.addEventListener("mouseenter", function () {
            this.style.transform = "translateY(-2px) scale(1.05)";
        });

        link.addEventListener("mouseleave", function () {
            this.style.transform = "translateY(0) scale(1)";
        });
    });
});

// Preloader sutil
document.addEventListener("DOMContentLoaded", () => {
    const preloader = document.createElement("div");
    preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: opacity 0.5s ease;
    `;

    const loader = document.createElement("div");
    loader.innerHTML = `
        <div style="
            width: 40px;
            height: 40px;
            border: 3px solid rgba(129, 178, 154, 0.3);
            border-top: 3px solid #81b29a;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        "></div>
        <style>
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        </style>
    `;

    preloader.appendChild(loader);
    document.body.appendChild(preloader);

    window.addEventListener("load", () => {
        preloader.style.opacity = "0";
        setTimeout(() => {
            preloader.remove();
        }, 500);
    });
});

// Detección de preferencias de usuario
document.addEventListener("DOMContentLoaded", () => {
    // Detectar si el usuario prefiere movimiento reducido
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        document.documentElement.style.setProperty(
            "--animation-speed",
            "0.01s"
        );
    }

    // Detectar tema preferido del sistema
    if (window.matchMedia("(prefers-color-scheme: light)").matches) {
        // El diseño ya está optimizado para tema oscuro, pero podríamos añadir adaptaciones
        console.log(
            "Usuario prefiere tema claro - diseño optimizado para oscuro"
        );
    }
});
