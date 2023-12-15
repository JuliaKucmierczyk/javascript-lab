const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
document.body.appendChild(canvas);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 100;
const maxSpeed = 2;
const minDistance = 100;

class Particle {
  constructor(x, y, speedX, speedY) {
    this.x = x;
    this.y = y;
    this.speedX = speedX;
    this.speedY = speedY;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x <= 0 || this.x >= canvas.width) {
      this.speedX *= -1;
    }

    if (this.y <= 0 || this.y >= canvas.height) {
      this.speedY *= -1;
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
    ctx.fillStyle = "black";
    ctx.fill();
  }
}

function createParticles() {
  for (let i = 0; i < particleCount; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const speedX = (Math.random() - 0.5) * maxSpeed;
    const speedY = (Math.random() - 0.5) * maxSpeed;
    particles.push(new Particle(x, y, speedX, speedY));
  }
}

function updateParticles() {
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
  }
}

function drawParticles() {
  for (let i = 0; i < particles.length; i++) {
    particles[i].draw();
  }
}

function drawLines() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < minDistance) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = "grey";
        ctx.stroke();
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  updateParticles();
  drawLines();
  drawParticles();
  requestAnimationFrame(animate);
}

createParticles();
animate();

const startButton = document.createElement("button");
startButton.textContent = "Start";
startButton.addEventListener("click", animate);
document.body.appendChild(startButton);

const resetButton = document.createElement("button");
resetButton.textContent = "Reset";
resetButton.addEventListener("click", () => {
  particles.length = 0;
  createParticles();
});
document.body.appendChild(resetButton);
