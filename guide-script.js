// Guide Page JavaScript
// Language switching, copy functionality, and interactive playground

document.addEventListener('DOMContentLoaded', () => {
    // Initialize language from localStorage or default to 'en'
    let currentLang = localStorage.getItem('guideLanguage') || 'en';
    setLanguage(currentLang);
    
    // Language switcher buttons
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            setLanguage(lang);
            localStorage.setItem('guideLanguage', lang);
        });
    });
    
    // Copy buttons for code blocks
    const copyButtons = document.querySelectorAll('.copy-btn');
    copyButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const codeBlock = btn.closest('.code-block').querySelector('code');
            const text = codeBlock.textContent;
            
            navigator.clipboard.writeText(text).then(() => {
                // Show copied feedback
                const originalText = btn.textContent;
                btn.textContent = currentLang === 'en' ? 'Copied!' : '¡Copiado!';
                btn.classList.add('copied');
                
                setTimeout(() => {
                    btn.textContent = btn.dataset[currentLang] || originalText;
                    btn.classList.remove('copied');
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy:', err);
            });
        });
    });
    
    // Animate sections on scroll
    const sections = document.querySelectorAll('.guide-section');
    const observerOptions = {
        root: null,
        rootMargin: '100px',
        threshold: 0.01
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        // Only set initial state if section is not already in viewport
        const rect = section.getBoundingClientRect();
        const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (!isInViewport) {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        } else {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
        observer.observe(section);
    });
    
    // Smooth scroll for TOC links
    const tocLinks = document.querySelectorAll('.toc a');
    tocLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').slice(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                const navHeight = document.querySelector('.guide-nav').offsetHeight;
                const tocHeight = document.querySelector('.toc').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight - tocHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Highlight active TOC link on scroll
    const tocLinksArr = Array.from(tocLinks);
    window.addEventListener('scroll', () => {
        let current = '';
        const navHeight = document.querySelector('.guide-nav').offsetHeight;
        const tocHeight = document.querySelector('.toc').offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - tocHeight - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        tocLinksArr.forEach(link => {
            link.style.color = '';
            link.style.background = '';
            if (link.getAttribute('href') === `#${current}`) {
                link.style.color = '#FF69B4';
                link.style.background = 'rgba(255, 105, 180, 0.1)';
            }
        });
    });

    // Initialize playground
    initPlayground();
    
    // Initialize progress tracker
    initProgressTracker();
});

// Set language function
function setLanguage(lang) {
    currentLang = lang;
    
    // Update active button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    
    // Update all elements with data-en and data-es attributes
    document.querySelectorAll('[data-en][data-es]').forEach(element => {
        const text = element.dataset[lang];
        if (text) {
            element.textContent = text;
        }
    });
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
    
    // Re-highlight code blocks after language change
    if (typeof Prism !== 'undefined') {
        Prism.highlightAll();
    }
}

// GSAP animations for page load
if (typeof gsap !== 'undefined') {
    gsap.from('.guide-header h1', {
        opacity: 0,
        y: -30,
        duration: 0.8,
        ease: 'back.out(1.7)'
    });
    
    gsap.from('.guide-subtitle', {
        opacity: 0,
        y: -20,
        duration: 0.6,
        delay: 0.2,
        ease: 'power2.out'
    });
    
    gsap.from('.toc', {
        opacity: 0,
        duration: 0.5,
        delay: 0.3,
        ease: 'power2.out'
    });
}

// ============================================
// INTERACTIVE PLAYGROUND
// ============================================

// Flower SVG Templates (matching script.js)
const playgroundFlowerTemplates = {
    daisy: (color, size = 1) => {
        const petalColor = color || '#FFFFFF';
        const centerColor = '#FFD700';
        return `
            <svg width="${80 * size}" height="${120 * size}" viewBox="0 0 80 120">
                <path d="M40 120 Q35 90 40 60" stroke="#228B22" stroke-width="4" fill="none" stroke-linecap="round"/>
                <ellipse cx="30" cy="95" rx="12" ry="6" fill="#32CD32" transform="rotate(-30 30 95)"/>
                <ellipse cx="50" cy="85" rx="12" ry="6" fill="#32CD32" transform="rotate(30 50 85)"/>
                <g transform="translate(40, 35)">
                    ${[0, 45, 90, 135, 180, 225, 270, 315].map(angle => `
                        <ellipse cx="0" cy="-18" rx="8" ry="18" fill="${petalColor}" stroke="#333" stroke-width="1.5" transform="rotate(${angle})"/>
                    `).join('')}
                </g>
                <circle cx="40" cy="35" r="12" fill="${centerColor}" stroke="#333" stroke-width="2"/>
                <circle cx="37" cy="32" r="2" fill="#FFA500"/>
                <circle cx="43" cy="33" r="1.5" fill="#FFA500"/>
                <circle cx="40" cy="38" r="1.5" fill="#FFA500"/>
            </svg>
        `;
    },
    
    tulip: (color, size = 1) => {
        const petalColor = color || '#FF69B4';
        return `
            <svg width="${60 * size}" height="${110 * size}" viewBox="0 0 60 110">
                <path d="M30 110 Q25 80 30 50" stroke="#228B22" stroke-width="4" fill="none" stroke-linecap="round"/>
                <path d="M28 85 Q10 75 5 90" stroke="#32CD32" stroke-width="8" fill="none" stroke-linecap="round"/>
                <path d="M32 75 Q50 65 55 80" stroke="#32CD32" stroke-width="8" fill="none" stroke-linecap="round"/>
                <path d="M30 50 Q15 35 20 15 Q30 5 40 15 Q45 35 30 50" fill="${petalColor}" stroke="#333" stroke-width="2"/>
                <path d="M30 50 Q10 40 8 25 Q20 20 30 30" fill="${petalColor}" stroke="#333" stroke-width="2" opacity="0.9"/>
                <path d="M30 50 Q50 40 52 25 Q40 20 30 30" fill="${petalColor}" stroke="#333" stroke-width="2" opacity="0.9"/>
            </svg>
        `;
    },
    
    sunflower: (color, size = 1) => {
        const petalColor = color || '#FFD700';
        return `
            <svg width="${100 * size}" height="${140 * size}" viewBox="0 0 100 140">
                <path d="M50 140 Q45 100 50 70" stroke="#228B22" stroke-width="6" fill="none" stroke-linecap="round"/>
                <ellipse cx="35" cy="110" rx="18" ry="8" fill="#32CD32" transform="rotate(-40 35 110)"/>
                <ellipse cx="65" cy="100" rx="18" ry="8" fill="#32CD32" transform="rotate(40 65 100)"/>
                <g transform="translate(50, 45)">
                    ${[0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340].map(angle => `
                        <ellipse cx="0" cy="-25" rx="6" ry="15" fill="${petalColor}" stroke="#333" stroke-width="1" transform="rotate(${angle})"/>
                    `).join('')}
                </g>
                <circle cx="50" cy="45" r="18" fill="#8B4513" stroke="#333" stroke-width="2"/>
                <circle cx="45" cy="40" r="2" fill="#654321"/>
                <circle cx="55" cy="42" r="2" fill="#654321"/>
                <circle cx="50" cy="48" r="2" fill="#654321"/>
            </svg>
        `;
    },
    
    rose: (color, size = 1) => {
        const petalColor = color || '#FF1493';
        const darkerColor = shadeColor(petalColor, -20);
        return `
            <svg width="${70 * size}" height="${100 * size}" viewBox="0 0 70 100">
                <path d="M35 100 Q30 70 35 45" stroke="#228B22" stroke-width="4" fill="none" stroke-linecap="round"/>
                <ellipse cx="25" cy="75" rx="10" ry="5" fill="#32CD32" transform="rotate(-30 25 75)"/>
                <ellipse cx="45" cy="80" rx="10" ry="5" fill="#32CD32" transform="rotate(30 45 80)"/>
                <g transform="translate(35, 30)">
                    <ellipse cx="0" cy="0" rx="18" ry="15" fill="${petalColor}" stroke="#333" stroke-width="1.5"/>
                    <path d="M-12 -5 Q0 -20 12 -5 Q5 5 0 0 Q-5 5 -12 -5" fill="${darkerColor}" stroke="#333" stroke-width="1"/>
                    <path d="M-8 0 Q0 -15 8 0 Q3 8 0 3 Q-3 8 -8 0" fill="${petalColor}" stroke="#333" stroke-width="1"/>
                    <circle cx="0" cy="3" r="5" fill="${darkerColor}" stroke="#333" stroke-width="1"/>
                </g>
            </svg>
        `;
    },
    
    cute: (color, size = 1) => {
        const petalColor = color || '#FF6B6B';
        return `
            <svg width="${70 * size}" height="${100 * size}" viewBox="0 0 70 100">
                <path d="M35 100 Q32 70 35 50" stroke="#228B22" stroke-width="4" fill="none" stroke-linecap="round"/>
                <circle cx="25" cy="75" r="8" fill="#32CD32" stroke="#333" stroke-width="1"/>
                <circle cx="45" cy="80" r="8" fill="#32CD32" stroke="#333" stroke-width="1"/>
                <g transform="translate(35, 30)">
                    ${[0, 60, 120, 180, 240, 300].map(angle => `
                        <circle cx="0" cy="-15" r="12" fill="${petalColor}" stroke="#333" stroke-width="2" transform="rotate(${angle})"/>
                    `).join('')}
                </g>
                <circle cx="35" cy="30" r="10" fill="#FFE135" stroke="#333" stroke-width="2"/>
                <circle cx="32" cy="28" r="2" fill="#333"/>
                <circle cx="38" cy="28" r="2" fill="#333"/>
                <path d="M32 33 Q35 36 38 33" stroke="#333" stroke-width="1.5" fill="none" stroke-linecap="round"/>
            </svg>
        `;
    },
    
    star: (color, size = 1) => {
        const petalColor = color || '#9370DB';
        return `
            <svg width="${80 * size}" height="${110 * size}" viewBox="0 0 80 110">
                <path d="M40 110 Q38 80 40 55" stroke="#228B22" stroke-width="4" fill="none" stroke-linecap="round"/>
                <path d="M35 85 Q20 80 15 90 Q25 85 35 85" fill="#32CD32" stroke="#333" stroke-width="1"/>
                <path d="M45 75 Q60 70 65 80 Q55 75 45 75" fill="#32CD32" stroke="#333" stroke-width="1"/>
                <g transform="translate(40, 35)">
                    ${[0, 72, 144, 216, 288].map(angle => `
                        <path d="M0 0 L-8 -10 L0 -28 L8 -10 Z" fill="${petalColor}" stroke="#333" stroke-width="1.5" transform="rotate(${angle})"/>
                    `).join('')}
                </g>
                <circle cx="40" cy="35" r="8" fill="#FFD700" stroke="#333" stroke-width="2"/>
            </svg>
        `;
    }
};

// Helper function to shade colors
function shadeColor(color, percent) {
    const num = parseInt(color.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return '#' + (0x1000000 + 
        (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + 
        (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 + 
        (B < 255 ? B < 1 ? 0 : B : 255)
    ).toString(16).slice(1);
}

// Playground state
let playgroundFlowers = [];
let selectedFlowerType = 'daisy';
let selectedColor = '#FF69B4';
let selectedSize = 1;

function initPlayground() {
    const canvas = document.getElementById('playgroundCanvas');
    const flowersContainer = document.getElementById('playgroundFlowers');
    const generateBtn = document.getElementById('generateFlower');
    const clearBtn = document.getElementById('clearPlayground');
    const colorPicker = document.getElementById('flowerColor');
    const sizeSlider = document.getElementById('flowerSize');
    const flowerTypeBtns = document.querySelectorAll('.flower-type-btn');
    
    if (!canvas || !flowersContainer) return;
    
    // Flower type selection
    flowerTypeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            flowerTypeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedFlowerType = btn.dataset.type;
        });
    });
    
    // Color picker
    colorPicker.addEventListener('input', (e) => {
        selectedColor = e.target.value;
        document.querySelector('.color-value').textContent = selectedColor.toUpperCase();
    });
    
    // Size slider
    sizeSlider.addEventListener('input', (e) => {
        selectedSize = parseFloat(e.target.value);
        document.querySelector('.size-value').textContent = `${selectedSize}x`;
    });
    
    // Generate flower button
    generateBtn.addEventListener('click', () => {
        const canvasRect = canvas.getBoundingClientRect();
        const x = 50 + Math.random() * (canvasRect.width - 150);
        const y = canvasRect.height * 0.5 + Math.random() * (canvasRect.height * 0.35);
        createPlaygroundFlower(selectedFlowerType, x, y, selectedColor, selectedSize);
    });
    
    // Clear button
    clearBtn.addEventListener('click', () => {
        flowersContainer.innerHTML = '';
        playgroundFlowers = [];
        updateGeneratedCode('// Generate a flower to see the code!');
        document.querySelector('.playground-hint').style.display = 'block';
    });
    
    // Double-click to add flower
    canvas.addEventListener('dblclick', (e) => {
        if (e.target.closest('.playground-flower')) return;
        
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left - 40;
        const y = e.clientY - rect.top - 60;
        createPlaygroundFlower(selectedFlowerType, x, y, selectedColor, selectedSize);
    });
    
    // Animation control buttons
    document.getElementById('triggerWind')?.addEventListener('click', () => {
        triggerWindEffect();
    });
    
    document.getElementById('triggerBounce')?.addEventListener('click', () => {
        triggerBounceEffect();
    });
    
    document.getElementById('triggerSparkle')?.addEventListener('click', () => {
        triggerSparkleEffect();
    });
}

function createPlaygroundFlower(type, x, y, color, size) {
    const container = document.getElementById('playgroundFlowers');
    const hint = document.querySelector('.playground-hint');
    
    if (hint) hint.style.display = 'none';
    
    const flower = document.createElement('div');
    flower.className = 'playground-flower';
    flower.innerHTML = playgroundFlowerTemplates[type](color, size);
    flower.style.left = `${x}px`;
    flower.style.top = `${y}px`;
    
    const initialRotation = -10 + Math.random() * 20;
    flower.dataset.rotation = initialRotation;
    
    container.appendChild(flower);
    playgroundFlowers.push(flower);
    
    // Entrance animation
    if (typeof gsap !== 'undefined') {
        gsap.from(flower, {
            y: -150,
            opacity: 0,
            scale: 0.5,
            duration: 0.8,
            ease: 'back.out(1.7)',
            onComplete: () => {
                startSwaying(flower);
                setupDraggable(flower);
            }
        });
    }
    
    // Update generated code
    updateGeneratedCode(type, color, size);
    
    // Create sparkles
    createSparkles(x + 40, y + 30);
}

function setupDraggable(element) {
    if (typeof Draggable === 'undefined') return;
    
    Draggable.create(element, {
        type: 'x,y',
        bounds: '#playgroundCanvas',
        inertia: true,
        onDragStart: function() {
            element.classList.add('dragging');
            gsap.to(element, {
                scale: 1.1,
                rotation: 0,
                duration: 0.3,
                ease: 'back.out(1.7)'
            });
        },
        onDrag: function() {
            gsap.to(element, {
                rotation: this.x - this.startX > 0 ? 10 : -10,
                duration: 0.1
            });
        },
        onDragEnd: function() {
            element.classList.remove('dragging');
            gsap.to(element, {
                scale: 1,
                rotation: parseFloat(element.dataset.rotation) || 0,
                duration: 0.5,
                ease: 'elastic.out(1, 0.5)'
            });
            createSparkles(this.x + 40, this.y + 30);
            startSwaying(element);
        }
    });
}

function startSwaying(element) {
    if (typeof gsap === 'undefined') return;
    
    const baseRotation = parseFloat(element.dataset.rotation) || 0;
    const swayAmount = 3 + Math.random() * 4;
    const swayDuration = 2 + Math.random() * 2;
    
    gsap.to(element, {
        rotation: baseRotation + swayAmount,
        duration: swayDuration,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        overwrite: 'auto'
    });
}

function createSparkles(x, y) {
    const container = document.getElementById('playgroundFlowers');
    
    for (let i = 0; i < 5; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'playground-sparkle';
        sparkle.style.left = `${x + (Math.random() - 0.5) * 50}px`;
        sparkle.style.top = `${y + (Math.random() - 0.5) * 50}px`;
        container.appendChild(sparkle);
        
        setTimeout(() => sparkle.remove(), 1000);
    }
}

function triggerWindEffect() {
    const windStrength = 8 + Math.random() * 12;
    
    playgroundFlowers.forEach(flower => {
        gsap.to(flower, {
            rotation: `+=${windStrength * (Math.random() > 0.5 ? 1 : -1)}`,
            duration: 0.5,
            ease: 'power2.out',
            onComplete: () => startSwaying(flower)
        });
    });
}

function triggerBounceEffect() {
    playgroundFlowers.forEach((flower, index) => {
        gsap.to(flower, {
            y: '-=30',
            duration: 0.3,
            ease: 'power2.out',
            delay: index * 0.05,
            onComplete: () => {
                gsap.to(flower, {
                    y: '+=30',
                    duration: 0.5,
                    ease: 'elastic.out(1, 0.5)'
                });
            }
        });
    });
}

function triggerSparkleEffect() {
    const container = document.getElementById('playgroundFlowers');
    const rect = container.getBoundingClientRect();
    
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.className = 'playground-sparkle';
            sparkle.style.left = `${Math.random() * rect.width}px`;
            sparkle.style.top = `${Math.random() * rect.height}px`;
            container.appendChild(sparkle);
            
            setTimeout(() => sparkle.remove(), 1000);
        }, i * 50);
    }
}

function updateGeneratedCode(type, color, size) {
    const codeElement = document.getElementById('generatedCode');
    if (!codeElement) return;
    
    if (!type) {
        codeElement.textContent = '// Generate a flower to see the code!';
        if (typeof Prism !== 'undefined') Prism.highlightElement(codeElement);
        return;
    }
    
    const code = `// Create a ${type} flower
const flower = document.createElement('div');
flower.className = 'flower';
flower.innerHTML = flowerTemplates.${type}('${color}', ${size});

// Position the flower
flower.style.left = '100px';
flower.style.top = '200px';

// Add to container
container.appendChild(flower);

// Animate entrance
gsap.from(flower, {
    y: -200,
    opacity: 0,
    scale: 0.5,
    duration: 0.8,
    ease: 'back.out(1.7)',
    onComplete: () => startSwaying(flower)
});

// Make draggable
Draggable.create(flower, {
    type: 'x,y',
    bounds: '.container',
    inertia: true,
    onDragStart: () => {
        flower.classList.add('dragging');
        gsap.to(flower, { scale: 1.1, duration: 0.3 });
    },
    onDragEnd: () => {
        flower.classList.remove('dragging');
        gsap.to(flower, { 
            scale: 1, 
            duration: 0.5, 
            ease: 'elastic.out(1, 0.5)' 
        });
        startSwaying(flower);
    }
});`;
    
    codeElement.textContent = code;
    if (typeof Prism !== 'undefined') Prism.highlightElement(codeElement);
}

// ============================================
// PROGRESS TRACKER
// ============================================

function initProgressTracker() {
    const checkboxes = document.querySelectorAll('.step-checkbox input[type="checkbox"]');
    const progressBar = document.getElementById('tutorialProgress');
    const progressText = document.getElementById('progressText');
    
    // Load saved progress
    const savedProgress = JSON.parse(localStorage.getItem('tutorialProgress') || '{}');
    
    checkboxes.forEach(checkbox => {
        const step = checkbox.dataset.step;
        
        // Restore saved state
        if (savedProgress[step]) {
            checkbox.checked = true;
        }
        
        // Save on change
        checkbox.addEventListener('change', () => {
            savedProgress[step] = checkbox.checked;
            localStorage.setItem('tutorialProgress', JSON.stringify(savedProgress));
            updateProgress();
        });
    });
    
    updateProgress();
    
    function updateProgress() {
        const total = checkboxes.length;
        const completed = Array.from(checkboxes).filter(cb => cb.checked).length;
        const percentage = Math.round((completed / total) * 100);
        
        if (progressBar) {
            progressBar.style.width = `${percentage}%`;
        }
        
        if (progressText) {
            progressText.textContent = `${percentage}% Complete`;
        }
    }
}