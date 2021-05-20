function initiate() {
  var element = document.getElementById("canvas");
  var canvas = element.getContext("2d");

  canvas.font = "bold 24px verdana, sans-serif";
  canvas.textAlign = "start";
  canvas.textBaseline = "bottom";
  canvas.fillText("My message", 100, 124);

  var size = canvas.measureText("My message");
  canvas.strokeRect(100, 100, size.width, 24);
}
window.addEventListener("load", initiate);
