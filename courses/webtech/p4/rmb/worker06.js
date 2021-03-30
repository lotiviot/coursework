addEventListener("message", received);

function received(event){
  test();    // RMB - intentionally undefined to produce an error
}
