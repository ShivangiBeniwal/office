(function () {

    const logTag = "Timer";
    var interval;
    printLog(logTag, "Init");

    var start = document.getElementById("start");
    start.onclick = () => {
        printLog(logTag, "Start clicked");

        var count = 1;
        interval = setInterval(function() {
            printLog(logTag, `Count ${count}`);
            count++;
        }, 2000);
    }

    var stop = document.getElementById("stop");
    stop.onclick = () => {
        printLog(logTag, "Stop clicked");
        clearInterval(interval);
    }
})();
