const start = document.getElementById('startButton')
const button = document.getElementById('clickButton')
const scorePoint = document.getElementById('score')
const infoGame = document.getElementById('infoGame')

let score = 0;
let timer = 20;

infoGame.classList.add('hidden')
button.classList.add('hidden')

start.addEventListener('click', () => {
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
            } else {
                clearInterval(countDown);
                button.classList.add('hidden');
                infoGame.innerHTML = `<h2>Game Over!</h2>
                <p>Your final score is: ${score}</p>`;
            };
        }, 1000);
});

button.addEventListener('click', () => {
    score++;
    scorePoint.textContent = `Score: ${score}`;
});