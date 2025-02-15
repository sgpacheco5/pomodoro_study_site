let pomodoro = document.getElementById("pomodoro-timer")
let short = document.getElementById("short-timer")
let long = document.getElementById("long-timer")
let timers = document.querySelectorAll(".timer-display")
let session = document.getElementById("pomodoro")
let shortBreak = document.getElementById("short-break")
let longBreak = document.getElementById("long-break")
let startBtn = document.getElementById("start")
let stopBtn = document.getElementById("stop")
let resetBtn = document.getElementById("reset")
let button = document.querySelector(".button")

let currentTimer = pomodoro
let myInterval = null

function showDefaultTimer() {
    pomodoro.style.display = "block"
    short.style.display = "none"
    long.style.display = "none"
}

showDefaultTimer()

function hideAll() {
    timers.forEach((timer) => (timer.style.display = "none"))
}

session.addEventListener("click", () => {
    hideAll()
    pomodoro.style.display = "block"
    currentTimer = pomodoro
    
    session.classList.add("active")
    shortBreak.classList.remove("active")
    longBreak.classList.remove("active")
})

shortBreak.addEventListener("click", () => {
    hideAll()
    short.style.display = "block"
    currentTimer = short
    
    session.classList.remove("active")
    shortBreak.classList.add("active")
    longBreak.classList.remove("active")
})

longBreak.addEventListener("click", () => {
    hideAll()
    long.style.display = "block"
    currentTimer = long
    
    session.classList.remove("active")
    shortBreak.classList.remove("active")
    longBreak.classList.add("active")
})

function startTimer(timerDisplay) {
    if (myInterval) {
        clearInterval(myInterval)
    }

    let timerDuration = parseFloat(timerDisplay.dataset.duration)
    let durationInMilliseconds = timerDuration * 60 * 1000
    let endTimestamp = Date.now() + durationInMilliseconds

    myInterval = setInterval(() => {
        const timeRemaining = endTimestamp - Date.now()

        if (timeRemaining <= 0) {
            clearInterval(myInterval)
            timerDisplay.querySelector('.time').textContent = "00:00"

            const alarm = new Audio("sounds/bpc_alarm.mp3")
            alarm.play()
        } else {
            const minutes = Math.floor(timeRemaining / (60 * 1000))
            const seconds = Math.floor((timeRemaining % (60 * 1000)) / 1000)
            const formattedTime = `${minutes}:${seconds.toString().padStart(2, '0')}`
            timerDisplay.querySelector('.time').textContent = formattedTime
        }
    }, 1000)
}

startBtn.addEventListener("click", () => {
    if (currentTimer) {
        startTimer(currentTimer)
    }
})

document.querySelectorAll('.sound-label').forEach(label => {
    const audio = document.querySelector(`#${label.getAttribute('for')}`)
    
    label.addEventListener('click', () => {
      if (audio.paused) {
        audio.play()
        label.classList.add('playing')
      } else {
        audio.pause()
        label.classList.remove('playing')
      }
    })
})

stopBtn.addEventListener("click", () => {
    if (myInterval) {
        clearInterval(myInterval)
        myInterval = null
    }
})

resetBtn.addEventListener("click", () => {
    if (currentTimer) {
        clearInterval(myInterval)
        myInterval = null
        timeRemaining = null
        
        const originalDuration = currentTimer.dataset.duration
        const minutes = Math.floor(originalDuration)
        const seconds = Math.floor((originalDuration % 1) * 60)
        const formattedTime = `${minutes}:${seconds.toString().padStart(2, '0')}`
        currentTimer.querySelector('.time').textContent = formattedTime
    }
})

document.getElementById("waves-audio").volume = 0.2
document.getElementById("fire-audio").volume = 1.0
document.getElementById("spotify-audio").volume = 0.2


//to do list
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
function addTask() {
    if (inputBox.value == '') {
        alert('write a unique task before pressing add');
    } else {
        let li = document.createElement('li');
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement('span');
        span.innerHTML = '\u00d7';
        li.appendChild(span);
    }
    inputBox.value = '';
    saveData();
}

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName == "LI"){
        e.target.classList.toggle("checked");
        saveData();

    }
    else if (e.target.tagName == "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }

}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data")
}
showTask();    