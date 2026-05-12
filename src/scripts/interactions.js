// Fade-in on scroll
const fadeInObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                fadeInObserver.unobserve(entry.target);
            }
        });
    },
    { rootMargin: "0px", threshold: 0.1 },
);

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".fade-in-section").forEach((el) => fadeInObserver.observe(el));
});

// Smooth scroll for anchor links
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", (e) => {
            const target = document.querySelector(link.getAttribute("href"));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });
    });
});

// Reading progress bar — only on poem detail pages
document.addEventListener("DOMContentLoaded", () => {
    if (!document.querySelector(".poem-article")) return;

    const bar = document.createElement("div");
    bar.id = "reading-progress";
    bar.style.cssText =
        "position:fixed;top:0;left:0;width:0%;height:3px;background:linear-gradient(90deg,#81b29a,#9cc5a1);z-index:9999;transition:width 0.2s ease;pointer-events:none;";
    document.body.appendChild(bar);

    window.addEventListener("scroll", () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.width = docHeight > 0 ? (scrollTop / docHeight) * 100 + "%" : "0%";
    });
});

// Keyboard navigation for poem detail pages
document.addEventListener("keydown", (e) => {
    const article = document.querySelector(".poem-article");
    if (!article) return;
    if (e.key === "ArrowLeft") {
        const prev = document.querySelector(".nav-link.prev");
        if (prev) prev.click();
    } else if (e.key === "ArrowRight") {
        const next = document.querySelector(".nav-link.next");
        if (next) next.click();
    }
});

// Counter animation for stats
document.addEventListener("DOMContentLoaded", () => {
    const statsObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                const el = entry.target;
                const end = parseInt(el.textContent, 10);
                if (!end || el.dataset.animated) return;
                el.dataset.animated = "true";
                const duration = 1200;
                const step = Math.max(1, Math.floor(duration / end));
                let current = 0;
                const timer = setInterval(() => {
                    current++;
                    el.textContent = current;
                    if (current >= end) clearInterval(timer);
                }, step);
                statsObserver.unobserve(el);
            });
        },
        { threshold: 0.5 },
    );

    document.querySelectorAll(".stat-number").forEach((el) => statsObserver.observe(el));
});

// Respect prefers-reduced-motion
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.documentElement.style.setProperty("--transition-speed", "0.01s");
}
