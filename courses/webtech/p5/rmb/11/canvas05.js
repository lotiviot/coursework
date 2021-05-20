function initiate() {
  var element = document.getElementById("canvas");
  var canvas = element.getContext("2d");

  var gradient = canvas.createLinearGradient(0, 0, 10, 100);
  gradient.addColorStop(0.5, "#00AAFF");
  gradient.addColorStop(1, "#000000");
  canvas.fillStyle = gradient;

  canvas.fillRect(10, 10, 100, 100);
  canvas.fillRect(150, 10, 200, 100);
}
window.addEventListener("load", initiate);
