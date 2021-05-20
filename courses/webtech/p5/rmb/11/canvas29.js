function initiate() {
  var element = document.getElementById("canvas");
  var width = element.width;
  var height = element.height;
  element.addEventListener("click", copyImage);

  var canvas = element.getContext("2d");
  canvas.beginPath();
  canvas.arc(width / 2, height / 2, 150, 0, Math.PI * 2, false);
  canvas.clip();

  var image = document.createElement("img");
  image.src = "snow.jpg";
  image.addEventListener("load", function() {
    canvas.drawImage(image, 0, 0, width, height);
  });
}
function copyImage() {
  var element = document.getElementById("canvas");
  var data = element.toDataURL();

  var databox = document.getElementById("databox");
  databox.innerHTML = '<img src="' + data + '">';
}
window.addEventListener("load", initiate);
