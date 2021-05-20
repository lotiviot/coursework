addEventListener("message", received);

function received(event) {
  var low = event.data[0];
  var hi = event.data[1];
  var count = 0

  for( var x = low ; hi >= x ; x++){
    if(Math.sqrt(Math.sqrt(x)) % 1 > .93){
      count++
    }
  }
  countFinal = "THREAD: "+ count
  toSend = [count, new Date(), event.data[2]]

  postMessage(toSend);
}