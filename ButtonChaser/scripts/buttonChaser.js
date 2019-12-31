(function () {
    const gameArea = document.querySelector('#gameArea');
    const dot = document.querySelector('#dot');
    const scoreLabel = document.querySelector('#scoreLabel');
    const gameTimer = document.querySelector('#gameTimer');
    const resetButton = document.querySelector('#reset');
    const defaultDuration = 15;

    var score = 0;
    var aWidth;
    var aHeight;
    var timer;
    var decrementTimer;
    var firstHit = true;
    var duration = defaultDuration;

    window.addEventListener('load', setGameAreaBounds);
    window.addEventListener('resize', resetGame)

    function setGameAreaBounds() {
        aWidth = innerWidth;
        aHeight = innerHeight;
        aWidth -= 22;
        aHeight -= 97;
        gameArea.style.width = aWidth + 'px';
        gameArea.style.height = aHeight + 'px';
        dot.addEventListener('click', detectHit);
        resetButton.addEventListener('click', resetGame)
        aWidth -= 74;
        aHeight -= 74;
        gameTimer.textContent = "Time Left: " + duration;
        resetButton.style.display = "none";
        //moveDot();
    }

    function resetGame() {
        endGame();
        duration = defaultDuration;
        score = 0;
        scoreLabel.textContent = "Score: " + score;
        firstHit = true;
        setGameAreaBounds();
    }

    function detectHit() {
        if(firstHit) {
            timer = setTimeout(endGame, duration * 1000);
            decrementTimer = setInterval(decrementGameTime, 1000);
            firstHit = false;
            resetButton.style.display = "inline";
        }
        score += 1;
        scoreLabel.textContent = "Score: " + score;
        moveDot();
    }

    function decrementGameTime() {
        gameTimer.textContent = "Time Left: " + --duration;
    }

    function endGame() {
        scoreLabel.textContent += "\tGame Over!";
        dot.removeEventListener("click", detectHit);
        gameTimer.textContent = "Time Left: 0";
        clearInterval(decrementTimer);
        clearTimeout(timer);
    }

    function moveDot() {
        var x = Math.floor(Math.random() * aWidth);
        var y = Math.floor(Math.random() * aHeight);
        if(x < 10) {
            x = 10;
        }
        if(y < 10) {
            y = 10;
        }
        dot.style.left = x + 'px';
        dot.style.top = y + 'px';
    }

})();