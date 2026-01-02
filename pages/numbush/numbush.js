const start = document.getElementById('startButton')
const button = document.getElementById('clickButton')
const scorePoint = document.getElementById('score')
const infoGame = document.getElementById('infoGame')
const resetBtn = document.getElementById('resetButton')

let score = 0;
let timer = 20;

infoGame.classList.add('hidden')
button.classList.add('hidden')

function startGame() {
    infoGame.classList.remove('hidden');
    button.classList.remove('hidden');
    start.classList.add('hidden');

    const countDown = setInterval(() => {
            if (timer > 0) {
                timer--;
                document.getElementById('timer').textContent = `Time: ${timer}`;
            } else if (score >= 110) {
                clearInterval(countDown);
                button.classList.add('hidden');
                infoGame.innerHTML =`<h2>You Win!</h2>
                <p>Your final score is: ${score}</p>`;
                resetBtn.classList.remove('hidden')
            } else {
                clearInterval(countDown);
                button.classList.add('hidden');
                infoGame.innerHTML = `<h2>Game Over!</h2>
                <p>Your final score is: ${score}</p>`;
                resetBtn.classList.remove('hidden')
            };
        }, 1000); 
};

button.addEventListener('click', () => {
    score++;
    scorePoint.textContent = `Score: ${score}`;
});

start.addEventListener('click', startGame);
resetBtn.addEventListener('click', startGame);