const leftArrow = document.querySelector(".previous");
const rightArrow = document.querySelector(".next");
const slider = document.querySelector(".slider");
const images = [...document.querySelectorAll(".slide")];
const dots = [...document.querySelectorAll(".dot")];

let currentImage = 0;
let paused = false;

leftArrow.addEventListener("click", () => moveLeft());
rightArrow.addEventListener("click", () => moveRight());

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    currentImage = index;
    updateSlides();
    updateDots();
  });
});

slider.addEventListener("mouseenter", () => (paused = true));
slider.addEventListener("mouseleave", () => (paused = false));

function moveRight() {
  currentImage++;
  if (currentImage > images.length - 1) {
    currentImage = 0;
  }
  for (let i = 0; i < images.length; i++) {
    images[i].style.transform = `translateX(${currentImage * -100}%)`;
  }
  updateSlides();
  updateDots();
}

function moveLeft() {
  currentImage--;
  if (currentImage < 0) {
    currentImage = images.length - 1;
  }
  for (let i = 0; i < images.length; i++) {
    images[i].style.transform = `translateX(${currentImage * -100}%)`;
  }
  updateSlides();
  updateDots();
}

function updateSlides() {
  for (let i = 0; i < images.length; i++) {
    images[i].style.transform = `translateX(${currentImage * -100}%)`;
  }
}

function updateDots() {
  dots.forEach((dot) => dot.classList.remove("active"));
  dots[currentImage].classList.add("active");
}

setInterval(() => !paused && moveRight(), 4000);
