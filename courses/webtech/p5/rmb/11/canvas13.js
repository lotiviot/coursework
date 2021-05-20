function initiate() {
  var element = document.getElementById("canvas");
  var canvas = element.getContext("2d");

  canvas.beginPath();
  canvas.moveTo(50, 50);
  canvas.quadraticCurveTo(100, 125, 50, 200);

  canvas.moveTo(250, 50);
  canvas.bezierCurveTo(200, 125, 300, 125, 250, 200);
  canvas.stroke();
}
window.addEventListener("load", initiate);
