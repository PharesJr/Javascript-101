function createCountdown() {
  let timeLeft = 0;
  let intervalId = null;
  let running = false;

  return {
    set(seconds) {
      timeLeft = seconds;
    },

    start(onTick, onComplete) {
      if (running || timeLeft <= 0) return;
      running = true;
      intervalId = setInterval(() => {
        if (timeLeft > 0) {
          timeLeft--;
          onTick(timeLeft);
        } else {
          clearInterval(intervalId);
          running = false;
          onComplete();
        }
      }, 1000);
    },

    stop() {
      clearInterval(intervalId);
      running = false;
    },

    reset(onTick) {
      clearInterval(intervalId);
      running = false;
      onTick(timeLeft);
    },

    isRunning() {
      return running;
    }
  };
}

const timer = createCountdown();
let initialTime = 0;

function startTimer() {
  if (!timer.isRunning()) {
    const input = document.getElementById("timeInput");
    if (input.value && !isNaN(input.value)) {
      const seconds = parseInt(input.value);
      initialTime = seconds;
      timer.set(seconds);
      timer.start(updateDisplay, () => {
        alert("Time's up!");
      });
    }
  }
}

function stopTimer() {
  timer.stop();
}

function resetTimer() {
  timer.stop();
  timer.set(initialTime);
  updateDisplay(initialTime);
}

function updateDisplay(seconds) {
  document.getElementById("display").textContent = seconds;
}
