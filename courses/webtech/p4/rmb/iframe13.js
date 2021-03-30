function initiate() {
  var worker = new SharedWorker("worker14.js");  // shared with main window
  worker.port.addEventListener("message", received);
  worker.port.start();
}
function received(event) {
  var databox = document.getElementById("databox");
  databox.innerHTML = event.data;
}
window.addEventListener("load", initiate);
