// Flower Garden - Interactive Landing Page
// Using GSAP for animations and Draggable for drag-and-drop

// Flower SVG Templates
const flowerTemplates = {
    // Daisy flower
    daisy: (color, size = 1) => {
        const petalColor = color || '#FFFFFF';
        const centerColor = '#FFD700';
        return `
            <svg width="${80 * size}" height="${120 * size}" viewBox="0 0 80 120">
                <!-- Stem -->
                <path d="M40 120 Q35 90 40 60" stroke="#228B22" stroke-width="4" fill="none" stroke-linecap="round"/>
                <!-- Leaves -->
                <ellipse cx="30" cy="95" rx="12" ry="6" fill="#32CD32" transform="rotate(-30 30 95)"/>
                <ellipse cx="50" cy="85" rx="12" ry="6" fill="#32CD32" transform="rotate(30 50 85)"/>
                <!-- Petals -->
                <g transform="translate(40, 35)">
                    ${[0, 45, 90, 135, 180, 225, 270, 315].map(angle => `
                        <ellipse cx="0" cy="-18" rx="8" ry="18" fill="${petalColor}" stroke="#333" stroke-width="1.5" transform="rotate(${angle})"/>
                    `).join('')}
                </g>
                <!-- Center -->
                <circle cx="40" cy="35" r="12" fill="${centerColor}" stroke="#333" stroke-width="2"/>
                <circle cx="37" cy="32" r="2" fill="#FFA500"/>
                <circle cx="43" cy="33" r="1.5" fill="#FFA500"/>
                <circle cx="40" cy="38" r="1.5" fill="#FFA500"/>
            </svg>
        `;
    },
    
    // Tulip flower
    tulip: (color, size = 1) => {
        const petalColor = color || '#FF69B4';
        return `
            <svg width="${60 * size}" height="${110 * size}" viewBox="0 0 60 110">
                <!-- Stem -->
                <path d="M30 110 Q25 80 30 50" stroke="#228B22" stroke-width="4" fill="none" stroke-linecap="round"/>
                <!-- Leaves -->
                <path d="M28 85 Q10 75 5 90" stroke="#32CD32" stroke-width="8" fill="none" stroke-linecap="round"/>
                <path d="M32 75 Q50 65 55 80" stroke="#32CD32" stroke-width="8" fill="none" stroke-linecap="round"/>
                <!-- Petals -->
                <path d="M30 50 Q15 35 20 15 Q30 5 40 15 Q45 35 30 50" fill="${petalColor}" stroke="#333" stroke-width="2"/>
                <path d="M30 50 Q10 40 8 25 Q20 20 30 30" fill="${petalColor}" stroke="#333" stroke-width="2" opacity="0.9"/>
                <path d="M30 50 Q50 40 52 25 Q40 20 30 30" fill="${petalColor}" stroke="#333" stroke-width="2" opacity="0.9"/>
            </svg>
        `;
    },
    
    // Sunflower
    sunflower: (color, size = 1) => {
        const petalColor = color || '#FFD700';
        return `
            <svg width="${100 * size}" height="${140 * size}" viewBox="0 0 100 140">
                <!-- Stem -->
                <path d="M50 140 Q45 100 50 70" stroke="#228B22" stroke-width="6" fill="none" stroke-linecap="round"/>
                <!-- Leaves -->
                <ellipse cx="35" cy="110" rx="18" ry="8" fill="#32CD32" transform="rotate(-40 35 110)"/>
                <ellipse cx="65" cy="100" rx="18" ry="8" fill="#32CD32" transform="rotate(40 65 100)"/>
                <!-- Petals -->
                <g transform="translate(50, 45)">
                    ${[0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340].map(angle => `
                        <ellipse cx="0" cy="-25" rx="6" ry="15" fill="${petalColor}" stroke="#333" stroke-width="1" transform="rotate(${angle})"/>
                    `).join('')}
                </g>
                <!-- Center -->
                <circle cx="50" cy="45" r="18" fill="#8B4513" stroke="#333" stroke-width="2"/>
                <circle cx="45" cy="40" r="2" fill="#654321"/>
                <circle cx="55" cy="42" r="2" fill="#654321"/>
                <circle cx="50" cy="48" r="2" fill="#654321"/>
                <circle cx="48" cy="50" r="1.5" fill="#654321"/>
                <circle cx="54" cy="38" r="1.5" fill="#654321"/>
            </svg>
        `;
    },
    
    // Rose
    rose: (color, size = 1) => {
        const petalColor = color || '#FF1493';
        const darkerColor = shadeColor(petalColor, -20);
        return `
            <svg width="${70 * size}" height="${100 * size}" viewBox="0 0 70 100">
                <!-- Stem -->
                <path d="M35 100 Q30 70 35 45" stroke="#228B22" stroke-width="4" fill="none" stroke-linecap="round"/>
                <!-- Leaves -->
                <ellipse cx="25" cy="75" rx="10" ry="5" fill="#32CD32" transform="rotate(-30 25 75)"/>
                <ellipse cx="45" cy="80" rx="10" ry="5" fill="#32CD32" transform="rotate(30 45 80)"/>
                <!-- Rose petals -->
                <g transform="translate(35, 30)">
                    <ellipse cx="0" cy="0" rx="18" ry="15" fill="${petalColor}" stroke="#333" stroke-width="1.5"/>
                    <path d="M-12 -5 Q0 -20 12 -5 Q5 5 0 0 Q-5 5 -12 -5" fill="${darkerColor}" stroke="#333" stroke-width="1"/>
                    <path d="M-8 0 Q0 -15 8 0 Q3 8 0 3 Q-3 8 -8 0" fill="${petalColor}" stroke="#333" stroke-width="1"/>
                    <circle cx="0" cy="3" r="5" fill="${darkerColor}" stroke="#333" stroke-width="1"/>
                </g>
            </svg>
        `;
    },
    
    // Cute round flower
    cute: (color, size = 1) => {
        const petalColor = color || '#FF6B6B';
        return `
            <svg width="${70 * size}" height="${100 * size}" viewBox="0 0 70 100">
                <!-- Stem -->
                <path d="M35 100 Q32 70 35 50" stroke="#228B22" stroke-width="4" fill="none" stroke-linecap="round"/>
                <!-- Leaves -->
                <circle cx="25" cy="75" r="8" fill="#32CD32" stroke="#333" stroke-width="1"/>
                <circle cx="45" cy="80" r="8" fill="#32CD32" stroke="#333" stroke-width="1"/>
                <!-- Petals -->
                <g transform="translate(35, 30)">
                    ${[0, 60, 120, 180, 240, 300].map(angle => `
                        <circle cx="0" cy="-15" r="12" fill="${petalColor}" stroke="#333" stroke-width="2" transform="rotate(${angle})"/>
                    `).join('')}
                </g>
                <!-- Center -->
                <circle cx="35" cy="30" r="10" fill="#FFE135" stroke="#333" stroke-width="2"/>
                <!-- Cute face -->
                <circle cx="32" cy="28" r="2" fill="#333"/>
                <circle cx="38" cy="28" r="2" fill="#333"/>
                <path d="M32 33 Q35 36 38 33" stroke="#333" stroke-width="1.5" fill="none" stroke-linecap="round"/>
            </svg>
        `;
    },
    
    // Star flower
    star: (color, size = 1) => {
        const petalColor = color || '#9370DB';
        return `
            <svg width="${80 * size}" height="${110 * size}" viewBox="0 0 80 110">
                <!-- Stem -->
                <path d="M40 110 Q38 80 40 55" stroke="#228B22" stroke-width="4" fill="none" stroke-linecap="round"/>
                <!-- Leaves -->
                <path d="M35 85 Q20 80 15 90 Q25 85 35 85" fill="#32CD32" stroke="#333" stroke-width="1"/>
                <path d="M45 75 Q60 70 65 80 Q55 75 45 75" fill="#32CD32" stroke="#333" stroke-width="1"/>
                <!-- Star petals -->
                <g transform="translate(40, 35)">
                    ${[0, 72, 144, 216, 288].map(angle => `
                        <path d="M0 0 L-8 -10 L0 -28 L8 -10 Z" fill="${petalColor}" stroke="#333" stroke-width="1.5" transform="rotate(${angle})"/>
                    `).join('')}
                </g>
                <!-- Center -->
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

// Color palettes for flowers
const colorPalettes = {
    daisy: ['#FFFFFF', '#FFE4E1', '#E6E6FA', '#FFF0F5', '#F0FFF0'],
    tulip: ['#FF69B4', '#FF1493', '#DC143C', '#FF4500', '#FF6347', '#FFD700'],
    sunflower: ['#FFD700', '#FFA500', '#FF8C00', '#FFEF00'],
    rose: ['#FF1493', '#DC143C', '#FF69B4', '#FFB6C1', '#C71585'],
    cute: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'],
    star: ['#9370DB', '#8A2BE2', '#9400D3', '#BA55D3', '#DA70D6', '#6A5ACD']
};

// Flower data
const flowerTypes = ['daisy', 'tulip', 'sunflower', 'rose', 'cute', 'star'];
let flowers = [];
let flowerId = 0;

// Create a flower element
function createFlower(type, x, y, size = 1) {
    const colors = colorPalettes[type];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const randomSize = size * (0.7 + Math.random() * 0.6);
    
    const flower = document.createElement('div');
    flower.className = 'flower';
    flower.id = `flower-${flowerId++}`;
    flower.innerHTML = flowerTemplates[type](color, randomSize);
    flower.dataset.type = type;
    flower.dataset.color = color;
    
    // Position
    flower.style.left = `${x}px`;
    flower.style.top = `${y}px`;
    
    // Random initial rotation
    const initialRotation = -10 + Math.random() * 20;
    flower.dataset.rotation = initialRotation;
    
    return flower;
}

// Initialize flowers
function initFlowers() {
    const container = document.getElementById('flowersContainer');
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const grassTop = windowHeight * 0.65; // Grass starts at 65% from top
    
    // Create initial flowers
    const flowerCount = Math.min(15, Math.floor(windowWidth / 100));
    
    for (let i = 0; i < flowerCount; i++) {
        const type = flowerTypes[Math.floor(Math.random() * flowerTypes.length)];
        const x = 50 + Math.random() * (windowWidth - 150);
        const y = grassTop - 50 + Math.random() * (windowHeight * 0.25);
        
        const flower = createFlower(type, x, y);
        container.appendChild(flower);
        flowers.push(flower);
    }
    
    // Setup draggable and animations
    setupFlowers();
}

// Setup draggable and animations for all flowers
function setupFlowers() {
    flowers.forEach((flower, index) => {
        // Make draggable
        Draggable.create(flower, {
            type: 'x,y',
            bounds: '.garden',
            inertia: true,
            onDragStart: function() {
                flower.classList.add('dragging');
                gsap.to(flower, {
                    scale: 1.1,
                    rotation: 0,
                    duration: 0.3,
                    ease: 'back.out(1.7)'
                });
            },
            onDrag: function() {
                // Add slight rotation while dragging
                gsap.to(flower, {
                    rotation: this.x - this.startX > 0 ? 10 : -10,
                    duration: 0.1
                });
            },
            onDragEnd: function() {
                flower.classList.remove('dragging');
                
                // Bounce animation
                gsap.to(flower, {
                    scale: 1,
                    rotation: parseFloat(flower.dataset.rotation) || 0,
                    duration: 0.5,
                    ease: 'elastic.out(1, 0.5)'
                });
                
                // Create sparkle effect
                createSparkles(this.x + 40, this.y + 30);
                
                // Start swaying again
                startSwaying(flower);
            }
        });
        
        // Entrance animation
        gsap.from(flower, {
            y: -200,
            opacity: 0,
            scale: 0.5,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'back.out(1.7)',
            onComplete: () => startSwaying(flower)
        });
    });
}

// Start swaying animation
function startSwaying(flower) {
    const baseRotation = parseFloat(flower.dataset.rotation) || 0;
    const swayAmount = 3 + Math.random() * 4;
    const swayDuration = 2 + Math.random() * 2;
    
    gsap.to(flower, {
        rotation: baseRotation + swayAmount,
        duration: swayDuration,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        overwrite: 'auto'
    });
}

// Create sparkle effects
function createSparkles(x, y) {
    const container = document.getElementById('flowersContainer');
    
    for (let i = 0; i < 5; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = `${x + (Math.random() - 0.5) * 50}px`;
        sparkle.style.top = `${y + (Math.random() - 0.5) * 50}px`;
        container.appendChild(sparkle);
        
        // Remove after animation
        setTimeout(() => sparkle.remove(), 1000);
    }
}

// Create butterflies
function createButterfly() {
    const container = document.getElementById('flowersContainer');
    const colors = ['#FF69B4', '#FFD700', '#00CED1', '#FF6347', '#9370DB'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    const butterfly = document.createElement('div');
    butterfly.className = 'butterfly';
    butterfly.innerHTML = `
        <svg width="30" height="20" viewBox="0 0 30 20">
            <ellipse cx="8" cy="10" rx="7" ry="8" fill="${color}" stroke="#333" stroke-width="1"/>
            <ellipse cx="22" cy="10" rx="7" ry="8" fill="${color}" stroke="#333" stroke-width="1"/>
            <ellipse cx="15" cy="10" rx="2" ry="6" fill="#333"/>
        </svg>
    `;
    
    const startX = -50;
    const startY = 100 + Math.random() * (window.innerHeight * 0.5);
    butterfly.style.left = `${startX}px`;
    butterfly.style.top = `${startY}px`;
    
    container.appendChild(butterfly);
    
    // Animate butterfly across screen
    const duration = 10 + Math.random() * 10;
    gsap.to(butterfly, {
        x: window.innerWidth + 100,
        y: `+=${(Math.random() - 0.5) * 200}`,
        duration: duration,
        ease: 'none',
        onComplete: () => butterfly.remove()
    });
    
    // Flutter up and down
    gsap.to(butterfly, {
        y: `+=${30 + Math.random() * 30}`,
        duration: 1 + Math.random(),
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true
    });
}

// Wind effect on all flowers
function windEffect() {
    const windStrength = 5 + Math.random() * 10;
    
    flowers.forEach(flower => {
        gsap.to(flower, {
            rotation: `+=${windStrength * (Math.random() > 0.5 ? 1 : -1)}`,
            duration: 0.5,
            ease: 'power2.out',
            onComplete: () => startSwaying(flower)
        });
    });
}

// Add more flowers on click
function addFlowerOnClick(e) {
    // Don't add if clicking on a flower
    if (e.target.closest('.flower')) return;
    
    const container = document.getElementById('flowersContainer');
    const type = flowerTypes[Math.floor(Math.random() * flowerTypes.length)];
    const flower = createFlower(type, e.clientX - 40, e.clientY - 60);
    
    container.appendChild(flower);
    flowers.push(flower);
    
    // Animate entrance
    gsap.from(flower, {
        scale: 0,
        rotation: 180,
        duration: 0.5,
        ease: 'back.out(1.7)',
        onComplete: () => {
            // Setup draggable
            Draggable.create(flower, {
                type: 'x,y',
                bounds: '.garden',
                inertia: true,
                onDragStart: function() {
                    flower.classList.add('dragging');
                    gsap.to(flower, {
                        scale: 1.1,
                        rotation: 0,
                        duration: 0.3,
                        ease: 'back.out(1.7)'
                    });
                },
                onDragEnd: function() {
                    flower.classList.remove('dragging');
                    gsap.to(flower, {
                        scale: 1,
                        rotation: parseFloat(flower.dataset.rotation) || 0,
                        duration: 0.5,
                        ease: 'elastic.out(1, 0.5)'
                    });
                    createSparkles(this.x + 40, this.y + 30);
                    startSwaying(flower);
                }
            });
            startSwaying(flower);
        }
    });
    
    // Create sparkles
    createSparkles(e.clientX, e.clientY);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initFlowers();
    
    // Add butterflies periodically
    createButterfly();
    setInterval(createButterfly, 5000 + Math.random() * 5000);
    
    // Wind effect occasionally
    setInterval(windEffect, 15000 + Math.random() * 10000);
    
    // Add flower on click
    document.querySelector('.garden').addEventListener('dblclick', addFlowerOnClick);
});

// Handle window resize
window.addEventListener('resize', () => {
    // Update bounds for all draggables
    flowers.forEach(flower => {
        const draggable = Draggable.get(flower);
        if (draggable) {
            draggable.applyBounds('.garden');
        }
    });
});