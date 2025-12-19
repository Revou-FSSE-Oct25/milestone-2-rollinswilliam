        const gameBoard = document.getElementById('gameBoard');
        const lifePoints = document.getElementById('lifePoint');

        const cards = Array.from(gameBoard.querySelectorAll('.card'));
        const arrayCard = [...cards];
        let points = 3;
        let timer = 2

//shuffle
        function shuffleBoard() {
            for (let i = cards.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [cards[i], cards[j]] = [cards[j], cards[i]];
            }
            gameBoard.innerHTML = ''; //kosongkan isi game board
            cards.forEach(card => gameBoard.appendChild(card));
        }

        // const countDown = setInterval(() => {
        //     if (timer > 0) {
        //         timer--;
        //         document.getElementById('timer').textContent = `Time: ${timer}`;
        //     }
        // }

        shuffleBoard();


//MOHON MAAF HANYA SEGINI KAK ANOO!!
