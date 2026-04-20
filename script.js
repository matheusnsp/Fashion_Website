document.addEventListener('DOMContentLoaded', () => {
    // --- Lógica do Menu / Scroll Suave ---
    document.querySelectorAll('.nav-link:not(.disabled)').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                gsap.to(window, {
                    duration: 1.5,
                    scrollTo: targetSection,
                    ease: "power4.inOut"
                });
            }
        });
    });

    // --- Newsletter (Brevo + Netlify Function) ---
const newsletterForm = document.getElementById("newsletter-form");

if (newsletterForm) {
    const inputEmail = newsletterForm.querySelector("input[type='email']");
    const button = newsletterForm.querySelector("button");

    newsletterForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = inputEmail.value.trim();

        if (!email) return;

        // Estado loading (UX premium)
        const originalText = button.innerHTML;
        button.innerHTML = "ENVIANDO...";
        button.disabled = true;

        try {
            const res = await fetch("../functions/subscribe", {
                method: "POST",
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (data.success) {
                // Feedback elegante (sem alert feio)
                button.innerHTML = "INSCRITA ✓";
                inputEmail.value = "";

                gsap.fromTo(button, 
                    { scale: 0.95 }, 
                    { scale: 1, duration: 0.4, ease: "power2.out" }
                );

            } else {
                throw new Error();
            }

        } catch (err) {
            button.innerHTML = "ERRO — TENTE NOVAMENTE";

            gsap.to(button, { 
                x: 8, 
                repeat: 3, 
                yoyo: true, 
                duration: 0.05 
            });
        }

        // Reset depois de 3s
        setTimeout(() => {
            button.innerHTML = originalText;
            button.disabled = false;
        }, 3000);
    });
}


    // --- Lógica do Diagnóstico (Quiz) ---
    const steps = document.querySelectorAll('.form-step');
    const btnNext = document.querySelector('.btn-next');
    const quizAside = document.getElementById('quiz-aside-container');
    const openQuizBtn = document.getElementById('open-quiz');
    let currentStep = 0;

    // 1. Abrir o Quiz
    if (openQuizBtn) {
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
        });
    }

    // 2. Navegação
    if (btnNext) {
        btnNext.addEventListener('click', () => {
            const currentStepEl = steps[currentStep];
            const checkboxes = currentStepEl.querySelectorAll('input[type="checkbox"]:checked');
            
            if (checkboxes.length === 0) {
                // Feedback visual de erro (vibrar)
                gsap.to(currentStepEl, { x: 10, repeat: 3, yoyo: true, duration: 0.05 });
                return;
            }

            if (currentStep < steps.length - 1) {
                // Transição vertical suave
                gsap.to(currentStepEl, { 
                    opacity: 0, 
                    y: -10, 
                    duration: 0.3, 
                    onComplete: () => {
                        currentStepEl.classList.remove('active');
                        currentStep++;
                        
                        const nextStepEl = steps[currentStep];
                        nextStepEl.classList.add('active');
                        
                        // Garante que o container se ajuste ao conteúdo
                        if (currentStep === steps.length - 1) {
                            btnNext.textContent = "VER RESULTADO —";
                        }

                        gsap.fromTo(nextStepEl, 
                            { opacity: 0, y: 10 }, 
                            { opacity: 1, y: 0, duration: 0.3, clearProps: "all" }
                        );
                    }
                });
            } else {
                finalizarDiagnostico();
            }
        });
    }

    // 3. Lógica de Cálculo e Exibição do Dossiê
    function finalizarDiagnostico() {
        let ranking = [];
        let totalPontos = 0;
    
        steps.forEach(step => {
            const styleName = step.getAttribute('data-style');
            const count = step.querySelectorAll('input[type="checkbox"]:checked').length;
            ranking.push({ style: styleName, points: count });
            totalPontos += count;
        });
    
        // Ordenar do maior para o menor
        ranking.sort((a, b) => b.points - a.points);
    
        // Calcular porcentagens
        ranking = ranking.map(item => ({
            ...item,
            percent: totalPontos > 0 ? Math.round((item.points / totalPontos) * 100) : 0
        }));
    
        const dna = ranking[0];
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
            <div id="capture-area" style="background: transparent; padding: 20px; color: var(--text-primary);">
                <span class="step-indicator" style="display: block; margin-bottom: 20px;">DIAGNÓSTICO CONCLUÍDO</span>
                
                <div class="main-style-card" style="border: 1px solid  #C5934C; padding: 30px; margin-bottom: 30px; background: rgba(255, 255, 255, 0.03); position: relative;">
                    <p style="font-family: var(--font-sans); font-size: 1rem; letter-spacing: 4px; color: var(--accent-gold); text-transform: uppercase; margin-bottom: 15px;">Seu DNA Visual</p>
                    <div style="display: flex; justify-content: space-between; align-items: baseline;">
                        <h4 style="font-family: var(--font-serif); font-size: 3rem; text-transform: uppercase; margin: 0; line-height: 1; letter-spacing: 2px;">${dna.style}</h4>
                        <span style="font-family: var(--font-title); font-size: 1.5rem; color: var(--accent-gold);">${dna.percent}%</span>
                    </div>
                </div>
    
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 35px;">
                    ${sec1 ? `
                    <div style="border: 1px solid #C5934C; padding: 20px; background: rgba(255,255,255,0.02);">
                        <p style="font-family: var(--font-sans); font-size: 0.6rem; letter-spacing: 2px; color: var(--accent-gold); margin-bottom: 8px; text-transform: uppercase;">Secundário I</p>
                        <p style="margin: 0; font-family: var(--font-serif); font-size: 1.1rem; text-transform: uppercase; letter-spacing: 1px;">${sec1.style}</p>
                    </div>` : ''}
                    
                    ${sec2 ? `
                    <div style="border: 1px solid  #C5934C; padding: 20px; background: rgba(255,255,255,0.02);">
                        <p style="font-family: var(--font-sans); font-size: 0.6rem; letter-spacing: 2px; color: var(--accent-gold); margin-bottom: 8px; text-transform: uppercase;">Secundário II</p>
                        <p style="margin: 0; font-family: var(--font-serif); font-size: 1.1rem; text-transform: uppercase; letter-spacing: 1px;">${sec2.style}</p>
                    </div>` : ''}
                </div>
    
                <div style="display: flex; flex-direction: column; gap: 12px; padding: 0 5px;">
                    ${todos.map(item => `
                        <div style="display: flex; align-items: center; gap: 15px;">
                            <span style="font-family: var(--font-sans); font-size: 0.65rem; width: 90px; text-transform: uppercase; opacity: 0.5; letter-spacing: 1px;">${item.style}</span>
                            <div style="flex-grow: 1; height: 1px; background: rgba(255,255,255,0.1); position: relative;">
                                <div style="width: ${item.percent}%; height: 1px; background: ${item.style === dna.style ? 'var(--accent-gold)' : 'white'}; opacity: ${item.style === dna.style ? '1' : '0.4'}; transition: width 1s ease-out;"></div>
                            </div>
                            <span style="font-family: var(--font-sans); font-size: 0.65rem; width: 35px; text-align: right; color: ${item.style === dna.style ? 'var(--accent-gold)' : 'inherit'};">${item.percent}%</span>
                        </div>
                    `).join('')}
                </div>
            </div>
    
            <div class="result-actions-container">
                <button onclick="window.location.reload()" class="btn-next btn-refazer-flex">Refazer Diagnóstico —</button>
                <button onclick="window.baixarDossie()" class="btn-download-icon" title="Baixar meu DNA Visual">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                </button>
            </div>
        `;
    
        formWindow.innerHTML = resultadoHTML;
        gsap.from(".form-window > *", { opacity: 0, y: 20, stagger: 0.1, duration: 0.8, ease: "power4.out" });
    }
    
    // Função global para o html2canvas
    window.baixarDossie = function() {
        const area = document.getElementById('capture-area');
        const btnIcon = document.querySelector('.btn-download-icon');
        
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