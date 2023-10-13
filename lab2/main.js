document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".slide");
  const prevButton = document.getElementById("prev-slide");
  const nextButton = document.getElementById("next-slide");
  const dots = document.querySelectorAll("[data-slide]");
  let currentSlideIndex = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.style.display = i === index ? "block" : "none";
    });
  }

  function updateDots(index) {
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
  }

  function goToSlide(index) {
    currentSlideIndex = index;
    showSlide(currentSlideIndex);
    updateDots(currentSlideIndex);
  }

  function nextSlide() {
    if (currentSlideIndex < slides.length - 1) {
      currentSlideIndex++;
    } else {
      currentSlideIndex = 0;
    }
    goToSlide(currentSlideIndex);
  }

  function prevSlide() {
    if (currentSlideIndex > 0) {
      currentSlideIndex--;
    } else {
      currentSlideIndex = slides.length - 1;
    }
    goToSlide(currentSlideIndex);
  }

  prevButton.addEventListener("click", prevSlide);
  nextButton.addEventListener("click", nextSlide);

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      goToSlide(index);
    });
  });

  // Automatycznie rozpocznij od pierwszego slajdu
  goToSlide(0);

  // Możesz dodać tutaj obsługę pauzowania/wznowienia, efekty kenburns itp.
});
