function initiate() {
  var element = document.getElementById("canvas");
  var canvas = element.getContext("2d");

  var image = document.createElement("img");
  image.src = "snow.jpg";
  image.addEventListener("load", function() {
    canvas.drawImage(image, 135, 30, 50, 50, 0, 0, 300, 300);
  });
}
window.addEventListener("load", initiate);
