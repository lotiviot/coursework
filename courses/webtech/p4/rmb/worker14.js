var myports = new Array();
addEventListener("connect", connect);

function connect(event) {
  myports.push(event.ports[0]);
  event.ports[0].onmessage = send;
}
function send(event) {
  for (var f = 0; f < myports.length; f++) {
    myports[f].postMessage("Your Name is " + event.data);
  }
}
