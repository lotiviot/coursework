var worker1, databox1, databox2;
var g = 0;
function initiate(){
  databox1 = document.getElementById('databox1');
  databox2 = document.getElementById('databox2');

  var sendbutton = document.getElementById('sendbutton');
  sendbutton.addEventListener('click', sendstart);

  var interactbutton = document.getElementById('interactbutton');
  interactbutton.addEventListener('click', interact);

  worker1 = new Worker('./rmbWorkerParallel.js');
  worker1.addEventListener('message', received1);
  worker1.addEventListener('error', error);

  worker2 = new Worker('./rmbWorkerParallel.js');
  worker2.addEventListener('message', received2);
  worker2.addEventListener('error', error);
}

function sendstart(){
  worker1.postMessage("start");
  worker2.postMessage("start");
}

function interact(){
  g++;
  databoxi.innerHTML = g.toString();
}

function received1(e){
  databox1.innerHTML = e.data;
}

function received2(e){
  databox2.innerHTML = e.data;
}

function error(e){
  databox.innerHTML = 'ERROR: ' + e.message + '<br>';
  databox.innerHTML += 'Filename: ' + e.filename + '<br>';
  databox.innerHTML += 'Line Number: ' + e.lineno;
}

addEventListener('load', initiate);
