document.addEventListener('DOMContentLoaded', () => {
    
    // Copy CA functionality
    const copyBtn = document.getElementById('copy-btn');
    const caText = document.getElementById('ca-text');

    copyBtn.addEventListener('click', async () => {
        const address = caText.innerText;
        try {
            await navigator.clipboard.writeText(address);
            
            // Visual feedback
            const originalText = copyBtn.innerText;
            copyBtn.innerText = 'Copied! ✅';
            copyBtn.style.background = '#9945FF';
            copyBtn.style.color = 'white';
            
            setTimeout(() => {
                copyBtn.innerText = originalText;
                copyBtn.style.background = 'rgba(255, 255, 255, 0.1)';
            }, 2000);
        } catch (err) {
            console.error('Failed to copy!', err);
        }
    });

    // Simple scroll animation for cards
    const cards = document.querySelectorAll('.card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(3.125rem)';
        card.style.transition = 'all 0.6s ease-out';
        observer.observe(card);
    });

    // Modal functionality
    const modal = document.getElementById('buy-modal');
    const buyLink = document.getElementById('how-to-buy-link');
    const closeBtn = document.getElementById('close-modal');

    buyLink.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.add('active');
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    // Close when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all others
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-answer').style.maxHeight = null;
                otherItem.querySelector('.faq-icon').style.transform = 'rotate(0deg)';
            });

            // If it wasn't active, open it
            if (!isActive) {
                item.classList.add('active');
                const answer = item.querySelector('.faq-answer');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                item.querySelector('.faq-icon').style.transform = 'rotate(45deg)';
            }
        });
    });

    // Scroll Reveal Observer
    const reveals = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    reveals.forEach(reveal => {
        revealObserver.observe(reveal);
    });

    // Particles.js Init
    if (window.particlesJS) {
        particlesJS('particles-js', {
            'particles': {
                'number': { 'value': 80, 'density': { 'enable': true, 'value_area': 800 } },
                'color': { 'value': '#9945FF' },
                'shape': { 'type': 'circle' },
                'opacity': { 'value': 0.5, 'random': true },
                'size': { 'value': 3, 'random': true },
                'line_linked': { 'enable': true, 'distance': 150, 'color': '#9945FF', 'opacity': 0.2, 'width': 1 },
                'move': { 'enable': true, 'speed': 2, 'direction': 'none', 'random': true, 'straight': false, 'out_mode': 'out', 'bounce': false }
            },
            'interactivity': {
                'detect_on': 'canvas',
                'events': {
                    'onhover': { 'enable': true, 'mode': 'grab' },
                    'onclick': { 'enable': true, 'mode': 'push' },
                    'resize': true
                },
                'modes': {
                    'grab': { 'distance': 140, 'line_linked': { 'opacity': 1 } },
                    'push': { 'particles_nb': 4 }
                }
            },
            'retina_detect': true
        });
    }

    // Custom Cursor
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    if (cursorDot && cursorOutline) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.left = posX + 'px';
            cursorDot.style.top = posY + 'px';

            // Adding a slight delay to the outline for a smooth effect
            cursorOutline.animate({
                left: posX + 'px',
                top: posY + 'px'
            }, { duration: 500, fill: 'forwards' });
        });
    }

    // Roadmap Timeline Observer
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.2 });

    timelineItems.forEach(item => timelineObserver.observe(item));
});
