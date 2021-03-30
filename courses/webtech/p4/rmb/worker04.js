addEventListener("message", received);

function received(event) {
  var answer = "Your name is " + event.data;
  postMessage(answer);
}
