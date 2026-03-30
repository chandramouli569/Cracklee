// Add a subtle 3D parallax effect to the glass card based on mouse movement
document.addEventListener('DOMContentLoaded', () => {
    // ---- Theme Toggle Logic ----
    const themeToggle = document.getElementById('themeToggle');
    const moonIcon = document.getElementById('moon-icon');
    const sunIcon = document.getElementById('sun-icon');
    
    // Check local storage or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'light' || (!savedTheme && !prefersDark)) {
        document.documentElement.setAttribute('data-theme', 'light');
        moonIcon.style.display = 'block';
        sunIcon.style.display = 'none';
    } else {
        document.documentElement.setAttribute('data-theme', 'dark'); // default or saved dark
        moonIcon.style.display = 'none';
        sunIcon.style.display = 'block';
    }
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'light') {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            moonIcon.style.display = 'none';
            sunIcon.style.display = 'block';
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            moonIcon.style.display = 'block';
            sunIcon.style.display = 'none';
        }
    });

    // ---- Parallax Logic ----
    const card = document.querySelector('.glass-card');
    
    // Only apply on desktop where the 3D effect makes sense
    if (window.innerWidth > 968) {
        document.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 30;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 30;
            
            // Base transform includes the initial rotation defined in CSS (-15deg Y, 5deg X)
            card.style.transform = `perspective(1000px) rotateY(${xAxis - 15}deg) rotateX(${yAxis + 5}deg)`;
        });

        // Reset transform slowly when the mouse leaves the document
        document.addEventListener('mouseleave', () => {
            card.style.transition = 'transform 0.5s ease';
            card.style.transform = `perspective(1000px) rotateY(-15deg) rotateX(5deg)`;
            
            // Remove the transition class after it finishes to restore snappy tracking
            setTimeout(() => {
                card.style.transition = 'none';
            }, 500);
        });
        
        // Remove transition on moouse enter to make tracking instant
        document.addEventListener('mouseenter', () => {
            card.style.transition = 'none';
        });
    }

    // ---- Typewriter Animation Logic ----
    const textToType = "Cracklee is a clean, no-distraction platform built for mastering coding interviews through daily LeetCode problems and concise solutions.<br><br>Instead of wasting time on long explanations or messy discussions, Cracklee gives you exactly what matters — the problem, the approach, and the cleanest possible solution.";
    const typeElement = document.getElementById('typewriter-text');
    let charIndex = 0;
    let isTag = false;
    let currentHTML = "";

    function typeWriter() {
        if (!typeElement) return;
        
        if (charIndex < textToType.length) {
            let char = textToType.charAt(charIndex);
            
            if (char === '<') isTag = true;
            
            currentHTML += char;
            typeElement.innerHTML = currentHTML;
            charIndex++;
            
            if (char === '>') isTag = false;
            
            // Randomize typing speed for a natural typing effect
            let typingSpeed = isTag ? 0 : Math.random() * 40 + 25; 
            
            // Add a slight pause after punctuation marks
            if (!isTag && (char === '.' || char === ',')) {
                typingSpeed += 400;
            }
            
            setTimeout(typeWriter, typingSpeed);
        }
    }
    
    // Start typing after a short delay when the card enters the screen
    setTimeout(typeWriter, 2600);
});

// ---- Multi-Language Tabs Logic ----
function switchTab(lang) {
    // Hide all code blocks
    document.getElementById('code-cpp').style.display = 'none';
    document.getElementById('code-java').style.display = 'none';
    document.getElementById('code-python').style.display = 'none';
    
    // Remove active class from all tabs
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    // Show selected block
    document.getElementById('code-' + lang).style.display = 'block';
    
    // Set clicked tab to active
    event.currentTarget.classList.add('active');
}
