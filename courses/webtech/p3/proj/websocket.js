var databox, socket;
function initiate() {
  databox = document.getElementById("databox");
  var button1 = document.getElementById("Cand1");
  var button2 = document.getElementById("Cand2");
  var button3 = document.getElementById("Display");
  button1.addEventListener("click", Cand1);
  button2.addEventListener("click", Cand2);
  button3.addEventListener("click", Display);

  // socket = new WebSocket("ws://YOUR_IP_ADDRESS:12345/ws/demo.php");
  // socket = new WebSocket("ws://www.cs.mtsu.edu:5995");
  socket = new WebSocket("ws://www.cs.mtsu.edu:5860");
  socket.addEventListener("message", received);
  console.log(socket)
}
function received(event) {
  var list = databox.innerHTML;
  console.log(event.data)
  databox.innerHTML += "RCVD: " + event.data + "<br>";
}
function Cand1() {
  var command = document.getElementById("Cand1").value;
  console.log(command)
  var list = databox.innerHTML;
  databox.innerHTML += "SENT: Cand1<br>";
  socket.send(command);
}
function Cand2() {
    var command = document.getElementById("Cand2").value;
    console.log(command)
    var list = databox.innerHTML;
    databox.innerHTML += "SENT: Cand2<br>";
    socket.send(command);
    
}
function Display() {
    var command = document.getElementById("Display").value;
    console.log(command)
    var list = databox.innerHTML;
    databox.innerHTML += "SENT: query<br>";
    socket.send(command);
}
window.addEventListener("load", initiate);
