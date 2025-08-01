// Game state
let gameState = {
    characterReachedChest: false,
    letterShown: false
};

// DOM elements
const character = document.getElementById('character');
const chest = document.getElementById('chest');
const textPrompt = document.getElementById('text-prompt');
const letterContainer = document.getElementById('letter-container');
const closeLetterBtn = document.getElementById('close-letter');

// Initialize the game
function initGame() {
    // Start character movement after a short delay
    setTimeout(() => {
        startCharacterMovement();
    }, 1000);
}

// Start character movement towards chest
function startCharacterMovement() {
    // Add walking animation
    character.classList.add('walking');
    
    // Calculate target position (center of screen)
    const targetX = window.innerWidth / 2 - 32; // Adjust for character width
    
    // Move character to chest
    character.style.left = targetX + 'px';
    
    // When character reaches chest
    setTimeout(() => {
        character.classList.remove('walking');
        characterReachedChest();
    }, 3000);
}

// Character reached chest
function characterReachedChest() {
    gameState.characterReachedChest = true;
    
    // Show text prompt
    textPrompt.classList.add('show');
    
    // Add chest interaction
    chest.addEventListener('click', openChest);
    chest.addEventListener('mouseenter', () => {
        if (!gameState.letterShown) {
            chest.style.cursor = 'pointer';
        }
    });
}

// Open chest and show letter
function openChest() {
    if (gameState.letterShown) return;
    
    // Add opening animation
    chest.classList.add('opening');
    
    // Hide text prompt
    textPrompt.classList.remove('show');
    
    // Show letter after animation
    setTimeout(() => {
        showLetter();
    }, 1000);
}

// Show the letter
function showLetter() {
    gameState.letterShown = true;
    letterContainer.classList.add('show');
    
    // Disable chest interaction
    chest.style.cursor = 'default';
    chest.removeEventListener('click', openChest);
}

// Close letter
function closeLetter() {
    letterContainer.classList.remove('show');
    
    // Reset game state
    gameState.letterShown = false;
    gameState.characterReachedChest = false;
    
    // Reset character position
    character.style.left = '50px';
    character.classList.remove('walking');
    
    // Hide text prompt
    textPrompt.classList.remove('show');
    
    // Re-enable chest interaction
    chest.classList.remove('opening');
    chest.addEventListener('click', openChest);
    chest.style.cursor = 'pointer';
}

// Event listeners
closeLetterBtn.addEventListener('click', closeLetter);

// Add pixel art decorations to the background
function addPixelDecorations() {
    const background = document.getElementById('background');
    
    // Add pixel art clouds
    const clouds = [
        { left: '10%', top: '15%', width: '80px', height: '60px' },
        { left: '70%', top: '10%', width: '100px', height: '70px' },
        { left: '40%', top: '5%', width: '60px', height: '50px' }
    ];
    
    clouds.forEach((cloud, index) => {
        const cloudElement = document.createElement('div');
        cloudElement.className = 'pixel-cloud';
        cloudElement.style.cssText = `
            position: absolute;
            left: ${cloud.left};
            top: ${cloud.top};
            width: ${cloud.width};
            height: ${cloud.height};
            background: #FFFFFF;
            border-radius: 0;
            z-index: 1;
            image-rendering: pixelated;
            image-rendering: -moz-crisp-edges;
            image-rendering: crisp-edges;
        `;
        background.appendChild(cloudElement);
    });
    
    // Add pixel art flowers
    const flowers = [
        { left: '15%', bottom: '120px' },
        { left: '85%', bottom: '120px' },
        { left: '30%', bottom: '120px' },
        { left: '70%', bottom: '120px' },
        { left: '50%', bottom: '120px' }
    ];
    
    flowers.forEach((flower, index) => {
        const flowerElement = document.createElement('div');
        flowerElement.className = 'pixel-flower';
        flowerElement.style.cssText = `
            position: absolute;
            left: ${flower.left};
            bottom: ${flower.bottom};
            width: 16px;
            height: 16px;
            background: #FF69B4;
            border: 2px solid #90EE90;
            border-radius: 0;
            z-index: 2;
            image-rendering: pixelated;
            image-rendering: -moz-crisp-edges;
            image-rendering: crisp-edges;
        `;
        background.appendChild(flowerElement);
    });
    
    // Add pixel art grass patches
    const grassPatches = [
        { left: '5%', bottom: '100px' },
        { left: '25%', bottom: '100px' },
        { left: '45%', bottom: '100px' },
        { left: '65%', bottom: '100px' },
        { left: '85%', bottom: '100px' }
    ];
    
    grassPatches.forEach((patch, index) => {
        const grassElement = document.createElement('div');
        grassElement.style.cssText = `
            position: absolute;
            left: ${patch.left};
            bottom: ${patch.bottom};
            width: 20px;
            height: 20px;
            background: #90EE90;
            border-radius: 0;
            z-index: 2;
            image-rendering: pixelated;
            image-rendering: -moz-crisp-edges;
            image-rendering: crisp-edges;
        `;
        background.appendChild(grassElement);
    });
}

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && gameState.letterShown) {
        closeLetter();
    }
});

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    initGame();
    addPixelDecorations();
});

// Add some ambient animations
function addAmbientAnimations() {
    // Gentle swaying animation for character when idle
    setInterval(() => {
        if (!character.classList.contains('walking') && !gameState.characterReachedChest) {
            character.style.transform = 'scale(4) translateY(-2px)';
            setTimeout(() => {
                character.style.transform = 'scale(4) translateY(0px)';
            }, 200);
        }
    }, 3000);
}

// Start ambient animations
setTimeout(addAmbientAnimations, 2000);
