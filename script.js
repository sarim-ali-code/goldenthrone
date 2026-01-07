document.addEventListener('DOMContentLoaded', () => {
    const dot = document.querySelector('.cursor-dot');
    const outline = document.querySelector('.cursor-outline');
    const indicator = document.querySelector('.nav-indicator');

    // 1. CUSTOM CURSOR
    document.addEventListener('mousemove', (e) => {
        dot.style.left = e.clientX + 'px';
        dot.style.top = e.clientY + 'px';
        outline.animate({ 
            left: e.clientX + 'px', 
            top: e.clientY + 'px' 
        }, { duration: 500, fill: "forwards" });
    });

    // 2. NAV INDICATOR
    function moveIndicator(element) {
        if(!element) return;
        indicator.style.width = element.offsetWidth + 'px';
        indicator.style.left = element.offsetLeft + 'px';
    }
    moveIndicator(document.querySelector('.tab-btn.active'));

    // 3. TAB SYSTEM
    window.openTab = function(evt, tabName) {
        const contents = document.querySelectorAll('.tab-content');
        contents.forEach(content => {
            content.classList.remove('active');
            content.querySelectorAll('.animate-in, .animate-left, .animate-right').forEach(el => {
                el.classList.remove('visible');
            });
        });

        const buttons = document.querySelectorAll('.tab-btn');
        buttons.forEach(btn => btn.classList.remove('active'));

        const activeTab = document.getElementById(tabName);
        activeTab.classList.add('active');
        evt.currentTarget.classList.add('active');

        moveIndicator(evt.currentTarget);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(triggerAnimations, 100);
    };

    // 4. PLATFORM & SPECS SWITCHER
    window.switchPlatform = function(platform) {
        document.querySelectorAll('.toggle-btn').forEach(btn => btn.classList.remove('active'));
        event.currentTarget.classList.add('active');

        // Update Edition Titles
        document.querySelectorAll('.platform-text').forEach(text => {
            const base = text.innerText.replace('(PC)', '').replace('(MAC)', '').trim();
            text.innerText = `${base} (${platform.toUpperCase()})`;
        });

        // Update System Specs Content
        const minSpecs = document.getElementById('min-specs-list');
        const ultraSpecs = document.getElementById('ultra-specs-list');

        if (platform === 'mac') {
            minSpecs.innerHTML = `
                <div class="spec-line"><span>OS:</span> macOS Monterey (12.0)</div>
                <div class="spec-line"><span>CPU:</span> Apple M1 Chip</div>
                <div class="spec-line"><span>RAM:</span> 8GB Unified Memory</div>`;
            ultraSpecs.innerHTML = `
                <div class="spec-line"><span>OS:</span> macOS Sonoma (14.0)</div>
                <div class="spec-line"><span>CPU:</span> Apple M3 Max</div>
                <div class="spec-line"><span>RAM:</span> 32GB Unified Memory</div>`;
        } else {
            minSpecs.innerHTML = `
                <div class="spec-line"><span>OS:</span> Windows 10 (64-bit)</div>
                <div class="spec-line"><span>CPU:</span> Intel Core i5-8400</div>
                <div class="spec-line"><span>GPU:</span> GTX 1060 6GB</div>`;
            ultraSpecs.innerHTML = `
                <div class="spec-line"><span>OS:</span> Windows 11</div>
                <div class="spec-line"><span>CPU:</span> Intel i9-14900K</div>
                <div class="spec-line"><span>GPU:</span> RTX 4080</div>`;
        }
    };

    // 5. SCROLL ANIMATIONS
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.15 });

    function triggerAnimations() {
        document.querySelectorAll('.animate-in, .animate-left, .animate-right').forEach(el => observer.observe(el));
    }
    triggerAnimations();

    // 6. FAQ LOGIC (INSTANT TOGGLE)
    document.querySelectorAll('.faq-question').forEach(button => {
        button.addEventListener('click', () => {
            const currentItem = button.parentElement;
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== currentItem) item.classList.remove('active');
            });
            currentItem.classList.toggle('active');
            const span = button.querySelector('span');
            if (span) span.innerText = currentItem.classList.contains('active') ? '−' : '+';
        });
    });

    // 7. FORM HANDLER
    const proForm = document.getElementById('proForm');
    if(proForm) {
        proForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const feedback = document.getElementById('formFeedback');
            const btn = proForm.querySelector('button');
            btn.innerText = "UPLOADING DATA...";
            setTimeout(() => {
                feedback.innerHTML = `<p style="color:lime; font-family:'Orbitron'; margin-top:15px;">ASCENSION COMPLETE. WELCOME TO THE MONARCHY.</p>`;
                btn.innerText = "SUCCESS";
                proForm.reset();
            }, 2000);
        });
    }

    window.addEventListener('resize', () => moveIndicator(document.querySelector('.tab-btn.active')));
});