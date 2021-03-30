addEventListener("message", received);

function received(event) {
  if (event.data == "close2") {
    postMessage("Worker Terminated");
    close();
  } else {
    var answer = "Your name is " + event.data;
    postMessage(answer);
  }
}
