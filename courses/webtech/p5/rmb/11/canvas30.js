var canvas;
function initiate() {
  var element = document.getElementById("canvas");
  canvas = element.getContext("2d");
  window.addEventListener("mousemove", animation);
}
function animation(event) {
  canvas.clearRect(0, 0, 500, 300);

  var xmouse = event.clientX;
  var ymouse = event.clientY;
  var xcenter = 220;
  var ycenter = 150;
  var ang = Math.atan2(xmouse - xcenter, ymouse - ycenter);
  // console.log(ang);
  var x = xcenter + Math.round(Math.sin(ang) * 10);
  var y = ycenter + Math.round(Math.cos(ang) * 10);

  canvas.beginPath();
  canvas.arc(xcenter, ycenter, 20, 0, Math.PI * 2, false);
  canvas.moveTo(xcenter + 70, 150);
  canvas.arc(xcenter + 50, 150, 20, 0, Math.PI * 2, false);
  canvas.stroke();

  canvas.beginPath();
  canvas.moveTo(x + 10, y);
  canvas.arc(x, y, 10, 0, Math.PI * 2, false);
  canvas.moveTo(x + 60, y);
  canvas.arc(x + 50, y, 10, 0, Math.PI * 2, false);
  canvas.fill();
}
window.addEventListener("load", initiate);
