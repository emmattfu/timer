const timer = (function () {

  let countdown,
      timerDisplay,
      endTime,
      alarmSound;

  // Инициализация модуля
  function init(settings) {
    timerDisplay = document.querySelector(settings.timerDisplaySelector);
    endTime = document.querySelector(settings.endTimeSelector);
    alarmSound = new Audio(settings.alarmSound);
  }

  function start(seconds) {
    if(typeof seconds !== "number") return new Error('Please provide seconds!');

    const now = Date.now();
    const then = now + seconds * 1000;

    displayTimeLeft(seconds);
    displayEndTime(then);

    countdown = setInterval(() => {
      const secondsLeft = Math.round( (then - Date.now()) / 1000 );
      if (secondsLeft < 0) {
        clearInterval(countdown);
        alarmSound.play();
        return;
      }

      displayTimeLeft(secondsLeft);
    }, 1000);
  }

  function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const reminderSeconds = seconds % 60;

    const display = `${minutes}:${reminderSeconds < 10 ? '0' : ''}${reminderSeconds}`;
    timerDisplay.textContent = display;
    document.title = display;
  }

  function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const minutes = end.getMinutes();

    endTime.textContent = `Be back at ${hour}:${minutes < 10 ? '0' : ''}${minutes}`;
  }

  function stop() {
    alarmSound.pause();
    alarmSound.currentTime = 0;
    clearInterval(countdown);
  }

  return {
    init,
    start,
    stop
  }
})();

const buttons = document.querySelectorAll('[data-time]');
const stopButton = document.querySelector('[data-stop]');

timer.init({
  timerDisplaySelector: '.display__time-left',
  endTimeSelector :'.display__end-time',
  alarmSound: 'audio/bell.mp3'
});

// Start timer on click
function startTimer(e) {
  const seconds = Number(this.dataset.time);
  timer.start(seconds);
}

function stopTimer (e) {
  timer.stop();
}

buttons.forEach(btn => btn.addEventListener('click', startTimer));
stopButton.addEventListener('click', stopTimer);

//Работа с формой
let input = document.querySelector('input');
let text = input.value;


input.addEventListener('submit', getInputValue);

function getInputValue(e) {
    e.preventDefault();
    // timer.start(text);
    console.log(e);
}

console.log(text);




























