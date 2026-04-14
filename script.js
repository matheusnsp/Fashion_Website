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
            const res = await fetch("/.netlify/functions/subscribe", {
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
            <div id="capture-area" style="background: rgba(0,0,0,0.4); backdrop-filter: blur(10px); padding: 30px; border-radius: 4px; color: #fff;">
                <span class="step-indicator">DIAGNÓSTICO CONCLUÍDO</span>
                
                <div class="main-style-card" style="background: rgba(255,255,255,0.05); padding: 25px; border-left: 3px solid var(--accent-gold); margin-bottom: 25px;">
                    <p style="font-size: 0.7rem; letter-spacing: 2px; color: var(--accent-gold); margin-bottom: 5px;">SEU DNA VISUAL</p>
                    <div style="display: flex; justify-content: space-between; align-items: baseline;">
                        <h4 style="font-family: var(--font-serif); font-size: 2.2rem; text-transform: uppercase; margin: 0;">${dna.style}</h4>
                        <span style="font-size: 1.2rem; color: var(--accent-gold);">${dna.percent}%</span>
                    </div>
                </div>
    
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 25px;">
                    ${sec1 ? `<div style="border: 1px solid rgba(255,255,255,0.1); padding: 15px; background: rgba(0,0,0,0.2);">
                        <p style="font-size: 0.6rem; color: var(--accent-gold); margin-bottom: 5px;">SECUNDÁRIO I</p>
                        <p style="margin: 0; font-size: 0.9rem; text-transform: uppercase;">${sec1.style} (${sec1.percent}%)</p>
                    </div>` : ''}
                    ${sec2 ? `<div style="border: 1px solid rgba(255,255,255,0.1); padding: 15px; background: rgba(0,0,0,0.2);">
                        <p style="font-size: 0.6rem; color: var(--accent-gold); margin-bottom: 5px;">SECUNDÁRIO II</p>
                        <p style="margin: 0; font-size: 0.9rem; text-transform: uppercase;">${sec2.style} (${sec2.percent}%)</p>
                    </div>` : ''}
                </div>
    
                <div style="display: flex; flex-direction: column; gap: 10px;">
                    ${todos.map(item => `
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <span style="font-size: 0.7rem; width: 85px; text-transform: uppercase; opacity: 0.6;">${item.style}</span>
                            <div style="flex-grow: 1; height: 2px; background: rgba(255,255,255,0.1);">
                                <div style="width: ${item.percent}%; height: 100%; background: ${item.style === dna.style ? 'var(--accent-gold)' : 'white'}; opacity: 0.5;"></div>
                            </div>
                            <span style="font-size: 0.7rem; width: 30px; text-align: right;">${item.percent}%</span>
                        </div>
                    `).join('')}
                </div>
            </div>
    
            <div class="result-actions-container" style="display: flex; gap: 10px; margin-top: 20px;">
                <button onclick="window.location.reload()" class="btn-next" style="flex: 1;">REFAZER DIAGNÓSTICO —</button>
                <button onclick="window.baixarDossie()" class="btn-download-icon" style="width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; background: transparent; border: 1px solid rgba(255,255,255,0.2); color: white; cursor: pointer;">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                </button>
            </div>
        `;
    
        formWindow.innerHTML = resultadoHTML;
        gsap.from(".form-window > *", { opacity: 0, y: 20, stagger: 0.1, duration: 0.8 });
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