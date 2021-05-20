function initiate() {
  var element = document.getElementById("canvas");
  var canvas = element.getContext("2d");

  canvas.fillStyle = "#000099";
  canvas.strokeStyle = "#990000";

  canvas.strokeRect(100, 100, 120, 120);
  canvas.fillRect(110, 110, 100, 100);
  canvas.clearRect(120, 120, 80, 80);
}
window.addEventListener("load", initiate);
