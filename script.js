document.addEventListener('DOMContentLoaded', () => {

    // ─── VARIÁVEIS DO MENU ────────────────────────────────────────
    const navMenu   = document.querySelector(".nav-menu");
    const hamburger = document.querySelector(".hamburger");

    // ─── ABRIR/FECHAR MENU AO CLICAR NO HAMBÚRGUER ───────────────
    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            const isOpen = navMenu.classList.toggle("nav-open");
            hamburger.classList.toggle("is-active", isOpen);
        });
    }

    // ─── FECHAR MENU AO CLICAR FORA ──────────────────────────────
    document.addEventListener("click", (e) => {
        if (!navMenu || !hamburger) return;

        const clicouDentroMenu = navMenu.contains(e.target);
        const clicouNoBotao    = hamburger.contains(e.target);

        if (!clicouDentroMenu && !clicouNoBotao) {
            navMenu.classList.remove("nav-open");
            hamburger.classList.remove("is-active");
        }
    });

    // ─── SCROLL SUAVE ─────────────────────────────────────────────
    document.querySelectorAll('.nav-link:not(.disabled)').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Só aplica o scroll suave e preventDefault se for um link interno (#)
            if (href && href.startsWith('#')) {
                e.preventDefault();

                // Fecha o menu mobile ao clicar
                if (navMenu)   navMenu.classList.remove("nav-open");
                if (hamburger) hamburger.classList.remove("is-active");

                const targetSection = document.querySelector(href);
                if (targetSection) {
                    gsap.to(window, {
                        duration: 1.5,
                        scrollTo: targetSection,
                        ease: "power4.inOut"
                    });
                }
            }
        });
    });

    // ─── NEWSLETTER ───────────────────────────────────────────────
    const newsletterForm = document.getElementById("newsletter-form");

    if (newsletterForm) {
        const inputEmail = newsletterForm.querySelector("input[type='email']");
        const button     = newsletterForm.querySelector("button");

        newsletterForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const email = inputEmail.value.trim();
            if (!email) return;

            const originalText  = button.innerHTML;
            button.innerHTML    = "ENVIANDO...";
            button.disabled     = true;

            try {
                const res  = await fetch("/api/subscribe", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email }),
                });
                const data = await res.json();

                if (data.success) {
                    button.innerHTML = "INSCRITA ✓";
                    inputEmail.value = "";
                    gsap.fromTo(button,
                        { scale: 0.95 },
                        { scale: 1, duration: 0.4, ease: "power2.out" }
                    );
                } else {
                    throw new Error();
                }

            } catch {
                button.innerHTML = "ERRO — TENTE NOVAMENTE";
                gsap.to(button, { x: 8, repeat: 3, yoyo: true, duration: 0.05 });
            }

            setTimeout(() => {
                button.innerHTML = originalText;
                button.disabled  = false;
            }, 3000);
        });
    }

    // ─── QUIZ ─────────────────────────────────────────────────────
    const steps       = document.querySelectorAll('.form-step');
    const btnNext     = document.querySelector('.btn-next');
    const quizAside   = document.getElementById('quiz-aside-container');
    const openQuizBtn = document.getElementById('open-quiz');
    let   currentStep = 0;

    if (openQuizBtn && quizAside) {
        openQuizBtn.addEventListener('click', () => {
            quizAside.classList.add('active');
            gsap.to(openQuizBtn, { opacity: 0, pointerEvents: "none", duration: 0.5 });

            gsap.from(".form-window > *", {
                opacity: 0,
                y: 20,
                stagger: 0.1,
                duration: 0.8,
                delay: 0.3
            });

            if (window.innerWidth <= 1024) {
                setTimeout(() => {
                    gsap.to(window, {
                        duration: 1,
                        scrollTo: { y: quizAside, offsetY: 80 },
                        ease: "power3.inOut"
                    });
                }, 400);
            }
        });
    }

    if (btnNext) {
        btnNext.addEventListener('click', () => {
            const currentStepEl = steps[currentStep];
            const checkboxes    = currentStepEl.querySelectorAll('input[type="checkbox"]:checked');

            if (checkboxes.length === 0) {
                gsap.to(currentStepEl, { x: 10, repeat: 3, yoyo: true, duration: 0.05 });
                return;
            }

            if (currentStep < steps.length - 1) {
                gsap.to(currentStepEl, {
                    opacity: 0,
                    y: -10,
                    duration: 0.3,
                    onComplete: () => {
                        currentStepEl.classList.remove('active');
                        currentStep++;

                        const nextStepEl = steps[currentStep];
                        nextStepEl.classList.add('active');

                        if (currentStep === steps.length - 1) {
                            btnNext.textContent = "VER RESULTADO —";
                        }

                        gsap.fromTo(nextStepEl,
                            { opacity: 0, y: 10 },
                            { opacity: 1, y: 0, duration: 0.3, clearProps: "all" }
                        );

                        if (window.innerWidth <= 1024) {
                            gsap.to(window, {
                                duration: 0.6,
                                scrollTo: { y: quizAside, offsetY: 80 },
                                ease: "power2.inOut"
                            });
                        }
                    }
                });
            } else {
                finalizarDiagnostico();
            }
        });
    }

    function finalizarDiagnostico() {
        let ranking     = [];
        let totalPontos = 0;

        steps.forEach(step => {
            const styleName = step.getAttribute('data-style');
            const count     = step.querySelectorAll('input[type="checkbox"]:checked').length;
            ranking.push({ style: styleName, points: count });
            totalPontos += count;
        });

        ranking.sort((a, b) => b.points - a.points);

        ranking = ranking.map(item => ({
            ...item,
            percent: totalPontos > 0 ? Math.round((item.points / totalPontos) * 100) : 0
        }));

        const dna         = ranking[0];
        const secundario1 = ranking[1] && ranking[1].points > 0 ? ranking[1] : null;
        const secundario2 = ranking[2] && ranking[2].points > 0 ? ranking[2] : null;

        gsap.to("#style-form", {
            opacity: 0,
            y: -20,
            duration: 0.5,
            onComplete: () => {
                renderizarResultado(dna, secundario1, secundario2, ranking);
            }
        });
    }

    function renderizarResultado(dna, sec1, sec2, todos) {
        const formWindow = document.querySelector('.form-window');

        const resultadoHTML = `
            <div id="capture-area">
                <span class="step-indicator">DIAGNÓSTICO CONCLUÍDO</span>
                <div class="main-style-card">
                    <p class="dna-label">Seu DNA Visual</p>
                    <div class="dna-header-flex">
                        <h4 class="dna-title">${dna.style}</h4>
                        <span class="dna-percentage">${dna.percent}%</span>
                    </div>
                </div>
                <div class="secondary-styles-grid">
                    ${sec1 ? `<div class="secondary-card"><p class="secondary-label">Secundário I</p><p class="secondary-value">${sec1.style}</p></div>` : ''}
                    ${sec2 ? `<div class="secondary-card"><p class="secondary-label">Secundário II</p><p class="secondary-value">${sec2.style}</p></div>` : ''}
                </div>
                <div class="progress-list">
                    ${todos.map(item => `
                        <div class="progress-item">
                            <span class="style-name">${item.style}</span>
                            <div class="progress-track">
                                <div class="progress-bar ${item.style === dna.style ? 'bar-active' : 'bar-inactive'}" style="width: ${item.percent}%"></div>
                            </div>
                            <span class="percent-value ${item.style === dna.style ? 'text-gold' : ''}">${item.percent}%</span>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="result-actions-container">
                <button onclick="window.location.reload()" class="btn-next btn-refazer-flex">Refazer Diagnóstico —</button>
                <button onclick="window.baixarDossie()" class="btn-download-icon" title="Baixar meu DNA Visual">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                </button>
            </div>`;

        formWindow.innerHTML = resultadoHTML;

        gsap.from(".form-window > *", {
            opacity: 0,
            y: 20,
            stagger: 0.1,
            duration: 0.8,
            ease: "power4.out"
        });

        if (window.innerWidth <= 1024) {
            gsap.to(window, {
                duration: 0.8,
                scrollTo: { y: formWindow, offsetY: 60 },
                ease: "power3.inOut"
            });
        }
    }

    // ─── DOWNLOAD DOSSIÊ (html2canvas) ────────────────────────────
    window.baixarDossie = function () {
        const area = document.getElementById('capture-area');
        const btnIcon = document.querySelector('.btn-download-icon');

        if (!area) return;
        btnIcon.style.opacity = "0.5";

        html2canvas(area, {
            backgroundColor: "#0a0a0a",
            scale: 2,
            logging: false,
            useCORS: true
        }).then(canvas => {
            const link = document.createElement('a');
            link.download = 'meu-dna-visual.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
            btnIcon.style.opacity = "1";
        });
    };

});