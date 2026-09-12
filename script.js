// Current scene tracker
let currentScene = 1;
let matchesFound = 0;
let candlesBlown = 0;
const totalScenes = 10;

// Initialize on page load
window.addEventListener('load', () => {
    initializeAnimations();
    initializeScene3();
    initializeScene4();
    initializeCarousel();
    initializeScene6();
    initializeScene8();
    initializeScene9();
    updateNavigationButtons();
});

// Initialize continuous animations
function initializeAnimations() {
    createKissRain();
    createRosePetals();
    createFloatingHearts();
}

// Kiss Rain Animation
function createKissRain() {
    const kissRain = document.getElementById('kissRain');
    const kisses = ['💋', '😘', '😍', '💕', '💖', '💗', '💓', '💞'];
    
    setInterval(() => {
        const kiss = document.createElement('div');
        kiss.className = 'kiss';
        kiss.textContent = kisses[Math.floor(Math.random() * kisses.length)];
        kiss.style.left = Math.random() * 100 + '%';
        kiss.style.animationDuration = (Math.random() * 3 + 2) + 's';
        kiss.style.fontSize = (Math.random() * 20 + 15) + 'px';
        kissRain.appendChild(kiss);
        
        setTimeout(() => kiss.remove(), 5000);
    }, 300);
}

// Rose Petals Animation
function createRosePetals() {
    const rosePetals = document.getElementById('rosePetals');
    const petals = ['🌹', '🌺', '🌸', '💐', '🏵️'];
    
    setInterval(() => {
        const petal = document.createElement('div');
        petal.className = 'petal';
        petal.textContent = petals[Math.floor(Math.random() * petals.length)];
        petal.style.left = Math.random() * 100 + '%';
        petal.style.animationDuration = (Math.random() * 4 + 3) + 's';
        petal.style.fontSize = (Math.random() * 15 + 15) + 'px';
        rosePetals.appendChild(petal);
        
        setTimeout(() => petal.remove(), 7000);
    }, 500);
}

// Floating Hearts Background
function createFloatingHearts() {
    const floatingHearts = document.getElementById('floatingHearts');
    const hearts = ['❤️', '💕', '💖', '💗', '💓', '💞', '💝'];
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 5 + 4) + 's';
        heart.style.fontSize = (Math.random() * 30 + 20) + 'px';
        floatingHearts.appendChild(heart);
        
        setTimeout(() => heart.remove(), 9000);
    }, 800);
}

// Scene Navigation
function nextScene() {
    if (currentScene < totalScenes) {
        // Check if special conditions are met
        if (currentScene === 3 && matchesFound < 1) {
            // Show message if they haven't reached 40% yet
            const gameMessage = document.getElementById('gameMessage');
            if (gameMessage) {
                gameMessage.textContent = '💕 Tap the heart a bit more to continue!';
            }
            return; // Don't advance until love meter is at least 40%
        }
        if (currentScene === 7 && candlesBlown < 5) {
            return; // Don't advance until all candles blown
        }
        
        currentScene++;
        switchToScene(currentScene);
    }
}

function previousScene() {
    if (currentScene > 1) {
        currentScene--;
        switchToScene(currentScene);
    }
}

function switchToScene(sceneNumber) {
    document.querySelectorAll('.scene').forEach(scene => {
        scene.classList.remove('active');
    });
    
    document.getElementById('scene' + sceneNumber).classList.add('active');
    currentScene = sceneNumber;
    
    updateNavigationButtons();
    createHeartsBurst();
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const nextBtnText = document.getElementById('nextBtnText');
    
    // Update Previous button visibility
    if (currentScene === 1) {
        prevBtn.style.display = 'none';
    } else {
        prevBtn.style.display = 'flex';
    }
    
    // Update Next button text and visibility
    if (currentScene === 9) {
        nextBtn.style.display = 'none';
    } else {
        nextBtn.style.display = 'flex';
        
        // Update button text based on scene
        const buttonTexts = {
            1: '💝 Start Your Special Day',
            2: 'Next 💕',
            3: 'Continue 💋',
            4: 'Keep Going 💖',
            5: 'Next Adventure 📸',
            6: 'Almost There 🎂',
            7: 'Continue 💗',
            8: 'Final Surprise 🎁'
        };
        
        nextBtnText.textContent = buttonTexts[currentScene] || 'Next 💝';
    }
}

function restartJourney() {
    location.reload();
}

// Hearts Burst Effect
function createHeartsBurst() {
    const container = document.body;
    const hearts = ['❤️', '💕', '💖', '💗', '💓', '💞', '💝'];
    
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.position = 'fixed';
            heart.style.fontSize = '30px';
            heart.style.left = '50%';
            heart.style.top = '50%';
            heart.style.transform = 'translate(-50%, -50%)';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '10000';
            container.appendChild(heart);
            
            const angle = (Math.PI * 2 * i) / 15;
            const velocity = 15;
            let posX = 0;
            let posY = 0;
            
            const animate = () => {
                posX += Math.cos(angle) * velocity;
                posY += Math.sin(angle) * velocity;
                heart.style.transform = `translate(calc(-50% + ${posX}px), calc(-50% + ${posY}px)) scale(${1 - posX/500})`;
                heart.style.opacity = 1 - (Math.abs(posX) / 500);
                
                if (Math.abs(posX) < 500) {
                    requestAnimationFrame(animate);
                } else {
                    heart.remove();
                }
            };
            
            animate();
        }, i * 50);
    }
}

// Scene 2: Love Lock
document.addEventListener('DOMContentLoaded', () => {
    const lock = document.getElementById('lock');
    const keyhole = document.getElementById('keyhole');
    const hiddenMessage = document.getElementById('hiddenMessage');
    
    if (lock && keyhole && hiddenMessage) {
        lock.addEventListener('click', () => {
            lock.classList.add('unlocked');
            keyhole.textContent = '🔓';
            
            setTimeout(() => {
                hiddenMessage.classList.add('show');
                createKissExplosion();
            }, 500);
        });
    }
});

function createKissExplosion() {
    const kisses = ['💋', '😘', '💕', '💖'];
    const container = document.querySelector('.kiss-explosion');
    
    if (!container) return;
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const kiss = document.createElement('div');
            kiss.textContent = kisses[Math.floor(Math.random() * kisses.length)];
            kiss.style.position = 'absolute';
            kiss.style.fontSize = '25px';
            kiss.style.left = '50%';
            kiss.style.top = '0';
            container.appendChild(kiss);
            
            const angle = (Math.PI * 2 * i) / 20;
            const velocity = 10;
            let posX = 0;
            let posY = 0;
            
            const animate = () => {
                posX += Math.cos(angle) * velocity;
                posY += Math.sin(angle) * velocity;
                kiss.style.transform = `translate(${posX}px, ${posY}px) rotate(${posX}deg)`;
                kiss.style.opacity = 1 - (Math.abs(posX) / 300);
                
                if (Math.abs(posX) < 300) {
                    requestAnimationFrame(animate);
                } else {
                    kiss.remove();
                }
            };
            
            animate();
        }, i * 30);
    }
}

// Scene 3: Simple Love Tap Game
function initializeScene3() {
    const tapHeart = document.getElementById('tapHeart');
    const loveMeterFill = document.getElementById('loveMeterFill');
    const lovePercentage = document.getElementById('lovePercentage');
    const gameMessage = document.getElementById('gameMessage');
    
    if (!tapHeart) return;
    
    let percentage = 0;
    const incrementPerTap = 12; // 12% per tap, so ~4 taps to reach 40%, ~9 taps for 100%
    
    tapHeart.addEventListener('click', () => {
        if (percentage < 100) {
            percentage = Math.min(100, percentage + incrementPerTap);
            
            loveMeterFill.style.width = percentage + '%';
            lovePercentage.textContent = percentage + '%';
            
            // Heart animation on tap
            tapHeart.style.transform = 'scale(0.9)';
            setTimeout(() => {
                tapHeart.style.transform = 'scale(1)';
            }, 100);
            
            // Create floating hearts
            createFloatingHeart(tapHeart);
            
            // Cute messages at different percentages
            if (percentage >= 12 && percentage < 24) {
                gameMessage.textContent = '💕 Aww, that\'s so sweet!';
            } else if (percentage >= 24 && percentage < 36) {
                gameMessage.textContent = '😊 Keep going, you\'re doing great!';
            } else if (percentage >= 36 && percentage < 48) {
                gameMessage.textContent = '💖 My heart is warming up!';
            } else if (percentage >= 48 && percentage < 60) {
                gameMessage.textContent = '🥰 You make me feel so loved!';
            } else if (percentage >= 60 && percentage < 72) {
                gameMessage.textContent = '💗 This feels amazing!';
            } else if (percentage >= 72 && percentage < 84) {
                gameMessage.textContent = '😍 Almost there, my love!';
            } else if (percentage >= 84 && percentage < 96) {
                gameMessage.textContent = '💓 So close! One more!';
            } else if (percentage >= 96 && percentage < 100) {
                gameMessage.textContent = '✨ Almost full!';
            } else if (percentage === 100) {
                setTimeout(() => {
                    gameMessage.textContent = '🎉 WOW! My heart is overflowing with love for you! 💖✨';
                    createConfetti();
                }, 300);
            }
            
            // Allow moving to next scene after 40%
            if (percentage >= 40) {
                matchesFound = 1; // Mark as complete
                updateNavigationButtons();
            }
        }
    });
}

function createFloatingHeart(element) {
    const heart = document.createElement('div');
    heart.textContent = '💕';
    heart.style.position = 'fixed';
    heart.style.fontSize = '30px';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '10000';
    
    const rect = element.getBoundingClientRect();
    heart.style.left = rect.left + rect.width / 2 + (Math.random() - 0.5) * 100 + 'px';
    heart.style.top = rect.top + rect.height / 2 + 'px';
    
    document.body.appendChild(heart);
    
    let posY = 0;
    let opacity = 1;
    
    const animate = () => {
        posY -= 3;
        opacity -= 0.02;
        heart.style.transform = `translateY(${posY}px) scale(${1 + Math.abs(posY) / 100})`;
        heart.style.opacity = opacity;
        
        if (opacity > 0) {
            requestAnimationFrame(animate);
        } else {
            heart.remove();
        }
    };
    
    animate();
}

// Scene 4: Message Bottles
function initializeScene4() {
    const bottles = document.querySelectorAll('.bottle');
    
    bottles.forEach(bottle => {
        bottle.addEventListener('click', () => {
            const message = bottle.getAttribute('data-message');
            const messageDiv = bottle.querySelector('.bottle-message');
            
            if (messageDiv.classList.contains('show')) {
                messageDiv.classList.remove('show');
            } else {
                // Hide all other messages
                document.querySelectorAll('.bottle-message').forEach(msg => {
                    msg.classList.remove('show');
                });
                
                messageDiv.textContent = message;
                messageDiv.classList.add('show');
                createHeartPop(bottle);
            }
        });
    });
}

function createHeartPop(element) {
    const hearts = ['❤️', '💕', '💖'];
    const rect = element.getBoundingClientRect();
    
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.position = 'fixed';
            heart.style.left = rect.left + rect.width / 2 + 'px';
            heart.style.top = rect.top + 'px';
            heart.style.fontSize = '20px';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '10000';
            document.body.appendChild(heart);
            
            const angle = Math.random() * Math.PI * 2;
            const velocity = 5;
            let distance = 0;
            
            const animate = () => {
                distance += velocity;
                heart.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(${1 - distance/100})`;
                heart.style.opacity = 1 - (distance / 100);
                
                if (distance < 100) {
                    requestAnimationFrame(animate);
                } else {
                    heart.remove();
                }
            };
            
            animate();
        }, i * 50);
    }
}

// Scene 5: Carousel — click card to enlarge, resume spin on close
function initializeCarousel() {
    const carousel = document.getElementById('carousel3d');
    const lightbox = document.getElementById('photoLightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');

    if (!carousel) return;

    document.querySelectorAll('.photo-card').forEach(card => {
        card.addEventListener('click', (e) => {
            e.stopPropagation();
            const img = card.querySelector('img');
            const caption = card.querySelector('.photo-caption');
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightboxCaption.textContent = caption.textContent;
            // Pause the spin
            carousel.style.animationPlayState = 'paused';
            lightbox.classList.add('open');
        });
    });
}

window.closeLightbox = function() {
    const lightbox = document.getElementById('photoLightbox');
    const carousel = document.getElementById('carousel3d');
    lightbox.classList.remove('open');
    // Resume spin
    if (carousel) carousel.style.animationPlayState = 'running';
};

// Scene 6: Birthday Cake Candles
function initializeScene6() {
    const candles = document.querySelectorAll('.candle');
    const wishMessage = document.getElementById('wishMessage');
    
    candles.forEach((candle, index) => {
        candle.addEventListener('click', () => {
            if (!candle.classList.contains('blown')) {
                candle.classList.add('blown');
                candlesBlown++;
                createSmokeEffect(candle);
                
                if (candlesBlown === candles.length) {
                    setTimeout(() => {
                        wishMessage.textContent = '🎉 All wishes for you to come true, my love! 🎉';
                        updateNavigationButtons();
                        createConfetti();
                    }, 500);
                }
            }
        });
    });
}

function createSmokeEffect(candle) {
    const rect = candle.getBoundingClientRect();
    
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            const smoke = document.createElement('div');
            smoke.textContent = '💨';
            smoke.style.position = 'fixed';
            smoke.style.left = rect.left + rect.width / 2 + 'px';
            smoke.style.top = rect.top + 'px';
            smoke.style.fontSize = '20px';
            smoke.style.pointerEvents = 'none';
            smoke.style.zIndex = '10000';
            document.body.appendChild(smoke);
            
            let posY = 0;
            let opacity = 1;
            
            const animate = () => {
                posY -= 2;
                opacity -= 0.02;
                smoke.style.transform = `translateY(${posY}px) scale(${1 + Math.abs(posY) / 50})`;
                smoke.style.opacity = opacity;
                
                if (opacity > 0) {
                    requestAnimationFrame(animate);
                } else {
                    smoke.remove();
                }
            };
            
            animate();
        }, i * 100);
    }
}

// Scene 8: Love Letter
function initializeScene8() {
    const envelope = document.getElementById('envelope');
    const letterPaper = document.getElementById('letterPaper');
    const letterInstruction = document.getElementById('letterInstruction');
    
    if (envelope && letterPaper) {
        envelope.addEventListener('click', () => {
            envelope.classList.add('open');
            setTimeout(() => {
                letterPaper.classList.add('show');
                letterInstruction.style.display = 'none';
                createHeartRain();
            }, 800);
        });
    }
}

function createHeartRain() {
    const hearts = ['❤️', '💕', '💖', '💗', '💓'];
    
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.position = 'fixed';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.top = '-50px';
            heart.style.fontSize = Math.random() * 20 + 15 + 'px';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '10000';
            document.body.appendChild(heart);
            
            let posY = -50;
            let rotation = 0;
            
            const animate = () => {
                posY += 5;
                rotation += 5;
                heart.style.transform = `translateY(${posY}px) rotate(${rotation}deg)`;
                
                if (posY < window.innerHeight) {
                    requestAnimationFrame(animate);
                } else {
                    heart.remove();
                }
            };
            
            animate();
        }, i * 100);
    }
}

// Scene 9: Final Gift
function initializeScene9() {
    const giftBox = document.getElementById('giftBox');
    const surpriseMessage = document.getElementById('surpriseMessage');
    
    if (giftBox && surpriseMessage) {
        giftBox.addEventListener('click', () => {
            giftBox.classList.add('opened');
            setTimeout(() => {
                surpriseMessage.classList.add('show');
                createMassiveConfetti();
                createFireworks();
            }, 800);
        });
    }
}

function createConfetti() {
    const colors = ['#ff6b9d', '#feca57', '#ff9ff3', '#a8e6cf', '#764ba2'];
    const confettiContainer = document.getElementById('confettiContainer') || document.body;
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti-piece';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 0.5 + 's';
            confetti.style.animationDuration = Math.random() * 2 + 2 + 's';
            confettiContainer.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 3000);
        }, i * 30);
    }
}

function createMassiveConfetti() {
    const colors = ['#ff6b9d', '#feca57', '#ff9ff3', '#a8e6cf', '#764ba2'];
    
    for (let i = 0; i < 150; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti-piece';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.width = Math.random() * 10 + 5 + 'px';
            confetti.style.height = Math.random() * 10 + 5 + 'px';
            confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 5000);
        }, i * 20);
    }
}

function createFireworks() {
    const colors = ['#ff6b9d', '#feca57', '#ff9ff3', '#a8e6cf', '#764ba2'];
    
    for (let burst = 0; burst < 5; burst++) {
        setTimeout(() => {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight / 2;
            
            for (let i = 0; i < 30; i++) {
                const particle = document.createElement('div');
                particle.textContent = '✨';
                particle.style.position = 'fixed';
                particle.style.left = x + 'px';
                particle.style.top = y + 'px';
                particle.style.fontSize = '20px';
                particle.style.pointerEvents = 'none';
                particle.style.zIndex = '10000';
                particle.style.color = colors[Math.floor(Math.random() * colors.length)];
                document.body.appendChild(particle);
                
                const angle = (Math.PI * 2 * i) / 30;
                const velocity = Math.random() * 5 + 5;
                let distance = 0;
                
                const animate = () => {
                    distance += velocity;
                    particle.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(${1 - distance/200})`;
                    particle.style.opacity = 1 - (distance / 200);
                    
                    if (distance < 200) {
                        requestAnimationFrame(animate);
                    } else {
                        particle.remove();
                    }
                };
                
                animate();
            }
        }, burst * 1000);
    }
}

// Add letter index assignment for animation delays
document.addEventListener('DOMContentLoaded', () => {
    const animatedSpans = document.querySelectorAll('.animated-name span, .name-siddhi span');
    animatedSpans.forEach((span, index) => {
        span.style.setProperty('--i', index);
    });
});
