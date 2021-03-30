var worker, databox;
function initiate() {
  databox = document.getElementById("databox");
  var button = document.getElementById("button");
  button.addEventListener("click", send);

  worker = new Worker("worker06.js");
  worker.addEventListener("error", error);
}
function send() {
  var name = document.getElementById("name").value;
  worker.postMessage(name);
}
function error(event) {
  databox.innerHTML = "ERROR: " + event.message + "<br>";
  databox.innerHTML += "Filename: " + event.filename + "<br>";
  databox.innerHTML += "Line Number: " + event.lineno;
}
window.addEventListener("load", initiate);
