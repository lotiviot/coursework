var worker, databox;
function initiate() {
  databox = document.getElementById("databox");
  var button = document.getElementById("button");
  button.addEventListener("click", send);

  worker = new Worker("worker08.js");
  worker.addEventListener("message", received);
}
function send() {
  var name = document.getElementById("name").value;
  if (name == "close1") {
    worker.terminate();
    databox.innerHTML = "Worker Terminated";
  } else {
    worker.postMessage(name);
  }
}
function received(event) {
  databox.innerHTML = event.data;
}
window.addEventListener("load", initiate);
