var worker1, databox1, databox2;
var globalCount = 0;

function initiate(){
    databox1 = document.getElementById('databox1');
    databox2 = document.getElementById('databox2');
    databox3 = document.getElementById('databox3');

    var sendbutton = document.getElementById('sendbutton');
    sendbutton.addEventListener('click', sendstart);
    
    threadCount = document.getElementById('threadCount')
    lowInt = document.getElementById('LowInt')
    hiInt = document.getElementById('HiInt')
}

function sendstart(){
    //0-5000000000
    threadCount = document.getElementById('threadCount').value;
    lowInt = document.getElementById('LowInt').value;
    hiInt = document.getElementById('HiInt').value;

    range = hiInt - lowInt
    subRange = Math.trunc(range / threadCount)
    timeBefore = new Date()
    var subRangeArr = []
    var workerArr = []
    for(var x = 0 ; x < threadCount ; x++){
        subRangeArr.push([])
        workerArr.push(new Worker("./webworker.js"))
        workerArr[x].addEventListener("message", received);
        if(x  == 0){
            subRangeArr[x][0] = 0
            subRangeArr[x][1] = 0 + subRange
        }
        else if(x > 0 && !(x+1  == threadCount)) {
            subRangeArr[x][0] = subRangeArr[x-1][1]+1
            subRangeArr[x][1] = subRangeArr[x][0] + subRange
        }
        else if(x+1  == threadCount) {
            subRangeArr[x][0] = subRangeArr[x-1][1]+1
            subRangeArr[x][1] = subRangeArr[x][0] + subRange-1
            if(subRangeArr[x][1] != hiInt){
                subRangeArr[x][1] = parseInt(hiInt)
            }
        }
        
        test = [subRangeArr[x][0], subRangeArr[x][1], timeBefore]
        
        workerArr[x].postMessage(test)
    }
    //console.log(subRangeArr)
}

function received(e){
    var timeFinal = e.data[1]-e.data[2]
    var timeFinalStr = "Time: " + timeFinal/1000
    globalCount += e.data[0]

    databox1.innerHTML += "THREAD: "+ e.data[0] + "<br/>";
    databox2.innerHTML = "TOTAL: "+ globalCount;
    databox3.innerHTML = timeFinalStr + "<br/>";
}

addEventListener('load', initiate);

//data delivers fine into the project just need a way to be able to return it consistently