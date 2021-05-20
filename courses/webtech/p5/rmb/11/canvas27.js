var canvas, image;
function initiate() {
  var element = document.getElementById("canvas");
  canvas = element.getContext("2d");

  image = document.createElement("img");
  image.crossOrigin = "anonymous";
  image.src = "http://www.formasterminds.com/content/snow.jpg";
  image.addEventListener("load", modimage);
}
function modimage() {
  canvas.drawImage(image, 0, 0);
  var info = canvas.getImageData(0, 0, 175, 262);
  var pos;
  for (var x = 0; x < 175; x++) {
    for (var y = 0; y < 262; y++) {
      pos = (info.width * 4 * y) + (x * 4);
      info.data[pos]   = 255 - info.data[pos];
      info.data[pos+1] = 255 - info.data[pos+1];
      info.data[pos+2] = 255 - info.data[pos+2];
    }
  }
  canvas.putImageData(info, 0, 0);
}
window.addEventListener("load", initiate);
