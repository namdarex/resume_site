(function () {
'use strict';

const EMAILJS_CONFIG = {
    publicKey: 'ALMONrlwHj5VyojJv',
    serviceId: 'service_yiqptf2',
    templateId: 'template_byq6qsq',
    enabled: true
};

const toFa = (n) => String(n).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[d]);

function initLanguage() {
    const toggle = document.getElementById('langToggle');
    const langText = document.querySelector('.lang-text');
    const html = document.documentElement;
    const typingWords = {
        fa: ['توسعه‌دهنده‌ی فرانت‌اند', 'طراح رابط کاربری', 'عاشق کد تمیز', 'خالق تجربه‌ی دیجیتال'],
        en: ['Frontend Developer', 'UI Designer', 'Clean Code Lover', 'Digital Experience Creator']
    };
    const savedLang = localStorage.getItem('resume-lang');
    if (savedLang) switchLanguage(savedLang, false);
    toggle.addEventListener('click', () => {
        const current = html.getAttribute('lang');
        const next = current === 'fa' ? 'en' : 'fa';
        switchLanguage(next, true);
    });
    window.switchLanguage = switchLanguage;
    window.typingWords = typingWords;
    function switchLanguage(lang, notify) {
        const isEn = lang === 'en';
        html.setAttribute('lang', isEn ? 'en' : 'fa');
        html.setAttribute('dir', isEn ? 'ltr' : 'rtl');
        document.title = isEn ? 'Sadegh Hajizadeh | Resume' : 'صادق حاجی‌زاده | رزومه';
        document.querySelectorAll('[data-fa][data-en]').forEach((el) => {
            el.innerHTML = el.getAttribute(isEn ? 'data-en' : 'data-fa');
        });
        if (langText) langText.textContent = isEn ? 'فا' : 'EN';
        localStorage.setItem('resume-lang', lang);
        if (window.resetTyping) window.resetTyping();
        if (notify) showToast(isEn ? '🌐 Switched to English' : '🌐 فارسی فعال شد', 'info');
    }
}

function initTheme() {
    const toggle = document.getElementById('themeToggle');
    const root = document.documentElement;
    const saved = localStorage.getItem('resume-theme');
    if (saved) root.setAttribute('data-theme', saved);
    toggle.addEventListener('click', () => {
        const current = root.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        root.setAttribute('data-theme', next);
        localStorage.setItem('resume-theme', next);
        const isEn = root.getAttribute('lang') === 'en';
        showToast(
            isEn
                ? (next === 'dark' ? '🌙 Dark mode enabled' : '☀️ Light mode enabled')
                : (next === 'dark' ? '🌙 حالت شب فعال شد' : '☀️ حالت روز فعال شد'),
            'info'
        );
    });
}

function initTyping() {
    const el = document.getElementById('typedText');
    if (!el) return;
    let wIndex = 0, cIndex = 0, deleting = false, timer = null;
    function getWords() {
        const lang = document.documentElement.getAttribute('lang');
        return (window.typingWords && window.typingWords[lang]) || window.typingWords.fa;
    }
    function type() {
        const words = getWords();
        const word = words[wIndex % words.length];
        if (deleting) {
            el.textContent = word.substring(0, cIndex--);
            if (cIndex < 0) { deleting = false; wIndex++; timer = setTimeout(type, 500); return; }
            timer = setTimeout(type, 50);
        } else {
            el.textContent = word.substring(0, cIndex++);
            if (cIndex > word.length) { deleting = true; timer = setTimeout(type, 1800); return; }
            timer = setTimeout(type, 100);
        }
    }
    type();
    window.resetTyping = () => {
        clearTimeout(timer); wIndex = 0; cIndex = 0; deleting = false;
        el.textContent = ''; type();
    };
}

function initNavbar() {
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const links = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
        let current = '';
        const y = window.pageYOffset;
        sections.forEach((s) => { if (y >= s.offsetTop - 100) current = s.getAttribute('id'); });
        links.forEach((l) => { l.classList.toggle('active', l.getAttribute('href') === '#' + current); });
    });
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('open');
    });
    links.forEach((l) => l.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('open');
    }));
}

function initBackToTop() {
    const btn = document.getElementById('backToTop');
    window.addEventListener('scroll', () => btn.classList.toggle('show', window.scrollY > 500));
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

function initReveal() {
    const items = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver((entries) => {
        entries.forEach((e, i) => {
            if (e.isIntersecting) {
                setTimeout(() => e.target.classList.add('active'), i * 80);
                obs.unobserve(e.target);
            }
        });
    }, { threshold: 0.15 });
    items.forEach((el) => obs.observe(el));
}

function initSkillBars() {
    const items = document.querySelectorAll('.skill-item');
    const obs = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
            if (e.isIntersecting) {
                e.target.querySelector('.skill-fill').style.width = e.target.dataset.percent + '%';
                obs.unobserve(e.target);
            }
        });
    }, { threshold: 0.4 });
    items.forEach((i) => obs.observe(i));
}

function initSoftCircles() {
    const circles = document.querySelectorAll('.soft-circle');
    const obs = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
            if (e.isIntersecting) {
                const el = e.target;
                const p = el.dataset.percent;
                el.style.background = `conic-gradient(var(--accent-1) ${p * 3.6}deg, var(--bg-secondary) ${p * 3.6}deg)`;
                obs.unobserve(el);
            }
        });
    }, { threshold: 0.4 });
    circles.forEach((c) => obs.observe(c));
}

function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const obs = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
            if (e.isIntersecting) {
                const el = e.target;
                const target = +el.dataset.target;
                const duration = 2000;
                const start = performance.now();
                function step(now) {
                    const progress = Math.min((now - start) / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 4);
                    const value = Math.floor(eased * target);
                    const lang = document.documentElement.getAttribute('lang');
                    el.textContent = lang === 'en' ? value + (progress === 1 ? '+' : '') : toFa(value) + (progress === 1 ? '+' : '');
                    if (progress < 1) requestAnimationFrame(step);
                }
                requestAnimationFrame(step);
                obs.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach((c) => obs.observe(c));
}

function initEmailJS() {
    if (!EMAILJS_CONFIG.enabled) return;
    if (typeof emailjs === 'undefined') {
        console.warn('⚠️ EmailJS SDK لود نشده است');
        return;
    }
    try {
        emailjs.init({ publicKey: EMAILJS_CONFIG.publicKey });
    } catch (err) {
        console.error('❌ خطا در راه‌اندازی EmailJS:', err);
    }
}

async function sendEmail(params) {
    if (!EMAILJS_CONFIG.enabled || typeof emailjs === 'undefined') {
        return { success: false, error: 'EmailJS غیرفعال است' };
    }
    try {
        const result = await emailjs.send(
            EMAILJS_CONFIG.serviceId,
            EMAILJS_CONFIG.templateId,
            params
        );
        return { success: true };
    } catch (err) {
        console.error('❌ خطا در ارسال ایمیل:', err);
        return { success: false, error: err.text || err.message };
    }
}

function initForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const lang = document.documentElement.getAttribute('lang');
        const isEn = lang === 'en';

        const name = form.querySelector('#name').value.trim();
        const email = form.querySelector('#email').value.trim();
        const subject = form.querySelector('#subject').value.trim();
        const message = form.querySelector('#message').value.trim();

        if (!name || !email || !subject || !message) {
            showToast(isEn ? 'Please fill all fields ✏️' : 'لطفاً همه فیلدها را پر کنید ✏️', 'error');
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showToast(isEn ? 'Invalid email address ❌' : 'ایمیل معتبر نیست ❌', 'error');
            return;
        }

        const btn = form.querySelector('button[type="submit"]');
        const originalHTML = btn.innerHTML;

        btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> ${isEn ? 'Sending...' : 'در حال ارسال...'}`;
        btn.disabled = true;

        const emailParams = {
            from_name: name,
            from_email: email,
            subject: subject,
            message: message,
            reply_to: email
        };

        const tgMessage = `📩 پیام جدید از فرم رزومه:\n\n👤 نام: ${name}\n📧 ایمیل: ${email}\n📋 موضوع: ${subject}\n\n💬 پیام:\n${message}`;
        const tgUrl = `https://t.me/Namdarex?text=${encodeURIComponent(tgMessage)}`;

        try {
            const [emailResult] = await Promise.all([
                sendEmail(emailParams),
                new Promise(resolve => {
                    setTimeout(() => {
                        window.open(tgUrl, '_blank');
                        resolve(true);
                    }, 500);
                })
            ]);

            if (emailResult.success) {
                showToast(isEn ? '✅ Message sent successfully!' : '✅ پیام با موفقیت ارسال شد!', 'success');
                form.reset();
            } else {
                showToast(isEn ? '⚠️ Telegram opened, but email failed' : '⚠️ تلگرام باز شد، اما ایمیل ارسال نشد', 'error');
            }
        } catch (err) {
            console.error('خطا:', err);
            showToast(isEn ? '❌ An error occurred' : '❌ خطایی رخ داد', 'error');
        } finally {
            btn.innerHTML = originalHTML;
            btn.disabled = false;
        }
    });
}

let toastTimer;
function showToast(msg, type = 'success') {
    document.querySelectorAll('.toast').forEach((t) => t.remove());
    clearTimeout(toastTimer);
    const colors = {
        success: { bg: '#10b981' },
        error: { bg: '#ef4444' },
        info: { bg: '#a855f7' }
    };
    const bg = (colors[type] || colors.success).bg;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = msg;
    const lang = document.documentElement.getAttribute('lang');
    toast.style.cssText = `
        position: fixed;
        bottom: 30px; ${lang === 'en' ? 'left: 50%;' : 'right: 50%;'}
        transform: translateX(${lang === 'en' ? '-50%' : '50%'}) translateY(100px);
        background: ${bg};
        color: #fff;
        padding: 14px 28px;
        border-radius: 12px;
        font-weight: 600;
        font-family: ${lang === 'en' ? "system-ui, sans-serif" : "'Vazirmatn', sans-serif"};
        box-shadow: 0 10px 30px rgba(0,0,0,0.4);
        z-index: 9999;
        opacity: 0;
        transition: all 0.4s ease;
    `;
    document.body.appendChild(toast);
    requestAnimationFrame(() => {
        toast.style.opacity = '1';
        toast.style.transform = `translateX(${lang === 'en' ? '-50%' : '50%'}) translateY(0)`;
    });
    toastTimer = setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = `translateX(${lang === 'en' ? '-50%' : '50%'}) translateY(100px)`;
        setTimeout(() => toast.remove(), 400);
    }, 3000);
}

function initParticles() {
    const layer = document.getElementById('bgParticles');
    if (!layer) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const palette = ['#a855f7', '#ec4899', '#3b82f6', '#06b6d4'];
    const count = window.innerWidth < 768 ? 14 : 26;

    for (let i = 0; i < count; i++) {
        const p = document.createElement('span');
        p.className = 'bg-particle';
        const size = 2 + Math.random() * 4;
        const color = palette[Math.floor(Math.random() * palette.length)];
        const duration = 14 + Math.random() * 16;
        p.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${Math.random() * 100}%;
            background: ${color};
            color: ${color};
            animation-duration: ${duration}s;
            animation-delay: ${-Math.random() * duration}s;
        `;
        layer.appendChild(p);
    }
}

function initSpotlight() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const cards = document.querySelectorAll('.stat-box, .timeline-content, .edu-card, .contact-card, .contact-form, .btn-secondary, .social-link, .copy-btn');
    cards.forEach((c) => {
        c.classList.add('spotlight');
        c.style.position = 'relative';
        c.addEventListener('pointermove', (e) => {
            const r = c.getBoundingClientRect();
            c.style.setProperty('--mx', (e.clientX - r.left) + 'px');
            c.style.setProperty('--my', (e.clientY - r.top) + 'px');
        });
    });
}

function initScrollProgress() {
    const bar = document.getElementById('scrollProgress');
    if (!bar) return;
    window.addEventListener('scroll', () => {
        const h = document.documentElement;
        const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
        bar.style.width = pct + '%';
    }, { passive: true });
}

function initTimelineProgress() {
    const progress = document.getElementById('timelineProgress');
    if (!progress) return;
    const timeline = progress.parentElement;
    const obs = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
            if (e.isIntersecting) {
                const rect = timeline.getBoundingClientRect();
                const viewH = window.innerHeight;
                const total = rect.height;
                const scrolled = Math.min(viewH - rect.top, total);
                const pct = Math.max(0, Math.min(1, scrolled / total));
                progress.style.transform = 'scaleY(' + pct + ')';
                obs.unobserve(e.target);
            }
        });
    }, { threshold: 0 });
    obs.observe(timeline);
    window.addEventListener('scroll', () => {
        const rect = timeline.getBoundingClientRect();
        const viewH = window.innerHeight;
        const total = rect.height;
        const scrolled = Math.min(viewH - rect.top, total);
        const pct = Math.max(0, Math.min(1, scrolled / total));
        progress.style.transform = 'scaleY(' + pct + ')';
    }, { passive: true });
}

function initCopyEmail() {
    document.querySelectorAll('.copy-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
            const text = btn.dataset.copy;
            if (!text) return;
            navigator.clipboard.writeText(text).then(() => {
                btn.classList.add('copied');
                btn.innerHTML = '<i class="fa-solid fa-check"></i>';
                const lang = document.documentElement.getAttribute('lang');
                showToast(lang === 'en' ? 'Email copied!' : 'ایمیل کپی شد!', 'success');
                setTimeout(() => {
                    btn.classList.remove('copied');
                    btn.innerHTML = '<i class="fa-regular fa-copy"></i>';
                }, 2000);
            }).catch(() => {});
        });
    });
}

function initCommandPalette() {
    const overlay = document.getElementById('cmdOverlay');
    const input = document.getElementById('cmdInput');
    const list = document.getElementById('cmdList');
    if (!overlay || !input || !list) return;

    const commands = [
        { icon: 'fa-solid fa-house',      labelFa: 'خانه',       labelEn: 'Home',       action: () => scrollTo('#hero') },
        { icon: 'fa-solid fa-user',       labelFa: 'درباره من',  labelEn: 'About',      action: () => scrollTo('#about') },
        { icon: 'fa-solid fa-briefcase',  labelFa: 'تجربیات',    labelEn: 'Experience',  action: () => scrollTo('#experience') },
        { icon: 'fa-solid fa-code',       labelFa: 'مهارت‌ها',   labelEn: 'Skills',     action: () => scrollTo('#skills') },
        { icon: 'fa-solid fa-graduation-cap', labelFa: 'تحصیلات', labelEn: 'Education', action: () => scrollTo('#education') },
        { icon: 'fa-solid fa-envelope',   labelFa: 'تماس',       labelEn: 'Contact',    action: () => scrollTo('#contact') },
        { icon: 'fa-solid fa-sun',        labelFa: 'تغییر تم',   labelEn: 'Toggle Theme', action: () => document.getElementById('themeToggle').click() },
        { icon: 'fa-solid fa-language',   labelFa: 'تغییر زبان', labelEn: 'Toggle Language', action: () => document.getElementById('langToggle').click() },
        { icon: 'fa-regular fa-copy',     labelFa: 'کپی ایمیل',  labelEn: 'Copy Email', action: () => { navigator.clipboard.writeText('sadeghhajizadeh999@gmail.com'); showToast(document.documentElement.getAttribute('lang') === 'en' ? 'Email copied!' : 'ایمیل کپی شد!', 'success'); } },
    ];

    let activeIdx = 0;

    function scrollTo(sel) {
        const el = document.querySelector(sel);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    }

    function render(filter) {
        const q = (filter || '').toLowerCase();
        const lang = document.documentElement.getAttribute('lang');
        const filtered = commands.filter((c) => {
            const txt = lang === 'en' ? c.labelEn : c.labelFa;
            return !q || txt.toLowerCase().includes(q) || c.labelEn.toLowerCase().includes(q);
        });
        list.innerHTML = '';
        activeIdx = 0;
        filtered.forEach((c, i) => {
            const li = document.createElement('li');
            li.className = 'cmd-item' + (i === 0 ? ' active' : '');
            const label = lang === 'en' ? c.labelEn : c.labelFa;
            li.innerHTML = '<i class="' + c.icon + '"></i>' + label;
            li.addEventListener('click', () => { c.action(); close(); });
            li.addEventListener('mouseenter', () => {
                list.querySelectorAll('.cmd-item').forEach((x) => x.classList.remove('active'));
                li.classList.add('active');
                activeIdx = i;
            });
            list.appendChild(li);
        });
    }

    function open() {
        overlay.classList.add('open');
        input.value = '';
        render('');
        setTimeout(() => input.focus(), 50);
    }

    function close() {
        overlay.classList.remove('open');
        input.value = '';
    }

    function navigate(dir) {
        const items = list.querySelectorAll('.cmd-item');
        if (!items.length) return;
        items[activeIdx].classList.remove('active');
        activeIdx = (activeIdx + dir + items.length) % items.length;
        items[activeIdx].classList.add('active');
        items[activeIdx].scrollIntoView({ block: 'nearest' });
    }

    input.addEventListener('input', () => render(input.value));
    input.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown') { e.preventDefault(); navigate(1); }
        else if (e.key === 'ArrowUp') { e.preventDefault(); navigate(-1); }
        else if (e.key === 'Enter') {
            const items = list.querySelectorAll('.cmd-item');
            if (items[activeIdx]) items[activeIdx].click();
        }
        else if (e.key === 'Escape') close();
    });

    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });

    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); open(); }
        if (e.key === 'Escape' && overlay.classList.contains('open')) close();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initLanguage();
    initTheme();
    initTyping();
    initNavbar();
    initBackToTop();
    initReveal();
    initSkillBars();
    initSoftCircles();
    initCounters();
    initParticles();
    initSpotlight();
    initScrollProgress();
    initTimelineProgress();
    initCopyEmail();
    initCommandPalette();
    initEmailJS();
    initForm();
});
})();