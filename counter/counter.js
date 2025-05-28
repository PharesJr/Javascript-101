function createCounter() {
  let count = 0;

  return {
    increment() {
      count++;
    },

    decrement() {
      count--;
    },

    reset() {
      count = 0;
    },

    getValue() {
      return count;
    }
  };
}

// Create a counter instance using factory
const counter = createCounter();

function updateDisplay() {
  document.getElementById("countDisplay").textContent = counter.getValue();
}

function increment() {
  counter.increment();
  updateDisplay();
}

function decrement() {
  counter.decrement();
  updateDisplay();
}

function reset() {
  counter.reset();
  updateDisplay();
}

// Initialize UI
updateDisplay();
