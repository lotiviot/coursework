function initiate() {
  var element = document.getElementById("canvas");
  var canvas = element.getContext("2d");

  var radians = Math.PI / 180 * 45;

  canvas.beginPath();
  canvas.arc(100, 100, 50, 0, radians, false);
  canvas.stroke();
}
window.addEventListener("load", initiate);
