var databox, socket;
function initiate() {
  databox = document.getElementById("databox");
  var button = document.getElementById("button");
  button.addEventListener("click", send);

  // socket = new WebSocket("ws://YOUR_IP_ADDRESS:12345/ws/demo.php");
  // socket = new WebSocket("ws://www.cs.mtsu.edu:5995");
  socket = new WebSocket("ws://localhost:5995");
  socket.addEventListener("message", received);
}
function received(event) {
  var list = databox.innerHTML;
  databox.innerHTML = "Received: " + event.data + "<br>" + list;
}
function send() {
  var command = document.getElementById("command").value;
  socket.send(command);
}
window.addEventListener("load", initiate);
