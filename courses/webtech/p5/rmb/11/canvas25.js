var canvas, image;
function initiate() {
  var element = document.getElementById("canvas");
  canvas = element.getContext("2d");
  image = document.createElement("img");
  image.src = "bricks.jpg";
  image.addEventListener("load", modimage);
}
function modimage() {
  var pattern = canvas.createPattern(image, "repeat");
  canvas.fillStyle = pattern;
  canvas.fillRect(0, 0, 500, 300);
}
window.addEventListener("load", initiate);
