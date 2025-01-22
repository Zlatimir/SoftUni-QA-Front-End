let seconds = 0;
let minutes = 0;
let intervalId;

function start() {
    intervalId = setInterval(() => {
        document.getElementById('seconds').innerText = seconds < 10 ? `0${seconds}` : seconds;
        document.getElementById('minutes').innerText = minutes < 10 ? `0${minutes}` : minutes;
        seconds++;
        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }
        
    }, 1000);
}

function stop() {
    clearInterval(intervalId);
    seconds = 0;
    minutes = 0;
    document.getElementById('seconds').innerText = '00';
    document.getElementById('minutes').innerText = '00';
}