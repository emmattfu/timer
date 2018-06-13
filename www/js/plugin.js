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

    stop();

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
    return this;
  }

  function displayTimeLeft(seconds) {

    const days = Math.floor(seconds/(24 * 60 * 60));
    const hours = Math.floor(seconds/(60*60) % 24);
    const minutes = Math.floor(seconds / 60 % 60);
    const reminderSeconds = Math.floor((seconds % 60));

    let display;

    if (seconds >= 86400) {
      display = `${days < 10 ? '0' : ''}${days}:${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${reminderSeconds < 10 ? '0' : ''}${reminderSeconds}`;
    } else if (seconds >= 3600) {
      display = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${reminderSeconds < 10 ? '0' : ''}${reminderSeconds}`;
    } else {
      display = `${minutes}:${reminderSeconds < 10 ? '0' : ''}${reminderSeconds}`;
    }

    timerDisplay.textContent = display;
    document.title = display;
  }

  function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const minutes = end.getMinutes();
    const date = new Date();


    endTime.textContent = `Be back on ${end.toLocaleString()}`;
  }

  function stop() {
    alarmSound.pause();
    alarmSound.currentTime = 0;
    clearInterval(countdown);
    return this;
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
const form = document.querySelector('form');
const input = form['minutes'];


form.addEventListener('submit', getInputValue);

function getInputValue(e) {
  e.preventDefault();
  const seconds = input.value * 60 ;
  timer.start(seconds);
}




























