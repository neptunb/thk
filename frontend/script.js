let flip_flop = ""
const setTimeoutFunc = (ms) => {
  setTimeout(() => {
    flip_flop = flip_flop === "UP"? "DOWN":"UP";
    document.getElementById('timeout_response').innerText = flip_flop + " after 2000 miliseconds";
  }, ms);
}

const setImmediateFunc = () => {
  try {
    setImmediate(() => {
      document.getElementById('immediate_response').innerText = "setImmediate applied.";
    });
  } catch (error) {
    document.getElementById('immediate_response').innerText = "setImmediate runs only at node environments.";
  }
  
}

let counter = 0
const setIntervalFunc = (ms) => {
  setInterval(() => {
    counter = counter +1;
    document.getElementById('interval_response').innerText = "setInterval applied: " + counter;
  }, ms);
}


document.getElementById('timeout').addEventListener('click', async () => {
  document.getElementById('timeout_response').innerText = "setTimeout started.";
  setTimeoutFunc(2000);
});

document.getElementById('immediate').addEventListener('click', async () => {
  document.getElementById('immediate_response').innerText = "";
  setImmediateFunc();
});

document.getElementById('interval').addEventListener('click', async () => {
  counter = 0;
  document.getElementById('interval_response').innerText = "setInterval started.";
  setIntervalFunc(1000);
});