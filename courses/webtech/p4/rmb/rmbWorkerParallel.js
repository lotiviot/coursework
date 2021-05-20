addEventListener('message', received);

function received(e){
  var val;
  var maxiter = 1000000000; // 200000000 may be enough on www ??
  for (var i=0; i < maxiter; i++)    // may need to chg maxiter depending machine speed
  {
      val = Math.sqrt(i + 7777.7777);
      val = Math.sqrt(i*2.2 + 7777.7777);
      val = Math.sqrt(i*4.4 + 7777.7777);
      val = Math.sqrt(i*6.6 + 7777.7777);
      val = Math.sqrt(i*7.7 + 7777.7777);
      val = Math.sqrt(i*8.8 + 7777.7777);
      val = Math.sqrt(i*9.9 + 7777.7777);
  }
  postMessage("did " + i.toString());
}
