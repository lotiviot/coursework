function initiate() {
  var element = document.getElementById("canvas");
  var canvas = element.getContext("2d");

  canvas.save();
  canvas.translate(50, 70);
  canvas.font = "bold 20px verdana, sans-serif";
  canvas.fillText("TEST1", 0, 30);
  canvas.restore();
  canvas.fillText("TEST2", 0, 30);
}
window.addEventListener("load", initiate);
