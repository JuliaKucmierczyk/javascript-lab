document.addEventListener("DOMContentLoaded", () => {
  const ball = document.querySelector(".ball");
  const hole = document.querySelector(".hole");
  const timerSpan = document.querySelector("#time");

  let timer = 0;
  let score = 0;

  window.addEventListener("deviceorientation", handleOrientation);

  function handleOrientation(event) {
    const beta = event.beta * 2;
    const gamma = event.gamma * 2;

    const newX = (gamma / 90) * 150;
    const newY = (beta / 90) * 150;

    ball.style.transform = `translate(-50%, -50%) translate(${newX}px, ${newY}px)`;

    checkCollision();
  }

  function checkCollision() {
    const ballRect = ball.getBoundingClientRect();
    const holeRect = hole.getBoundingClientRect();

    if (
      ballRect.top >= holeRect.top &&
      ballRect.bottom <= holeRect.bottom &&
      ballRect.left >= holeRect.left &&
      ballRect.right <= holeRect.right
    ) {
      score++;
      resetGame();
    }
  }

  function resetGame() {
    placeHoleRandomly();

    document.querySelector("#points").innerText = score;

    ball.style.transform = "translate(-50%, -50%) translate(0, 0)";
  }

  function placeHoleRandomly() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const holeSize = 50;
    const maxX = windowWidth - holeSize;
    const maxY = windowHeight - holeSize;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    hole.style.left = `${randomX}px`;
    hole.style.top = `${randomY}px`;
  }

  setInterval(() => {
    timer++;
    timerSpan.innerText = `${timer}s`;

    if (timer === 60) {
      alert(`Game Over! Your score is ${score}`);
      timer = 0;
      resetGame();
    }
  }, 1000);

  placeHoleRandomly();
});
