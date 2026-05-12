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

    // ─── SISTEMA DE TRADUÇÃO (i18n) ───────────────────────────────
    const translations = {
        pt: {
            // NAV
            "nav.home":        "Home",
            "nav.services":    "Serviços",
            "nav.newsletter":  "Newsletter",

            // INDEX — HOME
            "home.tagline":    `A <strong><span style="color:#C5934C">Autoconfiança</span></strong> real nasce do alinhamento entre a sua <strong><span style="color:#C5934C">Identidade</span></strong> e a sua <strong><span style="color:#C5934C">Imagem.</span></strong>`,

            // INDEX — ABOUT
            "about.subtitle":  "Expertise & <br> Background",
            "about.text":      `<strong>Mentora e Consultora de Imagem atuando há mais de 25 anos em Estratégia de Negócios e Moda.</strong>
                <br><strong>Fashion Designer pelo MoMa (New York), com atualizações na Passaporte Fashionista Academy e no Estúdio Immagine,
                associada da AICI (Associação Internacional de Consultores de Imagem), palestrante e criadora do 
                    <span style="color:#C5934C">Método IMEO (Identidade, Mensagem e Ocasião)</span></strong>.`,

            // INDEX — SOCIAL
            "social.label":    "CONECTE-SE NAS REDES",

            // FOOTER
            "footer.location": "© 2026 — RIO DE JANEIRO <span class=\"divider\">/</span> MIAMI",

            // SERVICES
            "services.sp.title":       "Styling Pontual",
            "services.sp.desc":        "Curadoria com peças da cliente para sessão de fotos. Produção de até 4 looks (sem acompanhamento no set).",
            "services.sp.cta":         "Solicitar Orçamento",

            "services.spas.title":     "Styling Pontual <br>+ Assessoria no Set",
            "services.spas.desc1":     "Curadoria com peças da cliente para sessão de fotos.",
            "services.spas.desc2":     "Montagem e produção de todos os looks e acompanhamento estratégico durante toda a sessão de fotos.",
            "services.spas.cta":       "Solicitar Orçamento",

            "services.presencial.title":  "Consultoria Presencial",
            "services.presencial.desc":   "Um processo personalizado de transformação e alinhamento entre quem você é e o que sua imagem comunica.",
            "services.presencial.li1":    "Entrevista e Anamnese",
            "services.presencial.li2":    "Encontro presencial (até 5h)",
            "services.presencial.li3":    "Análise de Closet e Curadoria",
            "services.presencial.li4":    "Dossiê Personalizado",
            "services.presencial.li5":    "Suporte WhatsApp (2 meses)",
            "services.presencial.cta":    "Solicitar Orçamento",

            "services.online.title":  "Consultoria Online",
            "services.online.desc":   "A mesma profundidade da consultoria presencial, adaptada para a flexibilidade do ambiente digital.",
            "services.online.li1":    "Entrevista e Anamnese",
            "services.online.li2":    "Encontro online (até 2h)",
            "services.online.li3":    "Estratégias de Styling Digital",
            "services.online.li4":    "Dossiê Personalizado",
            "services.online.li5":    "Suporte WhatsApp (2 meses)",
            "services.online.cta":    "Solicitar Orçamento",

            "services.palestra.title": "Workshop",
            "services.palestra.desc":  "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.",
            "services.palestra.cta":   "Entre em Contato",

            // FORM — QUIZ
            "form.quiz.title":       "Análise de <br> Identidade Visual",
            "form.quiz.description": "Um diagnóstico exclusivo para identificar o seu estilo, e como você pode revelar a sua identidade com mais clareza e autenticidade.",
            "form.quiz.cta":         "INICIAR DIAGNÓSTICO →",

            "form.step1.indicator": "Cenário 1 de 7",
            "form.step1.question":  "Com quais destas características você se identifica?",
            "form.step1.instruction": "Selecione todas que descrevem sua personalidade:",
            "form.step1.o1": "Agradável",    "form.step1.o2": "Comunicativa",
            "form.step1.o3": "Casual",       "form.step1.o4": "Ativa",
            "form.step1.o5": "Amigável",     "form.step1.o6": "Esportiva",
            "form.step1.o7": "Otimista",     "form.step1.o8": "Positiva",
            "form.step1.o9": "Despretensiosa",

            "form.step2.indicator": "Cenário 2 de 7",
            "form.step2.question":  "Marque o que reflete seu jeito de ser:",
            "form.step2.o1": "Metódica",     "form.step2.o2": "Conservadora",
            "form.step2.o3": "Conscienciosa","form.step2.o4": "Eficiente",
            "form.step2.o5": "Leal",         "form.step2.o6": "Organizada",
            "form.step2.o7": "Confiável",    "form.step2.o8": "Responsável",
            "form.step2.o9": "Sensata",

            "form.step3.indicator": "Cenário 3 de 7",
            "form.step3.question":  "Quais destas palavras combinam com você?",
            "form.step3.o1": "Culta",        "form.step3.o2": "Nobre",
            "form.step3.o3": "Perspicaz",    "form.step3.o4": "Distinta",
            "form.step3.o5": "Equilibrada",  "form.step3.o6": "Refinada",
            "form.step3.o7": "Discreta",     "form.step3.o8": "Elegante",
            "form.step3.o9": "Imponente",

            "form.step4.indicator": "Cenário 4 de 7",
            "form.step4.question":  "Selecione as características que você possui:",
            "form.step4.o1": "Generosa",     "form.step4.o2": "Ponderada",
            "form.step4.o3": "Atenciosa",    "form.step4.o4": "Romântica",
            "form.step4.o5": "Sensível",     "form.step4.o6": "Gentil",
            "form.step4.o7": "Incentivadora","form.step4.o8": "Compreensiva",
            "form.step4.o9": "Afetuosa",

            "form.step5.indicator": "Cenário 5 de 7",
            "form.step5.question":  "Como você se descreve?",
            "form.step5.o1": "Vaidosa",      "form.step5.o2": "Atraente",
            "form.step5.o3": "Confiante",    "form.step5.o4": "Sedutora",
            "form.step5.o5": "Provocante",   "form.step5.o6": "Masculina/Viril",
            "form.step5.o7": "Estimulante",  "form.step5.o8": "Insinuante",

            "form.step6.indicator": "Cenário 6 de 7",
            "form.step6.question":  "Quais traços de personalidade são seus?",
            "form.step6.o1": "Desprendida",  "form.step6.o2": "Artística",
            "form.step6.o3": "Construtiva",  "form.step6.o4": "Independente",
            "form.step6.o5": "Original",     "form.step6.o6": "Espontânea",
            "form.step6.o7": "Inovadora",    "form.step6.o8": "Informal",
            "form.step6.o9": "Exclusiva",

            "form.step7.indicator": "Cenário 7 de 7",
            "form.step7.question":  "Para finalizar, o que te define?",
            "form.step7.o1": "Agressiva",    "form.step7.o2": "Arrojada",
            "form.step7.o3": "Imponente",    "form.step7.o4": "Exigente",
            "form.step7.o5": "Moderna",      "form.step7.o6": "Dominadora",
            "form.step7.o7": "Intensa",      "form.step7.o8": "Segura",
            "form.step7.o9": "Sofisticada",

            "form.btn.next":   "PRÓXIMO →",
            "form.btn.last":   "VER RESULTADO —",
            "form.btn.redo":   "Refazer Diagnóstico —",

            "form.result.done":  "DIAGNÓSTICO CONCLUÍDO",
            "form.result.dna":   "Seu DNA Visual",
            "form.result.sec1":  "Secundário I",
            "form.result.sec2":  "Secundário II",

            "form.style.Esportivo": "Esportivo",
            "form.style.Clássico":  "Clássico",
            "form.style.Elegante":  "Elegante",
            "form.style.Feminino":  "Feminino",
            "form.style.Sensual":   "Sensual",
            "form.style.Criativo":  "Criativo",
            "form.style.Dramático": "Dramático",

            // NEWSLETTER
            "newsletter.subtitle": "NEWSLETTER",
            "newsletter.title":    `Receba insights estratégicos sobre 
                <span style="color:#C5934C">imagem</span>, <span style="color:#C5934C">posicionamento</span> 
                e <span style="color:#C5934C">estilo</span>, diretamente no seu e-mail.`,
            "newsletter.placeholder": "E-MAIL",
            "newsletter.btn":      "INSCREVA-SE",
        },

        en: {
            // NAV
            "nav.home":        "Home",
            "nav.services":    "Services",
            "nav.newsletter":  "Newsletter",

            // INDEX — HOME
            "home.tagline":    `Real <strong><span style="color:#C5934C">Self-Confidence</span></strong> is born from the alignment between your <strong><span style="color:#C5934C">Identity</span></strong> and your <strong><span style="color:#C5934C">Image.</span></strong>`,

            // INDEX — ABOUT
            "about.subtitle":  "Expertise & <br> Background",
            "about.text":      `<strong>Image Mentor and Consultant with over 25 years of experience in Business Strategy and Fashion.</strong>
                <br><strong>Fashion Designer from MoMa (New York), with continued studies at Passaporte Fashionista Academy and Estúdio Immagine,
                member of AICI (Association of Image Consultants International), keynote speaker and creator of the 
                    <span style="color:#C5934C">IMEO Method (Identity, Message and Occasion)</span></strong>.`,

            // INDEX — SOCIAL
            "social.label":    "CONNECT ON SOCIAL MEDIA",

            // FOOTER
            "footer.location": "© 2026 — RIO DE JANEIRO <span class=\"divider\">/</span> MIAMI",

            // SERVICES
            "services.sp.title":       "Punctual Styling",
            "services.sp.desc":        "Curation using the client's own pieces for a photo shoot. Production of up to 4 looks (without on-set assistance).",
            "services.sp.cta":         "Request a Quote",

            "services.spas.title":     "Punctual Styling <br>+ On-Set Assistance",
            "services.spas.desc1":     "Curation using the client's own pieces for a photo shoot.",
            "services.spas.desc2":     "Styling and production of all looks with strategic on-set support throughout the entire session.",
            "services.spas.cta":       "Request a Quote",

            "services.presencial.title":  "In-Person Consulting",
            "services.presencial.desc":   "A personalized transformation process to align who you are with what your image communicates.",
            "services.presencial.li1":    "Interview & Intake",
            "services.presencial.li2":    "In-person session (up to 5h)",
            "services.presencial.li3":    "Closet Analysis & Curation",
            "services.presencial.li4":    "Personalized Dossier",
            "services.presencial.li5":    "WhatsApp Support (2 months)",
            "services.presencial.cta":    "Request a Quote",

            "services.online.title":  "Online Consulting",
            "services.online.desc":   "The same depth as in-person consulting, adapted to the flexibility of the digital environment.",
            "services.online.li1":    "Interview & Intake",
            "services.online.li2":    "Online session (up to 2h)",
            "services.online.li3":    "Digital Styling Strategies",
            "services.online.li4":    "Personalized Dossier",
            "services.online.li5":    "WhatsApp Support (2 months)",
            "services.online.cta":    "Request a Quote",

            "services.palestra.title": "Workshop",
            "services.palestra.desc":  "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.",
            "services.palestra.cta":   "Get in Touch",

            // FORM — QUIZ
            "form.quiz.title":       "Visual Identity <br> Analysis",
            "form.quiz.description": "An exclusive diagnostic to identify your style, and how you can reveal your identity with greater clarity and authenticity.",
            "form.quiz.cta":         "START DIAGNOSTIC →",

            "form.step1.indicator": "Scenario 1 of 7",
            "form.step1.question":  "Which of these characteristics do you identify with?",
            "form.step1.instruction": "Select all that describe your personality:",
            "form.step1.o1": "Pleasant",     "form.step1.o2": "Communicative",
            "form.step1.o3": "Casual",       "form.step1.o4": "Active",
            "form.step1.o5": "Friendly",     "form.step1.o6": "Athletic",
            "form.step1.o7": "Optimistic",   "form.step1.o8": "Positive",
            "form.step1.o9": "Unpretentious",

            "form.step2.indicator": "Scenario 2 of 7",
            "form.step2.question":  "Check what reflects your way of being:",
            "form.step2.o1": "Methodical",   "form.step2.o2": "Conservative",
            "form.step2.o3": "Conscientious","form.step2.o4": "Efficient",
            "form.step2.o5": "Loyal",        "form.step2.o6": "Organized",
            "form.step2.o7": "Reliable",     "form.step2.o8": "Responsible",
            "form.step2.o9": "Sensible",

            "form.step3.indicator": "Scenario 3 of 7",
            "form.step3.question":  "Which of these words match you?",
            "form.step3.o1": "Cultured",     "form.step3.o2": "Noble",
            "form.step3.o3": "Perceptive",   "form.step3.o4": "Distinguished",
            "form.step3.o5": "Balanced",     "form.step3.o6": "Refined",
            "form.step3.o7": "Discreet",     "form.step3.o8": "Elegant",
            "form.step3.o9": "Imposing",

            "form.step4.indicator": "Scenario 4 of 7",
            "form.step4.question":  "Select the characteristics you have:",
            "form.step4.o1": "Generous",     "form.step4.o2": "Thoughtful",
            "form.step4.o3": "Caring",       "form.step4.o4": "Romantic",
            "form.step4.o5": "Sensitive",    "form.step4.o6": "Gentle",
            "form.step4.o7": "Encouraging",  "form.step4.o8": "Understanding",
            "form.step4.o9": "Affectionate",

            "form.step5.indicator": "Scenario 5 of 7",
            "form.step5.question":  "How would you describe yourself?",
            "form.step5.o1": "Vain",         "form.step5.o2": "Attractive",
            "form.step5.o3": "Confident",    "form.step5.o4": "Seductive",
            "form.step5.o5": "Provocative",  "form.step5.o6": "Masculine/Virile",
            "form.step5.o7": "Stimulating",  "form.step5.o8": "Suggestive",

            "form.step6.indicator": "Scenario 6 of 7",
            "form.step6.question":  "Which personality traits are yours?",
            "form.step6.o1": "Free-spirited","form.step6.o2": "Artistic",
            "form.step6.o3": "Constructive", "form.step6.o4": "Independent",
            "form.step6.o5": "Original",     "form.step6.o6": "Spontaneous",
            "form.step6.o7": "Innovative",   "form.step6.o8": "Informal",
            "form.step6.o9": "Exclusive",

            "form.step7.indicator": "Scenario 7 of 7",
            "form.step7.question":  "Finally, what defines you?",
            "form.step7.o1": "Assertive",    "form.step7.o2": "Bold",
            "form.step7.o3": "Imposing",     "form.step7.o4": "Demanding",
            "form.step7.o5": "Modern",       "form.step7.o6": "Dominant",
            "form.step7.o7": "Intense",      "form.step7.o8": "Self-assured",
            "form.step7.o9": "Sophisticated",

            "form.btn.next":   "NEXT →",
            "form.btn.last":   "SEE RESULTS —",
            "form.btn.redo":   "Retake Diagnostic —",

            "form.result.done":  "DIAGNOSTIC COMPLETE",
            "form.result.dna":   "Your Visual DNA",
            "form.result.sec1":  "Secondary I",
            "form.result.sec2":  "Secondary II",

            "form.style.Esportivo": "Athletic",
            "form.style.Clássico":  "Classic",
            "form.style.Elegante":  "Elegant",
            "form.style.Feminino":  "Feminine",
            "form.style.Sensual":   "Sensual",
            "form.style.Criativo":  "Creative",
            "form.style.Dramático": "Dramatic",

            // NEWSLETTER
            "newsletter.subtitle": "NEWSLETTER",
            "newsletter.title":    `Receive strategic insights on 
                <span style="color:#C5934C">image</span>, <span style="color:#C5934C">positioning</span> 
                and <span style="color:#C5934C">style</span>, straight to your inbox.`,
            "newsletter.placeholder": "E-MAIL",
            "newsletter.btn":      "SUBSCRIBE",
        }
    };

    // Pega idioma salvo no localStorage (persiste entre páginas)
    let currentLang = localStorage.getItem('lang') || 'pt';

    function applyTranslations(lang) {
        const t = translations[lang];
        if (!t) return;

        // Atualiza todos os elementos com data-i18n (innerHTML)
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (t[key] !== undefined) el.innerHTML = t[key];
        });

        // Atualiza placeholders com data-i18n-placeholder
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (t[key] !== undefined) el.setAttribute('placeholder', t[key]);
        });

        // Atualiza ambos os botões de idioma (mobile e desktop)
        const label = lang === 'pt' ? 'PT' : 'EN';
        document.querySelectorAll('#lang-toggle, #lang-toggle-desktop').forEach(btn => {
            if (btn) {
                btn.textContent = label;
                btn.setAttribute('data-current-lang', lang);
            }
        });
    }

    // Aplica o idioma salvo assim que a página carrega
    applyTranslations(currentLang);

    // ─── BOTÃO DE TROCA DE IDIOMA ─────────────────────────────────
    document.querySelectorAll('#lang-toggle, #lang-toggle-desktop').forEach(btn => {
        if (btn) {
            btn.addEventListener('click', () => {
                currentLang = currentLang === 'pt' ? 'en' : 'pt';
                localStorage.setItem('lang', currentLang);
                applyTranslations(currentLang);
            });
        }
    });

    // ─── SCROLL SUAVE + FECHAR MENU AO NAVEGAR ────────────────────
    document.querySelectorAll('.nav-link:not(.disabled)').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            // Fecha o menu em qualquer clique num nav-link
            if (navMenu)   navMenu.classList.remove("nav-open");
            if (hamburger) hamburger.classList.remove("is-active");
            if (href && href.startsWith('#')) {
                const targetSection = document.querySelector(href);
                if (targetSection) {
                    e.preventDefault();
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
            button.innerHTML    = currentLang === 'pt' ? "ENVIANDO..." : "SENDING...";
            button.disabled     = true;

            try {
                const res  = await fetch("/api/subscribe", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email }),
                });
                const data = await res.json();

                if (data.success) {
                    button.innerHTML = currentLang === 'pt' ? "INSCRITA ✓" : "SUBSCRIBED ✓";
                    inputEmail.value = "";
                    gsap.fromTo(button,
                        { scale: 0.95 },
                        { scale: 1, duration: 0.4, ease: "power2.out" }
                    );
                } else {
                    throw new Error();
                }

            } catch {
                button.innerHTML = currentLang === 'pt' ? "ERRO — TENTE NOVAMENTE" : "ERROR — TRY AGAIN";
                gsap.to(button, { x: 8, repeat: 3, yoyo: true, duration: 0.05 });
            }

            setTimeout(() => {
                button.innerHTML = originalText;
                button.disabled  = false;
            }, 3000);
        });
    }

    // Expõe helper global para outros scripts (ex: form.html)
    window.i18n = {
        t: (key) => {
            const tbl = translations[currentLang];
            return (tbl && tbl[key] !== undefined) ? tbl[key] : key;
        },
        getLang: () => currentLang
    };

});