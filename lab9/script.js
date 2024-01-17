const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");

const particles = [];
const numParticles = 10;
const minDistance = 50;
const repulsionForce = 2;
const attractionForce = 0.06;
const initialVelocityMultiplier = 0.1;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function Particle(x, y, radius) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.velocity = {
    x: (Math.random() * 10 - 1) * initialVelocityMultiplier,
    y: (Math.random() * 10 - 1) * initialVelocityMultiplier,
  };
}

function start() {
  for (let i = 0; i < numParticles; i++) {
    particles.push(
      new Particle(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        10
      )
    );
  }
  animate();
}

function reset() {
  particles.length = 0;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle) => {
    particle.x += particle.velocity.x;
    particle.y += particle.velocity.y;

    // Odbijanie się od ścianek
    if (
      particle.x - particle.radius < 0 ||
      particle.x + particle.radius > canvas.width
    ) {
      particle.velocity.x *= -0.1;
    }
    if (
      particle.y - particle.radius < 0 ||
      particle.y + particle.radius > canvas.height
    ) {
      particle.velocity.y *= -0.1;
    }

    // Przyciąganie
    const dx = mouseX - particle.x;
    const dy = mouseY - particle.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > 1) {
      const accelerationX = (dx / distance) * attractionForce;
      const accelerationY = (dy / distance) * attractionForce;

      particle.velocity.x += accelerationX;
      particle.velocity.y += accelerationY;
    }

    // Rysowanie kuleczek
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  });

  // Linie między kulkami
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < minDistance) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
        ctx.closePath();
      }
    }
  }

  requestAnimationFrame(animate);
}

let mouseX, mouseY;

canvas.addEventListener("mousemove", (e) => {
  mouseX = e.clientX - canvas.getBoundingClientRect().left;
  mouseY = e.clientY - canvas.getBoundingClientRect().top;
});

canvas.addEventListener("click", (e) => {
  particles.forEach((particle, index) => {
    const dx = particle.x - mouseX;
    const dy = particle.y - mouseY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < particle.radius) {
      // Usuwanie i mnożenie kuleczek
      particles.splice(index, 1);
      particles.push(new Particle(particle.x, particle.y, 5));
      particles.push(new Particle(particle.x, particle.y, 5));
    }
  });
});

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
