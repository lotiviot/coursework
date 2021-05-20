function initiate() {
  var element = document.getElementById("canvas");
  var canvas = element.getContext("2d");

  canvas.beginPath();
  canvas.arc(100, 100, 50, 0, Math.PI * 2, false);
  canvas.stroke();
}
window.addEventListener("load", initiate);
