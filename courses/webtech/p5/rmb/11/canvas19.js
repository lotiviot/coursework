function initiate() {
  var element = document.getElementById("canvas");
  var canvas = element.getContext("2d");

  canvas.transform(3, 0, 0, 1, 0, 0);
  canvas.font = "bold 20px verdana, sans-serif";
  canvas.fillText("TEST", 20, 20);

  canvas.transform(1, 0, 0, 10, 0, 0);
  canvas.font = "bold 20px verdana, sans-serif";
  canvas.fillText("TEST", 20, 20);
}
window.addEventListener("load", initiate);
