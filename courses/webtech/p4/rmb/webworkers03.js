var worker, databox;
function initiate() {
  databox = document.getElementById("databox");
  var button = document.getElementById("button");
  button.addEventListener("click", send);
  worker = new Worker("worker04.js");
  worker.addEventListener("message", received);
}
function send() {
  var name = document.getElementById("name").value;
  worker.postMessage(name);
}
function received(event) {
  databox.innerHTML = event.data;
}
window.addEventListener("load", initiate);
