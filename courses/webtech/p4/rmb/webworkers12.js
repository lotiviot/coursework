var worker;
function initiate() {
  var button = document.getElementById("button");
  button.addEventListener("click", send);
  worker = new SharedWorker("worker14.js");  // shared with iframe
  worker.port.addEventListener("message", received);
  worker.port.start();
}
function received(event) {
  alert(event.data);
}
function send() {
  var name = document.getElementById("name").value;
  worker.port.postMessage(name);
}
window.addEventListener("load", initiate);
