function createStopwatch() {
  let startTime = null;
  let running = false;
  let duration = 0;

  return {
    start() {
      if (running) {
        throw new Error("Stopwatch has already started.");
      }
      running = true;
      startTime = Date.now();
    },

    stop() {
      if (!running) {
        throw new Error("Stopwatch is not started.");
      }
      running = false;
      duration += (Date.now() - startTime) / 1000;
      startTime = null;
    },

    reset() {
      startTime = null;
      running = false;
      duration = 0;
    },

    getDuration() {
      if (running) {
        return (duration + (Date.now() - startTime) / 1000).toFixed(2);
      }
      return duration.toFixed(2);
    },

    isRunning() {
      return running;
    }
  };
}

const sw = createStopwatch();
let intervalId = null;

function updateDuration() {
  document.getElementById("duration").textContent = sw.getDuration();
}

function startStopwatch() {
  try {
    sw.start();
    intervalId = setInterval(updateDuration, 100); // update every 100ms
  } catch (e) {
    alert(e.message);
  }
}

function stopStopwatch() {
  try {
    sw.stop();
    clearInterval(intervalId);
    updateDuration();
  } catch (e) {
    alert(e.message);
  }
}

function resetStopwatch() {
  sw.reset();
  clearInterval(intervalId);
  updateDuration();
}
