function initiate() {
  var element = document.getElementById("canvas");
  var canvas = element.getContext("2d");

  canvas.beginPath();
  // here goes the path
  canvas.stroke();
}
window.addEventListener("load", initiate);
