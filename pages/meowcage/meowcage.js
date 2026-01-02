  
  
  //INI FULL 80% DARI AI YANG MENJADI CONTOH ACUAN TAPI TIDAK BISA MASUK KEPALA
  
  
  const gameBoard = document.getElementById('gameBoard');
  const lifePoints = document.getElementById('lifePoint');
  const startBtn = document.getElementById('startButton');
  const cardContainer = document.getElementById('cardContainer');
  const timerEl = document.getElementById('timer');
  const gameOverEl = document.getElementById('gameOver');

  let cards = Array.from(cardContainer.querySelectorAll('.card'));
  let points = 3;
  let timeLeft = 3;             
  let flippedCards = [];
  let canFlip = false;           
  let countDownId = null;

  cardContainer.classList.add('hidden');
  timerEl.classList.add('hidden');
  gameBoard.classList.remove('hidden'); 
  gameOverEl.textContent = '';

  //semua kartu tertutup saat awal
  cards.forEach(card => card.classList.remove('flipped', 'matched'));

  function updateLives() {
    const hearts = Array.from(lifePoints.querySelectorAll('.heart'));
    hearts.forEach((h, i) => {
      h.style.visibility = i < points ? 'visible' : 'hidden';
    });
  }

  function shuffleBoard() {
    // shuffle array card DOM elements
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }

    // render ulang urutan ke DOM
    cardContainer.innerHTML = '';
    cards.forEach(card => {
      // reset state kartu setiap start
      card.classList.remove('flipped', 'matched');
      cardContainer.appendChild(card);
    });
  }

  function endGame(message) {
    clearInterval(countDownId);
    countDownId = null;
    canFlip = false;
    gameOverEl.textContent = message;
    startBtn.classList.remove('hidden');
    startBtn.textContent = 'Restart';
  }

  function startGame() {

    points = 3;
    timeLeft = 3;
    flippedCards = [];
    canFlip = false;
    gameOverEl.textContent = '';
    updateLives();


    cardContainer.classList.remove('hidden');
    timerEl.classList.remove('hidden');
    startBtn.classList.add('hidden');

    shuffleBoard();

    // tampilkan timer awal
    timerEl.textContent = `Timer: ${timeLeft}`;

    // countdown sebelum boleh flip
    clearInterval(countDownId);
    countDownId = setInterval(() => {
      timeLeft--;
      timerEl.textContent = `Timer: ${timeLeft}`;

      if (timeLeft <= 0) {
        clearInterval(countDownId);
        countDownId = null;
        timerEl.classList.add('hidden');
        canFlip = true;
      }
    }, 800);
  }

  function checkForMatch() {
    const [a, b] = flippedCards;
    const isMatch = a.dataset.paw === b.dataset.paw;

    if (isMatch) {
      a.classList.add('matched');
      b.classList.add('matched');
      flippedCards = [];
      canFlip = true;

      const matchedCount = cards.filter(c => c.classList.contains('matched')).length;
      if (matchedCount === cards.length) {
        endGame('You Win!');
      }
      return;
    }

    points--;
    updateLives();

    setTimeout(() => {
      a.classList.remove('flipped');
      b.classList.remove('flipped');
      flippedCards = [];
      canFlip = true;

      if (points <= 0) {
        endGame('Game Over');
      }
    }, 1000);
  }

  cardContainer.addEventListener('click', (e) => {
    const card = e.target.closest('.card');
    if (!card) return;

    if (!canFlip) return;
    if (card.classList.contains('flipped')) return;
    if (card.classList.contains('matched')) return;

    card.classList.add('flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
      canFlip = false;
      checkForMatch();
    }
  });

  startBtn.addEventListener('click', startGame);
