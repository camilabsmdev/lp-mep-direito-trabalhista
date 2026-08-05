/**
 * Mendes Peixoto Advocacia — Landing Page
 * scripts.js — FAQ Accordion + Privacy Modal + Hero Entrance
 */

document.addEventListener('DOMContentLoaded', () => {
    initFAQAccordion();
    initPrivacyModal();
    initHeroReveal();
});

/* ─── FAQ ACCORDION ─────────────────────────────── */
function initFAQAccordion() {
    const items = document.querySelectorAll('.faq-item');

    items.forEach(item => {
        const trigger  = item.querySelector('.faq-trigger');
        const content  = item.querySelector('.faq-content');
        if (!trigger || !content) return;

        trigger.addEventListener('click', () => {
            const isOpen = item.classList.contains('active');

            // Close all open items
            items.forEach(other => {
                other.classList.remove('active');
                const c = other.querySelector('.faq-content');
                if (c) c.style.maxHeight = null;
                const t = other.querySelector('.faq-trigger');
                if (t) t.setAttribute('aria-expanded', 'false');
            });

            // Toggle clicked item
            if (!isOpen) {
                item.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 'px';
                trigger.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // Recalculate on resize
    window.addEventListener('resize', () => {
        items.forEach(item => {
            if (item.classList.contains('active')) {
                const c = item.querySelector('.faq-content');
                if (c) c.style.maxHeight = c.scrollHeight + 'px';
            }
        });
    });
}

/* ─── PRIVACY MODAL ─────────────────────────────── */
function initPrivacyModal() {
    const modal   = document.getElementById('privacy-modal');
    const openBtn = document.getElementById('btn-privacy-modal');
    if (!modal || !openBtn) return;

    const closeEls = modal.querySelectorAll('[data-close-modal]');

    const open = () => {
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        modal.querySelector('.btn-close-modal')?.focus();
    };

    const close = () => {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        openBtn.focus();
    };

    openBtn.addEventListener('click', open);
    closeEls.forEach(el => el.addEventListener('click', close));
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && modal.classList.contains('open')) close();
    });
}

/* ─── HERO ENTRANCE ANIMATION ───────────────────── */
function initHeroReveal() {
    const els = document.querySelectorAll(
        '.hero-logo-container, .hero-divider, .badge-wrapper, .hero-title, .hero-subtitle, .hero-section .cta-wrapper'
    );

    els.forEach((el, i) => {
        el.style.opacity   = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`;

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                el.style.opacity   = '1';
                el.style.transform = 'translateY(0)';
            });
        });
    });
}
