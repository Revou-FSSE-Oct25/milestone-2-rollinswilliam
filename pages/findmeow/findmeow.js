  const start = document.getElementById('startButton');
  const infoGame = document.getElementById('infoGame');
  const input = document.getElementById('guessNumber');
  const msg = document.getElementById('msg');
  const left = document.getElementById('left');
  const submitBtn = document.getElementById('submitBtn');
  const resetBtn = document.getElementById('resetBtn');

  let answer = 0;
  let tries = 0;

  infoGame.classList.add('hidden');

  function startGame() {
    answer = Math.floor(Math.random() * 100) + 1;
    tries = 5;

    infoGame.classList.remove('hidden');
    start.classList.add('hidden')
    msg.textContent = 'Start guessing meow!';
    left.textContent = `Attempts left: ${tries}`;

    input.value = '';
    input.disabled = false;
    submitBtn.disabled = false;
    input.focus();
  }

  function handleGuess() {
    const n = Number(input.value);
    if (!Number.isInteger(n) || n < 1 || n > 100) {
      msg.textContent = 'Enter a number 1 - 100.';
      return;
    }

    tries--;
    left.textContent = `Attempts left: ${tries}`;

    if (n === answer) {
    msg.textContent = 'MEOOWWWWW!!!';
    submitBtn.disabled = true;
    } else if (n > answer) {
        msg.textContent = 'Too high';
    } else {
        msg.textContent = 'Too low';
    }

    if (tries === 0) {
      msg.textContent = `Game Over! Answer: ${answer}`;
      submitBtn.disabled = true;
      input.disabled = true;
      return;
    }

    input.select();
  }

start.addEventListener('click', startGame);
submitBtn.addEventListener('click', handleGuess);
input.addEventListener('keydown', (e) => {
if (e.key === 'Enter') submitBtn.click();
}); //Untuk tombol enter hehew
resetBtn.addEventListener('click', startGame);
