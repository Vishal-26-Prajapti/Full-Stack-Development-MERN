// header

const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

// section-1

const slider = document.getElementById("slider");
const next = document.querySelector(".arrow-right");
const prev = document.querySelector(".arrow-left");

const images = [
  "./slider-image/slider-image-1.png",
  "./slider-image/slider-image-2.png",
  "./slider-image/slider-image-3.png",
  "./slider-image/slider-image-4.png",
  "./slider-image/slider-image-5.png",
];

let index = 0;

next.addEventListener("click", () => {
  index++;
  if (index >= images.length) {
    index = 0;
  }
  slider.src = images[index];
});

prev.addEventListener("click", () => {
  index--;
  if (index < 0) {
    index = images.length - 1;
  }
  slider.src = images[index];
});

setInterval(() => {
  index++;
  if (index >= images.length) {
    index = 0;
  }
  slider.src = images[index];
}, 4000);