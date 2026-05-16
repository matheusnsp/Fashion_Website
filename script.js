document.addEventListener('DOMContentLoaded', () => {

    // ─── MENU ─────────────────────────────────────────────────────
    const navMenu   = document.querySelector(".nav-menu");
    const hamburger = document.querySelector(".hamburger");

    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            const isOpen = navMenu.classList.toggle("nav-open");
            hamburger.classList.toggle("is-active", isOpen);
        });
    }

    document.addEventListener("click", (e) => {
        if (!navMenu || !hamburger) return;
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
            navMenu.classList.remove("nav-open");
            hamburger.classList.remove("is-active");
        }
    });

    // ─── ACCORDION ────────────────────────────────────────────────
    const accItems = document.querySelectorAll('.acc-item');

    function closeItem(item) {
        const body = item.querySelector('.acc-body');
        const icon = item.querySelector('.acc-icon i');
        item.classList.remove('is-open');
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-plus');
        gsap.to(body, { height: 0, duration: 0.5, ease: 'power3.inOut' });
    }

    function openItem(item) {
        const body  = item.querySelector('.acc-body');
        const inner = item.querySelector('.acc-inner');
        const icon  = item.querySelector('.acc-icon i');
        item.classList.add('is-open');
        icon.classList.remove('fa-plus');
        icon.classList.add('fa-xmark');
        gsap.set(body, { height: 'auto', overflow: 'hidden' });
        const fullH = body.offsetHeight;
        gsap.fromTo(body,
            { height: 0 },
            { height: fullH, duration: 0.55, ease: 'power3.inOut',
              onComplete: () => gsap.set(body, { height: 'auto' }) }
        );
        gsap.fromTo(inner,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out', delay: 0.25 }
        );
    }

    accItems.forEach(item => {
        item.querySelector('.acc-header').addEventListener('click', () => {
            const isOpen = item.classList.contains('is-open');
            accItems.forEach(i => { if (i !== item) closeItem(i); });
            isOpen ? closeItem(item) : openItem(item);
        });
    });

    // ─── CACHE PT — salvo por elemento, não por key ───────────────
    document.querySelectorAll('[data-i18n]').forEach(el => {
        el._ptHTML = el.innerHTML.trim();
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        el._ptPlaceholder = el.getAttribute('placeholder') || '';
    });

    // ─── TRADUÇÕES EM INGLÊS ──────────────────────────────────────
    const en = {
        // NAV
        "nav.home":       "Home",
        "nav.services":   "Services",
        "nav.newsletter": "Newsletter",

        // HOME
        "home.tagline": `Real <strong><span style="color:#C5934C">Self-Confidence</span></strong> is born from the alignment between your <strong><span style="color:#C5934C">Identity</span></strong> and your <strong><span style="color:#C5934C">Image.</span></strong>`,
        "home.services_btn": `<span class="btn-text">Discover our services</span><span class="btn-arrow"></span>`,

        // ABOUT
        "about.subtitle": "Expertise & <br> Background",
        "about.text": `<strong>Image Mentor and Consultant with over 25 years of experience in Business Strategy and Fashion.</strong>
            <br><strong>Fashion Designer from MoMa (New York), with continued studies at Passaporte Fashionista Academy and Estúdio Immagine,
            member of AICI (Association of Image Consultants International), keynote speaker and creator of the
            <span style="color:#C5934C">IMEO Method (Identity, Message and Occasion)</span></strong>.`,

        // SOCIAL / FOOTER
        "footer.location": `© 2026 — RIO DE JANEIRO <span class="divider">/</span> MIAMI`,

        // SERVICES
        "services.title": "Services",

        "services.sp.title":  "Punctual Styling",
        "services.sp.desc":   "Curation using the client's own pieces for a photo shoot. Production of up to 4 looks (without on-set assistance).",
        "services.sp.cta":    "Request a Quote",

        "services.spas.title": "Punctual Styling + On-Set Assistance",
        "services.spas.desc1": "Curation using the client's own pieces for a photo shoot.",
        "services.spas.desc2": "Styling and production of all looks with strategic on-set support throughout the entire session.",
        "services.spas.cta":   "Request a Quote",

        "services.presencial.title": "In-Person Consulting",
        "services.presencial.desc1": "A personalized transformation process to align who you are with what your image communicates.",
        "services.presencial.desc2": "Through the Digital Visual Method, we trace a journey of discovering that identity and your unique way of expressing it!",
        "services.presencial.cta":   "Request a Quote",

        "services.online.title": "Online Consulting",
        "services.online.desc":  "The same depth as in-person consulting, adapted to the flexibility of the digital environment.",
        "services.online.desc2": "Through the Digital Visual Method, we trace a journey of discovering that identity and your unique way of expressing it!",
        "services.online.cta":   "Request a Quote",

        "services.palestra.title": "Keynote Speaker",
        "services.palestra.desc":  `With more than two decades of experience in the business world and a well-established executive career,
            Catia transforms keynotes into high-impact experiences, bringing together image, positioning, behavior, and feminine
            presence in a strategic, elegant, and deeply human way.`,
        "services.palestra.cta": "Get in Touch",

        // FORM — QUIZ
        "form.quiz.title":       "Visual Identity <br> Analysis",
        "form.quiz.description": "An exclusive diagnostic to identify your style, and how you can reveal your identity with greater clarity and authenticity.",
        "form.quiz.cta":         "START DIAGNOSTIC →",

        "form.step1.indicator":   "Scenario 1 of 7",
        "form.step1.question":    "Which of these characteristics do you identify with?",
        "form.step1.instruction": "Select all that describe your personality:",
        "form.step1.o1": "Pleasant",      "form.step1.o2": "Communicative",
        "form.step1.o3": "Casual",        "form.step1.o4": "Active",
        "form.step1.o5": "Friendly",      "form.step1.o6": "Athletic",
        "form.step1.o7": "Optimistic",    "form.step1.o8": "Positive",
        "form.step1.o9": "Unpretentious",

        "form.step2.indicator": "Scenario 2 of 7",
        "form.step2.question":  "Check what reflects your way of being:",
        "form.step2.o1": "Methodical",    "form.step2.o2": "Conservative",
        "form.step2.o3": "Conscientious", "form.step2.o4": "Efficient",
        "form.step2.o5": "Loyal",         "form.step2.o6": "Organized",
        "form.step2.o7": "Reliable",      "form.step2.o8": "Responsible",
        "form.step2.o9": "Sensible",

        "form.step3.indicator": "Scenario 3 of 7",
        "form.step3.question":  "Which of these words match you?",
        "form.step3.o1": "Cultured",      "form.step3.o2": "Noble",
        "form.step3.o3": "Perceptive",    "form.step3.o4": "Distinguished",
        "form.step3.o5": "Balanced",      "form.step3.o6": "Refined",
        "form.step3.o7": "Discreet",      "form.step3.o8": "Elegant",
        "form.step3.o9": "Imposing",

        "form.step4.indicator": "Scenario 4 of 7",
        "form.step4.question":  "Select the characteristics you have:",
        "form.step4.o1": "Generous",      "form.step4.o2": "Thoughtful",
        "form.step4.o3": "Caring",        "form.step4.o4": "Romantic",
        "form.step4.o5": "Sensitive",     "form.step4.o6": "Gentle",
        "form.step4.o7": "Encouraging",   "form.step4.o8": "Understanding",
        "form.step4.o9": "Affectionate",

        "form.step5.indicator": "Scenario 5 of 7",
        "form.step5.question":  "How would you describe yourself?",
        "form.step5.o1": "Vain",          "form.step5.o2": "Attractive",
        "form.step5.o3": "Confident",     "form.step5.o4": "Seductive",
        "form.step5.o5": "Provocative",   "form.step5.o6": "Masculine/Virile",
        "form.step5.o7": "Stimulating",   "form.step5.o8": "Suggestive",

        "form.step6.indicator": "Scenario 6 of 7",
        "form.step6.question":  "Which personality traits are yours?",
        "form.step6.o1": "Free-spirited", "form.step6.o2": "Artistic",
        "form.step6.o3": "Constructive",  "form.step6.o4": "Independent",
        "form.step6.o5": "Original",      "form.step6.o6": "Spontaneous",
        "form.step6.o7": "Innovative",    "form.step6.o8": "Informal",
        "form.step6.o9": "Exclusive",

        "form.step7.indicator": "Scenario 7 of 7",
        "form.step7.question":  "Finally, what defines you?",
        "form.step7.o1": "Assertive",     "form.step7.o2": "Bold",
        "form.step7.o3": "Imposing",      "form.step7.o4": "Demanding",
        "form.step7.o5": "Modern",        "form.step7.o6": "Dominant",
        "form.step7.o7": "Intense",       "form.step7.o8": "Self-assured",
        "form.step7.o9": "Sophisticated",

        "form.btn.next": "NEXT →",
        "form.btn.last": "SEE RESULTS —",
        "form.btn.redo": "Retake Diagnostic —",

        "form.result.done": "DIAGNOSTIC COMPLETE",
        "form.result.dna":  "Your Visual DNA",
        "form.result.sec1": "Secondary I",
        "form.result.sec2": "Secondary II",

        "form.style.Esportivo": "Athletic",
        "form.style.Clássico":  "Classic",
        "form.style.Elegante":  "Elegant",
        "form.style.Feminino":  "Feminine",
        "form.style.Sensual":   "Sensual",
        "form.style.Criativo":  "Creative",
        "form.style.Dramático": "Dramatic",

        // NEWSLETTER
        "newsletter.subtitle":    "NEWSLETTER",
        "newsletter.title":       `Receive strategic insights on <span class="gold"><em>image</em></span>, <span class="gold"><em>positioning</em></span> and <span class="gold"><em>style</em></span>, straight to your inbox.`,
        "newsletter.placeholder": "E-MAIL",
        "newsletter.btn":         `SUBSCRIBE <span class="arrow">&#x2192;</span>`,
        "newsletter.note":       "NO SPAM · CANCEL ANYTIME",


        // SOCIAL
        "social.label": "CONNECT ON SOCIAL MEDIA",
    };

    // ─── APLICAR TRADUÇÕES ────────────────────────────────────────
    function applyTranslations(lang) {
        if (lang === 'en') {
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                if (en[key] !== undefined) el.innerHTML = en[key];
            });
            document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
                const key = el.getAttribute('data-i18n-placeholder');
                if (en[key] !== undefined) el.setAttribute('placeholder', en[key]);
            });
        } else {
            document.querySelectorAll('[data-i18n]').forEach(el => {
                if (el._ptHTML !== undefined) el.innerHTML = el._ptHTML;
            });
            document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
                if (el._ptPlaceholder !== undefined) el.setAttribute('placeholder', el._ptPlaceholder);
            });
        }

        const label = lang === 'pt' ? 'PT' : 'EN';
        document.querySelectorAll('#lang-toggle, #lang-toggle-desktop').forEach(btn => {
            if (btn) {
                const labelEl = btn.querySelector('.lang-toggle__label');
                if (labelEl) labelEl.textContent = label;
                else btn.textContent = label;
            }
        });

        // ─── ATUALIZAR MENSAGENS DO WHATSAPP ──────────────────────
        const waMessages = {
            'services.sp.cta':         { pt: 'Olá! Gostaria de pedir um orçamento para o Styling Pontual.',               en: 'Hello! I would like to request a quote for Punctual Styling.' },
            'services.spas.cta':       { pt: 'Olá! Gostaria de pedir um orçamento para o Styling Pontual com Assessoria.', en: 'Hello! I would like to request a quote for Punctual Styling + On-Set Assistance.' },
            'services.presencial.cta': { pt: 'Olá! Gostaria de pedir um orçamento para a Consultoria Presencial.',        en: 'Hello! I would like to request a quote for In-Person Consulting.' },
            'services.online.cta':     { pt: 'Olá! Gostaria de pedir um orçamento para a Consultoria Online.',            en: 'Hello! I would like to request a quote for Online Consulting.' },
            'services.palestra.cta':   { pt: 'Olá! Gostaria de pedir um orçamento para a Palestra.',                      en: 'Hello! I would like to get in touch about Keynote Speaking.' },
        };

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (waMessages[key] && el.hasAttribute('href')) {
                const base = el.getAttribute('href').split('?')[0];
                const msg  = waMessages[key][lang] || waMessages[key].pt;
                el.setAttribute('href', base + '?text=' + encodeURIComponent(msg));
            }
        });
    }

    // ─── INIT ─────────────────────────────────────────────────────
    let currentLang = localStorage.getItem('lang') || 'pt';
    applyTranslations(currentLang);

    // ─── BOTÃO DE TROCA ───────────────────────────────────────────
    document.querySelectorAll('#lang-toggle, #lang-toggle-desktop').forEach(btn => {
        if (btn) {
            btn.addEventListener('click', () => {
                currentLang = currentLang === 'pt' ? 'en' : 'pt';
                localStorage.setItem('lang', currentLang);
                applyTranslations(currentLang);
            });
        }
    });

    // ─── SCROLL SUAVE + FECHAR MENU ───────────────────────────────
    document.querySelectorAll('.nav-link:not(.disabled), .btn-services').forEach(anchor => {
        anchor.addEventListener('click', function (e) {

            const href = this.getAttribute('href');

            if (navMenu) navMenu.classList.remove("nav-open");
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

            const originalText = button.innerHTML;
            button.innerHTML   = currentLang === 'pt' ? "ENVIANDO..." : "SENDING...";
            button.disabled    = true;

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
                    gsap.fromTo(button, { scale: 0.95 }, { scale: 1, duration: 0.4, ease: "power2.out" });
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

    // ─── HELPER GLOBAL (form.html e outros scripts) ───────────────
    window.i18n = {
        t:       (key) => (currentLang === 'en' && en[key] !== undefined) ? en[key] : key,
        getLang: () => currentLang,
    };

});