function initiate() {
  var element = document.getElementById("canvas");
  var canvas = element.getContext("2d");

  canvas.shadowColor = "rgba(0, 0, 0, 0.5)";
  canvas.shadowOffsetX = 4;
  canvas.shadowOffsetY = 4;
  canvas.shadowBlur = 5;

  canvas.font = "bold 50px verdana, sans-serif";
  canvas.fillText("My message", 100, 100);
}
window.addEventListener("load", initiate);
