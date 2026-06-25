const images = [
  "https://via.placeholder.com/600x350/3498db",
  "https://via.placeholder.com/600x350/e74c3c",
  "https://via.placeholder.com/600x350/2ecc71"
];

let index = 0;

function showImage() {
  document.getElementById("carousel-img").src = images[index];
}

function nextSlide() {
  index = (index + 1) % images.length;
  showImage();
}

function prevSlide() {
  index = (index - 1 + images.length) % images.length;
  showImage();
}
