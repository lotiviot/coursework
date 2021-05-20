function initiate() {
  var element = document.getElementById("canvas");
  var canvas = element.getContext("2d");

  canvas.fillStyle = "#666666";
  canvas.fillRect(100, 100, 200, 80);

  canvas.globalCompositeOperation = "source-atop";

  canvas.fillStyle = "#DDDDDD";
  canvas.font = "bold 60px verdana, sans-serif";
  canvas.textAlign = "center";
  canvas.textBaseline = "middle";  // top
  canvas.fillText("TEST", 200, 100);
}
window.addEventListener("load", initiate);
