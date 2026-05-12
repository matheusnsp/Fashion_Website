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


});