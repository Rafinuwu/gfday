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

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && gameState.letterShown) {
        closeLetter();
    }
});

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    initGame();
    // The call to addPixelDecorations() was here; it has been removed.
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
