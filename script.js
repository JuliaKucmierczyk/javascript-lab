let a = document.querySelector("#liczba1");
let b = document.querySelector("#liczba2");
let c = document.querySelector("#liczba3");
let d = document.querySelector("#liczba4");
// const formGroup = document.querySelectorAll("input");
const btnPrzelicz = document.querySelector("#przelicz");
const wynik = document.querySelector("#wynik");

// a.addEventListener("input", () => {});
// b.addEventListener("input", () => {});
// c.addEventListener("input", () => {});
// d.addEventListener("input", () => {});

// WERSJA ZIEW
let suma = 0;
let srednia = 0;
let max = 0;
let min = 0;
wynik.innerHTML =
  "Suma: " + suma + " Średnia: " + srednia + " Max: " + max + " Min: " + min;
btnPrzelicz.addEventListener("click", () => {
  // Suma
  let suma =
    parseInt(a.value) +
    parseInt(b.value) +
    parseInt(c.value) +
    parseInt(d.value);

  // Średnia
  const srednia = suma / 4;

  // Max
  const max = Math.max(a.value, b.value, c.value, d.value);

  // Min
  const min = Math.min(a.value, b.value, c.value, d.value);

  wynik.innerHTML =
    "Suma: " + suma + " Średnia: " + srednia + " Max: " + max + " Min: " + min;
});
