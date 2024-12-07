let score = 0;
let cross = true;
let audioPlayed = false;

const audio = new Audio('Defaulter - R Nait, Gurlej Akhtar 128 Kbps.mp3');
const audiogo = new Audio('gameover.mp3');

setTimeout(() => {
    audio.play();
}, 1000);

document.addEventListener('keydown', function(event) {
    const dino = document.querySelector('.dino');
    
    if (!dino) {
        console.warn("Dino element not found in the DOM.");
        return;
    }

    if (event.key === 'm' || event.key === 'M') {
        if (!audioPlayed) {
            audio.play();
            audioPlayed = true;
        }
    }
    if (event.key === 's' || event.key === 'S') {
        if (audioPlayed) {
            audio.pause();
            audioPlayed = false;
        }
    }

    if (event.key === 'ArrowUp') {
        dino.classList.add('animateDino');
        setTimeout(() => {
            dino.classList.remove('animateDino');
        }, 1200);
    }

    if (event.key === 'ArrowRight') {
        const dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = (dinoX + 112) + "px";
    }

    if (event.key === 'ArrowLeft') {
        const dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = (dinoX - 112) + "px";
    }
});

setInterval(() => {
    const dino = document.querySelector('.dino');
    const gameOver = document.querySelector('.gameOver');
    const obstacle = document.querySelector('.obstacle');

    if (!dino || !gameOver || !obstacle) {
        console.warn("Required elements not found in the DOM.");
        return;
    }

    const dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    const dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));

    const ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    const oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    const offsetX = Math.abs(dx - ox);
    const offsetY = Math.abs(dy - oy);

    if (offsetX < 93 && offsetY < 52) {
        score -= 1;
        if (score < 0) {
            score = 0;
        }
        updateScore(score);
        gameOver.innerHTML = "RELOAD TO PLAY AGAIN ";
        obstacle.classList.remove('obstacleAni');
        audiogo.play();
        audio.pause();
        setTimeout(() => {
            audiogo.pause();
        }, 1000);
    } else if (cross && offsetX < 145) {
        score += 1;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
        setTimeout(() => {
            let aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            if (aniDur > 0.5) {
                let newDur = aniDur - 0.1;
                obstacle.style.animationDuration = newDur + 's';
            }
        }, 500);
    }
}, 100);

function updateScore(score) {
    const scoreCont = document.querySelector('.scoreCont'); 
    if (scoreCont) {
        scoreCont.innerHTML = "YOUR SCORE: " + score;
    } else {
        console.warn("Score container element not found.");
    }
}
