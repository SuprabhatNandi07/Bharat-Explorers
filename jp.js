document.addEventListener('DOMContentLoaded', () => {
    
    // 1. SAFE SMOOTH SCROLLING (Allows clicking to new pages!)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            // If it's just an empty '#', ignore it entirely
            if (targetId === '#') return; 
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault(); 
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 2. SCROLL REVEAL ANIMATIONS
    const reveals = document.querySelectorAll('.reveal');
    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;
        
        reveals.forEach(reveal => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    }
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger once on load

    // 3. ANIMATED STATS COUNTER
    const counters = document.querySelectorAll('.num-counter');
    let hasCounted = false;

    function startCounters() {
        if (hasCounted) return;
        
        const statsSection = document.getElementById('stats');
        if (!statsSection) return;

        const sectionTop = statsSection.getBoundingClientRect().top;
        if (sectionTop < window.innerHeight) {
            hasCounted = true;
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const suffix = counter.getAttribute('data-suffix') || '';
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); 
                
                let current = 0;
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.innerText = Math.ceil(current) + suffix;
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.innerText = target + suffix;
                    }
                };
                updateCounter();
            });
        }
    }
    window.addEventListener('scroll', startCounters);
    
    // 4. BUCKET LIST PROGRESS BAR
    const checkboxes = document.querySelectorAll('.bucket-check');
    const progressBar = document.getElementById('bucket-progress');
    const progressCount = document.getElementById('bucket-count');
    
    if (checkboxes.length > 0) {
        function updateProgress() {
            const total = checkboxes.length;
            const checked = document.querySelectorAll('.bucket-check:checked').length;
            const percentage = (checked / total) * 100;
            
            if (progressBar) progressBar.style.width = percentage + '%';
            if (progressCount) progressCount.innerText = checked;
        }
        
        checkboxes.forEach(box => {
            box.addEventListener('change', updateProgress);
        });
        updateProgress(); // Initialize
    }
});